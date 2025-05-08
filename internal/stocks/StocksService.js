const {EventDAO, MemorableDateDAO, DiplomaticAnniversaryDAO} = require('./StocksDao');

class EventsService {
    static findEvents(id) {
        if (id !== undefined) {
            return EventDAO.findById(id).toJSON();
        }

        return EventDAO.find().map((event) => event.toJSON());
    }

    static addEvent(event) {
        return EventDAO.insert(event).toJSON();
    }

    static deleteEvent(id) {
        return EventDAO.delete(id).map((event) => event.toJSON());
    }
}

class MemorableDatesService {
    static findMemorableDates(id) {
        if (id !== undefined) {
            return MemorableDateDAO.findById(id).toJSON();
        }

        return MemorableDateDAO.find().map((memorableDate) => memorableDate.toJSON());
    }

    static addMemorableDate(memorableDate) {
        return MemorableDateDAO.insert(memorableDate).toJSON();
    }

    static deleteMemorableDate(id) {
        return MemorableDateDAO.delete(id).map((memorableDate) => memorableDate.toJSON());
    }
}

class DiplomaticAnniversariesService {
    static findDiplomaticAnniversaries(id) {
        if (id !== undefined) {
            return DiplomaticAnniversaryDAO.findById(id).toJSON();
        }

        return DiplomaticAnniversaryDAO.find().map((diplomaticAnniversary) => diplomaticAnniversary.toJSON());
    }

    static addDiplomaticAnniversary(diplomaticAnniversary) {
        return DiplomaticAnniversaryDAO.insert(diplomaticAnniversary).toJSON();
    }

    static deleteDiplomaticAnniversary(id) {
        return DiplomaticAnniversaryDAO.delete(id).map((diplomaticAnniversary) => diplomaticAnniversary.toJSON());
    }
}

module.exports = {
    EventsService,
    MemorableDatesService,
    DiplomaticAnniversariesService,
}
