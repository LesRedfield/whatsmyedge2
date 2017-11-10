function fetchCountryCodes(country) {
  var xhr = new XMLHttpRequest();

  const baseUrl = "https://api.havail.sabre.com/v1/lists/supported/cities";
  const params = "?country=" + country;

  const token = "T1RLAQKAo/D27TcWFYEzJOIvMZh9JUI3OxCIUmurwnPIweTRm9BeTDnHAADACHwjSZZaPm87vafG5K6MrnJuK//0peEBW4d/VXDGTjDr/spJorgbigOo3dBjDCKrsgGwR/kdQHUkXdfkoINIzDDIGELH/OWT1ogSVZfzZKM7SdAAXCslEbfC/KN+ZVjfGvFLQX+bLeyUk9h4Rp2BDE2wzIUeJHpQctQkmqKYGGwOxXcyYe9+MxCWk2SHMKAXNepxxypUNIFfMn60Kv0jPVh5CSiiMVccJI8wog5s2PneSNpv8ADzbi9d9OYIaXVn";

  xhr.open("GET", baseUrl + params, true);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  xhr.withCredentials = true;

  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);

        console.log(res);



      } else {
        console.log(xhr);
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };

  xhr.send();
}

function fetchFlightPrice(dest, origin) {
  var xhr = new XMLHttpRequest();

  // const baseUrl = "http://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=trujH9I3Z5IsPF8MosuqdLJLXi90jc3o";
  // const params = "&origin=" + origin + "&destination=" + dest.code + "&departure_date=2017-12-25&number_of_results=1";

  const baseUrl = "https://api.test.sabre.com/v2/shop/flights/fares";
  const params = "?origin=" + origin + "&destination=" + dest.code + "&lengthofstay=5&pointofsalecountry=US";

  // const token = "T1RLAQLk1ibCWroM1HfKAPeve87Yzq5arhAh20q5cFqLiSu052BEIPY1AADAvMaWMpM/e7GPt5cdRorkxcIVaCKXymZQnK+c7+0VDKqC3dGId2/LpS2kgGQAbRPW0Pi9YizKL90EbEmnVtqXi2KlGI9CSJ80VEvC2y2ZTUbA0Liy3XdxPw8Tr0vOLou2zXmypXrl2mWkTaN0aG2gB6/Il4laoZ3W6SX8Z1enNrclmu8ZVHVBuaiv5b8C7hdbF7PrgamJGnAuzkhCMpEgwB1p5V9IIs1LS3C3Q2/bT5wdxWJNEqMOFf0I+TsNamQW";
  // const token = "T1RLAQKPXpbIU+itYl1UYdQZIq6TzyQpvRAlAy+wiaqCqHT+nXSrhMgmAADAxjdMEMgQHnSwLoyY/eiwKAPymCMG5/V6R2M4YLyjzXFQ5GH1YsnIcvGV8s/WK0jfyNG+3jBQeAkYLgXLKeJaoVjv9vLKLKyqTpMjB0cN1xHemETunZNCrDck9Y8Wa85f+fCUX3pC7PAGx6rPRuMzjs32H6cmdzqcldB7Jzx7ar94pONJ0fjEDjO3O+7HjcQz4JiQHgZG6DmB35iPy51+Atjs2RoBZSS9XcElKRGd0+Z+/kCrBsaas/bG3tX4V9iY";
  const token = "T1RLAQKAo/D27TcWFYEzJOIvMZh9JUI3OxCIUmurwnPIweTRm9BeTDnHAADACHwjSZZaPm87vafG5K6MrnJuK//0peEBW4d/VXDGTjDr/spJorgbigOo3dBjDCKrsgGwR/kdQHUkXdfkoINIzDDIGELH/OWT1ogSVZfzZKM7SdAAXCslEbfC/KN+ZVjfGvFLQX+bLeyUk9h4Rp2BDE2wzIUeJHpQctQkmqKYGGwOxXcyYe9+MxCWk2SHMKAXNepxxypUNIFfMn60Kv0jPVh5CSiiMVccJI8wog5s2PneSNpv8ADzbi9d9OYIaXVn";

  xhr.open("GET", baseUrl + params, true);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  xhr.withCredentials = true;

  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);

        console.log(res);
        const container = document.getElementById('daily-prices');
        container.innerHTML = '';

        const dailyPrices = res.FareInfo.map(dailyFare => {
          const dailyPrice = {
            price: dailyFare.LowestFare.Fare,
            departTime: dailyFare.DepartureDateTime,
            returnTime: dailyFare.ReturnDateTime
          };

          const departTime = new Date(dailyFare.DepartureDateTime);

          const departDay = departTime.getDate();
          const departMonth = departTime.getMonth();
          const departYear = departTime.getFullYear();


          const day = document.createElement('div');
          day.setAttribute('data-year', departYear.toString());
          day.setAttribute('data-month', departMonth.toString());
          day.setAttribute('data-date', departDay.toString());
          day.setAttribute('data-price', dailyFare.LowestFare.Fare);
          day.classList.add('daily-price');

          container.appendChild(day);

          return dailyPrice;
        });

        const fetchedPrice = {
          price: res.FareInfo[0].LowestFare.Fare,
          code: dest.code,
          city: dest.city
        };

        renderPrice(fetchedPrice);

        fetchDailyPrices();

        // const now = new Date();
        //
        // const month = now.getMonth();
        // const year = now.getFullYear();

        // chrome.storage.sync.set({
        //   dailyPrices
        // }, function() {
        //   // Update status to let user know options were saved.
        //   fetchDailyPrices();
        // });
        // renderDailyPrices(dailyPrices);
        // const fetchedPrice = {
        //   price: res.results[0].fare.total_price,
        //   code: dest.code,
        //   city: dest.city
        // };
        //
        // renderPrice(fetchedPrice);
      } else {
        console.log(xhr);
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };

  xhr.send();

  // const res = JSON.parse(xhr.responseText);
  //
  // return res.results[0].fare.total_price;
}

