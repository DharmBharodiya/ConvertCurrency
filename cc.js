// include api for currency change
const api = "https://api.exchangerate-api.com/v4/latest/USD";

// for selecting different controls
var search = document.querySelector(".searchBox");
var convert = document.querySelector(".convert");
var fromCurrecy = document.querySelector(".from");
var toCurrecy = document.querySelector(".to");
var finalValue = document.querySelector(".finalValue");
var finalAmount = document.getElementById("finalAmount");
var resultFrom;
var resultTo;
var searchValue;

var images = document.querySelector(".images");
var headMain = document.querySelector("#headMain");
var converter = document.querySelector(".converter");

const tl = new TimelineMax();

tl.fromTo(images, 2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut })
.fromTo(headMain, 0.5, {x: "-1000%"}, {x: "0%", ease: Power2.easeInOut}, "-=1")
.fromTo(converter, 0.5, {x: "+1000%"}, {x: "0%", ease: Power2.easeInOut}, "-=1");



var flash = document.querySelector('.flash');

//for flash screen
document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
        flash.classList.add('display-none');
    },3500);
})


// Event when currency is changed
fromCurrecy.addEventListener('change', (event) => {
	resultFrom = `${event.target.value}`;
});

// Event when currency is changed
toCurrecy.addEventListener('change', (event) => {
	resultTo = `${event.target.value}`;
});

search.addEventListener('input', updateValue);

// function for updating value
function updateValue(e) {
	searchValue = e.target.value;
}

// when user clicks, it calls function getresults
convert.addEventListener("click", getResults);
// when user clicks enter, getresults function is called
document.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        convert.click();
    }
});


// function getresults
function getResults() {
	fetch(`${api}`)
		.then(currency => {
			return currency.json();
		}).then(displayResults);
    
}

// display results after convertion
function displayResults(currency) {
	let fromRate = currency.rates[resultFrom];
	let toRate = currency.rates[resultTo];
	finalValue.innerHTML =
	((toRate / fromRate) * searchValue).toFixed(2);
	finalAmount.style.display = "block";
}

// when user click on reset button
function clearVal() {
	window.location.reload();
	document.getElementsByClassName("finalValue").innerHTML = "";
};
// finalValue.style.padding = "1px 3px";
	// finalValue.style.padding = "1px 3px";

