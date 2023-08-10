// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot, Review, Booking, SpotImage, ReviewImage } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(
      { data: safeUser },
      secret,
      { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax"
    });

    return token;
  };

  const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        return next();
      }

      try {
        const { id } = jwtPayload.data;
        req.user = await User.findByPk(id, {
          attributes: {
            include: ['email', 'createdAt', 'updatedAt']
          }
        });
      } catch (e) {
        res.clearCookie('token');
        return next();
      }

      if (!req.user) res.clearCookie('token');

      return next();
    });
  };

  // If there is no current user, return an error
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
  };

  //proper required for spot
const requireAuthor = async function (req, res, next) {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
      return res.status(404).json({
          "message": "Spot couldn't be found",
          "statusCode": 404
      })
  }
  const ownerId = spot.ownerId;
  const userId = req.user.id;
  if (userId === ownerId) {
      return next();
  } else {
      const err = new Error('Unauthorized');
      err.message = 'Forbidden';
      err.status = 403;
      return next(err);
  }
};

// auth for Proper Review

const requireAuthorReview = async function(req, res, next) {
  const reviewid = req.params.reviewId;
  const userId = req.user.id;
  const review = await Review.findByPk(reviewid);
  if(!review) {
    res.status(404).json({
      "message": "Review couldn't be found"
    })
  }

  const userReviewId = review.userId;
  if(userId === userReviewId) {
    return next();
  } else {
    const err = new Error('Unauthorized')
    err.message = 'Unauthorized to do anything with this Review';
    err.status = 403;
    return next(err)
  }
}

//required to create bookings
const requireAuthorCreateBooking = async function (req, res, next) {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const ownerId = spot.ownerId;
    if (userId === ownerId) {
        const err = new Error('Unauthorized');
        err.message = 'You cant book your place';
        err.status = 403;
        return next(err);
    } else {
        return next();
    }
}

const requireAuthorBooking = async function (req, res, next) {
  const userId = req.user.id;
  const bookingId = req.params.bookingId;
  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
      res.status(404).json({
          "message": "Booking couldn't be found",
          "statusCode": 404
      });
  } else {
      const userBookingId = booking.userId;
      if (userId === userBookingId) {
          next();
      } else {
          const err = new Error('Unauthorized');
          err.message = 'This booking doesnt belong to you';
          err.status = 403;
          return next(err);
      }
  }
}

//required for booking(delete)

const requireAuthorDeleteBooking = async function (req, res, next) {
    const userId = req.user.id;
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
        res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        });
    } else {
        const spotId = booking.spotId;
        const spot = await Spot.findByPk(spotId);
        const ownerId = spot.ownerId;
        const userBookingId = booking.userId;
        if (userId === userBookingId || userId === ownerId) {
            next()
        } else {
            const err = new Error('Unauthorized');
            err.message = 'This is not your booking or you are not the owner of the booking spot';
            err.status = 403;
            return next(err);
        }
    }
}


  module.exports = { setTokenCookie, restoreUser, requireAuth, requireAuthor, requireAuthorReview, requireAuthorBooking, requireAuthorDeleteBooking, requireAuthorCreateBooking };
