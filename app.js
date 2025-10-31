// -------------------------------
// Currency Converter Code
// -------------------------------

// BASE_URL jaha se API data aa rha h (new working API)
const BASE_URL = "https://open.er-api.com/v6/latest";

// Saare dropdowns select kr rhe h
const dropdowns = document.querySelectorAll(".dropdown select");
// Button select kr rhe h
const btn = document.querySelector("form button");
// From aur To currency select kr rhe h
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
// Message area jisme output dikhayenge
const msg = document.querySelector(".msg");

// Dropdown me options add kr rhe h
for (let select of dropdowns) {
  for (let currCode in countryList) {
    // New option create kr rhe h
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    // Default selection USD → INR set kr rhe h
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  // Jab currency change ho to flag update ho
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// -------------------------------
// UPDATE FLAG FUNCTION
// -------------------------------

const updateFlag = (element) => {
  // Currency code nikal rhe h (ex: USD, INR)
  let currCode = element.value;
  // Us currency ka country code nikal rhe h (ex: US, IN)
  let countryCode = countryList[currCode];
  // Flag link create kr rhe h
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  // Flag image update kr rhe h
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// -------------------------------
// EXCHANGE RATE UPDATE FUNCTION
// -------------------------------

const updateExchangeRate = async () => {
  // Input amount access kr rhe h
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  // Agar input empty h ya < 1 h to default 1 le lenge
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  try {
    // API URL create kr rhe h
    const URL = `${BASE_URL}/${fromCurr.value}`;

    // API se data fetch kr rhe h
    let response = await fetch(URL);
    let data = await response.json();

    // New API me rates ke andar sab currency ke values hoti h
    let rate = data.rates[toCurr.value];

    // Final conversion calculate kr rhe h
    let finalAmount = amtVal * rate;

    // Result show kr rhe h
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(
      2
    )} ${toCurr.value}`;
  } catch (error) {
    // Agar API fail ho jaye to error message show krna h
    msg.innerText = "Error fetching exchange rate. Please try again!";
    console.error("Exchange Rate Error:", error);
  }
};

// -------------------------------
// BUTTON EVENT LISTENER
// -------------------------------

// Button click hone par conversion start hoga
btn.addEventListener("click", (evt) => {
  evt.preventDefault(); // Default form submit ko rok rhe h
  updateExchangeRate(); // Conversion function call kr rhe h
});

// Page load hone par default rate show kr rhe h
window.addEventListener("load", () => {
  updateExchangeRate();
});
