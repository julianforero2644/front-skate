function autoInicioCategoria () {
  console.log ('se esta ejecutando');
  $.ajax ({
    url: 'http://150.230.77.201:8080/api/Category/all',
    type: 'GET',
    datatype: 'JSON',
    success: function (respuesta) {
      console.log (respuesta);
      let $select = $ ('#select-category');
      $.each (respuesta, function (id, name) {
        $select.append ('<option value=' + name.id + '>' + name.name + '</option>');
        console.log ('select ' + name.id);
      });
    },
  });
}
//Manejador GET
function traerInformacionSkate () {
  $.ajax ({
    url: 'http://150.230.77.201:8080/api/Skate/all',
    //url: "http://localhost:8080/api/Skate/all",
    type: 'GET',
    datatype: 'JSON',
    success: function (response) {
      console.log (response);
      pintarRespuestaSkate (response);
    },
  });
}

function pintarRespuestaSkate (response) {
  let myTable =
    '<br><table class="table table-striped table-bordered table-hover table-dark">';
    myTable += '<thead>';
    myTable += '<tr>';
    myTable += '<th scope="col">' + 'ID' + '</th>';
    myTable += '<th scope="col">' + 'NOMBRE' + '</th>';
    myTable += '<th scope="col">' + 'MARCA' + '</th>';
    myTable += '<th scope="col">' + 'AÑO' + '</th>';
    myTable += '<th scope="col">' + 'DESCRIPCIÓN' + '</th>';
    myTable += '<th scope="col">' + 'CATEGORÍA' + '</th>';
    myTable += '<th scope="col">' + '' + '</th>';
    myTable += '<th scope="col">' + '' + '</th>';
    
    myTable += '</tr>';
    myTable += '</thead>';
    myTable += '<tbody>';

  for (i = 0; i < response.length; i++) {
    myTable += '<tr>';
    myTable += '<td>' + response[i].id + '</td>';
    myTable += '<td>' + response[i].name + '</td>';
    myTable += '<td>' + response[i].brand + '</td>';
    myTable += '<td>' + response[i].year + '</td>';
    myTable += '<td>' + response[i].description + '</td>';
    myTable += '<td>' + response[i].category.name + '</td>';
    
    myTable +=
      "<td> <button type='button' class='btn btn-success' onclick=' actualizar(" +
      response[i].id +")'>Actualizar Skate!</button>";

    myTable +=
      "<td> <button type='button' class='btn btn-danger' onclick='borrar(" +
      response[i].id +")'>Borrar Skate!</button>";   
    
       
    myTable += '</tr>';
  }
  myTable += '</tbody>';
  myTable += '</table>';
  $ ('#miListaSkate').html (myTable);
}

//Capturar informacion para Actualizar
function cargarDatosSkate (id) {
  $.ajax ({
    dataType: 'json',
    url: 'http://150.230.77.201:8080/api/Skate/' + id,
    //url: "http://localhost:8080/api/Skate/" + id,
    type: 'GET',

    success: function (response) {
      console.log (response);
      var item = response;

      $ ('#id').val (item.id);
      $ ('#Sname2').val (item.name);
      $ ('#Sbrand').val (item.brand);
      $ ('#Syear').val (item.year);
      $ ('#Sdescription2').val (item.description);
    },

    error: function (jqXHR, textStatus, errorThrown) {},
  });
}

function agregarSkate () {
  if (
    $ ('#Sname2').val ().length == 0 ||
    $ ('#Sbrand').val ().length == 0 ||
    $ ('#Syear').val ().length == 0 ||
    $ ('#Sdescription2').val ().length == 0
  ) {
    alert ('Todos los campos son obligatorios');
  } else {
    let elemento = {
      name: $ ('#Sname2').val (),
      brand: $ ('#Sbrand').val (),
      year: $ ('#Syear').val (),
      description: $ ('#Sdescription2').val (),
      category: {id: +$ ('#select-category').val ()},
    };

    let dataToSend = JSON.stringify (elemento);
    console.log (elemento);

    $.ajax ({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://150.230.77.201:8080/api/Skate/save',
      //url: "http://localhost:8080/api/Skate/save",
      data: dataToSend,
      datatype: 'json',

      success: function (response) {
        console.log (response);
        console.log ('Se guardo Correctamente');
        //Limpiar Campos
        $ ('#resultado2').empty ();
        $ ('#Sname2').val ('');
        $ ('#Sbrand').val ('');
        $ ('#Syear').val ('');
        $ ('#Sdescription2').val ('');
        //Listar Tabla
        alert ('Se ha guardado Correctamente!');
        window.location.reload ();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert ('No se Guardo Correctamente');
      },
    });
  }
}

//Manejador PUT
function actualizar (idElemento) {
  if (
    $ ('#Sname2').val ().length == 0 ||
    $ ('#Sbrand').val ().length == 0 ||
    $ ('#Syear').val ().length == 0 ||
    $ ('#Sdescription2').val ().length == 0
  ) {
    alert ('Todos los campos deben estar llenos');
  } else {
    let elemento = {
      id: idElemento,
      name: $ ('#Sname2').val (),
      brand: $ ('#Sbrand').val (),
      year: $ ('#Syear').val (),
      description: $ ('#Sdescription2').val (),
      category: {id: +$ ('#select-category').val ()},
    };
    console.log (elemento);
    let dataToSend = JSON.stringify (elemento);
    $.ajax ({      
      url: 'http://150.230.77.201:8080/api/Skate/update',
      //url: "http://localhost:8080/api/Skate/update",
      type: 'PUT',      
      data: dataToSend,
      contentType: 'application/JSON',
      datatype: 'JSON',      
      success: function (response) {        
        //$ ('#miListaSkate').empty ();
        //Limpiar Campos
        $ ('#resultado2').empty ();
        $ ('#id').val ('');
        $ ('#Sname2').val ('');
        $ ('#Sbrand').val ('');
        $ ('#Syear').val ('');
        $ ('#Sdescription2').val ('');
        traerInformacionSkate ();
        alert ('se ha Actualizado Correctamente!');        
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert ('No se Actualizo Correctamente!');
      },
    });
  }
}


//Manejador DELETE
function borrar (idElemento) {
  var elemento = {
    id: idElemento,
  };

  var dataToSend = JSON.stringify (elemento);
  console.log (dataToSend);
  $.ajax ({    
    url: 'http://150.230.77.201:8080/api/Skate/' + idElemento,
    //url: "http://localhost:8080/api/Skate/" + idElemento,
    type: 'DELETE',
    data: dataToSend,
    contentType: 'application/JSON',
    datatype: 'JSON',
    success: function (response) {
      console.log (response);
      $ ('#miListaSkate').empty ();
      traerInformacionSkate();     
      alert ('se ha Eliminado Correctamente!');      
    },

    error: function (jqXHR, textStatus, errorThrown) {
      alert ('No se Elimino Correctamente!');
    },
  });
}


