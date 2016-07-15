/***********************************************************************************
*
*   	Pagination Library. Copyright 2016. Released under the MIT license.
*		
***********************************************************************************/


function paginate(avg_count) {

	var page_element = document.getElementsByTagName('p');
	var page_content = page_element.innerHTML;
	console.log("called");


	var char_count = 0;
	var page_no = 1;

	for (var i=0; i<page_element.length; i++) {
		var stripped = page_element[i].innerHTML.replace('  ', '');
		char_count += stripped.length;

		if (i===1) {
			page_element[i].setAttribute('class', 'dropcap');
		}

		if (char_count >= avg_count) {
			var di = document.createElement('div');
			di.setAttribute('class', 'paginate');
			di.innerHTML = "<span class='page-no'>" + page_no + "</span>";
			page_element[i].appendChild(di);
			page_element[i+1].setAttribute('id', 'no-indent');
			page_no++;
			char_count = 0;
		}
	}


}

paginate(2400); // Call with avg number of character per page.
