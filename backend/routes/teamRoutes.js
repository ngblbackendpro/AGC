const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const {
    getTeam,
    createTeam,
    updateTeam,
    deleteTeam
} = require('../controllers/teamController');

router.get('/', getTeam);
router.post('/', upload.single('photo'), createTeam);
router.put('/:id', upload.single('photo'), updateTeam);
router.delete('/:id', deleteTeam);

module.exports = router;