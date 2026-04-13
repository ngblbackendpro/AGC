const express = require('express');
const router = express.Router();

const {
    getHomeElements,
    updateHomeElements,
    clearHomeElements
} = require('../controllers/homeController');


router.get('/', getHomeElements);
router.put('/', updateHomeElements);
router.delete('/', clearHomeElements);

module.exports = router;
