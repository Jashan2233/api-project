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

//Get all Reviews of Current User

router.get('/current', requireAuth, async (req, res, next) => {
    const id = req.user.id;
    const reviews = await Review.findAll({
        where: {
            userId: id
        },
        raw: true
    });
    for (let review of reviews) {
        const user = await User.findOne({
            where: {
                id
            },
            attributes: {
                        exclude: ['username', 'hashedPassword', 'createdAt', 'updatedAt', 'email']
                    }

        });
        review.User = user;
        const spots = await Spot.findOne({
            where: {
                ownerId: id
            },
            raw: true
        });
            const spotImages = await SpotImage.findOne({
                where: {
                    [Op.and]: [
                        {
                            spotId: spots.id,
                        },
                        {
                            preview: true
                        }
                    ]
                },
                attributes: {
                    exclude: ['id', 'preview']
                },
                raw: true
            });
            if (!spotImages) {
                spots.previewImage = null
            } else {
                spots.previewImage = spotImages['url'];
            }
        review.Spot = spots;
        const images = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            },
            attributes: {
                exclude: ['reviewId', 'createdAt', 'updatedAt']
            },
            raw: true
        });
        review.ReviewImages = images
    }
    res.json({"Reviews": reviews });
});

// add an Image to a review based on Review ID

router.post('/:reviewId/images', requireAuth, requireAuthorReview, async(req, res, next) => {
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId
        }
    });
    if(reviewImages.length === 10) {
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached"
        })
    }
    const { url } = req.body;

    const reviewImage = await ReviewImage.create({
        reviewId,
        url,
    });
    const imageData = await ReviewImage.scope('defaultScope').findByPk(reviewImage.id)
    res.json(imageData);
})

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

// Edit a review based on Review ID
router.put('/:reviewId', requireAuth, requireAuthorReview, validateReview, async(req, res, next) => {
    const reviewId = req.params.reviewId;
    const updateReview = await Review.findByPk(reviewId);
    const { review, stars } = req.body;

    if(review) {
        updateReview.review = review;
    }
    if(stars) {
        updateReview.stars = stars;
    }
    await updateReview.save();
    res.json(updateReview)
});

//Delete a Review based on ReviewId

router.delete('/:reviewId', requireAuth, requireAuthorReview, async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const deleteReview = await Review.findByPk(reviewId);
    await deleteReview.destroy();
    res.json({
        "message": "Successfully deleted"
    });
});

module.exports = router;
