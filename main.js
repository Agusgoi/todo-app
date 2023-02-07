function $(elementoDeHtml) {
  return document.querySelector(elementoDeHtml);
}

window.addEventListener("load", () => {
  const $form = $(".form");
  let tareas = [];

  // List Columns
  const $dateColumn = $(".column-date");
  const $titleColumn = $(".column-titles");
  const $statusColumn = $(".column-status");
  const $btnColumn = $(".column-btn");

  const $containModal = $(".contain-modal");

  // const $toDoList = $(".todolist"); -----------eliminar?

  // Inputs
  const $title = $(".form-title");
  const $status = $(".form-status");
  const $statusFilter = $(".status-filter");
  const $statusOrder = $(".order-filter");

  // Errors
  const $titleError = $(".title-error");
  const $statusError = $(".status-error");
  const $formError = $(".form-error");

  // Regex
  const regExpAlpha = /^[a-zA-Z0-9-\sñáéíóúüª!:?'¡].{4,20}$/;

  // Date
  const date = new Date();
  const fecha = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
  const formatDate = fecha.join("/");

  // Buttons
  const $btnCloseModal = $(".close-modal");

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

  //  ------------ PAINT + Edit & Delete buttons -------------  //

  // Paint

  const paint = (array) => {
    $dateColumn.innerHTML = "";
    $titleColumn.innerHTML = "";
    $statusColumn.innerHTML = "";
    $btnColumn.innerHTML = "";
    array.forEach((element) => {
      $dateColumn.innerHTML += `<p>${formatDate}</p>`; // llamando directo a la variable funciono, pero no logre guardar la fecha en todos los objetos, solo en el primero
      $titleColumn.innerHTML += `<p>${element.Titulo}</p>`;
      $statusColumn.innerHTML += `<p>${element.Estado}</p>`;
      $btnColumn.innerHTML += `<button class="btn-edit" id=${element.id}>Editar</button>
<button class="btn-delete" id=${element.id}>Eliminar</button>`;
    });

    // Delete

    $btnDeleteTarea = document.querySelectorAll(".btn-delete");
    console.log($btnDeleteTarea);
    $btnDeleteTarea.forEach((button) => {
      button.addEventListener("click", (event) => {
        tareas = tareas.filter((tarea) => tarea.id !== Number(event.target.id));
        paint(tareas);
      });
    });

    // Edit

    /*  $btnEditTarea = document.querySelectorAll(".btn-edit")
 $btnEditTarea.forEach(button => {
     button.addEventListener("click", (event) => {
         //$modalEdit.classList.add("show-modalEdit") ---------------CREAR MODAL
         const EditToDo = tareas.find(tarea => tarea.id === Number(event.target.id))
         $statusEdit.value = EditToDo.Estado
         $titleEdit.value = EditToDo.Titulo
     })
 }) */
  };

  // Eventos MODAL

  /*   $btnCloseModal.addEventListener("click", () => {
    console.log($btnCloseModal)
    //$containModal.style.display = 'none'
})
 */

  /* 
    /* Eventos Modal
    $openModal.addEventListener("click", () => {
      $modalCreate.classList.add("show-modalCreate")
  })

  $closeModalCreate.addEventListener("click", () => {
      $modalCreate.classList.remove("show-modalCreate")
  })

  $closeModalEdit.addEventListener("click", () => {
      $modalEdit.classList.remove("show-modalEdit")
  })
 */

  // Filters

  // Filter per Status

  $statusFilter.addEventListener("input", () => {
    let toDoFiltered = [];

    if ($statusFilter.value === "Pendiente") {
      tareas.forEach((tarea) => {
        if (tarea.Estado === "Pendiente") {
          toDoFiltered.push(tarea);
          paint(toDoFiltered);
        }
      });
    } else if ($statusFilter.value === "En progreso") {
      tareas.forEach((tarea) => {
        if (tarea.Estado === "En progreso") {
          toDoFiltered.push(tarea);
          paint(toDoFiltered);
        }
      });
    } else if ($statusFilter.value === "Completo") {
      tareas.forEach((tarea) => {
        if (tarea.Estado === "Completo") {
          toDoFiltered.push(tarea);
          paint(toDoFiltered);
        }
      });
    }
  });

  // Order per Status

  $statusOrder.addEventListener("input", () => {
    let orderPerStatus = [];
    if ($statusOrder.value === "por estado") {
      tareas.forEach((tarea) => {
        if (tarea.Estado === "Pendiente") {
          orderPerStatus.push(tarea);
        }
      });
      tareas.forEach((tarea) => {
        if (tarea.Estado === "En progreso") {
          orderPerStatus.push(tarea);
        }
      });
      tareas.forEach((tarea) => {
        if (tarea.Estado === "Completo") {
          orderPerStatus.push(tarea);
        }
      });
    }
    paint(orderPerStatus);
    console.log(orderPerStatus);
  });

  //  ------------ Inputs & Form Validation -------------  //

  // Inputs Validation
  let validationErrors = false;

  $title.addEventListener("input", (event) => {
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

  $status.addEventListener("input", () => {
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

    for (let i = 0; i < elementsForm.length - 2; i++) {
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
        tareas.push({
          id: 1,
          FechaCreacion: formatDate,
          Titulo: $title.value,
          Estado: $status.value,
        }); // la key de fecha solo se guarda en el primer objeto, en los demas No, por que?
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
