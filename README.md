# Cosmic Explorer

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Usage](#usage)

## General Information
A frontend app for viewing the SpaceX graphQL API

## Technologies Used
- HTML (as JSX)
- Javascript (as Typescript ES6)
- React and React-Router
- SASS (as SCSS)
- The [spaceX graphQL Api](https://api.spacex.land/graphql/)
- GSAP

## Features

### Fancy intro homepage
Powered by GSAP and a video i've borrowed from the spaceX youtube channel.

### Responsive layout
The Nav in particular will display differently based on maxWidth

### Fetches and displays data for all previous spaceX launches
/launches page provides basic insights

### Detailed item view provides further data
/launch/:id provides additional data grabbed from the API including rocket stats, a carousel of images and a video link.
The API is surprisingly inconsistent and so many conditional statements are present in case pictures/data are not provided in the data fetch.


## Screenshots
Home Page
![https://meng.s-ul.eu/6uTU8cqG](https://meng.s-ul.eu/6uTU8cqG)

Launches Page
![https://meng.s-ul.eu/bFFIqyUt](https://meng.s-ul.eu/bFFIqyUt)

Detail page
![https://meng.s-ul.eu/wypJ6gLi](https://meng.s-ul.eu/wypJ6gLi)

## Video
[https://gfycat.com/BoringBlondCatfish](https://gfycat.com/BoringBlondCatfish)

## Usage
Run via npm start

## Further possible improvements
- Could add more ways to query data