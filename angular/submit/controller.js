/**
 * Created by QETHAN on 13-12-6.
 */
var Ctrl = function ($scope) {
    $scope.skills = [];

    $scope.skill = '';

    $scope.submit = function() {
        if(!!$scope.skill) {
            $scope.skills.push($scope.skill);
        }
        $scope.skill = '';
    }
}
