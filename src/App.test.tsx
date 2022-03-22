import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, BrowserRouter } from 'react-router-dom';
import Nav from './features/nav/Nav'
import {youTubeRegex} from './features/launchdetails/Launchdetails'

test('Control', () => {
  expect(2+2).toEqual(4);
});

describe('Launchdetails(youtubeRegex) Tests', () => {
  test('it accepts a normal youtube link', () => {
    expect(youTubeRegex("https://www.youtube.com/watch?v=Q4pFJPUPrkI")).toEqual("Q4pFJPUPrkI")
  })
  test('it accepts a youtu.be link', () => {
    expect(youTubeRegex("https://youtu.be/Q5taPwu2UMQ")).toEqual("Q5taPwu2UMQ")
  })
})

describe('Nav Render', () => {
  test('Home is rendered', () => {
    render(
      <BrowserRouter>
      <Nav/>
      </BrowserRouter>
    )
    const homelink = screen.getByText(/Home/i)
    expect(homelink).toBeInTheDocument();
  });
  test("searchbox and button are rendered", () => {
    render(
      <BrowserRouter>
      <Nav/>
      </BrowserRouter>
    )
    const searchbar = screen.getByPlaceholderText("ID or Search mission name");
    const searchbutton = screen.getByRole("button");
    expect(searchbar).toBeInTheDocument();
    expect(searchbutton).toBeInTheDocument();
  })
});