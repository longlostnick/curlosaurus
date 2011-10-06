$(document).ready(function() {
  label_togglerizer('form#curlosaurus input[title], form#curlosaurus textarea[title]');

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

  $('#auth-block').hide();
  $('#auth').click(function() {
    this.checked ? $('#auth-block').show() : $('#auth-block').hide() ;
  });

  $('#body').hide();
  $('#body-toggle').hide();
  $('#body-toggle').toggle(function() {
    $(this).html('- hide body');
    $('#curlosaurus #body').show('fast');
  }, function() {
    $(this).html('+ show body');
    $('#curlosaurus #body').hide('fast');
  });

  $('#method').change(function() {
    var method = $(this).val();
    if ( method === 'get' || method === 'delete') {

      // toggle only if body is visible
      if ($('#body').is(':visible')) {
        $('#body-toggle').trigger('click');
      }

      $('#body-toggle').hide();
    } else {
      $('#body-toggle').show();
    }
  });

  // fuck firefox
  $('#method').trigger('change');
  $('#auth').attr('checked', false);
});
