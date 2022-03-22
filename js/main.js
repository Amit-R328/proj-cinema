'use strict';


var gElSelectedSeat = null;
var gCinema = createCinema();
renderCinema();

function createCinema() {
    var cinema = [];
    for (var i = 0; i < 7; i++) {
        cinema[i] = [];
        for (var j = 0; j < 15; j++) {
            var cell = {
                type: (j === 7) ? 'X' : 'S',
                isBooked : false,
                price: 2 + 10 * i
            }
            cinema[i][j] = cell 
        }
    }
    cinema[4][4].isBooked = true
    return cinema;
}
function renderCinema() {
    var strHTML = '';
    for (var i = 0; i < gCinema.length; i++) {
        strHTML += `<tr class="cinema-row" >\n`
        for (var j = 0; j < gCinema[0].length; j++) {
            var cell = gCinema[i][j];
            var title = `Seat: ${i}, ${j}`
            // for cell of type SEAT add seat class
            var className = (cell.type === 'S')? 'seat' : ''
            // for cell that is booked add booked class
            if (cell.isBooked) {
                className += ' booked'
                title += '-Booked'
            }
            // Add a seat title: `Seat: ${i}, ${j}`
            strHTML += `\t<td title="${title}" class="cell ${className}" 
                            onclick="cellClicked(this, ${i}, ${j})" >
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
    // console.log(strHTML)

    var elSeats = document.querySelector('.cinema-seats');
    elSeats.innerHTML = strHTML;
}
function cellClicked(elCell, i, j) {
    var cell = gCinema[i][j]
    // TODO: ignore none seats and booked
    if (cell.type !== 'S' || cell.isBooked) return;
    console.log('Cell clicked: ', elCell, i, j);

    
    // Support selecting a seat
    elCell.classList.toggle('selected')
    if (gElSelectedSeat) {
        gElSelectedSeat.classList.remove('selected')
    }
    gElSelectedSeat = (elCell !== gElSelectedSeat)? elCell : null
    // Only a single seat should be selected
    // Support Unselecting a seat
    // TODO: When seat is selected a popup is shown
    if (gElSelectedSeat) {
        showSeatDetails({i:i, j:j})
    }
}

function showSeatDetails(pos) {
    var counter = countSeatsAround(pos.i, pos.j);
    var elPopup = document.querySelector('.popup');
    var seat = gCinema[pos.i][pos.j];
    elPopup.querySelector('h2 span').innerText = `${pos.i}-${pos.j}`
    elPopup.querySelector('h3 span').innerText = `$${seat.price}`
    elPopup.querySelector('.available-seats span').innerText = `${counter}`;
    const elBtn = elPopup.querySelector('button')
    elBtn.dataset.i = pos.i
    elBtn.dataset.j = pos.j
    elPopup.hidden = false;
}
function hideSeatDetails() {
    document.querySelector('.popup').hidden = true
}

function bookSeat(elBtn) {
    console.log('Booking seat, button: ', elBtn.dataset);
    const i = +elBtn.dataset.i
    const j = +elBtn.dataset.j
    gCinema[i][j].isBooked = true
    renderCinema()
    unSelectSeat()
}

function unSelectSeat() {
    hideSeatDetails();
    // TODO: remove 'selected' class and reset el
}

function countSeatsAround( i, j) {
    
    var counter = 0

    for (var s = i - 1; s <= i + 1; s++) {
        if (s < 0 || s > gCinema.length - 1) continue
        for (var d = j - 1; d <= j + 1; d++) {
            if (d < 0 || d > gCinema[0].length - 1) continue
            if (s === i && d === j) continue
            var cell = gCinema[s][d];
            // console.log('cell', cell);
            if (!cell.isBooked) counter++
        }
    }
    return counter;
}



