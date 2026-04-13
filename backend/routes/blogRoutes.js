const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const {
    getBlogs,
    createBlogs,
    updateBlogs,
    deleteBlogs
} = require('../controllers/blogController');

router.get('/', getBlogs);
router.post('/', upload.single('image'), createBlogs);
router.put('/:id', upload.single('image'), updateBlogs);
router.delete('/:id', deleteBlogs)

module.exports = router;

