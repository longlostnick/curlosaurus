$(document).ready(function() {
  $('form#curlosaurus').submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: '/',
      type: 'post',
      data: {
        "url": $('form#curlosaurus #url').val(),
        "method": $('form#curlosaurus #method').val(),
        "body": $('form#curlosaurus #body').val()
      },
      success: function(data) {
        $('#result-holder').text(data);
      }
    });

    return false;
  });

  $('#auth-div').hide();
  $('#auth').click(function() {
    this.checked ? $('#auth-div').show() : $('#auth-div').hide() ;
  });
});
