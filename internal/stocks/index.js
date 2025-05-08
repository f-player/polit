const express = require('express');
const {EventsController, MemorableDatesController, DiplomaticAnniversariesController} = require('./StocksController');

const router = express.Router();

// Events routes
router.get('/events', EventsController.findEvents);
router.get('/events/:id', EventsController.findEventById);
router.post('/events', EventsController.addEvent);
router.delete('/events/:id', EventsController.deleteEvent);

// Memorable dates routes
router.get('/memorable-dates', MemorableDatesController.findMemorableDates);
router.get('/memorable-dates/:id', MemorableDatesController.findMemorableDateById);
router.post('/memorable-dates', MemorableDatesController.addMemorableDate);
router.delete('/memorable-dates/:id', MemorableDatesController.deleteMemorableDate);

// Diplomatic anniversaries routes
router.get('/diplomatic-anniversaries', DiplomaticAnniversariesController.findDiplomaticAnniversaries);
router.get('/diplomatic-anniversaries/:id', DiplomaticAnniversariesController.findDiplomaticAnniversaryById);
router.post('/diplomatic-anniversaries', DiplomaticAnniversariesController.addDiplomaticAnniversary);
router.delete('/diplomatic-anniversaries/:id', DiplomaticAnniversariesController.deleteDiplomaticAnniversary);

module.exports = router;
