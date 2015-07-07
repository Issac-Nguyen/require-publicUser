define(["jQuery"], function($) {
	function renderData() {
		console.log("inside callback");
	}

	function getData(options) {
		$.ajax({
			url: options.apiURL,
			dataType: options.format,
			method: options.method,
			jsonpCallback: options.jsonpCallback,
			success: options.successCallback || renderData,
			error: null,
			timeout: options.timeout
		});
	}

	return {
		getData: getData
	}
});