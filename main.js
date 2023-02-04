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


    const tareas = []; // es necesari0o tener este array aca???

    console.log (tareas)
    
    $title.addEventListener("blur", () => {
        console.log ($title.value)
    })










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

     // Expresiones regulares
     const regExpAlpha = /^[a-zA-Z0-9-\sñáéíóúüª!:?'¡].{4,20}$/

    // Validacion Inputs 
    $title.addEventListener("blur", () => {

        if(!$title.value.trim()) {
            $titleError.innerText = "Campo obligatorio"
            $titleError.style.color = 'red'
            $titleError.style.fontSize = '12px'
            validationErrors = true
        } else if (!regExpAlpha.test($title.value)) { 
            $titleError.innerText = "Requiere minimo de 5 caracteres"
            $titleError.style.color = 'red'
            $titleError.style.fontSize = '12px'
            validationErrors = true
        } else {
            $titleError.innerText = "Titulo valido"
            $titleError.style.color = 'blue'
            $titleError.style.fontSize = '12px'
            validationErrors = false
        }
    })

    console.log ($title.value)

    $status.addEventListener("blur", () => {
        if(!$status.value.trim()) {
            $statusError.innerText = "Campo obligatorio"
            $statusError.style.color = 'red'
            $statusError.style.fontSize = '12px'
            validationErrors = true
        } else if (!regExpAlpha.test($state.value)) {
            $statusError.innerText = "Seleccion invalida"
            $statusError.style.color = 'red'
            $statusError.style.fontSize = '12px'
            validationErrors = true
        } else {
            $statusError.innerText = "Estado valido"
            $statusError.style.color = 'blue'
            $statusError.style.fontSize = '12px'
            validationErrors = false
        }
    })
    console.log ($title.value)


    $form.addEventListener("submit", (event) => {
        event.preventDefault()

        let errors = false  //Formulario

        let elementsForm = $form.elements;
        console.log(elementsForm)
       
        for (let i = 0; i < elementsForm.length - 1; i++) {
            if (elementsForm[i].value == "") {
                elementsForm[i].style.outline = 'auto'
                elementsForm[i].style.outlineColor = 'red'
                $formError.style.color = 'red'
                $formError.style.fontSize = '12px'
                $formError.innerText = "Los campos indicados son obligatorios"
                errors = true
            } else {
                elementsForm[i].style.backgroundColor = 'none'
            }
        }
        
        if(!errors && !validationErrors) {
            tareas.push({Titulo: $title.value, Estado: $estado.value})
            $form.submit()
            //paint()
        }
    })


    
    
    








    //estos cierran la funcion window-load


})




