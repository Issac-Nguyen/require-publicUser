define(['kendo', '../phonegap/phonegap', '../common/common', '../common/helper', './template/baseTemplate', './imageDetail'], function(kendo, phonegap, common, helper, baseTemplate, imageDetailView) {
    var isDisableCapture = false;
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
            //get id of defect
            this.model.set('id', helper.timestampString());
        },

        beforeShow: function(beforeShowEvt) {
            // ... before show event code ...
        },

        show: function(showEvt) {
            // ... show event code ...
        },

        viewModel: kendo.observable({
                                        id: '',
                                        message: 'new Defect',
                                        onClickCancel: function(e) {
                                           app.getAppObj().view().destroy();
                                        },
                                        addImage: function(e) {
                                            var self = this;
                                            
                                            if ($("#listImage").data("kendoMobileListView"))
                                                isDisableCapture = $("#listImage").data("kendoMobileListView").dataSource.total() == common.maximumImageCapture;
                                            
                                            if (isDisableCapture)
                                                return;
                                           
                                            //phonegap.capturePicture(function(dataURL) {
                                            //self.source.push({dataURL: dataURL});
                                            //$("#listImage").data("kendoMobileListView").dataSource.add({
                                            //	dataURL: dataURL
                                            //});
                                            //});
                                            $("#listImage").data("kendoMobileListView").dataSource.add({
                                                                                                           dataURL: "public/images/test.jpg"
                                                                                                       });
                                        }
                                    }),
    }
});