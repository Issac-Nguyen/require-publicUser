define(['jQuery', 'kendo', 'app/views/baseView', 'app/common/helper','app/common/common'], function($, kendo, baseView, helper, common) {
	var _kendoApplication;

	return {
		getAppObj: function() {
			return _kendoApplication;
		},
		init: function() {
			
			kendo.UserEvents.defaultThreshold(20);
			_kendoApplication = new kendo.mobile.Application(document.body, {
				transition: 'slide',
                useNativeScrolling: true,
                init: function() {
                    var self = this;
                    this.showLoading();
                    helper.initDatabase(function(){
                        helper.getAllDefectData(function(data){
                            //common.defectsList = data;
                            self.view().model.initDefectsList(data);
                            self.hideLoading();});
                          
                    });
                }
			});

            
            
		},
		views: {
			defects: baseView.defectsView,
			defect: baseView.defectView,
			report: baseView.reportView,
			setting: baseView.settingView,
			newDefect: baseView.newDefectView,
			imageDetail: baseView.imageDetailView
		}
	}
});