'use strict';

(function(){

  //const BASE_URL = 'http://localhost:3000/';
  const BASE_URL = 'http://mentorverse.herokuapp.com/';

  $(document).ready(function(){
    console.log('Rogue leader, standing by.');

    var file = {};

    $('#nextPageButton').click(function(e){
      e.preventDefault();
      $('#modalPage1').css('display', 'none');
      $('#modalPage2').css('display', 'block');
    });

    $('#inputFile').change(function(){
      var reader = new FileReader();
      var f = document.getElementById("inputFile").files;

      file.name = f[0].name;
      file.type = f[0].type;
      file.size = f[0].size;
      
      reader.readAsDataURL(f[0]);
      reader.onload = function() {
        file.data = reader.result;
      };
    });


    $('#submitFormButton').click(function(e){
      e.preventDefault();

      var data = {
        dreams_user: {
          name: $('#inputName').val(),
          email: $('#inputEmail').val(),
          school: $('#inputEdu').val(),
          city: $('#inputCity').val(),
          description: $('#inputPlan').val(),
          tracking: $('#inputTracking').val()
        },
        file: file
      };

      $.ajax({
        url: BASE_URL + 'api/v1/dreams_users',
        data: data,
        method: 'POST',
        crossDomain : true
      })
      .done(function(){
        $('#applyModal').modal('hide');
        $('.alert-success').addClass('show');
      })
      .fail(function(err){
        console.log('error saving item');
        console.error(err);

        $('.alert-danger').addClass('show');
        $('.alert-danger p').html(err.responseJSON.error);
      })
      .always(function(){
        console.log('finished');
      });
      
    });
  });
})();