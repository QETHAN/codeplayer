/**
 * Created by QETHAN on 13-12-8.
 */
function RestuarantTableController($scope) {
    $scope.directory = [
        {name: 'The Handsome Heifer', cuisine: 'BBQ'},
        {name:"'Green\'s Green Greens", cuisine: 'Salads'},
        {name: 'House of Fine Fish', cuisine: 'Seafood'}
    ];

    $scope.selectRestaurant = function (row) {
        $scope.selectedRow = row;
    };
}