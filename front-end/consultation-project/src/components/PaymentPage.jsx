import { useLocation } from "react-router-dom";
import MascotImage from "./MascotImage";
import Payment from "./PaymentComponent";

export default function PaymentPage() {
    const location = useLocation();
    const eventData = location.state?.eventData;

    console.log(eventData);

    return (
        <div className="container-fluid px-0 content" style={{ height: "92vh" }}>
            <div className="row align-items-center">
                <MascotImage />
                <Payment />
            </div>
        </div>
    );
}