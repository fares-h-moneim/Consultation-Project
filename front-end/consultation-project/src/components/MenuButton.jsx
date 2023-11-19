/*
    TODO:
        => Add call back functions to render the MainScreen
*/

/*
    Descirption: Function used to create the main buttons in main menu 
    Input: Text until now
    output: Void

*/
function Button(props) {
   return <button type="button" className="btn">
    <div class="fs-4 text-white">{props.text}</div>
    </button>;
}

export default Button;

