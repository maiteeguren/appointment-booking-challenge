import React, { useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';

import { filterBookedSlots, formatDate, formatTime } from './utils';
import { getSlots } from '../services/slot';

import { Slot } from '../types';

function ManageBookings() {
  const [filteredSlots, setFilteredSlots] = useState<Slot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSlots = async () => {
      const res = await getSlots();
      const bookedSlots = filterBookedSlots(res.data)
      setFilteredSlots(bookedSlots)
    }

    fetchSlots()
  }, [])

  useEffect(() => {
    if (!filteredSlots.length) {
      setError('No booked slots')
    } else {
      setError('')
    }
  }, [filteredSlots])

  return (
    <div>
      <h1>
        Booking
      </h1>

        <div>
          <div>Booked slots</div>
      {error || (        
          <table>
              <tr>
    <th>Date</th>
    <th></th>
    <th>Name</th>
    <th></th>
  </tr>
            {filteredSlots.map(slot => <tr>
              <td>{formatDate(slot.startDate)}</td>
              <td>{formatTime(slot.startDate)}</td>
              <td>{slot.bookedCustomerName}</td>
              <td></td>
            </tr>)}
          </table>
      )}
        </div>
    </div>
  )
}

export default ManageBookings
