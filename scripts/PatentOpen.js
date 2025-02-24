


export default class PatentOpen{


}
function buttonMentality(buttonElement){
    if(!buttonElement.classList.contains("buttonForClose")){
        buttonElement.classList.add("buttonForClose");
    } else {
        buttonElement.classList.remove("buttonForClose") ;
    }
}
function initTest(){
    const array = document.getElementsByClassName("newUpdateButton");
    for (let i = 0; i<array.length; i++){
        array[i].addEventListener("click", ()=>buttonMentality(array[i]))
    }
}
initTest();