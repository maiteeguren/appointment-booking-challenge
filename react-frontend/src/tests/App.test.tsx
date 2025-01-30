import React, { act } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, expect, vi} from 'vitest';
import App from '../App';
import { mockFetch } from './mocks';


describe('Customer screen', () => {
  // Mock fetch
  beforeEach(() => {
    global.fetch = vi.fn(mockFetch);
  })

  test('displays a message when date is not provided', async () => {
    await act(async () => render(<App />));
    const message = screen.getByText(/Select a date to see available slots/i);
    expect(message).toBeInTheDocument();
  });

  test('displays a message when no slots are available', async () => {
    await act(async () => render(<App />));

    const dateInputElement = await screen.findByPlaceholderText('MM/DD/YYYY');
    await fireEvent.change(dateInputElement, { target: { value: '08/01/2025' } })

    const message = await screen.findByText(/No slots available for the selected date/i);
    expect(message).toBeInTheDocument();
  });

  test('lists slots on valid date selection', async () => {
    await act(async () => render(<App />));
    
    const dateInputElement = await screen.findByPlaceholderText('MM/DD/YYYY');
    await fireEvent.change(dateInputElement, { target: { value: '08/01/2024' } })

    const availableSlots = await screen.findAllByTestId('available-slot');
    expect(availableSlots.length).toBe(2);
  });

  test('allows user to make a new booking', async () => {
    await act(async () => render(<App />));
    
    const dateInputElement = await screen.findByPlaceholderText('MM/DD/YYYY');
    await fireEvent.change(dateInputElement, { target: { value: '08/01/2024' } })

    const availableSlot = await screen.findByText('13:00');
    fireEvent.click(availableSlot)

    const confirmationModal = await screen.findByTestId('confirmation-modal');
    const nameInput = await screen.findByLabelText(/your name/i);
    const bookSlotButton = await screen.findByTestId('book-slot-button');

    expect(confirmationModal).toBeInTheDocument();
    expect(bookSlotButton).toBeDisabled();

    await fireEvent.change(nameInput, { target: { value: 'test' } })
    expect(bookSlotButton).toBeEnabled();
  });

  test('allows user to view the details of a booking', async () => {
    await act(async () => render(<App />));
    
    const dateInputElement = await screen.findByPlaceholderText('MM/DD/YYYY');
    await fireEvent.change(dateInputElement, { target: { value: '08/01/2024' } })

    const availableSlot = await screen.findByText('12:00');
    fireEvent.click(availableSlot)

    const helloMessage = await screen.findByText(/Hello John Smith!/i);
    const cancelButton = await screen.findByText(/Cancel booking/i);
    const joinButton = await screen.findByText(/Join your call/i);

    expect(helloMessage).toBeInTheDocument();
    expect(cancelButton).toBeEnabled();
    expect(joinButton).toBeEnabled();
  });
})
describe('Manager screen', () => {
  // Mock fetch
  beforeEach(() => {
    global.fetch = vi.fn(mockFetch);
  })

  test('displays aall available appointments', async () => {
    await act(async () => render(<App />));

    const manageAppointments = await screen.findByText(/Manage appointments/i);
    await fireEvent.click(manageAppointments)

    const appointmentRows = await screen.findAllByTestId('appointment-row');
    const cancelButton = await screen.findByTestId('cancel-booking');

    expect(appointmentRows.length).toBe(1);
    expect(cancelButton).toBeEnabled();
  });
});