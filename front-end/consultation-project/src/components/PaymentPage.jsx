import MascotImage from "./MascotImage";
import Payment from "./PaymentComponent";

export default function PaymentPage() {
    return (
        <div className="container-fluid px-0 content" style={{ backgroundColor: "red", height: "92vh" }}>
            <div className="row align-items-center">
                <MascotImage />
                <Payment />
            </div>
        </div>
    );
}