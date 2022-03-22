import LaunchListItem from './LaunchListItem';
import { render, screen } from '@testing-library/react';
import { Router, BrowserRouter } from 'react-router-dom';

const sampleprops = JSON.parse(`{
    "mission_name": "Starlink v0.9",
    "id": "79",
    "launch_site": {
      "site_name": "CCAFS SLC 40",
      "site_name_long": "Cape Canaveral Air Force Station Space Launch Complex 40"
    },
    "launch_date_local": "2019-05-23T22:30:00-04:00",
    "links": {
      "flickr_images": [
        "https://live.staticflickr.com/65535/47926143711_4a0b2680bf_o.jpg",
        "https://live.staticflickr.com/65535/47926136902_d8ce35223d_o.jpg",
        "https://live.staticflickr.com/65535/47926144123_2a828b66d5_o.jpg",
        "https://live.staticflickr.com/65535/47926137127_ef58152b6b_o.jpg",
        "https://live.staticflickr.com/65535/47926137017_e6d86fa820_o.jpg"
      ],
      "mission_patch_small": "https://images2.imgbox.com/7e/27/MGYJy1JY_o.png"
    },
    "launch_success": true
}`)


describe('launchitem tests', () => {
    test("control", () => {
        expect(2+2).toEqual(4)

    })
    test("Launchlist renders according to prop", () => {
        render(
        <LaunchListItem data={sampleprops}/>);

        const checkTitle = screen.getByText(/Starlink/i);
        expect(checkTitle).toBeInTheDocument();

    })
})