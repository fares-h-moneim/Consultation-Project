import Mascot from "../assets/Macot.png"
import Mascot2 from "../assets/Macot 2.png"
import Mascot3 from "../assets/Macot 3.png"

export default function MascotImage() {
    const mascots = [Mascot, Mascot2, Mascot3];
    const randomMascot = mascots[Math.floor(Math.random() * mascots.length)];
    return (
        <div className="col-lg-6 d-lg-block d-none center d-flex align-items-center justingy-content-center">
            <img src={randomMascot} alt="Mascot Image" width={"100%"} />
        </div>
    );
}