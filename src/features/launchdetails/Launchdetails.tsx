import { useQuery, gql} from "@apollo/client";
import {useParams, useNavigate} from 'react-router-dom';
import { randomLoadGen, youTubeRegex } from "../utility/utility";

import moment from 'moment';
import Flickity from 'react-flickity-component';
import '../lib/flickity.css';
// import "flickity/css/flickity.css";
import loadinggif from '../../images/loadingripple.svg'
import noimg from '../../images/nolaunchimage.jpg'

const launch = gql`
query launchdetails($id: ID!){
  launch(id: $id) {
    links {
      article_link
      flickr_images
      mission_patch
      video_link
      reddit_campaign
    }
    details
    launch_site {
      site_name_long
    }
    launch_date_local
    mission_name
    rocket {
      rocket_name
      rocket {
        boosters
        engines {
          number
          propellant_1
          propellant_2
          type
        }
        stages
        diameter {
          meters
        }
        description
        cost_per_launch
        height {
          meters
        }
        mass {
          kg
        }
      }
    }
  }
}`

const flickityOptions = {
  initialIndex: 1,
  wrapAround: true
};

//! Main function here ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function Launchdetails () {
    const Navigate = useNavigate();
    const urlParam = useParams(); // gets id from the URL
    const lId = urlParam.id;

    const { loading, error, data } = useQuery(launch, { // runs query with ID
        variables:{
            id : lId
        }
    });

//* Loadscreen
    if (loading) return (
    <div id="loadscreen">
      <img src={loadinggif} alt="loading" title="loading" />
      <h3>{randomLoadGen()}</h3>
    </div>
    );
//* Errorscreen
    if (error){
        console.log(error);
        return <h1>Oh no, something went wrong. I blame Elon.</h1>;
    }
//* 404 Screen
    if (!data.launch){
      return (
        <div className="launchdetail-page">
          <h1>No launch detected for launchID {lId}</h1>

          <div className="prevnextbuttons">
            <a href={`/launch/${Number(lId) - 1}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg> Prev</a>
            {Number(lId) === 110 ? null : <a href={`/launch/${Number(lId) + 1}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg> Next</a>}
          </div>

          <div id="launch404">
            <h2>Current launches are between 1 and 110</h2>
          </div>

        </div>
      )
    }

    const getYoutube = (ytlink : string) => { //? Displays the youtube iframe
      let youtubeId = youTubeRegex(ytlink);
      
      return (
        <div className="youtube">
          <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${youtubeId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      )
    }

    const Slideshow = () => { //? Displays the carousel

      return ( <section className="carousel">
      <Flickity
        className={'carousel-1'} // default ''
        elementType={'div'} // default 'div'
        options={flickityOptions} // takes flickity options {}
        disableImagesLoaded={false} // default false
        reloadOnUpdate // default false
        static // default false
      >
        {data.launch.links.flickr_images.map((link:string) => ( 
            <div className="carousel-cell"><img src={link} alt="SpaceX launch"/></div>
        ))}

      </Flickity>
    </section>
      )
    }

//* Main return
    return (
      <article>
        <div className="launchdetail-page">

          <div className="prevnextbuttons">
            {Number(lId) === 1 ? <button>No <br /> Earlier <br /> Launches</button> : <button onClick={() => Navigate(`/launch/${Number(lId) -1}`)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>Prev</button>}

            {Number(lId) === 110 ? <button>No <br /> Later <br /> Launches</button> : <button onClick={() => Navigate(`/launch/${Number(lId) + 1}`)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg> Next</button>}
          </div>
        
          <h1>{data.launch.mission_name}</h1>
            <section className="launchdetail-head">
              {data.launch.links.mission_patch ? <img src={data.launch.links.mission_patch} alt={`Mission patch for ${data.launch.mission_name}`} title={data.launch.mission_name}/> : <img src={noimg} alt="" />}
              <div className="launchdetail-details">
                <h4>Launch Date:</h4>
                <p>{moment(data.launch.launch_date_local).format("Do MMMM YYYY")}</p>
                <h4>Details</h4>
                {data.launch.details ? <p>{data.launch.details}</p> : <p>No description published</p>}
                <div className="launchlocation">
                  <h4>Launch Site:</h4>
                  <p>{data.launch.launch_site.site_name_long}</p>
                  <div className="gmaps">
                    <iframe title="googlemaps" width="100%" height="100%" loading="lazy" allowFullScreen 
  src={`https://www.google.com/maps/embed/v1/search?q=${data.launch.launch_site.site_name_long}&key=AIzaSyAfXIPQc-yZFDK4ndNUiJjBi4onJm1TVr8&maptype=satellite`}></iframe>
                  </div>
                </div>
              </div>
            </section>

          {data.launch.links.flickr_images.length ? <Slideshow/> : <h3 style={{textAlign: "center"}}>No published pictures for this mission</h3>}
            
            <section className="launchdetail-stats">
                <div></div>
                <div className="launchdetail-rocketstats">
                  <h4>Rocket Stats</h4>
                  <br />
                  <h1>{data.launch.rocket.rocket_name}</h1>
                  <div className="rocket-box-container">
                  <div className="rocket-box">
                  <h3>Thrust System</h3>    
                    <h5>Engines:</h5> <p>{data.launch.rocket.rocket.engines.number}</p>
                  <h5>Type:</h5> <p>{data.launch.rocket.rocket.engines.type}</p>
                  <h5>Propellant 1:</h5> <p>{data.launch.rocket.rocket.engines.propellant_1}</p>
                  <h5>Propellant 2:</h5> <p>{data.launch.rocket.rocket.engines.propellant_2}</p>
                  </div>

                  <div className="rocket-box">
                   <h3>Size and weight</h3>               
                    <h5>Height:</h5> <p>{data.launch.rocket.rocket.height.meters} meters</p>
                    <h5>Diameter:</h5> <p>{data.launch.rocket.rocket.diameter.meters} meters</p>
                    <h5>Mass:</h5> <p>{data.launch.rocket.rocket.mass.kg} Kg</p>
                  </div>
                  <div className="rocket-box">
                  <h3>Description:</h3> <p>{data.launch.rocket.rocket.description}</p>
                  </div>
                  </div>

                </div>
            </section>

            <section className="video">
              {(data.launch.links.video_link ? getYoutube(data.launch.links.video_link) : null)}
            </section>

        </div>
        </article>
    )
}

export default Launchdetails