function receiveAirports(airports) {
  console.log('receive airports called');
  renderAirports(airports);
}

function renderPrice(dest) {
  // const dest = prices[0];

  // const price = fetchFlightPrice(dest.code);
  const price = dest.price;

  // const container = document.getElementById('container');
  const priceCont = document.getElementById('price');

  priceCont.innerText = price;
}

function fetchDailyPrices() {
  $('.cal-price').remove();
  renderDailyPrices();
}

// function renderDailyPrices(dailyPrices) {
function renderDailyPrices() {
  console.log('render daily prices');
  $('.daily-price').each(function(index) {
    // console.log('daily-price #' + (index + 1));
    // console.log(this);

    if (index < 3) {
      // console.log(this);
    }
    const price = this.dataset.price;

    const departDay = this.dataset.date;
    const departMonth = this.dataset.month;
    const departYear = this.dataset.year;

    // console.log(departMonth);

    const parentSelector = `td[data-year="${departYear}"][data-month="${departMonth}"]`;

    $(parentSelector).each(function(index2) {
      // console.log(index2);
      // console.log(departMonth);
      // if (departMonth === "11") {
      //   console.log(this);
      // }

      if (this.children[0].innerText.trim() === departDay.toString()) {
        const priceCont = document.createElement('span');
        priceCont.innerText = Math.round(price);
        priceCont.classList.add('cal-price');
        // console.log(price);

        if (priceCont.innerText === 'NaN') {
          priceCont.innerText = '';
        }
        this.appendChild(priceCont);
      }
    });
  });


  // dailyPrices.forEach(day => {
  //   const price = day.price;
  //   const departTime = new Date(day.departTime);
  //   const returnTime = new Date(day.returnTime);
  //
  //   const departDay = departTime.getDate();
  //   const departMonth = departTime.getMonth();
  //   const departYear = departTime.getFullYear();
  //
  //   const parentSelector = `td[data-year="${departYear}"][data-month="${departMonth}"]`;
  //
  //   $(parentSelector).each(function(index) {
  //     // console.log(this);
  //
  //     if (this.children[0].innerText.trim() === departDay.toString()) {
  //       const priceCont = document.createElement('span');
  //       priceCont.innerText = Math.round(price);
  //       console.log(price);
  //
  //       this.appendChild(priceCont);
  //     }
  //   });
  // });
}

function renderAirports(prices) {
  const dropdown = document.getElementById('dropdown');
  dropdown.innerHTML = '';

  prices.forEach((dest, idx) => {
    // const row = document.createElement('div');
    // const destCont = document.createElement('span');
    // const priceCont = document.createElement('span');
    //
    // destCont.innerText = dest.city;
    // priceCont.innerText = "";
    //
    // row.appendChild(destCont);
    // row.appendChild(priceCont);
    // container.appendChild(row);

    const option = document.createElement('option');
    option.innerText = dest.city;
    option.value = dest.code;

    if (idx === 0) {
      option.classList.add("selected");
    }

    // priceCont.innerText = "";

    // row.appendChild(destCont);
    // row.appendChild(priceCont);
    dropdown.appendChild(option);
  });

  // container.innerText = prices;
  chrome.storage.sync.get({
    homeCode: 'EWR'
  }, function(items) {
    fetchFlightPrice(prices[0], items.homeCode);
    // document.getElementById('depart').value = items.homeCode;
  });
  // fetchFlightPrice(prices[0]);
}

$(document).ready(function() {
  $("#datepicker").datepicker({onChangeMonthYear: function(year, month) {
    console.log('onChangeMonthYear');
    window.setTimeout(() => {
      fetchDailyPrices();
    }, 100);
  }});
});

// $("#datepicker").datepicker({onChangeMonthYear: function(year, month) {
//   console.log('onChangeMonthYear');
//   fetchDailyPrices();
// }});

document.addEventListener('DOMContentLoaded', () => {
  // fetchCountryCodes('US');

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called
        //    from the receiving end (content script)
        receiveAirports);
  });

  dropdown.addEventListener('change', () => {
    const dest = {
      code: dropdown.value
    };

    const priceCont = document.getElementById('price');
    priceCont.innerText = '';

    // fetchFlightPrice(dest);
    chrome.storage.sync.get({
      homeCode: 'EWR'
    }, function(items) {
      fetchFlightPrice(dest, items.homeCode);
      // document.getElementById('depart').value = items.homeCode;
    });
  });
});

// chrome.storage.onChanged.addListener(function(changes, namespace) {
//         for (key in changes) {
//           var storageChange = changes[key];
//
//           if (key === 'dailyPrices') {
//             console.log(storageChange.newValue);
//             fetchDailyPrices();
//           } else if (key === 'monthYear') {
//             // renderDailyPrices();
//           }
//
//           console.log('Storage key "%s" in namespace "%s" changed. ' +
//                       'Old value was "%s", new value is "%s".',
//                       key,
//                       namespace,
//                       storageChange.oldValue,
//                       storageChange.newValue);
//         }
//       });
