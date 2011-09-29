$(document).ready(function() {
  $('form#curlosaurus').submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: '/',
      type: 'post',
      data: {
        "url": $('form#curlosaurus #url').val(),
        "type": $('form#curlosaurus #type').val(),
        "data": $('form#curlosaurus #data').val()
      },
      success: function(data) {
        $('#result-holder').html(data);
      }
    });

    return false;
  });
});
