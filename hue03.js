"use strict";
// ####################################################
// 1. Grundlegende Typen und Interfaces
// ####################################################
Object.defineProperty(exports, "__esModule", { value: true });
// ####################################################
// 2. Klassen, Vererbung und Modifier
// ####################################################
class BaseUser {
    id;
    _email;
    firstName;
    lastName;
    middleName;
    constructor(id, _email, 
    // aus Person interface
    firstName, lastName, middleName) {
        this.id = id;
        this._email = _email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
    }
    get fullName() {
        return [this.firstName, this.middleName, this.lastName]
            .filter(Boolean) // enfernt falsey Sachen wie z.B. null, false, ... --> vermeidet das wir "["Sonja", undefined, "Spitzl"]" bekommen
            .join(" ");
    }
}
class Student extends BaseUser {
    matrikelNr;
    status;
    constructor(
    // aus Person bzw BaseUser
    id, email, firstName, lastName, 
    // neue Eigenschaften
    matrikelNr, status, 
    // optional
    middleName) {
        super(id, email, firstName, lastName, middleName);
        this.matrikelNr = matrikelNr;
        this.status = status;
    }
}
function printCourseDetails(course) {
    console.log(`Titel: ${course.title}`);
    // Type Narrowing mit einer if-else, basierend auf der Eigenschaft 'kind'
    if (course.kind === "Lecture") {
        // hier erkennt TypeScript automatisch: course ist Lecture
        console.log(`Credits: ${course.credits}`);
    }
    else if (course.kind === "Seminar") {
        // hier erkennt TS automatisch: course ist Seminar
        console.log(`Topic: ${course.topic}`);
    }
}
function findItemById(items, id) {
    for (const item of items) {
        if (item.id === id)
            return item;
    }
    return undefined;
}
// Test:
const testStudents = [
    new Student("s1", "a@b.c", "Max", "Mustermann", "12345", "Aktiv"),
    new Student("s2", "d@e.f", "Erika", "Musterfrau", "67890", "Aktiv")
];
const foundStudent = findItemById(testStudents, "s2");
console.log(foundStudent?.fullName); // Sollte "Erika Musterfrau" ausgeben
// ####################################################
// 5. Generische Klasse
// ####################################################
class DataRepository {
    _items = [];
    addItem(item) {
        this._items.push(item);
    }
    getAll() {
        return this._items;
    }
}
/* Test -> aus Angabe

// Repositories erstellen
const studentRepo = new DataRepository<Student>();
studentRepo.addItem(new Student("s3", "g@h.i", "Peter", "Pan", "11111", "Beurlaubt"));

const courseRepo = new DataRepository<Course>();
courseRepo.addItem({ kind: "Lecture", title: "Web Frontend", credits: 5 });

// Ergebnisse prüfen
console.log(studentRepo.getAll());
console.log(courseRepo.getAll());

*/
// ####################################################
// 6. Integration und Anwendung (Der Praxistest)
// ####################################################
// ################## Repositories instanziieren ##################
const students = new DataRepository();
const courses = new DataRepository();
// ################## Daten erstellen und hinzufügen ##################
// 3 Studierende anlegen
const s1 = new Student("s10", "a@uni.at", "Lena", "Lang", "10001", "Aktiv"); // ohne middleName, UserID ist string
const s2 = new Student(2002, "b@uni.at", "Mark", "Muster", "10002", "Beurlaubt", "Fabian"); // mit middleName, UserID ist number
const s3 = new Student("s30", "c@uni.at", "Nora", "Neumann", "10003", "Exmatrikuliert"); // ohne middleName, anderer Status
// hinzufügen der Studenten
students.addItem(s1);
students.addItem(s2);
students.addItem(s3);
// 2 Kurse anlegen
const Lecture01 = {
    kind: "Lecture",
    title: "Web-Frontend Development",
    credits: 5
};
const Seminar01 = {
    kind: "Seminar",
    title: "Wirtschafts- und KI-Ethik",
    topic: "Interviews"
};
// Kurse hinzufügen
courses.addItem(Lecture01);
courses.addItem(Seminar01);
// ################## Klassen-Methoden und Getter testen ##################
console.log("Alle Studierenden: ");
students.getAll().forEach(stu => {
    console.log(stu.fullName);
});
// ################## Narrowing-Funktion testen ##################
const allCourses = courses.getAll(); // Konstante anlegen
console.log("Kursdetails:");
allCourses.forEach((course) => {
    // für jeden Kurs Details ausgeben
    printCourseDetails(course);
});
// ################## Generische Suchfunktion testen ##################
const allStudents = students.getAll();
const foundA = findItemById(allStudents, "s10"); // existiert
console.log("Gefunden (existierend):", foundA?.fullName);
const foundB = findItemById(allStudents, "s99"); // existiert nicht
console.log("Gefunden (nicht-existierend):", foundB); // -> undefined
//# sourceMappingURL=hue03.js.map