/**
 * Created by QETHAN on 14-2-11.
 */
window.onload = function(){
    /*****************************
     * 关于嘴角二级菜单
     *****************************/
//    var about = document.querySelector('.global-header-item.about');
//    var subnav = document.querySelector('.global-header-item.about .subnav');
//    about.addEventListener('mouseover', function () {
//        subnav.style.display = 'block';
//    });
//    about.addEventListener('mouseout', function () {
//        subnav.style.display = 'none';
//    });
    /*****************************
     * 搜索框 边框高亮
     *****************************/
    var searchInput = document.getElementById('searchInput');
    var searchBox = document.getElementById('searchBox');
    if(searchInput) {
        searchInput.onfocus = function(){
            searchBox.className = searchBox.className + ' '+'focus';
        }
        searchInput.onblur = function(){
            searchBox.className = searchBox.className.replace('focus','').replace(/(^\s+)|(\s+$)/g,'');
        }
    }

};



