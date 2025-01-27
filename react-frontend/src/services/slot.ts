export const API_URL = 'http://localhost:3000'
import { Slot } from "../types"

export const getSlot = async (id: Slot['id']) => {
    const response = await fetch(`${API_URL}/slots/${id}`)
    return response.json()
}

export const getSlots = async () => {
    const response = await fetch(`${API_URL}/slots`)
    return response.json()
}

export const bookSlot = async (id: Slot['id'], name: string) => {
    const response = await fetch(`${API_URL}/slots/${id}/book`, {
        method: 'POST',
        body: JSON.stringify(({ name })),
        headers: {
            "Content-Type": "application/json",
        },
    })
    return response.json()
}

export const cancelSlot = async (id: Slot['id']) => {
    const response = await fetch(`${API_URL}/slots/${id}/cancel-booking`, { method: 'POST' })
    return response.json()
}