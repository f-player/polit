const { EventsRepository, MemorableDatesRepository, DiplomaticAnniversariesRepository } = require('./StocksRepository');

class EventDAO {
    constructor(id, date, event, location, category) {
        this.id = id;
        this.date = date;
        this.event = event;
        this.location = location;
        this.category = category;
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('invalidate id');
        }
    }


    static _validate(event) {
        if (event.id === undefined || event.id === null || event.id === '') {
            throw new Error('invalidate id');
        }
        if (event.date === undefined || event.date === null || event.date === '') {
            throw new Error('invalidate date');
        }
        if (event.event === undefined || event.event === null || event.event === '') {
            throw new Error('invalidate event');
        }
        if (event.location === undefined || event.location === null || event.location === '') {
            throw new Error('invalidate location');
        }
        if (event.category === undefined || event.category === null || event.category === '') {
            throw new Error('invalidate category');
        }
    }
    


    static find() {
        const events = EventsRepository.read();

        return events.map(({id, date, event, location, category}) => {
            return new this(id, date, event, location, category);
        });
    }

    static findById(id) {
        this._validateId(id);

        const events = EventsRepository.read();
        const event = events.find((e) => e.id === id);

        return new this(event.id, event.date, event.event, event.location, event.category);
    }

    static insert(event) {
        if (!event.id) {
            const events = EventsRepository.read();
            event.id = events.length + 1;

        }
        this._validate(event);
    
        const newEvent = new this(event.id, event.date, event.event, event.location, event.category);
        const events = EventsRepository.read();
        EventsRepository.write([...events, newEvent.toJSON()]);
    
        return newEvent;
    }
    

    static delete(id) {
        this._validateId(id);

        const events = EventsRepository.read();
        const filteredEvents = events.filter((e) => e.id !== id);

        EventsRepository.write(filteredEvents);

        return filteredEvents.map(({id, date, event, location, category}) => {
            return new this(id, date, event, location, category);
        });
    }

    toJSON() {
        return {
            id: this.id,
            date: this.date,
            event: this.event,
            location: this.location,
            category: this.category,
        }
    }
}

class MemorableDateDAO {
    constructor(id, date, event, category) {
        this.id = id;
        this.date = date;
        this.event = event;
        this.category = category;
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('invalidate id');
        }
    }

    static _validate(memorableDate) {
        if (
            memorableDate.id === undefined ||
            memorableDate.date === undefined ||
            memorableDate.event === undefined ||
            memorableDate.category === undefined
        ) {
            throw new Error('invalidate memorable date data');
        }

        this._validateId(memorableDate.id);
    }

    static find() {
        const memorableDates = MemorableDatesRepository.read();

        return memorableDates.map(({id, date, event, category}) => {
            return new this(id, date, event, category);
        });
    }

    static findById(id) {
        this._validateId(id);

        const memorableDates = MemorableDatesRepository.read();
        const memorableDate = memorableDates.find((md) => md.id === id);

        return new this(memorableDate.id, memorableDate.date, memorableDate.event, memorableDate.category);
    }

    static insert(memorableDate) {
        this._validate(memorableDate);

        const memorableDates = MemorableDatesRepository.read();
        MemorableDatesRepository.write([...memorableDates, memorableDate]);

        return new this(memorableDate.id, memorableDate.date, memorableDate.event, memorableDate.category);
    }

    static delete(id) {
        this._validateId(id);

        const memorableDates = MemorableDatesRepository.read();
        const filteredMemorableDates = memorableDates.filter((md) => md.id !== id);

        MemorableDatesRepository.write(filteredMemorableDates);

        return filteredMemorableDates.map(({id, date, event, category}) => {
            return new this(id, date, event, category);
        });
    }

    toJSON() {
        return {
            id: this.id,
            date: this.date,
            event: this.event,
            category: this.category,
        }
    }
}

class DiplomaticAnniversaryDAO {
    constructor(id, date, country, anniversary) {
        this.id = id;
        this.date = date;
        this.country = country;
        this.anniversary = anniversary;
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('invalidate id');
        }
    }

    static _validate(diplomaticAnniversary) {
        if (
            diplomaticAnniversary.id === undefined ||
            diplomaticAnniversary.date === undefined ||
            diplomaticAnniversary.country === undefined ||
            diplomaticAnniversary.anniversary === undefined
        ) {
            throw new Error('invalidate diplomatic anniversary data');
        }

        this._validateId(diplomaticAnniversary.id);
    }

    static find() {
        const diplomaticAnniversaries = DiplomaticAnniversariesRepository.read();

        return diplomaticAnniversaries.map(({id, date, country, anniversary}) => {
            return new this(id, date, country, anniversary);
        });
    }

    static findById(id) {
        this._validateId(id);

        const diplomaticAnniversaries = DiplomaticAnniversariesRepository.read();
        const diplomaticAnniversary = diplomaticAnniversaries.find((da) => da.id === id);

        return new this(diplomaticAnniversary.id, diplomaticAnniversary.date, diplomaticAnniversary.country, diplomaticAnniversary.anniversary);
    }

    static insert(diplomaticAnniversary) {
        this._validate(diplomaticAnniversary);

        const diplomaticAnniversaries = DiplomaticAnniversariesRepository.read();
        DiplomaticAnniversariesRepository.write([...diplomaticAnniversaries, diplomaticAnniversary]);

        return new this(diplomaticAnniversary.id, diplomaticAnniversary.date, diplomaticAnniversary.country, diplomaticAnniversary.anniversary);
    }

    static delete(id) {
        this._validateId(id);

        const diplomaticAnniversaries = DiplomaticAnniversariesRepository.read();
        const filteredDiplomaticAnniversaries = diplomaticAnniversaries.filter((da) => da.id !== id);

        DiplomaticAnniversariesRepository.write(filteredDiplomaticAnniversaries);

        return filteredDiplomaticAnniversaries.map(({id, date, country, anniversary}) => {
            return new this(id, date, country, anniversary);
        });
    }

    toJSON() {
        return {
            id: this.id,
            date: this.date,
            country: this.country,
            anniversary: this.anniversary,
        }
    }
}

module.exports = {
    EventDAO,
    MemorableDateDAO,
    DiplomaticAnniversaryDAO,
}
