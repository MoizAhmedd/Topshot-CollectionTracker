console.log('yayy');
var xhr = new XMLHttpRequest();
let play;
let set;
url = 'https://www.nbatopshot.com/moment/76ec8d54-a1c6-4116-b16e-dd870cb8f621';
xhr.open("GET", url, true);
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
		console.log(getLowestAsk(listing));
	}
}
xhr.send();

function getLowestAsk(listing) {
	console.log(listing);
	var xml2 = new XMLHttpRequest();
	xml2.open("GET", listing, true);
	xml2.onreadystatechange = function () {
		var listingRes = document.createElement( 'div' );
		listingRes.innerHTML = xml2.responseText;
		const metas = listingRes.getElementsByTagName('meta');

		for (let i = 0; i < metas.length; i++) {
			if (metas[i].getAttribute('property') == 'og:price:amount') {
				let price = metas[i].getAttribute('content');
				let lowest_ask = price.split('-')[0].trim()
				let currency = lowest_ask.split(' ')[0];
				let sign = lowest_ask.split(' ')[1][0];
				let amount = lowest_ask.split(' ')[1].slice(1,);
				console.log([currency,sign,amount]);
				return [currency,sign,amount];
			}
		}
	}
	xml2.send();
}