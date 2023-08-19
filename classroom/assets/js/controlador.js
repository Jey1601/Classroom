var localstorage = window.localStorage;


const tabs = ["asignaciones", "clase", "participantes"];

showTab = (nombreTab, idTab) => {
  tabs.forEach(tab => {
    document.getElementById(tab).style.display = "none";
    document.getElementById('tab-' + tab).classList.remove("active");
  });

  document.getElementById(nombreTab).style.display = "block";
  document.getElementById('tab-' + nombreTab).classList.add("active");
}



/*showClass2 = (poo) => {
  document.getElementById('clases').style.display = "none";
  document.getElementById('tabs').style.display = "block";
  document.getElementById('clase').style.display = "block";

}*/

showClass = (id) => {
  console.log("id", id);

  tabs.forEach(tab => {
    document.getElementById(tab).style.display = "none";
  });

  document.getElementById('clases').style.display = "none";
  document.getElementById('tabs').style.display = "block";
  document.getElementById('clase').style.display = "block";

  document.getElementById('seccionClase').innerHTML = "";

  fetch(`http://localhost:3000/clases/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(clase => {
      const instructor = JSON.parse(localstorage.getItem('instructor'));
      console.log("barnie")
      console.log(instructor);
      const estaClase = clase.clase;
      localstorage.setItem('clase',JSON.stringify(estaClase));
      document.getElementById('seccionClase').innerHTML +=
        `<div class="col-lg-12 mx-auto">
            <span class="btn btn-link" onclick="showClasses()">Ver clases</span>
                <div class="card shadow-sm mb-3">
                    <div class="card-img-top w-full c-full p-5" style="background-image: url(${estaClase.banner});">
                      <span class="h3 text-white">${estaClase.nombreClase}</span><br>
                      <span class="small text-white">${estaClase.seccion}</span>
                    </div>
                    <div class="card-body">
                      <p class="card-text">
                        <span class="text-dark">Descripción: ${estaClase.descripcion}</span><br>
                        <span class="small text-muted">Aula: ${estaClase.aula}</span>
                      </p>
                    </div>
                  </div>
                  

                  <div class="row">
          <!-- Por evaluar -->
          <div class="col-3">
            <div class="card shadow-sm">
              <div class="card-body">
                <p class="card-text">
                  <span class="text-dark">Por evaluar</span><br>
                  <hr>
                  <ul >
                    ${cargarActividadesEvaluar(estaClase.asignaciones)}
                  </ul>
                </p>
              </div>
            </div>
          </div>
          
           ${renderizarAnuncios(estaClase.anuncios,instructor,estaClase._id)}
        </div><!--Tomar-->
                  
                      
                  </div><!--Tomar 1-->
                  `
            //RENDERIZAR ASIGNACIONES DE DICHA CLASE
            renderizarAsignaciones(estaClase);

            //RENDERIZAMOS LOS PARTICIPANTES
            renderizarPariticipantes(id);
    })


    
}

renderizarAnuncios = (anuncios, instructor,claseId) => {
  let re = 
  ` <div  class="col-9"> <!--Boorar-->
  <!-- Compartir con la clase -->
  <div class="card shadow-sm mb-3">
    <div class="card-body">
      <p class="card-text">
        
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <img src="${instructor.imagen}" class="rounded-circle pp-small">
        <div class="input-group mb-3">
          <input type="text" class="form-control" name="" id="" placeholder="Anunciar algo a tu clase">
          <button class="btn btn-outline-secondary" type="button" id="button-addon2">Send</button>
        </div>
      </div>
    </div>
  </div>
  `;
  let index=-1;
  anuncios.forEach((anuncio) => {
    index+=1;
    re +=
      `
      <!-- Comentarios Instructor -->
      <div class="card shadow-sm mb-3">
        <div class="card-body">
          <p class="card-text">
            <img src="${instructor.imagen}" class="rounded-circle pp">
            <span class="h6">${instructor.nombre}</span>
            <span class="small text-muted">${anuncio.hora}</span>
          </p>
          <p>
          ${anuncio.mensaje}  
          </p>
          <hr>
          
          ${renderizarComentarios(anuncio)}

          <div class="d-flex justify-content-between align-items-center">
            <div class="input-group mb-3">
              <input type="text" class="form-control" name="" id="comentario${anuncio.id}" placeholder="Nuevo comentario">
              <button onClick="enviarComentario('${claseId}',${index}, 'comentario${anuncio.id}')" class="btn btn-outline-secondary" type="button" id="button-addon2">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div><!--Boorar-->
    `

  })

  return re;

}

renderizarComentarios=(anuncio)=>{
  console.log("caiu")
  console.log(anuncio)
  let rede='';

    anuncio.comentarios.forEach((comentario)=>{
    rede +=`<!-- Respuestas -->
          
    <div class="ms-4">
      <p class="text-muted">
        <span class="h6">${comentario.usuario} </span><span class="small text-muted">(${comentario.hora})</span> : ${comentario.mensaje}
      </p>
    </div>
    `;
  })

  return rede;

}

cargarActividadesEvaluar = (asignaciones) => {
  let re='';
  asignaciones.forEach((asignacion) => {
    re += `<li><span class="small text-muted">${asignacion.titulo} (${asignacion.fecha})</span></li>`;
  })

  return re;
}

enviarComentario=(claseId,index,inputId)=>{

  const mensaje= document.getElementById(inputId).value;

  fetch(`http://localhost:3000/clases/${claseId}/anuncios/${index}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "usuario": "usuariox",
            "mensaje": mensaje,
            "fecha": "x",
            "hora": "10:11 PM"
        })
    })
        .then(response => {
            if (response.ok) {
                // Procesar la respuesta si es necesario
                console.log('Contenido enviado exitosamente');
                
                
            } else {
                throw new Error('Error al enviar el contenido');
            }
        }).then(res=>{
            document.getElementById(inputId).value="";
            showClass(claseId);

        })
        .catch(error => {
            // Manejar errores si ocurren
            console.error(error);
        });
}

