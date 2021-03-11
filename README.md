## NBA TOPSHOT TRACKER
A chrome extension that shows you the lowest asks of all your moments, as well as the total value of your collection, without having to manually go on the listings or calculate the totals.

## Download
Currently pending review on the webstore

## Development Usage
- `git clone https://github.com/MoizAhmedd/Topshot-CollectionTracker.git` to your local machine
- `chrome://extensions` in Chrome and Turn on Developer Mode
- Select Load Unpacked and navigate to the `Topshot-CollectionTracker` directory

## How it works
When user is on the moments page, get all their moments, and send an api request to each moments listing page to get their lowest ask, then tally all the prices to show the total collection value

## Pull requests
- All pull requests are welcome! After pull requests are merged, the package will be updated on chrome depending on how long it takes for the webstore to review it.  

## Feature Requests
- Improve speed of fetching collection data
- Add a spinner instead of "Loading Collection Data..."
- Ensure that data is being added to the right place, might run into issues since am currently hard coding class names
- Add max price for each moment
- Add latest sale for each moment