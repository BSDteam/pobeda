import Database from "./database.js";
import Patent from "./patent.js";
import Notifications from "./notifications.js";
import Path from "./path.js";

export default class patentRegister{
    static initWindow(){
        Path.initWindow("Новый патент", patentRegister.drawWindow);
        patentRegister.drawWindow();
    }

    static drawWindow(){
        let wrapper = document.querySelector(".mainWrapper");
        wrapper.replaceChildren();

        wrapper.innerHTML = `
            <h1>Создать новый патент</h1>
    <h2>Автор ${Database.getMyName()}</h2>
    <div class="patentFullList">
        <div class="update" id="uElement">
            <form id="uForm" onsubmit="return false">
                <div class="updateHeaderEdit">
                    <label for="uName">Название патента</label><br>

                    <input type="text" name="uName" id="uName" placeholder="" required>
                </div>
                <div class="updateBody">
                    <div class="updateDescriptionEdit">
                        <label for="uDesk">Описание патента</label><br>
                        <textarea name="uDesk" id="uDesk" required></textarea>
                        <input type="submit" value="Опубликовать" id="uSubmit">
                    </div>
                </div>
            </form>
        </div>
    </div>`;
        let publishButton = document.getElementById("uSubmit");
        let pName = document.getElementById("uName");
        let pDescription = document.getElementById("uDesk")
        let pForm = document.getElementById("uForm");

        pForm.addEventListener("submit", ()=> patentRegister.#sendForm(pName, pDescription));
    }

    static #sendForm(pName, pDescription){

        let patent = new Patent(
            pName.value,
            "Пока не смотрим на id99",
            Database.getMyName(),
            new Date().toDateString(),
            pDescription.value)
        Database.savePatentToDB(patent);
        Notifications.notifyUser("Патент зарегистрирован");
    }
}