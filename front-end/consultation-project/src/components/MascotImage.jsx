import Mascot from "../assets/Macot.png"

export default function MascotImage() {
    return (
        <div className="col-lg-6 d-lg-block d-none center d-flex align-items-center justingy-content-center">
            <img src={Mascot} alt="Mascot Image" width={"100%"} />
        </div>
    );
}