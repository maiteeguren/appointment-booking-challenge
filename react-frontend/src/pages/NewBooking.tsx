import React, { useState } from 'react';

import { useAvailableSlots } from '../hooks/useAvailableSlots';
import { useModal } from '../hooks/useModal';


import SlotConfirmation from '../components/SlotConfirmation';
import SlotDetails from '../components/SlotDetails';
import SlotSelection from '../components/SlotSelection';
import { Alerts } from '../components/Alerts';

import { Slot, Flag } from '../types';

function NewBooking() {
  const [date, setDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const { availableSlots } = useAvailableSlots(date)
  const [alert, setAlert] = useState<Flag>();
  const { isModalOpen, onOpenModal, onCloseModal, onBookSlot } = useModal(setSelectedSlot, setAlert)

  const handleSelectSlot = (slot: Slot) => {
    setSelectedSlot(slot)

    if (!slot.isBooked) {
      onOpenModal()
    }
  }

  return (
    <div>
      <h1>Booking</h1>

      <Alerts alert={alert} onClose={() => setAlert(undefined)}/>
      {selectedSlot?.isBooked ? (
        <SlotDetails slot={selectedSlot} onAlert={setAlert} />
      ) : (
        <>
          <SlotSelection date={date} onChangeDate={(date) => setDate(date)} availableSlots={availableSlots} onSelectSlot={handleSelectSlot} />
        </>
      )}
      <SlotConfirmation slot={selectedSlot} open={isModalOpen} onClose={onCloseModal} onBookSlot={onBookSlot} loading={false} />
    </div>
  )
}

export default NewBooking
