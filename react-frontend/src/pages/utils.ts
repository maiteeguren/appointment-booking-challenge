import { Slot } from "../types"
import dayjs from "dayjs";

export const filterSlotByDate = (slots: Slot[], selectedDate: any) => {
    const formatedSelectedDate = formatDate(selectedDate)

    return slots.filter(slot => formatDate(slot.startDate) === formatedSelectedDate)
}

export const filterBookedSlots = (slots: Slot[]) => {
    return slots.filter(slot => slot.isBooked)
}
  
export const formatTime = (startDate: Slot['startDate']) => {
    return dayjs(startDate).format('HH:mm')
}

export const formatDate = (startDate: Slot['startDate']) => {
    return dayjs(startDate).format('DD/MM/YYYY')
}