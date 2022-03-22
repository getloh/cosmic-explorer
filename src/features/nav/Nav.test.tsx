import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, BrowserRouter } from 'react-router-dom';
import Nav from './Nav'

test('Control', () => {
  expect(2+2).toEqual(4);
});

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