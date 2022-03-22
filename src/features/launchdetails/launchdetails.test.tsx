import Launchdetails, {youTubeRegex} from "./Launchdetails"
import { render, screen } from '@testing-library/react';
import { Router, BrowserRouter } from 'react-router-dom';

const testLaunch = () => {

    <BrowserRouter>
        <Launchdetails></Launchdetails>
    </BrowserRouter>
}

describe('Launchdetails(youtubeRegex) Tests', () => {
    test('it accepts a normal youtube link', () => {
      expect(youTubeRegex("https://www.youtube.com/watch?v=Q4pFJPUPrkI")).toEqual("Q4pFJPUPrkI")
    })
    test('it accepts a youtu.be link', () => {
      expect(youTubeRegex("https://youtu.be/Q5taPwu2UMQ")).toEqual("Q5taPwu2UMQ")
    })
  })
