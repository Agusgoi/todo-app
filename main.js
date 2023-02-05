function $(elementoDeHtml) {
  return document.querySelector(elementoDeHtml);
}

window.addEventListener("load", () => {
  const $form = $(".form");

  // List Columns
  const $titleColumn = $(".column-titles");
  const $statusColumn = $(".column-status");
  const $btnColumn = $(".column-btn");

  const $toDoList = $(".todolist");

  // Inputs
  const $title = $(".form-title");
  const $status = $(".form-status");

  // Errors
  const $titleError = $(".title-error");
  const $statusError = $(".status-error");
  const $formError = $(".form-error");

  // Regex
  const regExpAlpha = /^[a-zA-Z0-9-\sñáéíóúüª!:?'¡].{4,20}$/;

  const tareas = [];



//  ------------ Functions -------------  //


  // Clear Inputs

  const clearInputs = () => {
    $title.value = "";
    $status.value = "";
    $titleError.innerText = "";
    $statusError.innerText = "";
    $formError.innerText = "";
    $title.style.outline = "none";
    $status.style.outline = "none";
  };

  // Paint Tareas array in columns

  const paint = (array) => {
    $titleColumn.innerHTML = "";
    $statusColumn.innerHTML = "";
    $btnColumn.innerHTML = "";
    array.forEach((element) => {
      $titleColumn.innerHTML += `<p>${element.Titulo}</p>`;
      $statusColumn.innerHTML += `<p>${element.Estado}</p>`;
      $btnColumn.innerHTML += `<button class="btn-edit" id=${element.id}>Editar</button>
<button class="btn-delete" id=${element.id}>Eliminar</button>`;
    });
  };


  //  ------------ Inputs & Form Validation -------------  //

  // Inputs Validation
  let validationErrors = false;
 
  $title.addEventListener("blur", () => {
    if (!$title.value.trim()) {
      $titleError.innerText = "Campo obligatorio";
      $titleError.style.color = "red";
      $titleError.style.fontSize = "12px";
      validationErrors = true;
    } else if (!regExpAlpha.test($title.value)) {
      $titleError.innerText = "Requiere minimo de 5 caracteres";
      $titleError.style.color = "red";
      $titleError.style.fontSize = "12px";
      validationErrors = true;
    } else {
      $titleError.innerText = "Titulo valido";
      $titleError.style.color = "blue";
      $titleError.style.fontSize = "12px";
      validationErrors = false;
    }
  });

  $status.addEventListener("blur", () => {
    if (!$status.value.trim()) {
      $statusError.innerText = "Campo obligatorio";
      $statusError.style.color = "red";
      $statusError.style.fontSize = "12px";
      validationErrors = true;
    } else if (!regExpAlpha.test($status.value)) {
      $statusError.innerText = "Seleccion invalida";
      $statusError.style.color = "red";
      $statusError.style.fontSize = "12px";
      validationErrors = true;
    } else {
      $statusError.innerText = "Estado valido";
      $statusError.style.color = "blue";
      $statusError.style.fontSize = "12px";
      validationErrors = false;
    }
  });

  // Form Validation
  $form.addEventListener("submit", (event) => {
    event.preventDefault();

    let errors = false; 
    let elementsForm = $form.elements;

    for (let i = 0; i < elementsForm.length - 1; i++) {
      if (elementsForm[i].value == "") {
        elementsForm[i].style.outline = "auto";
        elementsForm[i].style.outlineColor = "red";
        $formError.style.color = "red";
        $formError.style.fontSize = "12px";
        $formError.innerText = "Los campos indicados son obligatorios";
        errors = true;
      } else {
        elementsForm[i].style.backgroundColor = "none";
      }
    }

    if (!errors && !validationErrors) {
      if (tareas == "") {
        tareas.push({ id: 1, Titulo: $title.value, Estado: $status.value });
        console.log(tareas);
        paint(tareas);
        clearInputs();
      } else {
        tareas.push({
          id: tareas[tareas.length - 1].id + 1,
          Titulo: $title.value,
          Estado: $status.value,
        });
        console.log(tareas);
        paint(tareas);
        clearInputs();
        //$form.submit()
      }
    }
  });

  //estos cierran la funcion window-load
});
