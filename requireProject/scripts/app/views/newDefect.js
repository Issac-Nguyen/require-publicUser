define(['kendo', '../phonegap/phonegap', '../common/common', '../common/database', '../common/helper', './template/baseTemplate', './defects', './imageDetail'], function(kendo, phonegap, common, database, helper, baseTemplate, defectsView, imageDetailView) {
    var isDisableCapture = false;
    var validator;
    
    function resetModel(obj, cb) {
        helper.resetModel(obj, {
                              id: 'String',
                              name: 'String',
                              description: 'String'
                          });
        if (cb)
            cb();
    }
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
            
            validator = $("#form-newDefect").kendoValidator().data("kendoValidator");
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
            name: '',
            description: 'des',
                                        message: 'new Defect',
                                        onClickCancel: function(e) {
                                            resetModel(this, function() {
                                                $("#listImage").data("kendoMobileListView").dataSource.data([]);
                                            });
                                        },
                                        onClickAdd: function(e) {
                                            if (!validator.validate())
                                                return;
                                            var self = this;
                                            var formDefect = $("#form-newDefect");
                                            var name = this.get('name');
                                            var description = this.get('description');
                                            var objDefect = {};
                                            objDefect.id = this.get('id');
                                            objDefect.name = name;
                                            objDefect.description = description;
                                            objDefect.defectsArr = $("#listImage").data("kendoMobileListView").dataSource.data().toJSON();
                                            objDefect.createdDate = helper.currentDate();
                                            objDefect.createdTime = helper.currentTime();
                                            database.insertInto('defects', objDefect, function() {
                                                resetModel(self, function() {
                                                    $("#listImage").data("kendoMobileListView").dataSource.data([]);
                                                    defectsView.insertIntoListDefects(objDefect);
                                                    helper.goBack();
                                                });
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