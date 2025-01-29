import React, { useEffect, useState } from 'react';
import { Slot } from '../types';
import { getSlots } from '../services/slot';
import { filterSlotByDate } from '../pages/utils';

export const useAvailableSlots = (date: any) => {
    const [slots, setSlots] = useState<Slot[]>([])
    const [filteredSlots, setFilteredSlots] = useState<Slot[]>([])
    const [error, setError] = useState('')

    /** Fetching all available slots on load
     * Alternatively, the API would take a date as parameter and we would fetch only after a date has been provided
     */
    const fetchSlots = async () => {
        const res = await getSlots();
        setSlots(res.data)
    }

    useEffect(() => {
        try {
            fetchSlots()
        } catch {
            setError('We were unable to retrieve slots. Please refresh this page.')
        }
    }, [])

    /* Filter slots on date change */
    useEffect(() => {
        if (date) {
            const availableSlots = filterSlotByDate(slots, date)

            if (!availableSlots.length) {
                setError('No slots available for the selected date')
                setFilteredSlots([])
            } else {
                setFilteredSlots(availableSlots)
                setError('')
            }
        }
    }, [date])

    return {
        availableSlots: filteredSlots, error
    }
}