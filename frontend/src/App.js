import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TourList from './components/TourList';
import TourDetails from './components/TourDetails';
import HotelList from './components/HotelList';
import HotelDetails from './components/HotelDetails';
import BookingList from './components/BookingList'; // <--- New Import

function App() {
  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Safari Platform</Link>

          <div className="d-flex gap-3">
            <Link to="/" className="btn btn-outline-light btn-sm">Tours</Link>
            <Link to="/hotels" className="btn btn-outline-light btn-sm">Hotels</Link>
            {/* New Button */}
            <Link to="/bookings" className="btn btn-warning btn-sm text-dark fw-bold">My Bookings</Link>
          </div>
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<TourList />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        {/* New Route */}
        <Route path="/bookings" element={<BookingList />} />
      </Routes>
    </div>
  );
}

export default App;