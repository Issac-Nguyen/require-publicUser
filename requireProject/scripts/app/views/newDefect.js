define(['kendo', '../phonegap/phonegap', './template/baseTemplate', './imageDetail'], function(kendo, phonegap, baseTemplate, imageDetailView) {
	return {
		init: function(initEvt) {
			// ... init event code ...
			$("#listImage").kendoMobileListView({
				dataSource: kendo.data.DataSource.create({
					// data: [{
					// 	dataURL: '1'
					// }]
					data: []
				}),
				template: baseTemplate.templateImage,
				click: function(e) {
					var item = e.dataItem;
					imageDetailView.setDataIntoView(item);
				}
			});
		},

		beforeShow: function(beforeShowEvt) {
			// ... before show event code ...
		},

		show: function(showEvt) {
			// ... show event code ...
		},

		viewModel: kendo.observable({
			message: 'new Defect',
			// source: [],
			addImage: function() {
				var self = this;
				phonegap.capturePicture(function(dataURL) {
					// self.source.push({dataURL: dataURL});
					$("#listImage").data("kendoMobileListView").dataSource.add({
						dataURL: dataURL
					});
				});
				// $("#listImage").data("kendoMobileListView").dataSource.add({
				// 	dataURL: '2'
				// });
			}
		}),
	}
});