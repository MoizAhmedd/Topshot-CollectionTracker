let total_collection_value = 0;
let currency = '';
let sign = '';
if (window.location.href.includes('user') && window.location.href.includes('moments')) {
	window.onload = function () {
		var moments = [], l = document.links;
		let responsesReceived = 0;
		document.getElementsByClassName('hhqiXA')[0].innerHTML = `<h1 id="loading-collection" style="color:white;display:block;">Loading total collection value...</h1>` + document.getElementsByClassName('hhqiXA')[0].innerHTML;;
		for(var i=0; i<l.length; i++) {
			if (l[i].href.includes('/moment/')) {
				moments.push(l[i]);
				//get moment price
			}
		}
		for(let momentIdx = 0; momentIdx<moments.length; momentIdx++) {
			chrome.runtime.sendMessage({type: "moment", options: { 
				link:moments[momentIdx].href,
				idx:momentIdx
			}}, function (response) {
				responsesReceived += 1;
				console.log(`Responses received:${responsesReceived}`);
				currency = response.value[0];
				sign = response.value[1];
				total_collection_value += Number(response.value[2]);
				showMomentPrice(moments,response.value,response.idx);
				if (responsesReceived == moments.length) {
					document.getElementsByClassName('hhqiXA')[0].innerHTML = `<h1 id="collection-value" style="color:white;display:block;">Total Collection Value: ${sign}${total_collection_value} ${currency}</h1>` + document.getElementsByClassName('hhqiXA')[0].innerHTML;
					document.getElementById('loading-collection').style = "display:none";
				} 
			});
		}

	}
} else {
	console.log('random page');
}

function showMomentPrice(moments,value,idx){
	moments[idx].innerHTML = moments[idx].innerHTML + `<p style="text-align:center;color:white;">Lowest Ask: ${value[1]}${value[2]}</p>`;
}


