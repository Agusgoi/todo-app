function $(elementoDeHtml) {
    return document.querySelector(elementoDeHtml)
}

window.addEventListener("load", () => {

    const $form = $(".form");
    const $title =  $(".form-title");  


    $form.addEventListener ('submit', (e) => {
        e.preventDefault()


    let errors = false
    
        // Validacion titulo
        if($title.value.length <= 5) { // Si entra en el if hay un error

            
           // $titleErrors.innerText = "Necesito mas de 5 caracteres"
            //$titleErrors.style.color = "red";
            //$titleErrors.style.fontSize = "10px";
            errors = true
        } else {
            $titleErrors.innerText = ""
        }


        console.log("Errors esta en dspues de validar titulo", errors)
        console.log($state.value)

        if(errors) {
            /* no hagas nada */
        // Validacion estado 
        if($state.value == "") { // Si entra en el if hay un error en estado
            $stateErrors.innerText = "No seleccionaste ningun estado"
            $stateErrors.style.color = "red";
            $stateErrors.style.fontSize = "10px";
            errors = true
        } else {
            /* Ahora si guardalo o submiteo */
            $stateErrors.innerText = ""
        }
        console.log("Errors esta en dspues de validar estado", errors)
        // primer prueba error = true


        // errors = false si no hay errores
        // errors = true, por que si hay errores

        if(errors) {
            console.log("AUN TENEMOS ERRORES")
        }
    })







    
    })








    //estos cierran la funcion window-load
})