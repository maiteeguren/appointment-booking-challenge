import React, { useState } from 'react';
import { useNavigate } from "react-router";

import Button from '@mui/material/Button';

import { formatTime, formatDate } from '../pages/utils';
import { cancelSlot } from '../services/slot';

import { Slot, Flag } from '../types';
import { Section, SectionTitle, ButtonGroup } from './styled';
import { ALERTS } from '../constants';

type Props = {
  slot: Slot,
  onAlert: (alert: Flag) => void
}

export default function BookingConfirmation({ slot, onAlert }: Props) {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleCancel = async () => {
    try {
      const res = await cancelSlot(slot.id)

      if (res.success) {
        onAlert(ALERTS.cancel_success)
      } else {
        onAlert(ALERTS.cancel_error)
      }
    } catch {
      onAlert(ALERTS.cancel_error)
    }
  }

  return (
    <>
      <Section>
        Hello {slot.bookedCustomerName}!
        <br />
        Your booked slot
      </Section>
      <Section>
        <div><SectionTitle>Date: </SectionTitle>
          {formatDate(slot?.startDate)}</div>
        <div><SectionTitle>Time: </SectionTitle>
          {formatTime(slot?.startDate)}</div>
        <div><SectionTitle>Duration: </SectionTitle>
          30 minutes</div>
      </Section>
      <ButtonGroup>
        <Button variant="text" onClick={handleCancel} loading={loading}>Cancel booking</Button>
        <Button variant="contained" onClick={() => { }}>Join your call</Button>
      </ButtonGroup>
    </>
  );
}
