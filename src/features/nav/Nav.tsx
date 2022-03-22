import { useState } from "react";
import { useParams , useNavigate, Outlet} from "react-router-dom";


import cosmiclogo from '../../images/logosplashsmall.png'
import rocket from '../../images/rocket.svg'

function Navbar () {
    const Navigate = useNavigate();
    const [search, setSearch] = useState("");


    const handleClick = (option : string) => {
        console.log(option);

     switch(option){
         case "Home":
            Navigate('/');
            break;
         case "Launches":
            Navigate('/launches')
            break;
         case "Info":
            Navigate('/info')
            break;
         default:
             Navigate('/');
     }
    }

    const handleSearchButton = () => {
        if (!isNaN(Number(search))){ // false if not a number (ie. it's a number)
            Navigate(`/launch/${search}`)
        }
        else {
            Navigate(`/launches?${search}`)
        }
    }
    const handleKeypress = (event : React.KeyboardEvent<HTMLInputElement>) => {                   // Allows for using 'enter' on keyboard instead of mouseclick on button
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          handleSearchButton();
        }
    }

    return (
        <div>
        <nav>
            <a href="/"><img src={cosmiclogo} alt="" /></a>
            {/* <h2>Cosmic <br /> Explorer</h2> */}
            <ul>
                {["Home", "Launches", "Info"].map((string) => {
                    return (
                    <li key={string} onClick={() => handleClick(string)}> {string}</li>
                    )
                } )}

            </ul>

            <div className="nav-right">
                <input onKeyUp={handleKeypress} id="searchbar" placeholder="ID or Search mission name" type="text" onChange={(e) => setSearch(e.target.value)}/>
                <button onClick={handleSearchButton} id="searchbutton"><img src={rocket} alt="Search icon"/></button>
            </div>
        </nav>
            <main>

                <Outlet />
            </main>

        </div>

    )

}

export default Navbar;