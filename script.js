const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const seatArr = Array.from(seats);
const container = document.querySelector (".container")
const seatCount = document.getElementById("count");
const seatPrice = document.getElementById("total");
const movie = document.getElementById("movie");
let ticketPrice = +movie.value;


populateUi()

function setMovieData (movieIndex, moviePrice) {
  localStorage.setItem ("selectedMovieIndex", movieIndex);
  localStorage.setItem ("selectedMoviePrice", moviePrice)
}

function upadateSeatCount () {
  const selectedSeat = document.querySelectorAll (".row .seat.selected");

  //index of selected seats
  const seatsIndex = [...selectedSeat].map(function(seat) {
     return [...seats].indexOf (seat) 
  })

  localStorage.setItem(selectedSeat, JSON.stringify(seatsIndex));


  const selectedSeatCount = selectedSeat.length
  seatCount.innerHTML = selectedSeatCount;
  seatPrice.innerHTML = selectedSeatCount*ticketPrice;
}

//get data from local storage and populate UI
function populateUi () { 
  const selectedSeat = JSON.parse(localStorage.getItem("selectedSeat"));

  if(selectedSeat !== null && selectedSeat.length > 0 ) {
    seats.forEach((seat, index) => {
      if (selectedSeat.indexOf (index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}

movie.addEventListener("change", (e) => {
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  upadateSeatCount ()
});


container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected")
  };
  upadateSeatCount () 
});



