define(['kendo', '../phonegap/phonegap', './template/baseTemplate', '../common/common', '../common/helper'], function(kendo, phonegap, baseTemplate, common, helper) {
    return {
        init: function(initEvt) {
            // ... init event code ...
            //var width = common.windowWidth,
            //	height = common.windowHeight - common.heightHeader;
            //this.viewModel.set('widthImage', width);
            //this.viewModel.set('heightImage', height);
            //this.model.set('id', helper.timestampString());
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
                                        id: '',
                                        name: '',
                                        dataURL: '',
                                    }),
        setDataIntoView: function(obj) {
            this.viewModel.set('id', obj.id);
            this.viewModel.set('dataURL', obj.dataURL);
        }
    }
});