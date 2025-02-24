
// Создадим адресную строку для навигации и определим метод для работы с ней

export default class Path{
    static #path = document.createElement("div");
    static #onCloseFunctions = [];
    static {
        this.#path.classList.add("path");
        Path.next("Начало", ()=>{});
    }
    static init(){
        document.querySelector(".head").after(this.#path);
    }
    static #setClickHandler(element){
        while (this.#path.lastElementChild !== null && this.#path.lastElementChild !== element){
            this.#onCloseFunctions[this.#path.children.length-1].call();
            this.#path.lastElementChild.remove();
            this.#onCloseFunctions.pop();
        }

    }
    static back(){
        this.#path.lastChild.remove();
        this.#onCloseFunctions.pop().call(this);
    }
    static backNoExec(){
        this.#path.lastChild.remove();
        this.#onCloseFunctions.pop();
    }
    static next(name, onCloseFunction){
        let element = document.createElement("span");
        element.textContent = name;
        this.#path.append(element);
        this.#onCloseFunctions.push(onCloseFunction);
        element.addEventListener("click", ()=>this.#setClickHandler(element))
    }

    static getLastName(){
        return this.#path.lastChild.textContent;
    }

    static getFullPath(){
        let array = [];
        for (let i = 0; i< this.#path.children.length;i++) array[i] = this.#path.children.item(i);
        return array;
    }

    /**
     * Функция создает новое окно.
     * Технически, оно подменяет mainWrapper на чистый, при этом сохранив предыдущее состояние с возможностью восстановить,
     * щелкнув Path.back или по строке навигации
     * @param name
     */
    static initWindow(name){
        const wrapper = document.querySelector(".mainWrapper");
        if (wrapper == null) { console.log("initWindow не нашел mainWrapper на странице. Проблемка"); return;}

        let oldContent = document.createElement("div"); // создаем контейнер для перемещения предыдущего содержимого туда
        oldContent.replaceChildren(...wrapper.childNodes);
        console.log(`Сначала ${oldContent.childNodes.length} элементов`)

        let newContent = document.createElement("div"); // новое чтиво
        newContent.textContent = "success, now press back";

        Path.next(name, ()=>{ // регистрация и создание функции отката
            wrapper.replaceChildren(...oldContent.childNodes);
        })
        wrapper.replaceChildren(newContent);


    }
}


window.addEventListener("load", ()=>Path.init());
