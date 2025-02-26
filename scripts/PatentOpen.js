import Database from "./database.js";
import PatentUpdate from "./patentUpdate.js";
import Path from "./path.js";

export default class PatentOpen {
    static initWindow(patentID){
        let patent = Database.fetchPatentFullByID(patentID); // Читаем базу
        let updates = Database.fetchPatentUpdatesByPatentID(patentID);

        Path.initWindow("Просмотр Патента#"+patentID);
        let wrapper = document.querySelector(".mainWrapper"); // ставим шаблон
        wrapper.innerHTML=`
        <h1>Описание патента</h1>
    <div class="patentFullList">
    </div>`;
        let list = document.querySelector(".patentFullList"); // начинаем заполнять
        list.append(patent.generateElement());
        updates.forEach((update)=>list.append(update.generateElement()));


        // если есть доступ на редактирование, то создаем интерфейс
        if(patent.author === Database.getMyName()){
            list.innerHTML+= `
            <div class="update updateHidden updateHiding" id="uElement">
            <form id="uForm" onsubmit="return false">
                <div class="updateHeaderEdit">
                    <div>Добавить дополнение к патенту</div>
                    <label for="uName">Заголовок дополнения</label><br>

                    <input type="text" name="uName" id="uName" placeholder="" required>
                </div>
                <div class="updateBody">
                    <div class="updateDescriptionEdit">
                        <label for="uDesk">Описание дополнения</label><br>
                        <textarea name="uDesk" id="uDesk" required></textarea>
                        <input type="submit" value="Опубликовать" id="uSubmit">
                    </div>
                </div>

            </form>

        </div>
        <button class="newUpdateButton">+</button>`;
            let button = document.querySelector(".newUpdateButton");
            let editorHandler = new PatentUpdateElement(patentID);
            button.addEventListener("click", () => PatentUpdateElement.buttonMentality(button, editorHandler))
        }
    }

}



// function initTest() {
//     let editorHandler = new PatentUpdateElement("23425")
//     const array = document.getElementsByClassName("newUpdateButton");
//     for (let i = 0; i < array.length; i++) {
//         array[i].addEventListener("click", () => PatentUpdateElement.buttonMentality(array[i], editorHandler))
//     }
//
//
// }

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
    static buttonMentality(buttonElement, editorHandler) {
        if (!buttonElement.classList.contains("buttonForClose")) {
            buttonElement.classList.add("buttonForClose");
            editorHandler.show();
        } else {
            buttonElement.classList.remove("buttonForClose");
            editorHandler.hide();
        }
    }
    SendForm() {
        let pUpdate = new PatentUpdate(
            this.nameField.value,
            "0-004ОшибкаАрхитектуры",
            this.patentID,
            Database.getMyName(),
            new Date().toLocaleDateString(),
            this.DescriptionField.value
        );
        Database.savePatentUpdate(pUpdate);

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

// initTest();

