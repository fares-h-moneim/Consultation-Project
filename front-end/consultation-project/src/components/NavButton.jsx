/*
    TODO:
        => Add call back functions to render the MainScreen
*/

/*
    Descirption: Function used to create the main buttons in main menu 
    Input: Text until now
    output: Void

*/
export default function Button(props) {
    return (
        <button type="button" className="btn" onClick={props.onClick}>
            <div className="fs-4 text-white">{props.text}</div>
        </button>
    );
}

