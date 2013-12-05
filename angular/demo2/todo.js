/**
 * Created by QETHAN on 13-12-5.
 */
function TodoCtrl($scope) {
    $scope.todos = [
        {text:"学习 angular", done: true},
        {text:"创建一个angular app", done: false}
    ];

    $scope.addTodo = function() {
        $scope.todos.push({text:$scope.todoText, done:false});
        $scope.todoText = '';
    }

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo){
            count += todo.done ? 0 : 1;
            console.log('----->'+count);
        });
        return count;
    }

    $scope.archive = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo){
            if(!todo.done) {
                $scope.todos.push(todo);
            }
        });
    }

}
