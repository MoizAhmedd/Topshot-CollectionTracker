
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	  // listen for messages sent from background.js
	  if (request.message === 'startObserving') {
		startObserving('background');
	  }
  });

function momentsListener() {
	let total_collection_value = 0;
	let currency = '';
	let sign = '';
	var moments = [], l = document.links;
	let responsesReceived = 0;
	document.getElementsByClassName('hhqiXA')[0].innerHTML = `<h1 id="loading-collection" style="color:white;display:block;">Loading total collection value...</h1>` + document.getElementsByClassName('hhqiXA')[0].innerHTML;;
	for(var i=0; i<l.length; i++) {
		if (l[i].href.includes('/moment/')) {
			moments.push(l[i]);
		}
	}
	for(let momentIdx = 0; momentIdx<moments.length; momentIdx++) {
		chrome.runtime.sendMessage({type: "moment", options: { 
			link:moments[momentIdx].href,
			idx:momentIdx
		}}, function (response) {
			responsesReceived += 1;
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

function showMomentPrice(moments,value,idx){
	moments[idx].innerHTML = moments[idx].innerHTML + `<p style="text-align:center;color:white;">Lowest Ask: ${value[1]}${value[2]}</p>`;
}

const targetNode = document
const config = { attributes: true, childList: true, subtree: true };
const callback = function(mutationsList, observer) {
  if(mutationsList){
	var moments = [], l = document.links;
	for(var i=0; i<l.length; i++) {
		if (l[i].href.includes('/moment/')) {
			moments.push(l[i]);
		}
	}
	if(moments.length > 0 && document.getElementsByClassName('hhqiXA')[0]){
		momentsListener(moments);
		observer.disconnect();
		moments = [];
	} else{
	}
  }
};
const observer = new MutationObserver(callback);

function startObserving(type){
	observer.observe(targetNode, config);
}


startObserving('initial');
