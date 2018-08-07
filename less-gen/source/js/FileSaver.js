/* FileSaver.js
 * A saveAs() M2 UI FileSaver implementation.
 * 1.0.0 beta
 * 2016-06-16 18:25:19
 *
 * By Subodha Pathiraja,
 * License: MIT
 *
 */


var textToWrite;
var textToWrite2;
var less_v = '';
var obj = {}

function saveTextAsFile()
{

	var print = '';
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			print += prop + ': ' + obj[prop] + '; \r\n';
		}
	}


// grab the content of the form field and place it into a variable


	var value = "value="+print;

	$.ajax({
		url : '../less-gen.php',
		method : 'POST',
		data: value,
		success : function(res){
			console.log(res);
		},
		error : function(response){
			console.log('Error!');
			console.log(response);
		}
	});
}

function destroyClickedElement(event)
{
// remove the link from the DOM
	document.body.removeChild(event.target);
}

$(document).ready(function() {

	var theThing = $('.popup-input');
	var attribute = '';


	$('.section pre tr th').on('click', function(event){
		var posX = event.clientX;
		var posY = event.clientY;

		$('#inputTextToSave').val('');

		$(".popup-input").css({top: posY + "px"});
		$(".popup-input").css({left: posX+100 + "px"});

		attribute = $(this).next( "td" ).text();
		if(attribute.charAt(0) != '@'){
			attribute = $(this).text();
		}
		else{
			attribute = $(this).next( "td" ).text();
		}

		// if one valuse change more than 1 element style
		var optionList = attribute.substring(attribute.indexOf('@')+1).split('@');
		if(optionList.length > 1) {

			attribute = "@"+optionList[0];
		}



		/*if(){

		}*/


	});

	$('#inputTextToSave').on('keyup', function(event){



		less_v += attribute + ":  " + textToWrite + "; \r\n";

		obj[attribute] = $(this).val();

		var display = '';
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				display += prop + ': ' + obj[prop] + '; <br/>';
			}
		}

		$('#xxx').html(display);

		$('#test').click(function(){

			$.ajax({
				url : 'less-gen.php',
				method : 'POST',
				data: JSON.stringify(obj),
				contentType: 'application/json',
				success : function(res){
					console.log(res);
				},
				error : function(response){
					console.log('Error!');
					console.log(response);
				}
			});
		});

	});

});

