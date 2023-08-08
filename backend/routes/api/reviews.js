const express = require('express');

const { setTokenCookie, requireAuth, requireAuthor, requireAuthorReview } = require('../../utils/auth.js');
const { User, Spot, Review, SpotImage,ReviewImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Sequelize } = require('sequelize');
const { route } = require('./session.js');
const spotimage = require('../../db/models/spotimage.js');
const { Op } = require('sequelize');

const router = express.Router();

// Get all Reviews of Current User

router.get('/current', requireAuth, async (req, res, next) => {
    const id = req.user.id;

    const user = await User.findOne({
        where: {
            id
        },
        attributes: {
            exclude: ['username', 'hashedPassword', 'createdAt', 'updatedAt', 'email']
        }
    });

    const reviews = await Review.findAll({
        where: {
            userId: id
        }
    });

    const enhancedReviews = await Promise.all(reviews.map(async review => {
        const enhancedReview = review.get({ plain: true }); // Convert Sequelize instance to plain object
        enhancedReview.User = user;

        const spots = await Spot.findAll({
            where: {
                ownerId: id
            }
        });

        enhancedReview.Spots = await Promise.all(spots.map(async spot => {
            const enhancedSpot = spot.get({ plain: true }); // Convert Sequelize instance to plain object

            const image = await SpotImage.findAll({
                where: {
                    spotId: spot.id,
                    preview: true
                }
            });

            if (!image.length) {
                enhancedSpot.previewImage = null
            } else {
                enhancedSpot.previewImage = image[0]['url'];
            }

            return enhancedSpot;
        }));

        const images = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            },
            attributes: {
                exclude: ['reviewId', 'createdAt', 'updatedAt']
            }
        });

        enhancedReview.ReviewImages = images;

        return enhancedReview;
    }));

    res.json({
        'Reviews': enhancedReviews
    });
});







module.exports = router;
