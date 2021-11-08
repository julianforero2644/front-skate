function autoInicioRelacionCliente () {
  $.ajax ({
    url: 'http://150.230.77.201:8080/api/Client/all',
    type: 'GET',
    datatype: 'JSON',
    success: function (respuesta) {
      let $select = $ ('#select-client');
      $.each (respuesta, function (id, name) {
        $select.append (
          '<option value=' + name.idClient + '>' + name.name + '</option>'
        );
      });
    },
  });
}
function autoInicioSkate () {
  $.ajax ({
    url: 'http://150.230.77.201:8080/api/Skate/all',
    type: 'GET',
    datatype: 'JSON',
    success: function (respuesta) {
      let $select = $ ('#select-skate');
      $.each (respuesta, function (id, name) {
        $select.append (
          '<option value=' + name.id + '>' + name.name + '</option>'
        );
      });
    },
  });
}

function autoInicioMensajes () {
  console.log ('se esta ejecutando');
  $.ajax ({
    url: 'http://150.230.77.201:8080/api/Message/all',
    type: 'GET',
    datatype: 'JSON',
    success: function (respuesta) {
      console.log (respuesta);
      pintarRespuestaMensajes (respuesta);
    },
  });
}

function pintarRespuestaMensajes (respuesta) {
  let myTable =
    '<br><table class="table table-striped table-bordered table-hover table-dark">';
  myTable += '<thead>';
  myTable += '<tr>';
  myTable += '<th scope="col">' + 'ID' + '</th>';
  myTable += '<th scope="col">' + 'NOMBRE SKATE' + '</th>';
  myTable += '<th scope="col">' + 'NOMBRE CLIENTE' + '</th>';
  myTable += '<th scope="col">' + 'MENSAJE' + '</th>';
  myTable += '<th scope="col">' + '' + '</th>';
  myTable += '<th scope="col">' + '' + '</th>';
  myTable += '</tr>';
  myTable += '</thead>';
  myTable += '<tbody>';



  for (i = 0; i < respuesta.length; i++) {
    myTable += '<tr>';
    myTable += '<td>' + respuesta[i].id + '</td>';    
    myTable += '<td>' + respuesta[i].skate.name + '</td>';
    myTable += '<td>' + respuesta[i].client.name + '</td>';
    myTable += '<td>' + respuesta[i].messageText + '</td>';
    myTable +=
      "<td> <button type='button' class='btn btn-success' onclick=' actualizarInformacionMensaje(" +
      respuesta[i].idMessage +
      ")'>Actualizar</button>";
    myTable +=
      "<td> <button type='button' class='btn btn-danger' onclick='borrarMensaje(" +
      respuesta[i].idMessage +
      ")'>Borrar</button>";
    myTable += '</tr>';
  }
  myTable += '</tbody>';
  myTable += '</table>';
  $ ('#resultadoMensajes').html (myTable);
}

function guardarInformacionMensajes () {
  if ($ ('#messagetext').val ().length == 0) {
    alert ('Todos los campos son obligatorios');
  } else {
    let var2 = {
      messageText: $ ('#messagetext').val (),
      skate: {id: +$ ('#select-skate').val ()},
      client: {idClient: +$ ('#select-client').val ()},
    };

    console.log (var2);
    $.ajax ({
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      data: JSON.stringify (var2),

      url: 'http://150.230.77.201:8080/api/Message/save',

      success: function (response) {
        console.log (response);
        console.log ('Se guardo correctamente');
        alert ('Se guardo correctamente');
        window.location.reload ();
      },

      error: function (jqXHR, textStatus, errorThrown) {
        window.location.reload ();
        alert ('No se guardo correctamente');
      },
    });
  }
}

function actualizarInformacionMensaje (idElemento) {
  let myData = {
    idMessage: idElemento,
    messageText: $ ('#messagetext').val (),
    skate: {id: +$ ('#select-skate').val ()},
    client: {idClient: +$ ('#select-client').val ()},
  };
  console.log (myData);
  let dataToSend = JSON.stringify (myData);
  $.ajax ({
    url: 'http://150.230.77.201:8080/api/Message/update',
    type: 'PUT',
    data: dataToSend,
    contentType: 'application/JSON',
    datatype: 'JSON',
    success: function (respuesta) {
      $ ('#resultado').empty ();
      $ ('#messagetext').val ('');

      autoInicioMensajes ();
      alert ('se ha Actualizado correctamente el Mensaje');
    },
  });
}

function borrarMensaje (idElemento) {
  let myData = {
    idMessage: idElemento,
  };
  let dataToSend = JSON.stringify (myData);
  console.log (dataToSend);
  $.ajax ({
    url: 'http://150.230.77.201:8080/api/Message/' + idElemento,
    type: 'DELETE',
    data: dataToSend,
    contentType: 'application/JSON',
    datatype: 'JSON',
    success: function (respuesta) {
      $ ('#resultado').empty ();
      autoInicioMensajes ();
      alert ('Se ha Eliminado.');
    },
  });
}
