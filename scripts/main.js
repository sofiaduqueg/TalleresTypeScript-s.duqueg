import { Student } from './student.js';
import { dataCourses } from './dataCourses.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var inputSearchBox_inferior = document.getElementById("search-box-inferior");
var inputSearchBox_superior = document.getElementById("search-box-superior");
var btnfilterByCreditNumber = document.getElementById("button-filterByCreditNumber");
var totalCreditElm = document.getElementById("total-credits");
var name = document.getElementById("name");
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderCoursesInTable(dataCourses);
renderStudentInformation(new Student());
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInformation(student) {
    console.log('Desplegando estudiantes');
    var trElementNombre = document.createElement("tr");
    trElementNombre.innerHTML = "<td>Nombre</td>\n                              <td>" + student.name + "</td>";
    var trElementCodigo = document.createElement("tr");
    trElementCodigo.innerHTML = "<td>C\u00F3digo</td>\n                              <td>" + student.code + "</td>";
    var trElementCedula = document.createElement("tr");
    trElementCedula.innerHTML = "<td>C\u00E9dula</td>\n                                <td>" + student.cardId + "</td>";
    var trElementEdad = document.createElement("tr");
    trElementEdad.innerHTML = "<td>Edad</td>\n                              <td>" + student.age + "</td>";
    var trElementDireccion = document.createElement("tr");
    trElementDireccion.innerHTML = "<td>Direcci\u00F3n</td>\n                              <td>" + student.address + "</td>";
    var trElementTelefono = document.createElement("tr");
    trElementTelefono.innerHTML = "<td>Tel\u00E9fono</td>\n                                <td>" + student.phone + "</td>";
    name.appendChild(trElementNombre);
    name.appendChild(trElementCodigo);
    name.appendChild(trElementCedula);
    name.appendChild(trElementEdad);
    name.appendChild(trElementDireccion);
    name.appendChild(trElementTelefono);
    ;
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    var text_inferior = inputSearchBox_inferior.value;
    text_inferior = (text_inferior == null) ? '' : text_inferior;
    var text_inferior_n = +text_inferior;
    var text_superior = inputSearchBox_superior.value;
    text_superior = (text_superior == null) ? '' : text_superior;
    var text_superior_n = +text_superior;
    clearCoursesInTable();
    var coursesFiltered = searchByNumCredits(text_inferior_n, text_superior_n, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchByNumCredits(lim_inferior, lim_superior, courses) {
    var coursesFiltered = [];
    if (lim_inferior != 0 && lim_superior != 0) {
        for (var _i = 0, courses_1 = courses; _i < courses_1.length; _i++) {
            var course = courses_1[_i];
            if (course.credits >= lim_inferior && course.credits <= lim_superior) {
                coursesFiltered.push(course);
            }
        }
    }
    else {
        coursesFiltered = dataCourses;
    }
    return coursesFiltered;
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
