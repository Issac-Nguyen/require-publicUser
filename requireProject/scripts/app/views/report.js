define(['kendo', 'underscore', '../common/common'], function(kendo, _, common) {
	return {
		init: function(initEvt) {
            var defectList = common.defectsList;
            var i = 1;
            for(var o in defectList) {
                var item = defectList[o];
                switch(i%3) {
                    case 0:
                        item.status = 'done';
                    break;
                    case 1:
                        item.status = 'half';
                    break;
                    case 2:
                        item.status = 'none';
                    break;
                }
                
                i++;
            }
            
            var data = _.countBy(defectList, function(o){
                    return o.status; 
            });
            
            var datasource = [];
            
            for(var o in data) {
                var item = {};
                item.category = o;
                item.value = data[o];
                
                datasource.push(item);
                }
            
			// ... init event code ...
            $("#chartDefect").kendoChart({
                title: {
                    position: "top",
                    text: "Defects Status"
                },
                legend: {
                    visible: false
                },
                chartArea: {
                    height: common.windowHeight*80/100,
                    background: ""
                },
                seriesDefaults: {
                    labels: {
                        visible: true,
                        background: "transparent",
                        template: "#= category #: \n #= value#%"
                    }
                },
                series: [{
                    type: "pie",
                    data: datasource
                }],
                tooltip: {
                    visible: true,
                    format: "{0}%"
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
			message: 'report',
		}),
	}
});