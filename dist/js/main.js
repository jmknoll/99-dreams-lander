'use strict';

(function(){

  //const BASE_URL = 'http://localhost:3000/';
  const BASE_URL = 'http://mentorverse.herokuapp.com/';

  $(document).ready(function(){
    console.log('Rogue leader, standing by.');

    // open timed modal after 60 seconds already open to page 2
    setTimeout(function(){
      if ($('#applyModal').data('bs.modal') === undefined){
        $('#applyModal').modal('show');
        $('#modalPage1').css('display', 'none');
        $('#modalPage2Alt').css('display', 'block');
        $('#timerTitle').css('display', 'block');
        $('#applyTitle').css('display', 'none');
        $('#timerContent').css('display', 'block');  
      }
    }, 5000);

    var file = {};

    $('#nextPageButton').click(function(e){
      e.preventDefault();
      $('#modalPage1').css('display', 'none');
      $('#modalPage2').css('display', 'block');
    });

    $('#nextPageButtonAlt').click(function(e){
      e.preventDefault();
      $('#modalPage1').css('display', 'none');
      $('#modalPage2Alt').css('display', 'block');
      //and show the alternate title and content
      $('#timerTitle').css('display', 'block');
      $('#applyTitle').css('display', 'none');
      $('#timerContent').css('display', 'block');
    });

    $('#applyModal').on('hidden.bs.modal', function () {
      $('#modalPage2').css('display', 'none');
      $('#modalPage2Alt').css('display', 'none');
      $('#modalPage1').css('display', 'block');
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

    $('#submitFormButtonAlt').click(function(e){
      e.preventDefault();
      /*
      if (
        $('#inputName').val() !== '' &&
        $('#inputEmail').val() !== '' // &&
        $('#inputTracking').val() !== ''
      ){
        
      } else {
        return;
      }
      
      $('.alert-danger').removeClass('show');
      $('.alert-danger').addClass('hide');

      */
      //run validations
      if ( $('#inputEmail').val() === '' ) {
        $('.email-empty').css('display','block');
        console.log('not submitting form');
        setTimeout(function(){
          $('.email-empty').css('display','none');
        }, 10000);
        return;
      }

      var data = {
        starter_dreams_user: {
          email: $('#inputEmail').val(),
          name: $('#inputName').val(),
          tracking: $('#inputTracking').val()
        }
      };

      $.ajax({
        url: BASE_URL + 'api/v1/starter_dreams_users',
        data: data,
        method: 'POST',
        crossDomain : true
      })
      .done(function(){
        $('#modalPage2Alt').css('display', 'none');
        $('#modalPage3').css('display', 'block');
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

    $('#submitFormButton').click(function(e){
      if ( 
        $('#inputName').val() !== '' && 
        $('#inputEmail').val() !== ''&& 
        $('#inputEdu').val() !== '' && 
        $('#inputCity').val() !== '' && 
        $('#inputPlan').val() !== '' && 
        $('#inputTracking').val() !== ''
       ){ 
          e.preventDefault();
      } else {
        return;
      }

      $('.alert-danger').removeClass('show');
      $('.alert-danger').addClass('hide');

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
        $('#modalPage2').css('display', 'none');
        $('#modalPage3').css('display', 'block');
        /*
        setTimeout(function(){
          $('#applyModal').modal('hide');
        }, 1000);
        */
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