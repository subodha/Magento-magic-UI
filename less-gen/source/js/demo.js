/*! FileSaver.js demo script
 *  2016-05-26
 *
 *  By Eli Grey, http://eligrey.com
 *  License: MIT
 *    See LICENSE.md
 */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/demo/demo.js */

/*jshint laxbreak: true, laxcomma: true, smarttabs: true*/
/*global saveAs, self*/

(function(view) {
"use strict";
// The canvas drawing portion of the demo is based off the demo at
// http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
var
	  document = view.document
	, $ = function(id) {
		return document.getElementById(id);
	}
	, session = view.sessionStorage
	// only get URL when necessary in case Blob.js hasn't defined it yet
	, get_blob = function() {
		return view.Blob;
	}

	, canvas = $("canvas")
	, canvas_options_form = $("canvas-options")
	, canvas_filename = $("canvas-filename")
	, canvas_clear_button = $("canvas-clear")

	, text = $("text")
	, text_options_form = $("text-options")
	, text_filename = $("text-filename")

	, html = $("html")
	, html_options_form = $("html-options")
	, html_filename = $("html-filename")

	, ctx = ""
	, drawing = false
	, x_points = session.x_points || []
	, y_points = session.y_points || []
	, drag_points = session.drag_points || []
	, add_point = function(x, y, dragging) {
		x_points.push(x);
		y_points.push(y);
		drag_points.push(dragging);
	}
/* 	, draw = function(){
		canvas.width = canvas.width;
		ctx.lineWidth = 6;
		ctx.lineJoin = "round";
		ctx.strokeStyle = "#000000";
		var
			  i = 0
			, len = x_points.length
		;
		for(; i < len; i++) {
			ctx.beginPath();
			if (i && drag_points[i]) {
				ctx.moveTo(x_points[i-1], y_points[i-1]);
			} else {
				ctx.moveTo(x_points[i]-1, y_points[i]);
			}
			ctx.lineTo(x_points[i], y_points[i]);
			ctx.closePath();
			ctx.stroke();
		}
	} */
/* 	, stop_drawing = function() {
		drawing = false;
	} */

	// Title guesser and document creator available at https://gist.github.com/1059648
	, guess_title = function(doc) {
		var
			  h = "h6 h5 h4 h3 h2 h1".split(" ")
			, i = h.length
			, headers
			, header_text
		;
		while (i--) {
			headers = doc.getElementsByTagName(h[i]);
			for (var j = 0, len = headers.length; j < len; j++) {
				header_text = headers[j].textContent.trim();
				if (header_text) {
					return header_text;
				}
			}
		}
	}
	, doc_impl = document.implementation

;


  if (typeof x_points === "string") {
	x_points = JSON.parse(x_points);
} if (typeof y_points === "string") {
	y_points = JSON.parse(y_points);
} if (typeof drag_points === "string") {
	drag_points = JSON.parse(drag_points);
} if (session.canvas_filename) {
	canvas_filename.value = session.canvas_filename;
} if (session.text) {
	text.value = session.text;
} if (session.text_filename) {
	text_filename.value = session.text_filename;
}

text_options_form.addEventListener("submit", function(event) {
	event.preventDefault();
	var BB = get_blob();
	saveAs(
		  new BB(
			  [text.value || text.placeholder]
			, {type: "text/plain;charset=" + document.characterSet}
		)
		, (text_filename.value || text_filename.placeholder) + ".txt"
	);
}, false);


view.addEventListener("unload", function() {

	session.text = text.value;
	session.text_filename = text_filename.value;


}, false);
}(self));
