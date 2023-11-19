import Button from "./MenuButton";

//TODO add Call Back Functions


function MainMenuFunction() {
    return (
      <div class="d-flex justify-content-around bg-black">
            <Button text="MATCHES"/>
            <Button text="BOOKS"/>
            <img src="https://i.pinimg.com/474x/52/5d/7d/525d7d9e71634c2a19f434fc1b034e00--national-football-teams-fifa-football.jpg" 
            width={50}
            className="rounded float-start" alt="..."></img>
            <Button text="SIGN UP"/>
            <Button text="SIGN IN"/>
      </div>
    );
}

export default MainMenuFunction;