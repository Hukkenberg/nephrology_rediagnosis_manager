// routes/labRequests.js
const express = require('express');
const router = express.Router();
const {
    getAllLabRequests,
    createLabRequest,
    updateLabRequest,
} = require('../controllers/labRequestController');

// Các route cho yêu cầu xét nghiệm
router.get('/', getAllLabRequests);
router.post('/', createLabRequest);
router.put('/:id', updateLabRequest);

module.exports = router;
