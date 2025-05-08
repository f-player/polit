const {DBConnector} = require('../../modules/DBConnector');

class BaseRepository {
    static db = new DBConnector('stocks.json');

    static read() {
        const file = this.db.readFile();

        return JSON.parse(file);
    }

    static write(json) {
        this.db.writeFile(JSON.stringify(json, null, 2));
    }
}

class EventsRepository extends BaseRepository {
    static read() {
        const data = super.read();
        return data.events2025;
    }

    static write(events) {
        const data = super.read();
        data.events2025 = events;
        super.write(data);
    }
}

class MemorableDatesRepository extends BaseRepository {
    static read() {
        const data = super.read();
        return data.memorableDates;
    }

    static write(memorableDates) {
        const data = super.read();
        data.memorableDates = memorableDates;
        super.write(data);
    }
}

class DiplomaticAnniversariesRepository extends BaseRepository {
    static read() {
        const data = super.read();
        return data.diplomaticAnniversaries;
    }

    static write(diplomaticAnniversaries) {
        const data = super.read();
        data.diplomaticAnniversaries = diplomaticAnniversaries;
        super.write(data);
    }
}

module.exports = {
    EventsRepository,
    MemorableDatesRepository,
    DiplomaticAnniversariesRepository,
}
