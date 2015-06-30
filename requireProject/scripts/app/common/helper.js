define(['./common'], function(common) {
	return {
		handlerErr: function(err) {
			alert(err);
		},
		datetimeString: function() {
			return Math.floor(Date.now());
		},
		initDrawonCanvas: function(canvasID) {
			var canvas = document.getElementById(canvasID);
			var height = common.windowHeight - common.heightHeader;
			canvas.width = common.windowWidth;
			canvas.height = height;
			var context = canvas.getContext("2d");
			context.strokeStyle = "#ff0000";
			context.lineJoin = "round";
			context.lineWidth = 5;

			var clickX = [];
			var clickY = [];
			var clickDrag = [];
			var paint;

			/**
			 * Add information where the user clicked at.
			 * @param {number} x
			 * @param {number} y
			 * @return {boolean} dragging
			 */
			function addClick(x, y, dragging) {
				clickX.push(x);
				clickY.push(y);
				clickDrag.push(dragging);
			}

			/**
			 * Redraw the complete canvas.
			 */
			function redraw() {
				// Clears the canvas
				context.clearRect(0, 0, context.canvas.width, context.canvas.height);

				for (var i = 0; i < clickX.length; i += 1) {
					if (!clickDrag[i] && i == 0) {
						context.beginPath();
						context.moveTo(clickX[i], clickY[i]);
						context.stroke();
					} else if (!clickDrag[i] && i > 0) {
						context.closePath();

						context.beginPath();
						context.moveTo(clickX[i], clickY[i]);
						context.stroke();
					} else {
						context.lineTo(clickX[i], clickY[i]);
						context.stroke();
					}
				}
			}

			/**
			 * Draw the newly added point.
			 * @return {void}
			 */
			function drawNew() {
				var i = clickX.length - 1
				if (!clickDrag[i]) {
					if (clickX.length == 0) {
						context.beginPath();
						context.moveTo(clickX[i], clickY[i]);
						context.stroke();
					} else {
						context.closePath();

						context.beginPath();
						context.moveTo(clickX[i], clickY[i]);
						context.stroke();
					}
				} else {
					context.lineTo(clickX[i], clickY[i]);
					context.stroke();
				}
			}

			function mouseDownEventHandler(e) {
				paint = true;
				var x = e.pageX - canvas.offsetLeft;
				var y = e.pageY - canvas.offsetTop;
				if (paint) {
					addClick(x, y, false);
					drawNew();
				}
			}

			function touchstartEventHandler(e) {
				paint = true;
				if (paint) {
					addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, false);
					drawNew();
				}
			}

			function mouseUpEventHandler(e) {
				context.closePath();
				paint = false;
			}

			function mouseMoveEventHandler(e) {
				var x = e.pageX - canvas.offsetLeft;
				var y = e.pageY - canvas.offsetTop;
				if (paint) {
					addClick(x, y, true);
					drawNew();
				}
			}

			function touchMoveEventHandler(e) {
				if (paint) {
					addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, true);
					drawNew();
				}
			}

			function setUpHandler(isMouseandNotTouch, detectEvent) {
				removeRaceHandlers();
				if (isMouseandNotTouch) {
					canvas.addEventListener('mouseup', mouseUpEventHandler);
					canvas.addEventListener('mousemove', mouseMoveEventHandler);
					canvas.addEventListener('mousedown', mouseDownEventHandler);
					mouseDownEventHandler(detectEvent);
				} else {
					canvas.addEventListener('touchstart', touchstartEventHandler);
					canvas.addEventListener('touchmove', touchMoveEventHandler);
					canvas.addEventListener('touchend', mouseUpEventHandler);
					touchstartEventHandler(detectEvent);
				}
			}

			function mouseWins(e) {
				setUpHandler(true, e);
			}

			function touchWins(e) {
				setUpHandler(false, e);
			}

			function removeRaceHandlers() {
				canvas.removeEventListener('mousedown', mouseWins);
				canvas.removeEventListener('touchstart', touchWins);
			}

			canvas.addEventListener('mousedown', mouseWins);
			canvas.addEventListener('touchstart', touchWins);
		},
		drawImageOnCanvas: function(dataURL, canvasID) {
			var img = new Image();
			img.src = dataURL;
			var width = common.windowWidth,
				height = common.windowHeight - common.heightHeader;
			// img.width = width;
			// img.height = height;
			var canvas = document.getElementById(canvasID);
			var context = canvas.getContext("2d");
			context.rotate(0.5 * Math.PI);
			img.onload = function() {
				// context.drawImage(img, 0, 0, width, height);
				context.drawImage(img, 0, 0, 0, 0, width, height);
			}
		}
	}
});