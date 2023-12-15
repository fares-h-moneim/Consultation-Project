import "../styles/SeatingChart.css";

export default function SeatingChart(match, rows, columns, reservedSeats, userTempReservedSeats = [], disabledSeats = []) {
  const selectedSeats = [];
  var element = document.getElementById('container');
  var seats = document.querySelectorAll('.sc-seat');
  var cartVisible = localStorage.getItem("role") === "Fan" ? true : false;
  var options = {
    cart: {
      currency: 'EGP ',
      visible: cartVisible,
    },
    map: {
      rows: rows,
      columns: columns,
      seatTypes: {
        default: {
          label: 'VIP',
          cssClass: 'economy',
          price: 200,
        },
      },
      reservedSeats: reservedSeats,
      selectedSeats: userTempReservedSeats,
      disabledSeats: disabledSeats
    },
  };
  var sc = new Seatchart(element, options);
  const deleteBooking = async (e) => {
    try {
      const data = {
        match_id: match,
        reserved_seats: selectedSeats
      }
      const response = await fetch(`http://localhost:3000/booking/delete-booking`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log('Seat reservation cancelled successfully');
      } else {
        console.error('Failed to cancel seat reservation');
      }
    }
    catch (error) {
      console.error('Error cancelling seat reservation:', error);
    }
  }

  const reserveSeat = async (e) => {
    if (e.current.state === 'selected' && localStorage.getItem("role") === "Fan") {
      try {
        const data = {
          match_id: match,
          reserved_seats: { row: e.current.index.row, col: e.current.index.col }
        }
        const response = await fetch(`http://localhost:3000/booking-temp/book-temp-match`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log('Seat reserved successfully');
          selectedSeats.push(e.current.index);
        } else {
          console.error('Failed to reserve seat');
        }
      }
      catch (error) {
        console.error('Error reserving seat:', error);
      }
    }
    else if (e.previous.state === 'selected' && e.current.state === 'available' && localStorage.getItem("role") === "Fan") {
      try {
        const data = {
          match_id: match,
          reserved_seats: { row: e.current.index.row, col: e.current.index.col }
        }
        const response = await fetch(`http://localhost:3000/booking-temp/delete-temp-booking`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log('Seat reservation cancelled successfully');
        } else {
          console.error('Failed to cancel seat reservation');
        }
      }
      catch (error) {
        console.error('Error cancelling seat reservation:', error);
      }
    }
    else if (e.previous.state === 'selected') {
      alert('This seat is not available');
    }
  }

  window.addEventListener('timerFinished', deleteBooking);
  sc.addEventListener('seatchange', reserveSeat);
  sc.addEventListener('submit', (e) => {
    const eventData = e.cart;
    const checkoutEvent = new CustomEvent('checkout', { detail: eventData });

    window.dispatchEvent(checkoutEvent);
  });
}