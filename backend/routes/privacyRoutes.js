const express = require('express');
const router = express.Router();

const {
    getPrivacy,
    updatePrivacy,
    clearPrivacy
} = require('../controllers/privacyController');

router.get('/', getPrivacy);
router.put('/', updatePrivacy);
router.delete('/', clearPrivacy);

module.exports = router;