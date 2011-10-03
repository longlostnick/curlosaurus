//= require jquery

function label_togglerizer(el) {

  $(el).each(function() {
    var self = $(this), title = self.attr('title');

    self.val(title).css('color', '#bbb');

    self.blur(function() {
      if (self.val() == '') {
        self.val(title).removeClass('focused');
      }
    });

    self.focus(function() {
      if (self.val() === title) {
        self.val('').addClass('focused');
      }
    });
  });
}
