$(document).ready(function() {
  // autofocus on textarea as soon as it shows up
  $('#opinionModal').on('shown.bs.modal', function () {
    $('#opinion').focus();
  });
});
