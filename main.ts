import { Course } from './course.js';
import { Student } from './student.js';

import { dataCourses } from './dataCourses.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBox_inferior: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-inferior")!;
const inputSearchBox_superior: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-superior")!;
const btnfilterByCreditNumber: HTMLElement = document.getElementById("button-filterByCreditNumber")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const name: HTMLElement = document.getElementById("name")!;


btnfilterByName.onclick = () => applyFilterByName();



renderCoursesInTable(dataCourses);
renderStudentInformation(new Student());

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInformation(student: Student): void {
  console.log('Desplegando estudiantes');
    let trElementNombre = document.createElement("tr");
    trElementNombre.innerHTML = `<td>Nombre</td>
                              <td>${student.name}</td>`;
    let trElementCodigo = document.createElement("tr");
    trElementCodigo.innerHTML = `<td>Código</td>
                              <td>${student.code}</td>`;
    let trElementCedula = document.createElement("tr");
    trElementCedula.innerHTML = `<td>Cédula</td>
                                <td>${student.cardId}</td>`;
    let trElementEdad = document.createElement("tr");
    trElementEdad.innerHTML = `<td>Edad</td>
                              <td>${student.age}</td>`;
    let trElementDireccion = document.createElement("tr");
    trElementDireccion.innerHTML = `<td>Dirección</td>
                              <td>${student.address}</td>`;
    let trElementTelefono = document.createElement("tr");
    trElementTelefono.innerHTML = `<td>Teléfono</td>
                                <td>${student.phone}</td>`;
    name.appendChild(trElementNombre);
    name.appendChild(trElementCodigo);
    name.appendChild(trElementCedula);
    name.appendChild(trElementEdad);
    name.appendChild(trElementDireccion);
    name.appendChild(trElementTelefono);
  ;
}
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits(){
  let text_inferior = inputSearchBox_inferior.value;
  text_inferior = (text_inferior == null) ? '' : text_inferior;
  let text_inferior_n: number = +text_inferior;

  let text_superior = inputSearchBox_superior.value;
  text_superior = (text_superior == null) ? '' : text_superior;
  let text_superior_n: number = +text_superior;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchByNumCredits(text_inferior_n, text_superior_n, dataCourses);
  renderCoursesInTable(coursesFiltered);

}

function searchByNumCredits(lim_inferior: number, lim_superior: number, courses: Course[]){
  let coursesFiltered: Course[] = [];
  if (lim_inferior != 0 && lim_superior != 0)
  {
      for(let course of courses)
      {
          if(course.credits >= lim_inferior && course.credits <= lim_superior)
          {
              coursesFiltered.push(course);
          }
      }
  }
  else
  {
      coursesFiltered = dataCourses;
  }
  return coursesFiltered;
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}