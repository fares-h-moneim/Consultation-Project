import React from "react";

export default function ButtonImage({ text, image, width = "300px", height = "300px", onClick = () => { } }) {
    return (
        <button
            type="button"
            className="btn btn-danger"
            style={{ width: width, height: height, backgroundColor: "white", color: "black" }}
            onClick={onClick}
        >
            <img src={image} alt="button icon" style={{ width: "50%", height: "auto" }} />
            <h5 style={{ marginLeft: "10px", paddingTop: "25px" }}>{text}</h5>
        </button>
    );
}
