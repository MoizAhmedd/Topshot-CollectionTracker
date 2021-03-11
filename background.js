
chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab) {
	  // read changeInfo data and do something with it
	  // like send the new url to contentscripts.js
	  if (changeInfo.url && changeInfo.url.includes('user')) {
			chrome.tabs.sendMessage( tabId, {
				message: 'startObserving',
				url: changeInfo.url
			})
	  }
	}
  );

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	findListing(request.options.link,request.options.idx,sendResponse);
	return true;
});

function findListing(moment,idx,sendResponse) {
	var xhr = new XMLHttpRequest();
	let play;
	let set;
	xhr.open("GET", moment, true);
	xhr.onreadystatechange = function () {
		var res = document.createElement( 'div' );
		res.innerHTML = xhr.responseText;
		scriptInner = res.getElementsByTagName('script');
		for ( let script of scriptInner ) {
			if (script.id == '__NEXT_DATA__') {
				let keys = Object.keys(JSON.parse(script.innerText).props.apolloState);
				for (let key of keys) {
					if(key.includes('Play')) {
						play = key.split(':')[1]
					} else if (key.includes('Set')) {
						set = key.split(':')[1]
					}
				}
			}
		}

		if (set && play) {
			const listing = `https://www.nbatopshot.com/listings/p2p/${set}+${play}`;
			getLowestAsk(listing,idx,sendResponse);
		}
	}
	xhr.send();
}

function getLowestAsk(listing,idx,sendResponse) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", listing, true);
	xhr.onreadystatechange = function () {
		var listingRes = document.createElement( 'div' );
		listingRes.innerHTML = xhr.responseText;
		const metas = listingRes.getElementsByTagName('meta');

		for (let i = 0; i < metas.length; i++) {
			if (metas[i].getAttribute('property') == 'og:price:amount') {
				let price = metas[i].getAttribute('content');
				let lowest_ask = price.split('-')[0].trim()
				let currency = lowest_ask.split(' ')[0];
				let sign = lowest_ask.split(' ')[1][0];
				let amount = lowest_ask.split(' ')[1].slice(1,);
				sendResponse({
					value:[currency,sign,amount],
					idx:idx
				})
			}
		}
	}
	xhr.send();
}