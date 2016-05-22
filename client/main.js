Todos = new Mongo.Collection('todos');

Meteor.subscribe('todos');
Template.main.helpers({
    todos: function() {
        return Todos.find({}, {sort: { createdAt: -1 } });
    }
});

Template.main.events({
    "submit .new-todo": function(event) {
        var text = event.target.text.value;
        var userId = Meteor.userId();
        var userName = Meteor.user().username;
        Meteor.call('addTodo', text, userId, userName);

        //clear form
        event.target.text.value = "";

        //Prevent from form submit
        return false;
    },
    "click .toggle-checked": function(event) {
      Meteor.call('setChecked', this._id, event.target.checked);
    },
    "click .delete-todo": function(event) {
      if(confirm("Are you sure?")) {
        Meteor.call('deleteTodo', this._id);
      }
    }
})

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

//Meteor methods
// Meteor.methods({
//   addTodo: function(text) {
//     if (!Meteor.userId()){
//       throw new Meteor.Error('not-authorized');
//     }
//     Todos.insert({
//         text: text,
//         createdAt: new Date(),
//         userId: Meteor.userId(),
//         userName: Meteor.user().username
//     });
//   },
//   deleteTodo: function(todoId) {
//     Todos.remove(todoId);
//   },
  // setChecked: function(todoId, setChecked) {
  //   var todo = Todos.findOne(todoId);
  //   console.log(todo.userId !== Meteor.userId(),Meteor.userId(),todo.userId);
  //   if(todo.userId !== Meteor.userId()) {
  //     throw new Meteor.Error('not-authorized');
  //   }else{
  //     Todos.update( todoId, {$set:{checked: setChecked }} );
  //   }
  // }
// });
