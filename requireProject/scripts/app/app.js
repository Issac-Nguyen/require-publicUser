define(['jQuery', 'kendo', 'app/views/baseView'], function($, kendo, baseView) {
	var _kendoApplication;

	return {
		getAppObj: function() {
			return _kendoApplication;
		},
		init: function() {
			kendo.UserEvents.defaultThreshold(20);
			_kendoApplication = new kendo.mobile.Application(document.body, {
				transition: 'slide'
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