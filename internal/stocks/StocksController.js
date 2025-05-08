const express = require('express');
const router = express.Router();
const {EventsService, MemorableDatesService, DiplomaticAnniversariesService} = require('./StocksService');

class EventsController {
    static findEvents(req, res) {
        try {
            res.send(EventsService.findEvents());
        } catch (err) {
            console.error(err); // вывести ошибку в консоль
            res.status(500).send({status: 'Bad Request', message: err.message})
        }
    }

    static findEventById(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(EventsService.findEventById(id))
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static addEvent(req, res) {
        try {
            res.send(EventsService.addEvent(req.body));
        } catch (err) {
            res.status(400).json({status: 'Bad Request', message: err.message})
        }
    }

    static deleteEvent(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(EventsService.deleteEvent(id));
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }
}

class MemorableDatesController {
    static findMemorableDates(req, res) {
        try {
            res.send(MemorableDatesService.findMemorableDates());
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static findMemorableDateById(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(MemorableDatesService.findMemorableDateById(id))
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static addMemorableDate(req, res) {
        try {
            res.send(MemorableDatesService.addMemorableDate(req.body));
        } catch (err) {
            res.status(400).json({status: 'Bad Request', message: err.message})
        }
    }

    static deleteMemorableDate(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(MemorableDatesService.deleteMemorableDate(id));
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }
}

class DiplomaticAnniversariesController {
    static findDiplomaticAnniversaries(req, res) {
        try {
            res.send(DiplomaticAnniversariesService.findDiplomaticAnniversaries());
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static findDiplomaticAnniversaryById(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(DiplomaticAnniversariesService.findDiplomaticAnniversaryById(id))
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static addDiplomaticAnniversary(req, res) {
        try {
            res.send(DiplomaticAnniversariesService.addDiplomaticAnniversary(req.body));
        } catch (err) {
            res.status(400).json({status: 'Bad Request', message: err.message})
        }
    }

    static deleteDiplomaticAnniversary(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(DiplomaticAnniversariesService.deleteDiplomaticAnniversary(id));
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }
}

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
