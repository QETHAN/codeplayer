/**
 * Created by QETHAN on 14-1-7.
 */
define(['jquery'], function ($) {

    return {
        init: function(){
            $(function(){
                //搜索
                var searchBox = $('#searchBox');
                var searchInput = searchBox.find('#searchInput');
                $('#searchBtn').on('click',function(){
                    var text = searchInput.val();
                    if($.trim(text).length) {
                        window.location.href = '/brand/index/searchBrand/key/'+text;
                    } else {
                        return false;
                    }
                });
                searchInput.on('keypress',function(e){
                    var code = e.keyCode || e.which;
                    if(code == 13) {
                        var text = searchInput.val();
                        if($.trim(text).length) {
                            window.location.href = '/brand/index/searchBrand/key/'+text;
                        } else {
                            return false;
                        }
                    }
                });

                //时间排序
                $('.zj-sort>span[data-id=time]').on('click',
                    function(){
                        if($(this).hasClass('up')) {
                            window.location.href = "/brand/index/index/sort/time_asc";
                        } else {
                            window.location.href = "/brand/index/index/sort/time_desc"
                        }
                    }
                );

                //投票排序
                $('.zj-sort>span[data-id=vote]').on('click',
                    function(){
                        if($(this).hasClass('up')) {
                            window.location.href = "/brand/index/index/sort/vote_asc";
                        } else {
                            window.location.href = "/brand/index/index/sort/vote_desc"
                        }
                    }
                );

                //点赞
                $('.zj-res-story>.title>.praise>i:not(".active")').on('click',function(){
                    var item = $(this);
                    if(!item.hasClass('active')) {
                        item.addClass('active');
                        var num = item.next();
                        $.ajax({
                            url: '/brand/operate/doIncStandardVote',
                            type: 'POST',
                            dataType: 'json',
                            data:{'obsd_id':item.data("obsd"),'ob_id':item.data('ob'),'standard_id':item.data('standard')}
                        }).done(function(){
                                item.parent().addClass('active');
                                item.next().html(parseInt(num.html(),10)+1);
                        });
                    }
                });
            });
        }
    }
});
