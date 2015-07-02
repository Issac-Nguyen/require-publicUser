define(['kendo', '../common/helper'], function(kendo, helper) {
	return {
		init: function(initEvt) {
			// ... init event code ...
		},

		beforeShow: function(beforeShowEvt) {
			// ... before show event code ...
		},

		show: function(showEvt) {
			// ... show event code ...
		},

		viewModel: kendo.observable({
			message: 'setting',
            vlname: 'name',
            onChangeAutoProcessDefect: function(e) {
                helper.handleProcessDefect(e.checked);
            }
		}),
	}
});