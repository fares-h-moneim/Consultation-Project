import React from "react";
import { useState } from "react";
import "./styles/SeatingChart.css";

export default function SeatingChart(row, col) {
    var element = document.getElementById('container');
    var seats = document.querySelectorAll('.sc-seat');
      var options = {
        cart: {
            currency: 'EGP '
        },
        map: {
          rows: row,
          columns: col,
          seatTypes: {
            default: {
              label: 'VIP',
              cssClass: 'economy',
              price: 10,
            },
          },
        },
      };

    var sc = new Seatchart(element, options);
    sc.addEventListener('seatchange', function(e) {
        console.log(e);
    });
}