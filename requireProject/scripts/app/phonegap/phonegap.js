define(['../common/helper', '../common/common'], function(helper, common) {

	return {
		capturePicture: function(callback) {
			try {
                navigator.camera.getPicture(function(imageData) {
                    window.resolveLocalFileSystemURI(imageData, function(fileEntry) {
                        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
                                //The folder is created if doesn't exist
                                fileSys.root.getDirectory(common.folderImage, {
                                        create: true,
                                        exclusive: false
                                    },
                                    function(directory) {
                                        fileEntry.moveTo(directory, helper.datetimeString() + '.jpg', function(etr) {
                                            // self.lstImg.push({
                                            //     dataURL: etr.fullPath.substr(1)
                                            // });
                                            callback(etr.fullPath.substr(1));
                                        }, helper.handlerErr);
                                    },
                                    helper.handlerErr);
                            },
                            helper.handlerErr);
                    });
                }, helper.handlerErr, {
                    quality: 20,
                    // destinationType: navigator.camera.DestinationType.FILE_URL
                });
            } catch (err) {
                alert(err);
            }
		}
	}
});