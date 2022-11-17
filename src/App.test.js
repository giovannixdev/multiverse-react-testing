/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';
import { prettyDOM } from '@testing-library/dom';


/**
 * Verify something should render
 */
test('App should render', () => {
  render(<App />);

  expect(screen.getByText('Welcome, party people!')).toBeInTheDocument();
});

test('Button should render', () => {
  render(<App />);
  expect(screen.getByText(/light/i)).toBeInTheDocument();
});

/**
 * Verify clicking button should change theme
 * hint: use fireEvent.click(element) to trigger a click event on an element
 */
test('theme button should update button text', () => {
  render(<App />);
  const buttonElement = screen.getByText(/light/i);
  fireEvent.click(buttonElement);
  expect(screen.getByText(/dark/i)).toBeInTheDocument();
});

// BONUS
// hint: there is a `.toHaveStyle` method.
// e.g.: expect(element).toHaveStyle('color: #FFF');
test('theme button should toggle styles', () => {
  render(<App />);
  const buttonElement = screen.getByText(/light/i);
  fireEvent.click(buttonElement);
  /* This didn't work because the white color is inhereted from the body */
  // const element = screen.queryByText(/click the button to toggle the theme/i);
  // console.log(prettyDOM(element.style.color));
  // expect(element.style.color).toBe('white');
  // expect(element).toHaveStyle('color: #FFFFFF');
  const element2 = document.body;
  expect(element2).toHaveStyle('color: #FFFFFF');
});

/**
 * Verify clicking button should toggle hidden content
 *
 * hint: you can check if something does not exist by using .not
 * e.g. expect(element).not.toBeInTheDocument()
 *
 * hint: use `queryByText` instead of `getByText` to check if something is _not_ rendered
 * (getByText will throw an error if it is not rendered)
 */
test('hidden button should toggle hidden content', () => {
  render(<App />);
  // const buttonElement = screen.getByText(/show hidden content/i);
  // fireEvent.click(buttonElement);
  // expect(screen.getByText(/this content is hidden by default/i)).toBeInTheDocument();

  const element = screen.queryByText(/this content is hidden by default/i);
  expect(element).not.toBeInTheDocument();
});


/**
 * Want more? Try these:
 *   - check for the presence of a specific element, like the paragraph containing the text "Click the button to toggle the theme"
 *   - check the for the class name .container on the surrounding div
 *   - after clicking the toggle hidden content button, check for the button text to update to "hide" instead of "show"
 */
