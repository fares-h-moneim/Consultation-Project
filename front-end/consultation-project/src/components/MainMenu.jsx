import { useState } from "react";
import Button from "./MenuButton";
//TODO add Call Back Functions


function NavBarFunction() {
  var index = useState(0);
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-black">
      <a class="navbar-brand" href="#"><img src="https://i.pinimg.com/474x/52/5d/7d/525d7d9e71634c2a19f434fc1b034e00--national-football-teams-fifa-football.jpg"
        width={50}
        className="rounded float-start" alt="..."></img></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <Button text="MATCHES"></Button>
          </li>
          <li class="nav-item">
            <Button text="BOOKINGS"></Button>
          </li>
          <li class="nav-item">
            <Button text="SIGN UP"></Button>
          </li>
          <li class="nav-item">
            <Button text="SIGN IN"></Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBarFunction;