import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddStadiumForm = () => {
  const [stadiumData, setStadiumData] = useState({
    venue_name: "",
    num_of_rows: 0,
    num_of_seats_per_row: 0,
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        var options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
          },
          body: JSON.stringify(stadiumData)
        }
        var response = await fetch("https://epl-reservation-backend.vercel.app//venue/add-venue", options);
        if (response.ok) {
          var data = await response.json();
          console.log(data);
          toast.success(`🏟️ Stadium Added Successfully`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
          navigate("/manager");
        }
      }
    }
    catch (error) {
      toast.error(`Error Adding Stadium`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      console.error(error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStadiumData({
      ...stadiumData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};


    if (stadiumData.venue_name === "") {
      newErrors.venue_name = "Stadium name is required";
      isValid = false;
    }

    if (stadiumData.num_of_rows === 0) {
      newErrors.num_of_rows = "Number of rows must be greater than 0";
      isValid = false;
    }

    if (stadiumData.num_of_seats_per_row <= 0) {
      newErrors.num_of_seats_per_row = "Number of seats in a row must be greater than 0";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };



  return (
    <div className="col mt-3 mb-3 ml-5 mr-5">
      <div className="card rounded-2">
        <div className="card-header text-center">
          <div className="h3 mb-0">Add New Stadium</div>
        </div>
        <div className="card-body">
          <form
            className="form needs-validation"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="venue_name">Stadium Name</label>
              <input
                type="text"
                className="form-control form-control-md rounded-0"
                name="venue_name"
                id="venue_name"
                value={stadiumData.venue_name}
                onChange={handleChange}
              />
              {errors.venue_name && <div className="text-danger">{errors.venue_name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="num_of_rows">Number of rows</label>
              <input
                type="number"
                className="form-control form-control-md rounded-0"
                name="num_of_rows"
                id="num_of_rows"
                required
                value={stadiumData.num_of_rows}
                onChange={handleChange}
              />
              {errors.num_of_rows && <div className="text-danger">{errors.num_of_rows}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="num_of_seats_per_row">Number of seats per row</label>
              <input
                type="number"
                className="form-control form-control-md rounded-0"
                name="num_of_seats_per_row"
                id="num_of_seats_per_row"
                required
                value={stadiumData.num_of_seats_per_row}
                onChange={handleChange}
              />
              {errors.num_of_seats_per_row && <div className="text-danger">{errors.num_of_seats_per_row}</div>}
            </div>

            <button type="submit" className="btn btn-primary btn-lg float-right">
              Add Stadium
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStadiumForm;
