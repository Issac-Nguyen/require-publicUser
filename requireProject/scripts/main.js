require.config({
                   paths:{
        jQuery: "libs/jquery-1.10.2.min",
        kendo: "libs/kendo.mobile.min"
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

require(['app/app'], function(application) {
    app = application;
    
    function onDeviceReady() {
        console.log("deviceReady");
        app.init();                         //now the app content is loaded after the device is ready :)
    }
    
    document.addEventListener("deviceready", onDeviceReady, false);
    //app.init();
});