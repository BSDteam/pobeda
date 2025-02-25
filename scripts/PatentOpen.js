import Database from "./database.js";
import PatentUpdate from "./patentUpdate.js";


export default class PatentOpen {


}

function buttonMentality(buttonElement, editorHandler) {
    if (!buttonElement.classList.contains("buttonForClose")) {
        buttonElement.classList.add("buttonForClose");
        editorHandler.show();
    } else {
        buttonElement.classList.remove("buttonForClose");
        editorHandler.hide();
    }
}

function initTest() {
    let editorHandler = new PatentUpdateElement("23425")
    const array = document.getElementsByClassName("newUpdateButton");
    for (let i = 0; i < array.length; i++) {
        array[i].addEventListener("click", () => buttonMentality(array[i], editorHandler))
    }


}

class PatentUpdateElement {
    patentID;
    nameField;
    DescriptionField;
    submitField;
    formElement;
    mainElement;

    constructor(patentID) {
        this.patentID = patentID;
        this.nameField = document.getElementById("uName");
        this.DescriptionField = document.getElementById("uDesk");
        this.submitField = document.getElementById("uSubmit");
        this.formElement = document.getElementById("uForm");
        this.formElement.addEventListener("submit", () => this.SendForm())
        this.mainElement = document.getElementById("uElement");
    }

    SendForm() {
        let pUpdate = new PatentUpdate(
            this.nameField.value,
            "0-004ОшибкаАрхитектуры",
            this.patentID,
            "Снова ошибка, тк автор не менятья должен",
            new Date().toLocaleDateString(),
            this.DescriptionField.value
        );
        Database.savePatentUpdate(pUpdate);
        alert(`Отправлен ${pUpdate}`)
    }

    hide() {
        this.mainElement.classList.add("updateHiding")
        setTimeout(() => this.mainElement.classList.add("updateHidden")
            , 500)
    }

    show() {
        this.mainElement.classList.remove("updateHidden")
        setTimeout(() => this.mainElement.classList.remove("updateHiding")
            , 500)
    }
}

initTest();

