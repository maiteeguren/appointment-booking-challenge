import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { filterBookedSlots, formatDate, formatTime } from './utils';
import { getSlots, cancelSlot } from '../services/slot';

import { Slot, Flag } from '../types';
import { Alerts } from '../components/Alerts';
import { ALERTS } from '../constants';
import { BookingWrapper, Table, TableHeader } from './styled';
import { Section } from '../components/styled';

function ManageBookings() {
  const [filteredSlots, setFilteredSlots] = useState<Slot[]>([])
  const [alert, setAlert] = useState<Flag>();

  const fetchSlots = async () => {
    const res = await getSlots();
    const bookedSlots = filterBookedSlots(res.data)
    setFilteredSlots(bookedSlots)
  }

  useEffect(() => {
    fetchSlots()
  }, [])

  const handleCancel = async (id: string) => {
    try {
      const res = await cancelSlot(id)

      if (res.success) {
        setAlert(ALERTS.cancel_success)
        fetchSlots()
      } else {
        setAlert(ALERTS.cancel_error)
      }
    } catch {
      setAlert(ALERTS.cancel_error)
    }
    
  }

  return (
    <BookingWrapper>
      <h1>Booking</h1>
      <Alerts alert={alert} onClose={() => setAlert(undefined)}/>

      <div>
        <Section>
          {(filteredSlots.length) ? 'Booked slots' : 'No booked slots'}
        </Section>
        {!!(filteredSlots.length) && (
          <Table>
            <thead>
              <TableHeader>
                <th>Date</th>
                <th></th>
                <th>Name</th>
                <th></th>
              </TableHeader>
            </thead>
            <tbody>
              {filteredSlots.map(slot => <tr data-testid='appointment-row' key={slot.id}>
                <td>{formatDate(slot.startDate)}</td>
                <td>{formatTime(slot.startDate)}</td>
                <td>{slot.bookedCustomerName}</td>
                <td><IconButton onClick={() => handleCancel(slot.id)} size="small" aria-label="Cancel booking" data-testid='cancel-booking'>
                  <CloseIcon fontSize="small" />
                </IconButton></td>
              </tr>)}
            </tbody>
          </Table>
        )}
      </div>
    </BookingWrapper>
  )
}

export default ManageBookings
