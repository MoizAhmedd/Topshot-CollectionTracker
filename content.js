let total_collection_value = 0;
if (window.location.href.includes('user') && window.location.href.includes('moments')) {
	console.log(window.location.href);
	window.onload = function () {
		var moments = [], l = document.links;
		for(var i=0; i<l.length; i++) {
			if (l[i].href.includes('/moment/')) {
				//get moment price
			}
		}
	}
} else {
	console.log('random page');
}
