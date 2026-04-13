const express = require('express');
const router = express.Router();

const {
    getCareers,
    createCareer,
    updateCareer,
    deleteCareer
} = require('../controllers/careerController');


router.get('/', getCareers);
router.post('/', createCareer);
router.put('/:id', updateCareer);
router.delete('/:id', deleteCareer);

module.exports = router;