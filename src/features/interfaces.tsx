export interface pastLaunchesTypes{
    launchesPast: {
        mission_name: string;
        id: string | number;
        launch_site: {
          site_name: string;
          site_name_long: string;
        }
        launch_date_local: string;
        links: {
          flickr_images: string[];
          mission_patch_small: string;
        }
        launch_success: boolean;
    }   
}
export interface pastLaunchSingleTypes{
        mission_name: string;
        id: string | number;
        launch_site: {
          site_name: string;
          site_name_long: string;
        }
        launch_date_local: string;
        links: {
          flickr_images: string[];
          mission_patch_small: string | null
        }
        launch_success: boolean;
     
}

export interface launchType {
    launch: {
        links: {
            article_link: string;
            flickr_images: string[];
            mission_patch: string;
            video_link: string;
            reddit_campaign: string;
        }
        details: string;
        launch_site: {
            site_name_long: string;
        }
        launch_date_local: string;
        mission_name: string;
        rocket: {
            rocket_name: string;
            rocket: {
                boosters: number;
                engines: {
                    number: number;
                    propellant_1: string;
                    propellant_2: string;
                    type: string;
                }
                stages: number;
                diameter: {
                    meters: number;
                }
                description: string;
                cost_per_launch: number;
                height: {
                    meters: number;
                }
                mass: {
                    kg: number;
                }
            }
        }
    }
}
