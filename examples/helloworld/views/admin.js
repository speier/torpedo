module.exports = Backbone.View.extend({
  id: 'admin-view',
  template: require('templates/admin'),
  initialize: function() {
    this.render = _.bind(this.render, this);
  },
  render: function() {
    this.$el.html(this.template.render());
    $('body').html(this.el);
    return this;
  }
});
