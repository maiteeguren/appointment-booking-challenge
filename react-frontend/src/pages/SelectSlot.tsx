import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { filterSlotByDate, formatTime } from './utils';
import { getSlots } from '../services/slot';

import { ButtonWrapper, DateWrapper, SlotWrapper } from './styled';
import BookingModal from '../components/BookingModal';
import { Slot } from '../types';

function SelectSlotPage() {
  const [date, setDate] = useState(null)
  const [slots, setSlots] = useState<Slot[]>([])
  const [filteredSlots, setFilteredSlots] = useState<Slot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [error, setError] = useState('')

  /* Modal */
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleOpenModal = (slot: Slot) => {
    setIsModalOpen(true);
    setSelectedSlot(slot)
  }
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (date) {
      const availableSlots = filterSlotByDate(slots, date)
      setFilteredSlots(availableSlots)
    }
  }, [date])

  useEffect(() => {
    const fetchSlots = async () => {
      const res = await getSlots();
      setSlots(res.data)
    }

    fetchSlots()
  }, [])

  useEffect(() => {
    if (!date) {
      setError('Select a date to see available slots')
    } else if (!filteredSlots.length) {
      setError('No slots available for the selected date')
    } else {
      setError('')
    }
  }, [date, filteredSlots])
  /**
   * Edge cases:
   * 1. no date selected
   * 2. no available slots for selected date
   */

  return (
    <div>
      <h1>
        Booking
      </h1>

      <DateWrapper>
        <div>Date</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={date} onChange={(newValue: any) => setDate(newValue)} />
        </LocalizationProvider>
      </DateWrapper>
        <div>
          <div>Pick a slot</div>
      {error ? error :(        
          <SlotWrapper>
            {filteredSlots.map(slot => <ButtonWrapper key={slot.id}>
              <Button variant="outlined" onClick={() => handleOpenModal(slot)}>{formatTime(slot.startDate)}</Button>
            </ButtonWrapper>)}
          </SlotWrapper>
      )}
        </div>
      {selectedSlot && (
        <BookingModal slot={selectedSlot} open={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default SelectSlotPage
