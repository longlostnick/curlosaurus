$(document).ready(function() {

  $('#fader').fadeOut('slow');

  label_togglerizer('form#curlosaurus input[title], form#curlosaurus textarea[title]');

  $('form#curlosaurus').submit(function(e) {
    e.preventDefault();

    $('#loader').show();

    $('#roar').attr('disabled', true).addClass('disabled');

    $.ajax({
      url: '/',
      type: 'post',
      data: $(this).serialize(),
      success: function(data) {

        if (!data.success) {
          $('#result-holder #header').hide().fadeIn().html(data.message);
          $('#result-holder #body').hide();
        } else {
          $('#result-holder #header').hide().fadeIn().html('<pre>' + data.header + '</pre>');
          $('#result-holder #body').hide().fadeIn().html('<pre>' + data.body + '</pre>').attr('class', 'CodeRay');
        }

        $('#loader').hide();

        // hide body if visible
        if ($('#body').is(':visible')) {
          $('#body-toggle').trigger('click');
        }

        // ok people can spam the button again now
        $('#roar').attr('disabled', false).removeClass('disabled');
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

      // toggle only if already hidden
      if ($('#body').is(':hidden')) {
        $('#body-toggle').trigger('click');
      }

      $('#body-toggle').show();
    }
  });

  $('#add-header').click(function() {
    var count = $('.header-row').length;
    var header_row = '';

    header_row += '<div class="header-row">';
    header_row += '<input type="text" name="header_keys[]" id="header-key-' + count + '" class="header-key" title="key" /> ';
    header_row += '<input type="text" name="header_values[]" id="header-value-' + count + '" class="header-value" title="value" />';
    header_row += '</div>';

    $(this).parent('div').append(header_row);

    label_togglerizer('#header-key-' + count + ', #header-value-' + count);
  });

  // fuck firefox
  $('#method').trigger('change');
  $('#auth').attr('checked', false);
});
