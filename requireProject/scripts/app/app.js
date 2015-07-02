define(['jQuery', 'kendo', 'app/views/baseView', 'app/common/database'], function($, kendo, baseView, database) {
	var _kendoApplication;

	return {
		getAppObj: function() {
			return _kendoApplication;
		},
		init: function() {
			database.start();
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