const inputNombre = document.querySelector('#nombre');
const inputPoder = document.querySelector('#poder');
const inputFoto = document.querySelector('#foto');
const inputEdad = document.querySelector('#edad');
const btnCrear = document.querySelector('#btnCrear');
const contenedorLista = document.querySelector('#lista_unicorn');

function crearUnicorn(){
    const inputNombreValor = inputNombre.value;
    const inputPoderValor = inputPoder.value;
    const inputFotoValor = inputFoto.value;
    const inputEdadValor = inputEdad.value;

    const unicorn = {
        name: inputNombreValor,
        power: inputPoderValor,
        image: inputFotoValor,
        age: inputEdadValor,
    };
    
    const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(unicorn),
        headers: {
        'Content-Type': 'application/json',
        },
    };
    
    fetch(
        'https://unicorns-api.herokuapp.com/api/v1/unicorns',
        fetchConfig
    )
        .then((result) => {
        return result.json();
        })
        .then((result) => {
        limpiarInputs();
        obtenerUnicorns();
        })
        .catch((err) => {
        console.log(err);
        });

}

function limpiarInputs(){
    inputNombre.value = '';
    inputPoder.value = '';
    inputFoto.value = '';
    inputEdad.value = '';
}

function obtenerUnicorns(){
    fetch(
        'https://unicorns-api.herokuapp.com/api/v1/unicorns'
    )
        .then((result) => {
        return result.json();
        })
        .then((result) => {
        mostrarUnicorns(result);
        
        })
        .catch((err) => {
        console.log(err);
        });
}

function mostrarUnicorns(arrayUnicorns){
    contenedorLista.innerHTML = '';
    arrayUnicorns = arrayUnicorns.reverse();
    arrayUnicorns.forEach((unicorn) => {
        const divUnicorn = document.createElement('div');
        const btnActualizar = document.createElement('button');
        const btnBorrar = document.createElement('button');
        divUnicorn.innerHTML = `
            <h2>${unicorn.name}</h2>
            <img id="imagenPrincipal" src="${unicorn.image}">
            <p id="poder">${unicorn.power}</p>
            <p id="edad" > ${unicorn.age}</p>
            
        `;
       
       divUnicorn.id = unicorn._id;

        btnBorrar.type = 'button';
        btnBorrar.innerHTML = 'Borrar';
        btnBorrar.className = 'btn btn-danger';
        btnBorrar.onclick = function(){borrarUnicorn(unicorn._id)};

        btnActualizar.type = 'button';
        btnActualizar.className = 'btn btn-primary';
        btnActualizar.innerHTML = 'Modificar';
        btnActualizar.onclick = function(){modificarUnicorn(unicorn._id)};

        contenedorLista.appendChild(divUnicorn);
        contenedorLista.appendChild(btnBorrar);
        contenedorLista.appendChild(btnActualizar);
    });

}

btnCrear.addEventListener('click', crearUnicorn);

const inputNombre2 = document.querySelector('#nombre2');
const inputPoder2 = document.querySelector('#poder2');
const inputFoto2 = document.querySelector('#foto2');
const inputEdad2 = document.querySelector('#edad2');

function modificarUnicorn(id){
    const inputNombreValor2 = inputNombre2.value;
    const inputPoderValor2 = inputPoder2.value;
    const inputFotoValor2 = inputFoto2.value;
    const inputEdadValor2 = inputEdad2.value;
    
    const unicorn2 = {
        name: inputNombreValor2,
        power: inputPoderValor2,
        image: inputFotoValor2,
        age: inputEdadValor2,
    };

    const fetchConfig2 = {
        method: "PUT",
        body: JSON.stringify(unicorn2),
        headers: {
          "Content-Type": "application/json",
        }
      }
    fetch(
        `https://unicorns-api.herokuapp.com/api/v1/unicorns/${id}`,
        fetchConfig2)
        .then((result) => { 
            return result.json();
         })
         .then((result) => { 
            //limpiarInputs();
            obtenerUnicorns();
        })  
        .catch((error) => {
        console.log(error);
        });
}
// modificarUnicorn();
// btnModificar.addEventListener('click', modificarUnicorn);

function borrarUnicorn(id){
    fetch(
        `https://unicorns-api.herokuapp.com/api/v1/unicorns/${id}`,
        {
            method: 'DELETE',
        })
        .then((result) => {
        return result.json();
        })
        .then((result) => {
        obtenerUnicorns();
        })
        .catch((err) => {
        console.log(err);
        });
}


obtenerUnicorns();

