import { useState } from 'react';
import { bookSlot } from '../services/slot';
import { Flag, Slot } from '../types';
import { ALERTS } from '../constants';

export const useModal = (onSelectSlot: (slot: Slot) => void, onAlert: (alert: Flag) => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleBook = async (id: string, name: string) => {
    try {
        setLoading(true)
        const res = await bookSlot(id, name);
        
        setLoading(false)
        onSelectSlot(res.data)
        setIsModalOpen(false)
        onAlert(ALERTS.booking_success)
    } catch {
        onAlert(ALERTS.booking_error)
        setIsModalOpen(false)
        setLoading(false)
    }
  }

    return {
        isModalOpen,
        onOpenModal: () => setIsModalOpen(true),
        onCloseModal: () => setIsModalOpen(false),
        onBookSlot: handleBook,
        loading
    }
}