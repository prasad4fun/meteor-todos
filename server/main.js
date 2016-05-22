Todos = new Mongo.Collection('todos');

//Meteor methods
Meteor.methods({
    addTodo: function(text, userId, userName) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Todos.insert({
            text: text,
            createdAt: new Date(),
            userId: userId,
            userName: userName
        });
    },
    deleteTodo: function(todoId) {
        var todo = Todos.findOne(todoId);
        if (todo.userId !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Todos.remove(todoId);
    },
    setChecked: function(todoId, setChecked) {
        var todo = Todos.findOne(todoId);
        if (todo.userId !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Todos.update(todoId, {
            $set: {
                checked: setChecked
            }
        });
    }
});

Meteor.publish('todos', function() {
    if (!this.userId) {
        return Todos.find();
    } else {
        return Todos.find({
            userId: this.userId
        });
    }
})
