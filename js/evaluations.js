$(document).ready(function() {
  setTimeout(function() {
    $('.authority-error-alert').remove();
  }, 4000);

  $('#opinionModal').on('shown.bs.modal', function(event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var result = button.data('result');
    var modal = $(this);
    modal.find('li.' + result).each(function() {
      if($(this).text() != 'No opinion.') {
        $(this).show();
      }
    });
  });

  $('#opinionModal').on('hidden.bs.modal', function () {
    var modal = $(this);
    modal.find('li').each(function() {
      $(this).hide();
    });
  });
});
