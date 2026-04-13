const express = require('express');
const router = express.Router();

const {
    getSocial,
    updateSocial,
    clearSocial
} = require('../controllers/socialController');


router.get('/', getSocial);
router.put('/', updateSocial);
router.delete('/', clearSocial);


module.exports = router;
