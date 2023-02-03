function $(elementoDeHtml) {
    return document.querySelector(elementoDeHtml)
}

window.addEventListener("load", () => {

    const $form = $(".form");

    // inputs
    const $title =  $(".form-title");  
    const $status =  $(".form-status");  

  
    // errors
    const $titleError =  $(".title-error");  
    const $statusError =  $(".status-error");
    const $formError =  $(".form-error");  



    //  ------------ OPCION 1 -------------  //
/* 
    $form.addEventListener ('submit', (e) => {
        e.preventDefault()


    let errors = false
    
        // Validacion titulo
        if($title.value.length <= 5) { // Si entra en el if hay un error
            $titleError.innerText = "Necesito mas de 5 caracteres"
            $titleError.style.color = "red";
            $titleError.style.fontSize = "10px";
            errors = true
        } else {
            $titleError.innerText = ""
        }


        // Validacion estado 
        if($status.value == "") { // Si entra en el if hay un error en estado
            $statusError.innerText = "No seleccionaste ningun estado"
            $statusError.style.color = "red";
            $statusError.style.fontSize = "10px";
            errors = true
        } else {
            $statusError.innerText = ""
        }
      
        if(errors) {
            console.log("AUN TENEMOS ERRORES")
        }
    })
 */


    //  ------------ OPCION 2 -------------  //

    let validationErrors = false //Inputs

     /* Expresiones regulares */
     const regExpAlpha = /^[a-zA-Z0-9-\sñáéíóúüª!:?'¡].{5,20}$/

    /* Validacion Inputs */
    $title.addEventListener("blur", () => {

        /* .trim() pregunto si esta vacio */
        if(!$title.value.trim()) {
            $titleError.innerText = "El titulo es requerido"
            $titleError.style.color = '#ff0000'
            validationErrors = true
        } else if (!regExpAlpha.test($title.value)) { // testeo con la expresion regular
            $titleError.innerText = "El titulo no es valido, mas de 5 caracteres"
            $titleError.style.color = '#ff0000'
            validationErrors = true
        } else {
            $titleError.innerText = "El titulo es valido"
            $titleError.style.color = 'blue'
            validationErrors = false
        }
    })

    $status.addEventListener("blur", () => {
        if(!$status.value.trim()) {
            $statusError.innerText = "El estado es requerido"
            $statusError.style.color = '#ff0000'
            validationErrors = true
        } else if (!regExpAlpha.test($state.value)) {
            $statusError.innerText = "El estado no es valido"
            $statusError.style.color = '#ff0000'
            validationErrors = true
        } else {
            $statusError.innerText = "El estado es valido"
            $statusError.style.color = 'blue'
            validationErrors = false
        }
    })
    console.log ($title.target)
    $form.addEventListener("submit", (event) => {
        event.preventDefault()

        let errors = false  //Formulario

        /* Accedo a todos los inputs y buttons del form */
        let elementsForm = $form.elements;
        
       
        for (let i = 1; i < elementsForm.length - 1; i++) {
            if (elementsForm[i].value == "") {
                
                elementsForm[i].style.backgroundColor = 'red'
                $formError.style.color = 'red'
                $formError.innerText = "Los campos indicados son obligatorios"
                errors = true
            } else {
                elementsForm[i].style.backgroundColor = 'none'
            }
        }
        
        /* Pregunto si hay errores en los inputs o el form en general */
        if(!errors && !validationErrors) {
            tareas.push({Titulo: $title.value, Estado: $estado.value})
            $form.submit()
            paint()
        }
    })


    
    
    








    //estos cierran la funcion window-load


})




"hola".trim()