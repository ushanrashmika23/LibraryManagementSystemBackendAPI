const express = require('express');
const resavationController = require('../controller/resavation.controller');

const router = express.Router();

// Define routes for resavation
// router.get('/all-resavations', resavationController.getAllResavations);
// router.get('/resavation/:id', resavationController.getResavationById);
router.post('/create-resavation', resavationController.createResavation);
router.put('/update-resavation/:id', resavationController.updateResavation);
router.delete('/delete-resavation/:id', resavationController.deleteResavation);
router.get('/search-resavation', resavationController.searchResevation);

module.exports = router;

