import Mascot from "../assets/Mascot.mp4"

export default function MascotVideo() {
    return (
        <div className="col-lg-6 d-lg-block d-none center d-flex align-items-center justingy-content-center">
            <video src={Mascot} autoPlay loop muted width={"100%"} />
        </div>
    );
}