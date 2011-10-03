$(document).ready(function() {
  label_togglerizer('form#curlosaurus input[title]');

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
  $('#body-toggle').hide();
  $('#body-toggle').toggle(function() {
    $(this).html('- hide body');
    $('#curlosaurus #body').show();
  }, function() {
    $(this).html('+ show body');
    $('#curlosaurus #body').hide();
  });

  $('#method').change(function() {
    var method = $(this).val();
    if ( method === 'get' || method === 'delete') {
      $('#body-toggle, #body').hide();
    } else {
      $('#body-toggle').show();
    }
  });
});
