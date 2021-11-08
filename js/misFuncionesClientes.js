//----------------------Tabla Cliente-------------

function autoInicioCliente () {
  console.log ('se esta ejecutando');
  $.ajax ({
    url: 'http://150.230.77.201:8080/api/Client/all',
    type: 'GET',
    datatype: 'JSON',
    success: function (respuesta) {
      console.log (respuesta);
      pintarRespuesta2 (respuesta);
    },
  });
}
function pintarRespuesta2 (respuesta) {
  let myTable =
    '<br><table class="table table-striped table-bordered table-hover table-dark">';
  myTable += '<thead>';
  myTable += '<tr>';
  myTable += '<th scope="col">' + 'ID' + '</th>';
  myTable += '<th scope="col">' + 'EMAIL' + '</th>';
  myTable += '<th scope="col">' + 'PASSWORD' + '</th>';
  myTable += '<th scope="col">' + 'NOMBRE' + '</th>';
  myTable += '<th scope="col">' + 'EDAD' + '</th>';
  myTable += '<th scope="col">' + '' + '</th>';
  myTable += '<th scope="col">' + '' + '</th>';
  myTable += '</tr>';
  myTable += '</thead>';
  myTable += '<tbody>';

  for (i = 0; i < respuesta.length; i++) {
    myTable += '<tr>';
    myTable += '<td>' + respuesta[i].idClient + '</td>';
    myTable += '<td>' + respuesta[i].email + '</td>';
    myTable += '<td>' + respuesta[i].password + '</td>';
    myTable += '<td>' + respuesta[i].name + '</td>';
    myTable += '<td>' + respuesta[i].age + '</td>';
    myTable +=
      "<td> <button type='button' class='btn btn-success' onclick=' actualizarInformacionCliente(" +
      respuesta[i].idClient +
      ")'>Actualizar</button>";
    myTable +=
      "<td> <button type='button' class='btn btn-danger' onclick='borrarCliente(" +
      respuesta[i].idClient +
      ")'>Borrar</button>";
    myTable += '</tr>';
  }
  myTable += '</tbody>';
  myTable += '</table>';
  $ ('#resultado3').html (myTable);
}

function guardarInformacionCliente () {
  if (
    $ ('#Clemail').val ().length == 0 ||
    $ ('#Clpassword').val ().length == 0 ||
    $ ('#Clname').val ().length == 0 ||
    $ ('#Clage').val ().length == 0
  ) {
    alert ('Todos los campos son obligatorios');
  } else {
    let var2 = {
      email: $ ('#Clemail').val (),
      password: $ ('#Clpassword').val (),
      name: $ ('#Clname').val (),
      age: $ ('#Clage').val (),
    };

    console.log (var2);
    $.ajax ({
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      data: JSON.stringify (var2),

      url: 'http://150.230.77.201:8080/api/Client/save',

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

function actualizarInformacionCliente (idElemento) {
  if (
    $ ('#Clemail').val ().length == 0 ||
    $ ('#Clpassword').val ().length == 0 ||
    $ ('#Clname').val ().length == 0 ||
    $ ('#Clage').val ().length == 0
  ) {
    alert ('Todos los campos son obligatorios');
  } else {
    let myData = {
      idClient: idElemento,
      email: $ ('#Clemail').val (),
      password: $ ('#Clpassword').val (),
      name: $ ('#Clname').val (),
      age: $ ('#Clage').val (),
    };
    console.log (myData);
    let dataToSend = JSON.stringify (myData);
    $.ajax ({
      url: 'http://150.230.77.201:8080/api/Client/update',
      type: 'PUT',
      data: dataToSend,
      contentType: 'application/JSON',
      datatype: 'JSON',
      success: function (respuesta) {
        $ ('#resultado').empty ();
        $ ('#idClient').val ('');
        $ ('#Clemail').val ('');
        $ ('#Clpassword').val ('');
        $ ('#Clname').val ('');
        $ ('#Clage').val ('');
        autoInicioCliente ();
        alert ('se ha Actualizado correctamente Cliente');
      },
    });
  }
}

function borrarCliente (idElemento) {
  let myData = {
    idClient: idElemento,
  };
  let dataToSend = JSON.stringify (myData);
  console.log (dataToSend);
  $.ajax ({
    url: 'http://150.230.77.201:8080/api/Client/' + idElemento,
    type: 'DELETE',
    data: dataToSend,
    contentType: 'application/JSON',
    datatype: 'JSON',
    success: function (respuesta) {
      $ ('#resultado').empty ();
      autoInicioCliente ();
      alert ('Se ha Eliminado.');
    },
  });
}
