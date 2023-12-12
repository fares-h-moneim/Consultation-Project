export default function UserRequest() {
    return (
        <div className="col" style={{ height: "9vh", width: "80vw" }}>
            <div className="row g-0 align-items-center justify-content-top p-0" style={{ backgroundColor: "white" }}>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <h5 style={{ marginLeft: "10px" }}> Username &nbsp;</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <h5 style={{ marginLeft: "10px" }}>Email</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <h5 style={{ marginLeft: "10px" }}>Name</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <button type="button" className="btn btn-danger" style={{ margin: "10px 10px" }} onClick={() => { navigate(`/booking/${matchDetails._id}`) }}>Remove</button>
                </div>
            </div>
            <div className="row g-0" style={{ backgroundColor: "grey" }}>
                <div className="col">
                    <p className="p-0 mx-5 my-1" style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#fff" }}>
                        Birthday
                    </p>
                </div>
                <div className="col">
                    <p className="p-0 my-1" style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#fff" }}>
                        Gender
                    </p>
                </div>
                <div className="col">
                    <p className="p-0 my-1" style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#fff" }}>
                        Role
                    </p>
                </div>
            </div>
        </div>
    );
}