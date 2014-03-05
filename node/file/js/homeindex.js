define(['jquery', 'infinitescroll', 'easing', 'scrollto'], function ($) {

    return {
        init: function(){
            var self = this;
            this.updown();
            this.resList();
            this.resDetail();
            this.zjFindForm();
            this.zjRespondForm();
            this.resSearch();
        },

        resSearch: function() {
            
            $(document).on("focusin", "#res-search-main", function() {
                $(this).closest(".search-command").addClass("focused");
            })

            $(document).on("focusout", "#res-search-main", function() {
                $(this).closest(".search-command").removeClass("focused");
            })

        },
        resList: function() {

            function showMessage(type,text) {

                "use strict";

                $('.message-text').html(text);
                $('.alert-message').removeClass("s f a").addClass(type).toggleClass('hide');
                setTimeout(function(){
                    $('.alert-message').toggleClass('hide');
                },2000);
            }

            $(".zj-res-authed").hover(function(){
                $(this).tooltip("toggle");
            })

            $(".ni-code-tip").hover(function(){
                $(this).popover("toggle");
            })


            $(".hover-item").hover(
                function () {
                    $(this).find(".res-meta").animate({opacity:'1'});
                },
                function () {
                    $(this).find(".res-meta").animate({opacity:'0'});
                }
            );

            var totalPage = $(".res-lists").data("maxpage"),
                readPage = 1;

                readPage++;  
                if(totalPage > 1){
                    $("#res-list-pagination a").attr("href","/restaurant/index/index/p/"+ readPage);  
                }

            $('.res-lists').infinitescroll({
                navSelector: "#res-list-pagination",
                nextSelector: "#res-list-pagination a",
                itemSelector: ".res-item",
                debug: true,
                animate: true,
                extraScrollPx: 200,
                bufferPx: 40,
                errorCallback: function() {
                    alert('error');
                },
                localMode: true,
                dataType: 'html',
                loading: {
                    img: '/Public/img/assets/loader.gif',
                    msgText: '',
                    finishedMsg: '',
                    selector: '#loading-block'
                }
            }, function(newElems) {
                var $newElems = $(newElems);
                    $hoverItem = $newElems.find(".hover-item");

                $('.res-list-wrapper').append($newElems);
                $hoverItem.hover(
                    function () {
                        $(this).find(".res-meta").animate({opacity:'1'});
                    },
                    function () {
                        $(this).find(".res-meta").animate({opacity:'0'});
                    }
                );
                readPage++;
                if(readPage>totalPage){
                    $("#res-list-pagination").remove();  
                    $('.res-lists').infinitescroll({state:{isDone:true}});  
                }else{  
                   $("##res-list-pagination a").attr("href","/restaurant/index/index/p/"+readPage);  
                } 

            });

        },
        zjFindForm: function() {

            function showMessage(type,text) {

                "use strict";

                $('.message-text').html(text);
                $('.alert-message').removeClass("s f a").addClass(type).toggleClass('hide');
                setTimeout(function(){
                    $('.alert-message').toggleClass('hide');
                },2000);
            }

            $("#find-form-submit").on("click", function() {
                var resLocation = $("#res-location").val(),
                    resAddress = $("#res-address").val(),
                    resName = $("#res-name").val(),
                    nickName = $("#nick-name").val(),
                    phoneNum = $("#phone-num").val(),
                    authCode = $("#auth-code").val(),

                    gexing = $("#gexing").val(),
                    wenhua = $("#wenhua").val(),
                    pinzhi = $("#pinzhi").val(),

                    story = [];

                if ( resName == "" ) {
                    showMessage("a","请输入餐厅名字");
                    return;
                }

                if ( resLocation == "" ) {
                    showMessage("a","请选择餐厅区域");
                    return;
                }

                if ( nickName == "" ) {
                    showMessage("a","请输入您的名字");
                    return;
                }

                if ( phoneNum == "" ) {
                    showMessage("a","请输入您的电话号码");
                    return;
                }

                if ( gexing == "" && wenhua == "" && pinzhi == "" ) {
                    showMessage("a","请至少输入一项您的描述");
                    return;
                } else {
                    if ( wenhua !== "" ) {
                        var temp = { "star_id": 1, "star_story": wenhua };
                        story.push(temp);
                    }
                    if ( pinzhi !== "" ) {
                        var temp = { "star_id": 2, "star_story": pinzhi };
                        story.push(temp);
                    }
                    if ( gexing !== "" ) {
                        var temp = { "star_id": 3, "star_story": gexing };
                        story.push(temp);
                    }
                }


                $.post("/service/operateExplore/doAddPreRestaurant",{
                    "author": nickName,
                    "area": resLocation,
                    "address": resAddress,
                    "rname": resName,
                    "star_story": story
                }, function(res) {
                    if ( res == 1 ) {
                        showMessage("s","提交成功");
                        location.href = "/service/operateExplore/doAddSuccess";
                        return;
                    } else if ( res == 0 ) {
                        showMessage("f","提交失败");
                        return;
                    }
                });
            });

        },
        zjRespondForm: function(){

            function showMessage(type,text) {

                "use strict";

                $('.message-text').html(text);
                $('.alert-message').removeClass("s f a").addClass(type).toggleClass('hide');
                setTimeout(function(){
                    $('.alert-message').toggleClass('hide');
                },2000);
            }

            $("#respond-form-submit").on("click", function(e){

                var tel = $("#tel-num").val(),
                    advice = $("#advice").val();

                if ( tel == "" ) {
                    showMessage("a","请输入您的联系方式");
                    return;
                } else if ( advice == "" ) {
                    showMessage("a","请输入您的意见");
                    return;
                }

                 $.post("/service/operateFeedback/doAddFeedback",{
                    "detail": advice,
                    "contact": tel
                }, function(data) {
                    if(data.code == 200) {
                        console.log(200);
                        window.location.href = "/service/operateFeedback/doAddSuccess";
                    } else if(data.code == 400) {
                        showMessage("f","表单信息不完整");
                        return;
                    } else if(data.code == 500) {
                        showMessage("f","提交失败");
                        return;
                    }
                });             
                  
                e.preventDefault();
            })
        },
        updown: function(){

            $('#updown .up').on("click", function(){
                $('html,body').stop().scrollTo(0, 200);
            });

            $('#updown .down').on("click", function(){
                var $target = $(document).height();
                $('html,body').stop().scrollTo($target, 200);
            });

            if($(window).scrollTop() >= 100){

                $('#updown').fadeIn(300);
            }else{
                $('#updown').fadeOut(300);
            }

            $(window).scroll(function() {
                if($(window).scrollTop() >= 100){

                    $('#updown').fadeIn(300);
                }else{
                    $('#updown').fadeOut(300);
                }
            });

        },
        resDetail: function() {

            function showMessage(type,text) {

                "use strict";

                $('.message-text').html(text);
                $('.alert-message').removeClass("s f a").addClass(type).toggleClass('hide');
                setTimeout(function(){
                    $('.alert-message').toggleClass('hide');
                },2000);
            }

            var $window = $(window),
                $body = $(document.body),
                $rdt = $("#res-detail-trigger"),
                $navItem = $rdt.find("a"),
                $offsetTop;

            if($rdt.offset() != undefined) {
                $offsetTop = $rdt.offset().top
            }

            $body.scrollspy({
              target: "#res-detail-trigger",
              offset: $offsetTop
            })

            $window.on('load', function () {
              $body.scrollspy('refresh')
            })

            $rdt.affix({
                offset: {
                  top: function() {
                    var offsetTop = $rdt.offset().top + 50;

                    return (this.top = offsetTop + 50);
                  }
                }
            })

            $navItem.on("click", function(e) {
                e.preventDefault();
                var $target = $(this).attr("href");
                $('html,body').stop().scrollTo($target, 500);
            })

            $(".res-detail-zan").on("click", function(e) {

                var parents = $(this).parents(".imgtxt-block"),
                    starId = parents.data("star-id"),
                    resId = parents.data("r-id"),
                    sdId = parents.data("sd-id"),
                    favNum = parents.find(".fav-num-text").html(), 
                    that = $(this);

                $.post("/restaurant/operate/doIncStarVote",{"r_id": resId, "star_id": starId, "sd_id": sdId}, function(res) {
                    if(res == 1) {
                        var num = parseInt(favNum) + 1;
                        that.parents(".imgtxt-block").find(".fav-num-text").html(num);
                        showMessage("s","赞成功");
                        that.addClass("disabled");
                        that.html("已赞");
                    } else if (res == 0) {
                        showMessage("f","赞失败");
                    } else if ( res == 2 ) {
                        showMessage("a","您今天这项已经赞过了，不能重复再赞了");
                    }
                });

                e.preventDefault();
                
            })           
        }

    };
});
