import React from 'react';

import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { formatTime } from '../pages/utils';

import { Slot } from '../types';
import { DateWrapper, SlotWrapper, ButtonWrapper, Section, SectionTitle } from './styled';

type Props = {
  availableSlots: Slot[],
  date: any,
  onChangeDate: (date: any) => void,
  onSelectSlot: (slot: Slot) => void,
}

export default function SlotSelection({ date, onChangeDate, availableSlots, onSelectSlot }: Props) {
  return (
    <>
      <DateWrapper>
        <SectionTitle>Date</SectionTitle>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={date} onChange={(newValue: any) => onChangeDate(newValue)} />
        </LocalizationProvider>
      </DateWrapper>
      <Section>
        <SectionTitle>Pick a slot</SectionTitle>
        {date ? (
          <SlotWrapper>
            {availableSlots.map(slot => <ButtonWrapper key={slot.id}>
              <Button variant="outlined" onClick={() => onSelectSlot(slot)}>{formatTime(slot.startDate)}</Button>
            </ButtonWrapper>)}
          </SlotWrapper>
        ) : (
          'Select a date to see available slots'
        )}
      </Section>
    </>
  );
}
