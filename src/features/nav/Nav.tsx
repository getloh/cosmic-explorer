import { useState, useEffect } from "react";
import { useParams , useNavigate, Outlet} from "react-router-dom";


import cosmiclogo from '../../images/logosplashsmall.png'
import cosmiclogomobile from '../../images/logo.png'
import rocket from '../../images/rocket.svg'

function Navbar () {
    const Navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [mobileView, setMobileView] = useState(window.innerWidth < 600);

    const updateMedia = () => {
      setMobileView(window.innerWidth < 600);
    };
  
    useEffect(() => {
      window.addEventListener("resize", updateMedia);
      return () => window.removeEventListener("resize", updateMedia);
    });

    const handleClick = (option : string) => {
        console.log(option);

     switch(option){
         case "Home":
            Navigate('/');
            break;
         case "Launches":
            Navigate('/launches')
            break;
         case "About":
            Navigate('/about')
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
    if (mobileView){
        return (
            <div>
            <nav>
                <a href="/"><img src={cosmiclogomobile} alt="" /></a>
                {/* <h2>Cosmic <br /> Explorer</h2> */}
                <button onClick={() => handleClick("Home")} className="mobilebutton" title="home">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/></svg>
                </button>
                <button onClick={() => handleClick("Launches")} className="mobilebutton" title="launches">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                    <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/></svg>
                </button>
                <button onClick={() => handleClick("About")} className="mobilebutton" title="about">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                </button>

    
                <div className="nav-right">
                    <input name="searchbar" autoComplete="off" onKeyUp={handleKeypress} id="searchbar" placeholder="ID or Search mission name" type="text" onChange={(e) => setSearch(e.target.value)}/>
                    <button name="searchbutton" onClick={handleSearchButton} id="searchbutton"><img src={rocket} alt="Search icon"/></button>
                </div>
            </nav>
                <main>
                    <Outlet />
                </main>
    
            </div>
        )
    }

    return (
        <div>
        <nav>
            <a href="/"><img src={cosmiclogo} alt="" /></a>
            {/* <h2>Cosmic <br /> Explorer</h2> */}
            <ul>
                {["Home", "Launches", "About"].map((string) => {
                    return (
                    <li key={string} onClick={() => handleClick(string)}> {string}</li>
                    )
                } )}

            </ul>

            <div className="nav-right">
                <input name="searchbar" autoComplete="off" onKeyUp={handleKeypress} id="searchbar" placeholder="ID or Search mission name" type="text" onChange={(e) => setSearch(e.target.value)}/>
                <button name="searchbutton" onClick={handleSearchButton} id="searchbutton"><img src={rocket} alt="Search icon"/></button>
            </div>
        </nav>
            <main>

                <Outlet />
            </main>

        </div>

    )

}

export default Navbar;