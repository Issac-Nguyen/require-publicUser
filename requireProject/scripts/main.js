require.config({
    paths: {
        jQuery: "libs/kendo/js/jquery.min",
        kendo: "libs/kendo/js/kendo.mobile.min"
    },
    shim: {
        jQuery: {
            exports: "jQuery"
        },
        kendo: {
            deps: ["jQuery"],
            exports: "kendo"
        }
    }
});

var app;

require(["app/app"], function(application){
   app = application;
   document.addEventListener("deviceready", function(){
       app.init();
   });
   
});