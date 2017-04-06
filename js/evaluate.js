$(document).ready(function() {
  // autofocus on textarea as soon as it shows up
  var userResult = $('input[name="result"]').val(); // good or bad
  $('div[data-buttons="evaluate"] button[data-result=' + userResult + ']').addClass('active'); // active the button user clicked
  $('div[data-buttons="evaluate"] button:not([data-result=' + userResult + '])').attr('disabled','disabled'); // disable the other button

  $('#opinionModal').on('shown.bs.modal', function (event) {
    $('#opinion').focus();
     var button = $(event.relatedTarget) // Button that triggered the modal
     var result = button.data('result');
     var modal = $(this);
     modal.find('.result').val(result);
  });

  $('#evaluationForm').submit(function(event) {
    event.preventDefault();
    var url = $(this).attr('action');
    var userId = $('input[name="userId"]').val();
    var result = $('input[name="result"]').val();
    var opinion = $('textarea[name="opinion"]').val();
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to edit it',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#337ab7',
      confirmButtonText: 'Yes, submit it!',
      closeOnConfirm: false
    }, function(isConfirm) {
      $.post(url, { id: userId, result: result, opinion, opinion }).done(function(message) {
        if(message == 'Success') {
          swal({
            title: 'Success!',
            text: 'Your evaluation has been submitted',
            type: 'success'
          }, function(isConfirm) {
            location.reload();
          });
        } else {
          swal({
            title: 'Error!',
            text: 'Try it later!',
            type: 'error'
          }, function(isConfirm) {
            location.reload();
          });
        }
      });
    });
  });
});
