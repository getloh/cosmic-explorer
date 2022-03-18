import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql} from "@apollo/client";
import { pastLaunchesTypes, pastLaunchSingleTypes, launchType } from "../interfaces";
import { useState } from "react";
import {useParams} from 'react-router-dom';
import moment from 'moment';
import Flickity from 'react-flickity-component';
import "flickity/css/flickity.css";
import falcon9img from '../../images/falcon9.jpg'

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
}


//! Main function here ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function Launchdetails () {
    const urlParam = useParams(); // gets id from the URL
    const lId = urlParam.id;

    const { loading, error, data } = useQuery(launch, { // runs query with ID
        variables:{
            id : lId
        }
    });



    if (loading) return <p>Loading...</p>;
    if (error){
        console.log(error);
        return <h1>Oh no, something went wrong. I blame Elon.</h1>;
    }
    console.log(data);


    const getYoutube = (ytlink : string) => {
      // https://www.youtube.com/watch?v=vsDknmK30C0"

      let youtubeId = "";
      const dotBe = "youtu.be/";  // for regex
      const slashWatch = "youtube.com/watch?";
      const findBe = ytlink.search(dotBe);  // Will probably return 8 if found
      const findWatch = ytlink.search(slashWatch);

      



      return (
        <p>{ytlink}</p>
      )
    }


    return (
        <div className="launchdetail-page">
          <h1>{data.launch.mission_name}</h1>
            <section className="launchdetail-head">
              <img src={data.launch.links.mission_patch} alt="" title={data.launch.mission_name}/>
              <div className="launchdetail-details">
                <h4>Launch Date:</h4>
                <p>{moment(data.launch.launch_date_local).format("Do MMMM YYYY")}</p>
                <h4>Launch Site:</h4>
                <p>{data.launch.launch_site.site_name_long}</p>
                <h4>Details</h4>
                <p>{data.launch.details}</p>

              </div>
            </section>

            <section className="carousel">

            <Flickity
              className={'carousel-1'} // default ''
              elementType={'div'} // default 'div'
              options={flickityOptions} // takes flickity options {}
              disableImagesLoaded={false} // default false
              reloadOnUpdate // default false
              static // default false
            >
              {data.launch.links.flickr_images.map((link:string) => ( 
                  <div className="carousel-cell"><img src={link} alt=""/></div>
              ))}

            </Flickity>

            </section>

            <section className="launchdetail-stats">
                {/* <img src={falcon9img} alt=""/> */}
                <div className="launchdetail-rocketstats">
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
            
            <iframe width="560" height="315" src="https://www.youtube.com/embed/jTMJK7wb0rM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </section>

        </div>
    )
}

export default Launchdetails