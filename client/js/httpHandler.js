(function () { //iife immediately invokign func express to preserve global vars

  const serverUrl = 'http://127.0.0.1:4000';

  //
  // TODO: build the swim command fetcher here
  //

  /////////////////////////////////////////////////////////////////////
  // The ajax file uploader is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUpload = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: '/background.jpg', ////the url must match the one in the server, server will be listening for this endpoint. will default to wherever this server is 
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    })
  }

  const fetchCommand = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (command) => {
        SwimTeam.move(command);
      },
      complete: () => {
        setTimeout(fetchCommand, 10) //prevents backup like set interval
      }
    });
  }
  setTimeout(fetchCommand, 0)
  // setInterval(fetchCommand,200)

  // $.get(serverUrl, function (data) {
  //   // console.log('this should be a random direction:', data)
  //   SwimTeam.move(data);
  // });


  $('form').on('submit', function (e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
