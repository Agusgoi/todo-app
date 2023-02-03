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







    
    








    //estos cierran la funcion window-load
})