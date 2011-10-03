$(document).ready(function() {
  $('form#curlosaurus').submit(function(e) {
    e.preventDefault();

    $('#loader').show();

    $.ajax({
      url: '/',
      type: 'post',
      data: $(this).serialize(),
      success: function(data) {
        $('#loader').hide();
        $('#result-holder').html(data);
      }
    });

    return false;
  });

  $('#auth-div').hide();
  $('#auth').click(function() {
    this.checked ? $('#auth-div').show() : $('#auth-div').hide() ;
  });

  $('#body').hide();
  $('#body-toggle').toggle(function() {
    $(this).html('- show body');
    $('#curlosaurus #body').show();
  }, function() {
    $(this).html('+ show body');
    $('#curlosaurus #body').hide();
  });
});
