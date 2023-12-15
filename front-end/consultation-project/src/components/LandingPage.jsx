import React, { useState, useEffect } from "react";
import LandingPageText from "./LandingPageText";
import MascotVideo from "./MascotVideo";
import { ThreeDots } from "react-loader-spinner";

export default function LandingPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(loadingTimeout);
    }, []);

    return (
        <>
            {isLoading ? (
                // Loading spinner while content is loading
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#fff"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                </div>
            ) : (
                // Render the content when loading is complete
                <div className="container-fluid px-0 content" style={{ height: "92vh", overflow: "hidden hidden" }}>
                    <div className="row align-items-center justify-content-center">
                        <LandingPageText />
                        <MascotVideo />
                    </div>
                </div>
            )}
        </>
    );
}
