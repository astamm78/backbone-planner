var PlannerDate = Backbone.Model.extend({
 defaults: function() {
    return {
      day: "Today's Date"
    };
  }
 });

var today = new PlannerDate({"day": new Date()});

var PlannerHour = Backbone.Model.extend({
  defaults: function() {
    return {
      hour: "Not Defines",
      task: "Default Task"
    };
  }
});

var PlannerHourView = Backbone.View.extend({
  tagName: "li",

  initialize: function() {
    this.template = _.template($('#hour-template').html());
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});

var PlannerHourList = Backbone.Collection.extend({
  model: PlannerHour
});

var PlannerDateView = Backbone.View.extend({
  tagName: "div",
  className: "planner_date",

  initialize: function() {
    this.template = _.template($('#day-template').html());

    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template(today.attributes));
    this.collection.forEach(function(hour) {
      var hourView = new PlannerHourView({"model": hour});
      this.$el.find('ul').append(hourView.render().$el);
    }, this);
    return this;
  }
});

var planner = new PlannerHourList();

$(document).ready(function() {
  var date = new PlannerDateView({"collection": planner});
  $('form').submit(function(event){
    event.preventDefault();
    var hour = $(this).find("#hour").val();
    var task = $(this).find("#task").val();
    planner.add(new PlannerHour({"hour": hour, "task": task}));
    $('#container').append(date.render().$el);
  });
});