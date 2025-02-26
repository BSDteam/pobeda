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

    generateElement() {
        let element = document.createElement("div");
        element.classList.add("update")
        element.id = this.id
        element.innerHTML = `
                
            <div class="updateHeader">
                <span class="updateId">#${this.id}</span>
                <span class="updateDate">
                    ${this.date}
                </span>
                <div class="updateName">
                    ${this.name}
                </div>
            </div>
            <div class="updateBody">
                <div class="updateDescription">
                    ${this.description}
                </div>
            </div>`;
        return element;
    }
}