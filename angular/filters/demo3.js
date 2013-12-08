/**
 * Created by QETHAN on 13-12-6.
 */
var TableFilterCtrl = function($scope,$filter) {
    $scope.friends = [{
        name: '男丁格爾',
        age: 18,
        skills: ['jQuery', 'JavaScript', 'Angular.js']
    }
// 略...
        , {
            name: '布魯克',
            age: 90,
            skills: ['催眠曲·輪舞', '鼻唄三丁·矢筈斬', '冰凍劍', '哼歌·吹雪斬']
        }];

    //没有效果
    $scope.search = {age: '18'};
    $filter('filter')($scope.friends, $scope.search, true);
}