showClasses = () => {
  document.getElementById('clases').style.display = "block";
  document.getElementById('tabs').style.display = "none";
  document.getElementById('clase').style.display = "none";
}

renderizarIntructores = () => {
  document.getElementById('contenedorInstructores').innerHTML = "";
  fetch(`http://localhost:3000/instructores`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(instructores => {

      instructores.forEach((instructor) => {
        document.getElementById('contenedorInstructores').innerHTML +=
          `<img type="button" onClick="renderizarClases('${instructor._id}')" src="${instructor.imagen}" class="rounded-circle pp-small btn-circle">`;
      })
    })

    document.getElementById('contenedorInstructores').innerHTML += `<img  type="button" data-bs-toggle="modal" data-bs-target="#agregarInstructorModal" src="assets/img/icons/add.png" class="rounded-circle pp-small btn-circle" title="Nuevo instructor">`;

}

renderizarClases = (id) => {
  document.getElementById('contenedorClases').innerHTML = "";
  document.getElementById('contenedorMiniaturaClases').innerHTML = "";
 



  fetch(`http://localhost:3000/instructores/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(instructor => {
      console.log("El instructor es")
      console.log(instructor.instructor)


      localstorage.setItem('instructor', JSON.stringify(instructor.instructor));
      document.getElementById('imgIntructor').src=instructor.instructor.imagen;


      instructor.instructor.clases.forEach((id) => {
        console.log("El id es")
        console.log(id)
        fetch(`http://localhost:3000/clases/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(clase => {
            console.log("la clase es")
            console.log(clase.clase)
            document.getElementById('contenedorClases').innerHTML +=
              `<div class="col">
                  <div class="card shadow-sm">
                    <div class="card-img-top w-full course-top p-2" style="background-image: url(${clase.clase.banner});">
                      <span class="h3 text-white">${clase.clase.nombreClase}</span><br>
                      <span class="small text-white">${clase.clase.seccion}</span>
                    </div>
        
                    <div class="card-body">
                      <p class="card-text">
                        <span class="text-dark">${clase.clase.asignaciones[0].titulo}</span><br>
                        <span class="small text-muted">${clase.clase.asignaciones[0].fecha}</span>
                      </p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <button type="button" onclick="showClass('${clase.clase._id}')" class="btn btn-sm btn-outline-secondary">Ver</button>
                        </div>
                        <small class="text-muted">${clase.clase.asignaciones[0].puntos}</small>
                      </div>
                    </div>
                  </div>
                </div>`

            //Rellanmos la miniatura
            renderizarMiniatura(clase.clase.nombreClase, clase.clase.banner);

          })
      })

    })
}

