const express = require('express');
const router = express.Router();


const{
    getInquiry,
    createInquiry
} = require('../controllers/inquiryController');


router.get('/', getInquiry);

router.post('/', createInquiry);


module.exports = router;

