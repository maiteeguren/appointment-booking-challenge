import React, { useState } from 'react';

import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { cancelSlot } from '../services/slot';

import { Slot, Flag } from '../types';
import { Section, ButtonGroup, BackButtonWrapper } from './styled';
import { ALERTS } from '../constants';
import SlotDescription from './SlotDescription';

type Props = {
  slot: Slot,
  onAlert: (alert: Flag) => void;
  onBack: () => void
}

export default function SlotConfirmation({ slot, onAlert, onBack }: Props) {
  const [loading, setLoading] = useState(false)

  const handleCancel = async () => {
    try {
      setLoading(true)
      const res = await cancelSlot(slot.id)

      if (res.success) {
        onAlert(ALERTS.cancel_success)
        onBack()
      } else {
        onAlert(ALERTS.cancel_error)
      }
      setLoading(false)
    } catch {
      onAlert(ALERTS.cancel_error)
      setLoading(false)
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
        <SlotDescription startDate={slot.startDate} />
      </Section>
      <ButtonGroup>
        <Button variant="text" onClick={handleCancel} loading={loading}>Cancel booking</Button>
        <Button variant="contained" onClick={() => {}}>Join your call</Button>
      </ButtonGroup>
      <BackButtonWrapper>
        <button className='back-button' onClick={() => onBack()}>
          <ArrowBackIosIcon fontSize='small'/>
          Back to calendar
        </button>
      </BackButtonWrapper>
    </>
  );
}
