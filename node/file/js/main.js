/**
 * 全局配置
 */
requirejs.config({

    baseUrl: "/Public/js",

    // 设置模块
    paths: {

        /* vendor */
        "jquery": "vendor/jquery-1.10.2.min",
        "bootstrap":"vendor/bootstrap.min",

        /* plugins */
        "homeindex": "homeindex",
        "brand": "brand",
        "groupPhoto": "groupphoto",
        "easing": "plugins/jquery.easing.1.3",
        "scrollto": "plugins/jquery.scrollto.min",
        "alertify": "plugins/alertify.min",
        "infinitescroll": "plugins/jquery.infinitescroll.min"
    },
    shim: {
        "easing": ["jquery"],
        "scrollto": ["jquery"],
        "bootstrap": ["jquery"],
        "infinitescroll": ["jquery"],
        "alertify": ["jquery"],
        "homeindex": ['jquery', "bootstrap", "easing", "scrollto", "infinitescroll"]
    }
});

/**
 * 初始化
 */
requirejs(['homeindex','brand'], function(homeindex,brand){
    homeindex.init();
    brand.init();
});