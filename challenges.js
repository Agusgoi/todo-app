
const tareas = [
    {
        Titulo: "Practicar JS",
        Estado: "En progreso"
    },
    {
        Titulo: "TP Ahorradas",
        Estado: "En progreso"
    },
    {
        Titulo: "TP Generador de Memes",
        Estado: "Terminado"
    },
    {
        Titulo: "Retomar Memes Programa",
        Estado: "Pendiente"
    }
]



// Desafio 3 - OK (teniendo en cuenta mayus/minus)

const filtrarTareas = (estado) => {
    
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].Estado.toLowerCase() === estado.toLowerCase() ) {
           console.log ("existe estado")
            return tareas.filter (tarea => tarea.Estado.toLowerCase()  === estado.toLowerCase())
        }  
    }
    console.log("no coincide estado")
    return tareas
}

//console.log (filtrarTareas("pendIEnte"))
//console.log (filtrarTareas("Cualquiera")) 



// Desafio 2 y 4 - OK (teniendo en cuenta mayus/minus)

const nuevaTarea = (titulo, estado) => {
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].Titulo.toLowerCase() === titulo.toLowerCase() ) {
            return "ya existe"
        }  
    }
     
//console.log('agregando') 
    tareas.push ({Titulo: titulo, Estado: estado})
    return tareas 
}

//nuevaTarea ("tp Ahorradas", "Pendiente")
//nuevaTarea ("PractIcar XX", "Pendiente")



//  Desafio 5 - OK (teniendo en cuenta mayus/minus)

const existeTarea = (str) => {
    let tareasExistentes = [];
    tareas.forEach(tarea => {
        if (tarea.Titulo.toLowerCase().includes(str.toLowerCase())){
            tareasExistentes.push (tarea)  
            //console.log (tareasExistentes)
        }
    });
}

//existeTarea ("Js")
//existeTarea ("MeMEs")


// Extra - funcion que devuelva las tareas ordenadas segun su estado
let tareasOrdenadas = []  
const ordenarTareas = () => {
  
    tareas.forEach(tarea => {
        if (tarea.Estado.toLowerCase().includes('pendiente'.toLowerCase())){
            tareasOrdenadas =+ tareasOrdenadas.push (tarea)  
            console.log (tareasOrdenadas)
        }
    })
} 

ordenarTareas()

//return tareas.filter (tarea => tarea.Estado.toLowerCase()  === estado.toLowerCase())
