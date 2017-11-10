const airports = {
  "Atlanta": "ATL",
  "Boston": "BOS",
  "Chicago": "ORD",
  "Dallas": "DFW",
  "Las Vegas": "LAS",
  "Miami": "MIA",
  "Los Angeles": "LAX",
  "Seattle": "SEA",
  "Newark": "EWR"
};

const counts = {};
const foundArr = [];
const foundNamesArr = [];

var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue.toUpperCase();

            Object.keys(airports).forEach(airport => {
              if (text.indexOf(airport.toUpperCase()) !== -1) {
                console.log('found 1: ' + airport);

                if (counts[airport]) {
                  counts[airport] += 1;
                } else {
                  counts[airport] = 1;
                }

                if (!foundArr.includes(airports[airport])) {
                  foundNamesArr.push([airports[airport], airport]);

                  foundArr.push(airports[airport]);
                }
              }
            });
        }
    }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    // var domInfo = foundNamesArr;
    // console.log(domInfo);

    const domInfo = Object.keys(counts).map(airportCity => {
      return {
        city: airportCity,
        code: airports[airportCity],
        count: counts[airportCity]
      };
    }).sort((a, b) => {
      return b.count - a.count;
    });

    console.log(domInfo);

    // Directly respond to the sender (popup),
    // through the specified callback */
    response(domInfo);
  }
});

// chrome.runtime.sendMessage({destinations: foundArr}, function(response) {
//   console.log(response);
// });
