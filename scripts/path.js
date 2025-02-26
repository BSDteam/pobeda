
// Создадим адресную строку для навигации и определим метод для работы с ней

export default class Path{
    name;
    onCloseFunction;
    onRefreshFunction;
    isAlwaysRefresh;
    constructor(name, onCloseFunction, onRefreshFunction, isAlwaysRefresh) {
        if(onCloseFunction === undefined) {onCloseFunction = ()=>{}}
        if(onRefreshFunction === undefined) {onRefreshFunction = ()=>{}}
        if(isAlwaysRefresh === undefined) {isAlwaysRefresh = false}

        this.name = name;
        this.onCloseFunction = onCloseFunction;
        this.onRefreshFunction = onRefreshFunction;
        this.isAlwaysRefresh = isAlwaysRefresh;

    }

    static #path = document.createElement("div");
    static #pathElements = [];
    static {
        this.#path.classList.add("path");
    }
    static init(){
        document.querySelector(".head").after(this.#path);
    }
    static #setClickHandler(element){
        if(this.#path.lastElementChild === element){
            this.#pathElements[this.#path.children.length-1].onRefreshFunction.call();
            return;
        }
        while (this.#path.lastElementChild !== null && this.#path.lastElementChild !== element){
            this.#pathElements[this.#path.children.length-1].onCloseFunction.call();
            this.#path.lastElementChild.remove();
            this.#pathElements.pop();
        }
        if(this.#pathElements[this.#pathElements.length-1].isAlwaysRefresh) {
            this.#pathElements[this.#pathElements.length-1].onRefreshFunction.call();
        }

    }
    static refresh(){
        this.#pathElements[this.#pathElements.length-1].onRefreshFunction.call();
    }
    static back(){
        this.#path.lastChild.remove();
        this.#pathElements.pop().onCloseFunction.call(this);

    }
    static backNoExec(){
        this.#path.lastChild.remove();
        this.#pathElements.pop();
    }
    static next(name, onCloseFunction, onRefreshFunction, isAlwaysRefresh){
        let unit = new Path(name, onCloseFunction, onRefreshFunction, isAlwaysRefresh);
        let element = document.createElement("span");
        element.textContent = name;
        this.#path.append(element);
        this.#pathElements.push(unit);
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
     * @param isAlwaysRefresh
     * логическая переменная, если истина, то даже откат на данный экран будет вызывать функцию onRefreshFunction
     */
    static initWindow(name, onRefreshFunction, isAlwaysRefresh) {
        const wrapper = document.querySelector(".mainWrapper");
        if (wrapper == null) {
            console.log("initWindow не нашел mainWrapper на странице. Проблемка");
            return;
        }

        let oldContent = document.createElement("div"); // создаем контейнер для перемещения предыдущего содержимого туда
        oldContent.replaceChildren(...wrapper.childNodes);



        Path.next(name, ()=>{ // регистрация и создание функции отката
            wrapper.replaceChildren(...oldContent.childNodes);
        }, onRefreshFunction, isAlwaysRefresh)



    }
}


window.addEventListener("load", ()=>Path.init());
