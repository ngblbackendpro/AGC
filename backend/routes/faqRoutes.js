const express = require('express');
const router = express.Router();

const {
    getFAQ,
    createFAQ,
    updateFAQ,
    deleteFAQ
} = require('../controllers/faqController');


router.get('/', getFAQ);
router.post('/', createFAQ);
router.put('/:id', updateFAQ);
router.delete('/:id', deleteFAQ);

module.exports = router;