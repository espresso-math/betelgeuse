/**************************************************************************************
*
*									~Misc~
*
**************************************************************************************/


// Initiate Katex
$(document).ready( function () {
	var math = "";
	var math_element = document.getElementsByTagName("maths");
	for (var i=0; i<math_element.length; i++) {
		math = math_element[i].innerHTML;
		if (math_element[i].getAttribute("display") === "") {
			katex.render(math, math_element[i], { displayMode: true });
		} else {
			katex.render(math, math_element[i]);
		}
	}
});


// Initiate Layzr Image loader

const lazyr = Layzr({
	normal: 'src'
});


// Initiate Better Underlining

$(".post-content > * > a").addClass("underline");
