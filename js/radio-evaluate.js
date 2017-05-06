$(document).ready(function() {
  $('#radioEvaluationForm').submit(function(event) {
    event.preventDefault();
    var url = $(this).attr('action');
    var userId = $('input[name="userId"]').val();
    var userName = $('input[name="userName"]').val();
    var checkedRadios = $('input[type="radio"]:checked');
    var resultArr = $.map(checkedRadios, function(radio) {
      return $(radio).val();
    });
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to edit it.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#337ab7',
      confirmButtonText: 'Yes, submit it!',
      closeOnConfirm: false
    }, function() {
      $.post(url, { id: userId, name: userName, result: resultArr }).done(function(message) {
        if(message == 'Success') {
          swal({
            title: 'Success!',
            text: 'Your evaluation has been submitted!',
            type: 'success'
          }, function() {
            location.replace('/finished');
          });
        } else {
          swal({
            title: 'Error!',
            text: 'Try it later!',
            type: 'error'
          }, function() {
            location.reload();
          });
        }
      });
    });
  });
});
