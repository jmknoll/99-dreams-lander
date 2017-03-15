'use strict';

(function(){

  const BASE_URL = 'http://localhost:3000/';


  $(document).ready(function(){
    console.log('Rogue leader, standing by.')

    //var fileData;

    /*
    reader.onloadend = function () {
      
      console.log('reader loaded with file');
      console.log(fileData)
    }
    */

    var fileData;


    $('#nextPageButton').click(function(e){
      e.preventDefault();
      $('#modalPage1').css('display', 'none');
      $('#modalPage2').css('display', 'block');
    });

    $('#inputFile').change(function(){
      var reader = new FileReader();
      var f = document.getElementById("inputFile").files;
      
      reader.readAsDataURL(f[0]);
      reader.onload = function(e) {
        fileData = reader.result;
      }

    })


    $('#submitFormButton').click(function(e){
      e.preventDefault();


      var data = {
        dreams_user: {
          name: $('#inputName').val(),
          email: $('#inputEmail').val(),
          school: $('#inputEdu').val(),
          description: $('#inputPlan').val(),
          fileData: fileData
        }
      }

      

      console.log(data);



      $.ajax({
        url: BASE_URL + 'api/v1/dreams_users',
        data: data,
        method: 'POST',
        crossDomain : true
      })

      .done(function(data){
        $('.alert-success').addClass('show');
      })
      .fail(function(err){
        console.log('error saving item')
        console.error(err)

        $('.alert-danger').addClass('show');
        $('.alert-danger p').html(err.responseJSON.error)
      })
      .always(function(){
        console.log('finished');
      })
      
    })
  });
})();