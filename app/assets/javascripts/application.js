//= require jquery

function label_togglerizer(el) {

  $(el).each(function() {
    var self = $(this), title = self.attr('title');

    self.val(title).addClass('blurred');

    self.blur(function() {
      if (self.val() == '') {
        self.val(title).addClass('blurred');
      }
    });

    self.focus(function() {
      if (self.val() === title) {
        self.val('').removeClass('blurred');
      }
    });
  });
}
