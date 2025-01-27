import React, {useEffect, useState} from 'react';
import { useParams } from "react-router";
import { useNavigate } from "react-router";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { formatTime, formatDate } from './utils';
import { getSlot, cancelSlot } from '../services/slot';

import { Slot } from '../types';


export default function BookingModal() {
  let { id } = useParams();

  const [loading, setLoading] = useState(false)
  const [slot, setSlot] = useState<Slot>({})

  const navigate = useNavigate()

  useEffect(() => {
    const fetchSlot = async () => {
      setLoading(true)
      if (id) {
        const res = await getSlot(id)
        setSlot(res.data)
      }
      setLoading(false)
    }
    
    fetchSlot();
  }, [])


  /**
   * Edge cases:
   * 1. no id
   * 2. fetch error
   * 3. join meeting should be disabled
   */

  const handleCancel = async () => {
    if (id) {
      const res = await cancelSlot(id)
      if (res.ok) {
        navigate('/')
      }
    }
  }

  return (
    <div>
      <h1>
        Booking
      </h1>
        <div>
              Hello {slot.bookedCustomerName}
              <br />
              Your booked slot              
            </div>
        <div>Date: {formatDate(slot?.startDate)}</div>
        <div>Time: {formatTime(slot?.startDate)}</div>
        <div>Duration: 30 minutes</div>    
        <Stack spacing={2} direction="row">
        <Button variant="text" onClick={handleCancel}>Cancel booking</Button>
        <Button variant="contained" onClick={() => {}} loading={loading}>Join your call</Button>
        </Stack>      
    </div>
  );
}
