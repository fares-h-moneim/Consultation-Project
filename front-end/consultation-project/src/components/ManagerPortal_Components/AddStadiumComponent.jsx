import React, { useState } from "react";

const AddStadiumForm = ({ onAddStadium }) => {
  const [stadiumData, setStadiumData] = useState({
    name: "",
    shape: "",
    seats: 0,
  });

  const [errors, setErrors] = useState({});

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


    if (stadiumData.name === "") {
      newErrors.name = "Stadium name is required";
      isValid = false;
    }

    if (stadiumData.shape === "") {
      newErrors.shape = "Stadium shape is required";
      isValid = false;
    }

    if (stadiumData.seats <= 0) {
      newErrors.seats = "Number of seats must be greater than 0";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
     
      onAddStadium(stadiumData);

      setStadiumData({
        name: "",
        shape: "",
        seats: 0,
      });
    }
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
              <label htmlFor="name">Stadium Name</label>
              <input
                type="text"
                className="form-control form-control-md rounded-0"
                name="name"
                id="name"
                required
                value={stadiumData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="shape">Stadium Shape</label>
              <input
                type="text"
                className="form-control form-control-md rounded-0"
                name="shape"
                id="shape"
                required
                value={stadiumData.shape}
                onChange={handleChange}
              />
              {errors.shape && <div className="text-danger">{errors.shape}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="seats">Number of Seats</label>
              <input
                type="number"
                className="form-control form-control-md rounded-0"
                name="seats"
                id="seats"
                required
                value={stadiumData.seats}
                onChange={handleChange}
              />
              {errors.seats && <div className="text-danger">{errors.seats}</div>}
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
