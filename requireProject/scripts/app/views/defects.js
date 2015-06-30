define(['jQuery', 'kendo', './template/baseTemplate', './defect', '../common/common'], function($, kendo, baseTemplate, defectView, common) {
	var groupedData = [{
		name: "foo",
		description: 'des foo'
	}, {
		name: "bar",
		description: 'des bar'
	}, {
		name: "baz",
		description: 'des baz'
	}];
    
     var groupedData1 = [
        {name: "Sashimi salad", letter: "S" },
        {name: "Chirashi sushi", letter: "C" },
        {name: "Seaweed salad", letter: "S" },
        {name: "Edamame", letter: "E" },
        {name: "Miso soup", letter: "M" },
        {name: "Maguro", letter: "M" },
        {name: "Shake", letter: "S" },
        {name: "Shiromi", letter: "S" },
        {name: "Tekka maki", letter: "T" },
        {name: "Hosomaki Mix", letter: "H" },
        {name: "California rolls", letter: "C" },
        {name: "Seattle rolls", letter: "S" },
        {name: "Spicy Tuna rolls", letter: "S" },
        {name: "Ebi rolls", letter: "E" },
        {name: "Chicken Teriyaki", letter: "C" },
        {name: "Salmon Teriyaki", letter: "S" },
        {name: "Gohan", letter: "G" },
        {name: "Tori Katsu", letter: "T" },
        {name: "Yaki Udon", letter: "Y" }
    ];
	return {
		init: function(initEvt) {
			$("#listDefects").kendoMobileListView({
				dataSource: kendo.data.DataSource.create({data: groupedData1, group: "letter"}),
				template: baseTemplate.templateDefect,
				filterable: {
					field: "name"
				},
				click: function(e) {
					var item = e.dataItem;
					defectView.setDataDetailToView(item);
				}
			});
		},

		beforeShow: function(beforeShowEvt) {
			// ... before show event code ...
		},

		show: function(showEvt) {
			// ... show event code ...
		},
		afterShow: function(e) {
			common.heightHeader = e.view.element.find('.km-header').height();
		},

		viewModel: kendo.observable({
			message: 'defects',
            clickNew: function(e) {
                 $("#modalview-login").kendoMobileModalView("open");
            }
		}),
	}
});