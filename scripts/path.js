
// Создадим адресную строку для навигации и определим метод для работы с ней

export default class Path{
    static #path = document.createElement("div");
    static #onCloseFunctions = [];
    static #onRefreshFunctions = [];
    static {
        this.#path.classList.add("path");
    }
    static init(){
        document.querySelector(".head").after(this.#path);
    }
    static #setClickHandler(element){
        if(this.#path.lastElementChild === element){
            this.#onRefreshFunctions[this.#path.children.length-1].call();
            return;
        }
        while (this.#path.lastElementChild !== null && this.#path.lastElementChild !== element){
            this.#onCloseFunctions[this.#path.children.length-1].call();
            this.#path.lastElementChild.remove();
            this.#onRefreshFunctions.pop();
            this.#onCloseFunctions.pop();
        }

    }
    static refresh(){
        this.#onRefreshFunctions[this.#onRefreshFunctions.length-1].call();
    }
    static back(){
        this.#path.lastChild.remove();
        this.#onCloseFunctions.pop().call(this);
        this.#onRefreshFunctions.pop();
    }
    static backNoExec(){
        this.#path.lastChild.remove();
        this.#onCloseFunctions.pop();
        this.#onRefreshFunctions.pop();
    }
    static next(name, onCloseFunction, onRefreshFunction){
        if (onCloseFunction == null) {onCloseFunction = ()=>{}}
        if (onRefreshFunction == null) {onRefreshFunction = ()=>{}}
        let element = document.createElement("span");
        element.textContent = name;
        this.#path.append(element);
        this.#onCloseFunctions.push(onCloseFunction);
        this.#onRefreshFunctions.push(onRefreshFunction);
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
     * Поддиректория, отображаемая в пути навигации (строка)
     * @param onRefreshFunction
     * опциональная функция вызываемая, когда пользователь хочет обновить содержимое окна, зачастую просто дублирование
     * функции отрисовки элементов
     * Хоть в Path.next() есть место для указания onCloseFunction я пока не вижу смысла добавлять ее в аргументы, так как
     * стандартная функция подмены контента на старый пока вполне хорошо показывает себя
     */
    static initWindow(name, onRefreshFunction) {
        const wrapper = document.querySelector(".mainWrapper");
        if (wrapper == null) {
            console.log("initWindow не нашел mainWrapper на странице. Проблемка");
            return;
        }

        let oldContent = document.createElement("div"); // создаем контейнер для перемещения предыдущего содержимого туда
        oldContent.replaceChildren(...wrapper.childNodes);



        Path.next(name, ()=>{ // регистрация и создание функции отката
            wrapper.replaceChildren(...oldContent.childNodes);
        }, onRefreshFunction)



    }
}


window.addEventListener("load", ()=>Path.init());
