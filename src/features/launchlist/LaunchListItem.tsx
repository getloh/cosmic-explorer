import { pastLaunchSingleTypes } from "../interfaces"
import noimage from '../../images/nolaunchimage.jpg';
import moment from 'moment';


interface propType{
    data: pastLaunchSingleTypes;
}

function LaunchListItem(props: propType){
    
let coverImage : string | undefined | null= null;
if (props.data.links.flickr_images[0] !== undefined){
    coverImage = props.data.links.flickr_images[0];
}
else {
    coverImage = props.data.links.mission_patch_small;
}
if (coverImage === null){
    coverImage = noimage
}

    return (
        <div className="launchlist-item">
            <div className="launchlist-image">
                <img src={coverImage} alt=""/>
            </div>
            
            <div className="launchlist-item-side">
                <h2>{props.data.mission_name}</h2>
                <h4>{moment(props.data.launch_date_local).format("Do MMMM YYYY")}</h4>
                <p>This launch was {props.data.launch_success ? "a success" : <strong style={{color: "red"}}>unsuccessful</strong>}</p>
                <p>Launched from {props.data.launch_site.site_name_long}</p>
            </div>
        </div>
    )
}

export default LaunchListItem