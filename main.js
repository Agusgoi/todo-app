function $(elementoDeHtml) {
  return document.querySelector(elementoDeHtml);
}

window.addEventListener("load", () => {
  const $body = $("body");
  const $form = $(".form");
  const $formEdit = $(".form-edit");
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
  const $editStatus = $(".edit-status");
  const $editTitle = $(".edit-title");

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
  const $btnClearFilters = $(".clear-filters");
  const $btnMode = $(".btn-mode");

  //  ------------------------ Functions ------------------------  //

  //  ------------ Dark Mode -------------  //

  $btnMode.addEventListener("click", (event) => {
    $body.classList.toggle("darkmode");
    if ($body.classList.contains("darkmode")) {
      $btnMode.innerText = "Modo Claro";
    } else {
      $btnMode.innerText = "Modo Oscuro";
    }
  });

  //  ------------ PAINT + CLEAR + Edit & Delete buttons -------------  //

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

  // Paint

  const paint = (array) => {
    $dateColumn.innerHTML = `<h3>Fecha</h3>`;
    $titleColumn.innerHTML = `<h3>Titulo</h3>`;
    $statusColumn.innerHTML = `<h3>Estado</h3>`;
    $btnColumn.innerHTML = `<h3>Acciones</h3>`;
    array.forEach((element) => {
      $dateColumn.innerHTML += `<p class="list-text">${formatDate}</p>`; // llamando directo a la variable funciono, pero no logre guardar la fecha en todos los objetos, solo en el primero
      $titleColumn.innerHTML += `<p class="list-text">${element.Titulo}</p>`;

      if (element.Estado === "Pendiente") {
        $statusColumn.innerHTML += `<p class="pending-status">${element.Estado}</p>`;
      } else if (element.Estado === "En progreso") {
        $statusColumn.innerHTML += `<p class="inprogress-status">${element.Estado}</p>`;
      } else if (element.Estado === "Completo") {
        $statusColumn.innerHTML += `<p class="complete-status">${element.Estado}</p>`;
      }

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

    $btnEditTarea = document.querySelectorAll(".btn-edit");
    $btnEditTarea.forEach((button) => {
      button.addEventListener("click", (event) => {
        $containModal.style.display = "flex";
        const EditToDo = tareas.find(tarea => tarea.id === Number(event.target.id))
        $editStatus.value = EditToDo.Estado
        $editTitle.value = EditToDo.Titulo

      });
    });
  };


  //  ------------ MODAL -------------  //

// Events MODAL Edit

    $btnCloseModal.addEventListener("click", () => {
      $containModal.style.display = 'none'
  })

// MODAL Submit

  $formEdit.addEventListener("submit", (event) => {
    event.preventDefault();

    $containModal.style.display = 'none'

  })





  //  ------------ FILTERS -------------  //

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
  });

  // Order per Date

  $statusOrder.addEventListener("input", () => {
    let reverseOrder = [...tareas];

    if ($statusOrder.value === "por fecha") {
      reverseOrder.reverse();
    }

    paint(reverseOrder);
  });

  // Clear Filters

  $btnClearFilters.addEventListener("click", () => {
    paint(tareas);
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

  $status.addEventListener("input", (e) => {
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
    console.log(errors);
    console.log(validationErrors);
    if (!errors && !validationErrors) {
      if (tareas == "") {
        tareas.push({
          id: 1,
          FechaCreacion: formatDate,
          Titulo: $title.value,
          Estado: $status.value,
        }); 
        console.log(tareas);
        paint(tareas);
        clearInputs();
      } else {
        tareas.push({
          id: tareas[tareas.length - 1].id + 1,
          FechaCreacion: formatDate,
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
