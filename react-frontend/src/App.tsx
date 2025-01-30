import { BrowserRouter, Routes, Route, Link } from "react-router";
import SelectSlot from './pages/NewBooking.tsx'
import ManageBookings from './pages/ManageBookings.tsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Book an appointment</Link>
          <Link to="/manage">Manage appointments</Link>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<SelectSlot />} />
            <Route path="/manage" element={<ManageBookings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
