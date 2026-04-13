const express = require('express');
const router = express.Router();

const {
    getTerms,
    createTerms,
    clearTerms,
    updateTerms
} = require('../controllers/termsController');


router.get('/', getTerms);
router.post('/', createTerms);
router.put('/:id', updateTerms)
router.delete('/:id', clearTerms);



module.exports = router;