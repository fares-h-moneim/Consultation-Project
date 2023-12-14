import React from "react";
import { useState } from "react";
import "../styles/SeatingChart.css";

export default function SeatingChart(match, rows, columns) {
  var element = document.getElementById('container');
  var seats = document.querySelectorAll('.sc-seat');
  var options = {
    cart: {
      currency: 'EGP '
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
    },
  };
  var sc = new Seatchart(element, options);

  sc.addEventListener('seatchange', function (e) {
    console.log(e);
  });

  sc.addEventListener('submit', function (e) {
    console.log(e);
  });
}