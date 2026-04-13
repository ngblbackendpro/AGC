const express = require('express');
const router = express.Router();

const {
    getContact,
    updateContact,
    clearContact
} = require('../controllers/contactController');


router.get('/', getContact);
router.put('/', updateContact);
router.delete('/', clearContact);

module.exports = router;
