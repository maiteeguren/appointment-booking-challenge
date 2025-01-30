import React from 'react';

import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { formatTime } from '../pages/utils';

import { Slot } from '../types';
import { DateWrapper, SlotWrapper, ButtonWrapper, Section, SectionTitle } from './styled';
import { Dayjs } from 'dayjs';

type Props = {
  availableSlots: Slot[],
  date: Dayjs | null,
  onChangeDate: (date: Dayjs | null) => void,
  onSelectSlot: (slot: Slot) => void,
}

export default function SlotSelection({ date, onChangeDate, availableSlots, onSelectSlot }: Props) {
  return (
    <>
      <DateWrapper>
        <SectionTitle>Date</SectionTitle>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={date} onChange={(newValue: Dayjs | null) => onChangeDate(newValue)} label='Select date' />
        </LocalizationProvider>
      </DateWrapper>
      <Section>
        <SectionTitle>Pick a slot</SectionTitle>
        {date ? (availableSlots.length ? (
          <SlotWrapper>
            {availableSlots.map(slot => <ButtonWrapper key={slot.id}>
              <Button variant="outlined" onClick={() => onSelectSlot(slot)} data-testid='available-slot'>{formatTime(slot.startDate)}</Button>
            </ButtonWrapper>)}
          </SlotWrapper>
        ) : 'No slots available for the selected date')
          : 'Select a date to see available slots'}
      </Section>
    </>
  );
}
