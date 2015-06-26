define(["jQuery", "kendo", "app/views/base", "app/phonegap/phonegap"], function($, kendo, baseView, phonegapAPI) {
    var _kendoApplication;
    
    return {
        init: function() {
            _kendoApplication = new kendo.mobile.Application(document.body, { transition: "slide" });
            //phonegapAPI.createContact({"displayName": "aaaaaaa"})
        },
        views: {
            profile: baseView.profileView,
            settings: baseView.settingsView,
            defects: baseView.defectsView
        },
        
    }
});