renderizarMiniatura = (nombre, banner) => {
  document.getElementById('contenedorMiniaturaClases').innerHTML +=
    `<!-- Miniaturas de clases -->
 <div class="col-2 py-4">
   <div class="card cardMin">
     <div class="card-body course-thumb" onclick="showClass('POO')" style="background-image: url(${banner});">
       <h5 class="text-white">${nombre}</h5>
     </div>
   </div>
 </div>`

}

renderizarAsignaciones=(clase)=>{
  document.getElementById('contenedorAsignaciones').innerHTML="";

  clase.asignaciones.forEach((asignacion)=>{
    document.getElementById('contenedorAsignaciones').innerHTML+=
    `<!-- Asignación  -->
    <div class="col-12">
      <p class="card-text p-2 d-flex align-items-center">
        <span class="rounded-circle icon-bg mx-2">
          <svg focusable="false" width="24" height="24" viewBox="0 0 24 24" class=" NMm5M hhikbc" fill="#ffffff"><path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z"></path><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"></path></svg>
        </span>
        <span class="h6 mx-2 mb-0">${asignacion.titulo}</span>
        <span class="small text-muted mx-2">${asignacion.fecha} | ${asignacion.hora}| ${asignacion.puntos}pts</span>
      </p>
    </div>
    `
  })
}

renderizarPariticipantes=(id)=>{

  document.getElementById('contenedorParticipantes').innerHTML="";

  return fetch(`http://localhost:3000/clases/${id}/participantes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response=> {
        
        const participantes=response[0].detallesParticipantes;

        console.log(participantes);
        
        participantes.forEach((participante)=>{
          document.getElementById('contenedorParticipantes').innerHTML+=
          `<div class="col-4">
            <p class="card-text p-2">
              <img src="${participante.imagen}" class="rounded-circle pp">
              <span class="h6">${participante.nombre}</span>
            </p>
          </div>
          `});
        
        
       

        
    }).then(
        
    )
    .catch(error => {
        // Handle errors if needed
        console.error(error);
        // You might also want to return a default state or handle the error differently
        return ''; // Return an empty string as a default state
    });
}

agregarEstudiante=()=>{
  const estaClase=JSON.parse(localstorage.getItem('clase'));
  const nombre=document.getElementById('NombreEstudiante').value
  const imagen=document.getElementById('urlImagenEstudiante').value
  const clases=[
    {
      "$oid": estaClase._id
    }
  ]

  fetch(`http://localhost:3000/participantes/`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
       
        "nombre": nombre,
        "imagen": imagen,
        "clases": clases
        
    })
})
    .then(response => {
        if (response.ok) {
            // Procesar la respuesta si es necesario
            console.log('Contenido enviado exitosamente');
                
        } else {
            throw new Error('Error al enviar el contenido');
        }
    }).then(res=>{
     
    })
    .catch(error => {
        // Manejar errores si ocurren
        console.error(error);
    });

    
}


agregarInstructor=()=>{

  
  const nombre=document.getElementById('NombreInstructor').value;
  const imagen=document.getElementById('urlImagenInstructor').value;
  const usuario=document.getElementById('UsuarioInstructor').value;
  const password=document.getElementById('passwordInstructor').value;
  const clases=[ ];

  fetch(`http://localhost:3000/instructores`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
       
      
        "usuario":usuario,
        "password":password,
        "nombre":nombre,
        "imagen":imagen,  
        "clases":[] 
    
        
    })
})
    .then(response => {
        if (response.ok) {
            // Procesar la respuesta si es necesario
            console.log('Contenido enviado exitosamente');
                
        } else {
            throw new Error('Error al enviar el contenido');
        }
    }).then(res=>{
     
    })
    .catch(error => {
        // Manejar errores si ocurren
        console.error(error);
    });
    renderizarIntructores();
}

renderizarClases("64e018c6b4b89c882f1fd4a4");
renderizarIntructores();