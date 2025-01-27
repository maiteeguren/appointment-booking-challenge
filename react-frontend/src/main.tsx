import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import SelectSlot from './pages/SelectSlot.tsx'
import BookingConfirmation from './pages/BookingConfirmation.tsx'
import ManageBookings from './pages/ManageBookings.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SelectSlot />} />
          <Route path="/:id/confirmation" element={<BookingConfirmation />} />
          <Route path="/manage" element={<ManageBookings />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
