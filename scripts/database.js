import Patent from "./patent.js";
import PatentUpdate from "./patentUpdate.js";

export default class Database{
    static #DummyDBPatents = [
        new Patent("Система управления умным домом", "001", "Иван Иванов", "2023-01-15",
            "Патент на систему, позволяющую управлять устройствами умного дома через мобильное приложение."),
        new Patent("Метод лечения диабета 2 типа", "002", "Мария Петрова", "2023-02-20",
            "Патент на новый метод лечения диабета 2 типа с использованием натуральных экстрактов."),
        new Patent("Экологически чистый способ утилизации пластиковых отходов", "003", "Алексей Смирнов",
            "2023-03-10", "Патент на метод переработки пластиковых отходов с минимальным воздействием на окружающую среду.")
    ];
    static #DummyDBPatentsUpdates = [
        new PatentUpdate("Обновление системы управления умным домом", "001-1", "001", "Иван Иванов",
            "2023-01-20", "Добавлены новые функции для интеграции с устройствами Amazon Alexa и Google Home."),
        new PatentUpdate("Обновление метода лечения диабета 2 типа", "002-1", "002", "Мария Петрова",
            "2023-02-25", "Уточнены дозировки и добавлены новые компоненты для повышения эффективности лечения."),
        new PatentUpdate("Обновление метода утилизации пластиковых отходов", "003-1", "003", "Алексей Смирнов",
            "2023-03-15", "Оптимизирован процесс переработки для увеличения выхода готовой продукции.")
    ];
    // Чистейшая нейросеть сверху)))

    static fetchPatentsList(){
        let patentsArray = [];
        // Вот тут должен быть нормальный сетевой код, но тут ничего нету, поэтому стряпаем заглушки
        this.#DummyDBPatents.forEach((entry)=>patentsArray.push(entry));
        return patentsArray;
    }
    static fetchPatentFullByID(id){
        return this.#DummyDBPatents.find((patent)=>patent.id===id)
    }

    static savePatentToDB(patent){
        if(patent instanceof Patent)
            this.#DummyDBPatents.push(patent);
    }

    static fetchPatentUpdatesByPatentID(id){
        return this.#DummyDBPatentsUpdates.filter((patentUpdate)=>patentUpdate.originID===id);
    }

    static savePatentUpdate(patentUpdate){
        this.#DummyDBPatentsUpdates.push(patentUpdate);
    }
}