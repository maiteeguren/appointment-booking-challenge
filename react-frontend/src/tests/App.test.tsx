import React, { act } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import { mockFetch } from './mocks';

describe('renders the expected elements', () => {
  beforeAll(() => jest.spyOn(window, 'fetch'))
  beforeEach(() => (window.fetch as jest.Mock).mockImplementation(mockFetch))

  test('displays a message when date is not provided', async () => {
    await act(async () => render(<App />));
    const message = screen.getByText(/Select a date to see available slots/i);
    expect(message).toBeInTheDocument();
  });

  test('displays a message when no slots are available', async () => {
    await act(async () => render(<App />));

    const dateInputElement = await screen.findByText(/select date/i);
    fireEvent.change(dateInputElement, { target: { value: '08012025' } })
    const message = screen.getByText(/No slots available for the selected date/i);
    expect(message).toBeInTheDocument();
  });

  test('lists slots on valid date selection', async () => {
    await act(async () => render(<App />));
    
    const dateInputElement = await screen.findByText(/select date/i);
    fireEvent.change(dateInputElement, { target: { value: '08012024' } })
    const availableSlots = await screen.findAllByTestId('available-slot');

    expect(length).toBe(1);
  });

  // test('lists all activities on initial load', async () => {
  //   await act(async () => render(<App />));
  //   const titleElement = screen.getByText(/all activities/i);
  //   const activityCards = await screen.findAllByTestId(/activity-card/i);

  //   expect(titleElement).toBeInTheDocument();
  //   expect(activityCards.length).toBe(2);
  // });

  // test('searches activities by title', async () => {
  //   await act(async () => render(<App />));

  //   const inputElement = screen.getByTestId('search-input-field');
  //   fireEvent.change(inputElement, { target: { value: 'museum' } })
  //   const searchTitleElement = await screen.findByText(/search results for/i);
  //   const activityCards = await screen.findAllByTestId(/activity-card/i);

  //   expect(searchTitleElement).toBeInTheDocument();
  //   expect(activityCards.length).toBe(1);
  // });

  // test('displays an error when search result is empty', async () => {
  //   await act(async () => render(<App />));

  //   const inputElement = screen.getByTestId('search-input-field');

  //   fireEvent.change(inputElement, { target: { value: 'test' } })
  //   const searchTitleElement = await screen.findByText(/search results for/i);
  //   const emptyResult = await screen.findByText(/no results match your search criteria/i);

  //   expect(searchTitleElement).toBeInTheDocument();
  //   expect(emptyResult).toBeInTheDocument();
  // });
})
