define([], function() {
	var pixelRatio = window.devicePixelRatio || 1;
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
    var objIntervalProcessDefect;

	return {
		pixelRatio: pixelRatio,
		windowWidth: windowWidth,
		windowHeight: windowHeight,
		heightHeader: 0,
		folderImage: 'imgDefects',
        objIntervalProcessDefect: objIntervalProcessDefect,
        intervalProcessDefect: 1000
	}
});