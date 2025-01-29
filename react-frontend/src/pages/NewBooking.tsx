import React, { useState } from 'react';

import { useAvailableSlots } from '../hooks/useAvailableSlots';
import { useModal } from '../hooks/useModal';


import SlotConfirmationModal from '../components/SlotConfirmationModal';
import SlotDetails from '../components/SlotDetails';
import SlotSelection from '../components/SlotSelection';
import { Alerts } from '../components/Alerts';

import { Slot, Flag } from '../types';
import { BookingWrapper } from './styled';

function NewBooking() {
  const [date, setDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const { availableSlots } = useAvailableSlots(date)
  const [alert, setAlert] = useState<Flag>();
  const { isModalOpen, onOpenModal, onCloseModal, onBookSlot, loading } = useModal(setSelectedSlot, setAlert)

  const handleSelectSlot = (slot: Slot) => {
    setSelectedSlot(slot)

    if (!slot.isBooked) {
      onOpenModal()
    }
  }

  return (
    <BookingWrapper>
      <h1>Booking</h1>
      <Alerts alert={alert} onClose={() => setAlert(undefined)}/>
      {selectedSlot?.isBooked ? (
        <SlotDetails slot={selectedSlot} onAlert={setAlert} onBack={() => setSelectedSlot(null)}/>
      ) : (
          <SlotSelection date={date} onChangeDate={(date) => setDate(date)} availableSlots={availableSlots} onSelectSlot={handleSelectSlot} />
      )}
      <SlotConfirmationModal slot={selectedSlot} open={isModalOpen} onClose={onCloseModal} onBookSlot={onBookSlot} loading={loading} />
    </BookingWrapper>
  )
}

export default NewBooking
