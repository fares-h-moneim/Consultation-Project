import Users from "./Users";

export default function ViewUsers() {
    return (
        <div className="container-fluid px-0 content align-items-center justify-content-center" style={{ backgroundColor: "red", height: "92vh" }}>
            <div className="d-flex align-items-center justify-content-center m-4">
                <Users />
            </div>
        </div>
    );
}