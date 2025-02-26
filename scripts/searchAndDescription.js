//import Patent from "./patent.js";
//import Path from "./path.js";
import Database from "./database.js";
import PatentOpen from "./PatentOpen.js";
//import Notifications from "./notifications.js";
import patentRegister from "./patentRegister.js";
import Path from "./path.js";




function createOnClickID(element, id) {
    return ()=>PatentOpen.initWindow(id);
}


// document.querySelectorAll(".patentHeader").forEach(
//     function (element, number, ignored) {
//         element.addEventListener("click", createOnClickID(element));
//     }
// ); код из начала создания
// () => {
//     let patent = new Patent("Гойда", 123, "Охлобыстин",
//         "2.1.2020", "Священная война")
//         .generateElement(createOnClickID);
//     document.querySelector(".patentsList").prepend(patent);
//     Path.next("Гойда", () => {
//         Notifications.notifyUser("Гойда назад, перемога перемога");
//         patent.remove();
//     }, ()=>Notifications.notifyUser("Нация спасать!!!!!"))
// } древний функционал
function initCreatePatentButton() {
    document.querySelectorAll(".create").forEach((elem) => {
        elem.addEventListener("click", patentRegister.initWindow);
    })
}

function DisplayRecentPatents(){
    let patentListElement = document.querySelector(".patentsList")
    if (patentListElement === null) {
        console.log("DisplayRecentPatents не нашел patentsList на странице, я не хочу добавлять проверки, иди чини")
        return;
    }
    patentListElement.replaceChildren();
    let queryResult = Database.fetchPatentsList();
    queryResult.forEach((patent)=>patentListElement.prepend(patent.generateElement(createOnClickID)));

}
window.addEventListener("load", ()=>{
    DisplayRecentPatents();
    initCreatePatentButton();
    Path.next("Начало", ()=>{}, ()=>DisplayRecentPatents());
})
