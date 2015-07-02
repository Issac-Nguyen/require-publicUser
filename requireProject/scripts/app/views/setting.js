define(['jQuery', 'kendo', '../common/helper', '../common/database'], function($, kendo, helper, database) {
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
            },
            saveProfile: function(e) {
            	var profileDOM = $('#profileUser');
            	var companyID = profileDOM.find('#companyID').val();
            	var companyPassword = profileDOM.find('#companyPassword').val();
            	var username = profileDOM.find('#username').val();
            	var email = profileDOM.find('#email').val();
            	var contactNo = profileDOM.find('#contactNo').val();

            	var objProfile = {
            		companyID: companyID,
            		companyPassword: companyPassword,
            		username: username,
            		email: email,
            		contactNo: contactNo
            	};

            	database.insertInto('profile', objProfile);
            }
		}),
	}
});