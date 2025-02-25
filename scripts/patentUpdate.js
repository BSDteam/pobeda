
export default class PatentUpdate {
    name;
    id;
    originID;
    author;
    date;
    description;

    constructor(name, id, originID, author, date, description) {
        this.name = name;
        this.id = id;
        this.originID = originID;
        this.author = author;
        this.date = date;
        this.description = description;
    }


}