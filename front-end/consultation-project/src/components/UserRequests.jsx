export default function UserRequest({ user, key }) {
    function dateFormat(dateString) {
        const originalDate = new Date(dateString);

        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };

        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(originalDate);
        return formattedDate;
    }
    return (
        <div className="col py-3" style={{ height: "9vh", width: "80vw" }}>
            <div className="row g-0 align-items-center justify-content-top p-0" style={{ backgroundColor: "white" }}>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <h5 style={{ marginLeft: "10px" }}> {user.username} &nbsp;</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <h5 style={{ marginLeft: "10px" }}>{user.email}</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <h5 style={{ marginLeft: "10px" }}>{user.first_name + " " + user.last_name}</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <button type="button" className="btn btn-success" style={{ margin: "10px 10px" }} onClick={() => { navigate(`/booking/${matchDetails._id}`) }}>Accept</button>
                </div>
                <div className="col text-center">
                    <button type="button" className="btn btn-danger" style={{ margin: "10px 10px" }} onClick={() => { navigate(`/booking/${matchDetails._id}`) }}>Reject</button>
                </div>
            </div>
            <div className="row g-0" style={{ backgroundColor: "grey" }}>
                <div className="col">
                    <p className="p-0 mx-5 my-1" style={{ fontFamily: "Arial, sans-serif", fontSize: "20px", color: "#fff" }}>
                        {dateFormat(user.birth_date)}
                    </p>
                </div>
                <div className="col">
                    <p className="p-0 my-1" style={{ fontFamily: "Arial, sans-serif", fontSize: "20px", color: "#fff" }}>
                        {user.gender}
                    </p>
                </div>
                <div className="col">
                    <p className="p-0 my-1" style={{ fontFamily: "Arial, sans-serif", fontSize: "20px", color: "#fff" }}>
                        {user.role}
                    </p>
                </div>
            </div>
        </div>
    );
}