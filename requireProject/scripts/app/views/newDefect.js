define(['kendo', '../phonegap/phonegap', '../common/common', '../common/database', '../common/helper', './template/baseTemplate', './imageDetail'], function(kendo, phonegap, common, database, helper, baseTemplate, imageDetailView) {
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

        },

        beforeShow: function(beforeShowEvt) {
            // ... before show event code ...
        },

        show: function(showEvt) {
            // ... show event code ...
            //get id of defect
            if (this.model.get('id') == '')
                this.model.set('id', helper.timestampString());
        },

        viewModel: kendo.observable({
            id: '',
            message: 'new Defect',
            onClickCancel: function(e) {
                helper.resetModel(this, {
                    id: 'String'
                }, function() {
                    $("#listImage").data("kendoMobileListView").dataSource.data([]);
                });
            },
            onClickAdd: function(e) {
                var self = this;
                var objDefect = {};
                objDefect.id = this.get('id');
                objDefect.defectsArr = $("#listImage").data("kendoMobileListView").dataSource.data().toJSON();
                objDefect.createdDate = helper.currentDate();
                objDefect.createdTime = helper.currentTime();
                database.insertInto('defects', objDefect, function() {
                    helper.resetModel(self, {
                        id: 'String'
                    }, function() {
                        $("#listImage").data("kendoMobileListView").dataSource.data([]);
                    });
                    helper.goBack();
                });
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
                    id: helper.timestampString(),
                    dataURL: "public/images/test.jpg"
                });
            }
        }),
    }
});