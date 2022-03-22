import React, {useRef, useEffect, useState} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import volume from '../images/volume.svg'
import { useNavigate } from "react-router-dom";
// @ts-ignore  
import spacexvideo from '../images/spacex.mp4';
import logowide from '../images/logosplashfull.png'

gsap.registerPlugin(ScrollTrigger);



function Home () {

    const Navigate = useNavigate();
    const frontPageRef = useRef(null);


 
    useEffect(() => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.front-page',
                start: "top",
                end: "250%",
                // markers: true,
                scrub: true,
                pin: true
            }
        });
        tl.fromTo(".front-page", {clipPath: "circle(2%)"}, {clipPath: "circle(75%)", duration: 4});
        tl.fromTo(".blend", {opacity: "0"}, {opacity: "0.3", duration: 2});
        tl.fromTo(".intro-text", {opacity: "0%"}, {opacity: "100%", duration: 3});

    }, []);

    return (

        <div id="home">
            
            <div className="hint">
                    
                    <p>Scroll Down</p>
                </div>

            <div className="front-page" ref={frontPageRef}>
                <div className="intro-text">
                    {/* <img src={logowide} alt="" /> */}
                    <h1>Explore SpaceX launches</h1>
                    <h2>Browse mission patches, official pictures and other data from all SpaceX missions</h2>  
                     <br />
                     <br />
                     <a href="/launches" className="intro-button">Show me the last 20 launches!</a>

                </div>

                <div className="blend"></div>
                <video autoPlay loop muted>
                 <source src={spacexvideo} type="video/mp4"></source>
                </video>
            



            </div>

        
        
         </div>
    )
}



export default Home