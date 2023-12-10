import React from "react";

export default function ButtonImage({ text, image }) {
    return (
        <button type="button" className="btn btn-danger" style={{ width: "75%", height: "auto", backgroundColor: "white", color: "black" }}>
            <img src={image} alt="stadium Image" style={{ width: "50%", height: "auto" }} />
            <h5 style={{ marginLeft: "10px" }}>{text}</h5>
        </button>
    );
}
