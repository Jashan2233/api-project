const express = require('express')
const { check } = require('express-validator');
const{requireAuth, requireAuthor} = require('../../utils/auth')
const { Op, QueryInterface } = require('sequelize')
const { handleValidationErrors } = require('../../utils/validation');

const { User, Spot, SpotImage, Owner, Review, ReviewImage, sequelize, Booking } = require('../../db/models');

const router = express.Router();

//validate query
const validateQuery = [
    check('page')
        .optional()
        .exists({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .optional()
        .exists({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage('Size must be greater than or equal to 1'),
    check('minLat')
        .optional()
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Minimum latitude is invalid'),
    check('maxLat')
        .optional()
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Maximum latitude is invalid"'),
    check('minLng')
        .optional()
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Minimum longitude is invalid'),
    check('maxLng')
        .optional()
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Max longitude is invalid'),
    check('minPrice')
        .optional()
        .exists({ checkFalsy: true })
        .isFloat({min:0})
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .optional()
        .exists({ checkFalsy: true })
        .isFloat({min:0})
        .withMessage('Maximum price must be greater than or equal to 0'),

    handleValidationErrors
];

// Route to get all spots
//get all spot
router.get('/',validateQuery, async (req, res, next) => {
    let { page, size, maxLat, minLat, maxLng, minLng, minPrice, maxPrice } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    if (page > 10) {
        page = 10
    }
    if (size > 20) {
        size = 20
    }
    let pagination = {};
    if (page, size) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }
    minPrice = parseFloat(minPrice);
    maxPrice = parseFloat(maxPrice);

    const spots = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.fn('ROUND',sequelize.fn('AVG', sequelize.col('Reviews.stars')),2), 'avgRating'
                ],
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            },
        ],
        where: {
            ...(minPrice && maxPrice ? { price: { [Op.between]: [minPrice, maxPrice] } } : {}),
            ...(minPrice && !maxPrice ? { price: { [Op.gte]: minPrice } } : {}),
            ...(!minPrice && maxPrice ? { price: { [Op.lte]: maxPrice } } : {}),
          },
        group: ['Spot.id'],
        raw: true,
        ...pagination,
        subQuery: false
    });

    for (let spot of spots) {
        const image = await SpotImage.findAll({
            where: {
                [Op.and]: [
                    {
                        spotId: spot.id,
                    },
                    {
                        preview: true
                    }
                ]
            },
            raw: true
        });
        if (!image.length) {
            spot.previewImage = null;
        } else {
            spot.previewImage = image[0]['url'];
        }
    }
    if (page && size) {
        res.json({ "Spots": spots, page, size })
    } else {
        res.json({
            "Spots": spots
        })
    }
})

// Get Spots from Current User

router.get('/current', requireAuth, async (req, res) => {
   const id = req.user.id;

   const spots = await Spot.findAll({
    where: {
        ownerid: id
    },
    attributes: {
        include: [
            [
                sequelize.fn('ROUND',sequelize.fn('AVG', sequelize.col('Reviews.stars')),2), 'avgRating'
            ]
        ]
    },
    include: [
        {
            model: Review,
            attributes: []
        }
    ],
    group: ['Spot.id'],
    raw: true // Display as JS object
   })

   for(let spot of spots) {
    const image = await SpotImage.findAll({
        where: {
            [Op.and]: [
                {
                    spotId: spot.id,
                },
                {
                    preview: true
                }
            ]
        },
        raw: true
    });
    if(!image.length) {
        spot.previewImage = null;
    } else {
        spot.preview = image[0]['url']
    }
   }
   res.json({'Spots': spots})
})

// Get Spot from a ID
router.get('/:spotId', async (req, res, next) => {
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId, {
            include: [
                {
                    model: Review,
                    attributes: [],
                }, {
                    model: SpotImage,
                    attributes: ['id', 'url', 'preview']
                }, {
                    model: User,
                    as: 'Owner',
                    attributes: ['id', 'firstName', 'lastName']
                }
            ],

            attributes: {
               include: [
                    [

                        sequelize.fn('ROUND',sequelize.fn('AVG', sequelize.col('Reviews.stars')),2), 'avgStarRating'
                    ],
                ]
            },
            group: ['Spot.id', 'SpotImages.id', 'Reviews.id', 'Owner.id'],
        });

        if(spot) {
            res.json(spot)
        } else {
            res.status(404).json({
                "message": "Spot couldn't be found"
            })
        }
});

//Create a spot
const validateCreateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        // .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Latitude is not valid'),
    check('lng')
        // .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Longitude is not valid'),
    check('description')
        .exists({checkFalsy: true})
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .isInt({ min: 1 })
        // .isNumeric()
        .withMessage('Price per day is required'),
    handleValidationErrors
];

router.post('/', requireAuth, validateCreateSpot, async (req, res, next) => {
    const ownerId = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price }= req.body
    const spot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.json(spot)
})

// Add an Image to a spoit with SpotId


router.post('/:spotId/iamges', requireAuth, requireAuthor, async (req, res, next) => {
    const spotId = req.params.spotId;
    const {url, preview} = req.body;
    const spot = await Spot.findByPk(spotId);
    if(spot) {
        const image = await SpotImage.create({
            url,
            preview,
            spotId
        })
        const newImageId = image.id
        const imageData = await SpotImage.scope('defaultScope').findByPk(newId);
        res.json(imageData)
    } else {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
})


module.exports = router;



module.exports = router
