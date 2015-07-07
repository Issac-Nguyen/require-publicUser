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
        {id: 1, name: "Sashimi salad", letter: "S" },
        {id: 2, name: "Chirashi sushi", letter: "C" },
        {id: 3, name: "Seaweed salad", letter: "S" },
        {id: 4, name: "Edamame", letter: "E" },
        {id: 5, name: "Miso soup", letter: "M" },
        {id: 6, name: "Maguro", letter: "M" },
        {id: 7, name: "Shake", letter: "S" },
        {id: 8, name: "Shiromi", letter: "S" },
        {id: 9, name: "Tekka maki", letter: "T" },
        {id: 10, name: "Hosomaki Mix", letter: "H" },
        {id: 11, name: "California rolls", letter: "C" },
        {id: 12, name: "Seattle rolls", letter: "S" },
        {id: 13, name: "Spicy Tuna rolls", letter: "S" },
        {id: 14, name: "Ebi rolls", letter: "E" },
        {id: 15, name: "Chicken Teriyaki", letter: "C" },
        {id: 16, name: "Salmon Teriyaki", letter: "S" },
        {id: 17, name: "Gohan", letter: "G" },
        {id: 18, name: "Tori Katsu", letter: "T" },
        {id: 19, name: "Yaki Udon", letter: "Y" }
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