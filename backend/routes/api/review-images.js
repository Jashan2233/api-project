const express = require('express');

const { setTokenCookie, requireAuth, requireReviewImage } = require('../../utils/auth.js');
const { User, Booking, Spot, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();


// Delete Review Image
router.delete('/:imageId', requireAuth, requireReviewImage, async(req, res) => {
    const reviewImageId = req.params.imageId;
    const reviewImage = await ReviewImage.findByPk(reviewImageId)
    await reviewImage.destroy();

    res.status(200).json({
        "message": "Successfully deleted"
    })
})

module.exports = router;
