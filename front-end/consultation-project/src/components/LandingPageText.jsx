export default function LandingPageText({ bigText = "Hello World!", smallText = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad necessitatibus earum dicta maiores id dolores ut, numquam fugiat sunt aspernatur sapiente corrupti quos eligendi dignissimos magnam repellat commodi! Sequi, repellat?" }) {
    return (
        <div className="col center ml-5">
            <div className="row">
                <div className="mt-5 text-left">
                    <div className="h1" style={{ color: "white" }}>{bigText}</div>
                </div>
            </div>
            <div className="row">
                <div className="mt-0 text-black text-left">
                    <div className="h2">{smallText}</div>
                </div>
            </div>
        </div>
    );
}