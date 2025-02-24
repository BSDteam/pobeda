
export default class PatentUpdate {
    name;
    id;
    originID;
    author;
    date;
    description;

    constructor(name, id, author, date, description) {
        this.name = name;
        this.id = id;
        this.author = author;
        this.date = date;
        this.description = description;
    }


}