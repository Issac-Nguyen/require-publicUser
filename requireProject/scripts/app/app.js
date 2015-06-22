define(["jQuery", "kendo", "app/views/home", "app/phonegap/phonegap"], function($, kendo, homeView, phonegapAPI) {
    var _kendoApplication;
    
    return {
        init: function() {
            _kendoApplication = new kendo.mobile.Application(document.body, { transition: "slide" });
            phonegapAPI.createContact({"displayName": "aaaaaaa"})
        },
        views: {
            home: homeView
        },
        
    }
});