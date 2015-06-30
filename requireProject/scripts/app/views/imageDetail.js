define(['kendo', '../phonegap/phonegap', './template/baseTemplate', '../common/helper'], function(kendo, phonegap, baseTemplate, helper) {

	return {
		init: function(initEvt) {
			// ... init event code ...
		},

		beforeShow: function(beforeShowEvt) {
			// ... before show event code ...

		},

		show: function(showEvt) {
			// ... show event code ...
			// var params = showEvt.view.params;
			var dataURL = this.model.get('dataURL');
			// alert(app);
			helper.initDrawonCanvas('imgDetail');
			helper.drawImageOnCanvas(dataURL, 'imgDetail');
		},

		viewModel: kendo.observable({
			name: '',
			dataURL: '',
		}),
		setDataIntoView: function(obj) {
			this.viewModel.set('dataURL', obj.dataURL);
		}
	}
});