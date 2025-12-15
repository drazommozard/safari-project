import React, { useEffect, useState } from 'react';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch from BOOKING SERVICE (Port 8082)
        fetch('http://localhost:8082/api/booking')
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <div className="text-center mt-5">Loading Reservations...</div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Reservation Dashboard</h2>

            {bookings.length === 0 ? (
                <div className="alert alert-warning">No bookings found yet.</div>
            ) : (
                <div className="card shadow">
                    <div className="card-header bg-success text-white">
                        Confirmed Bookings
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer Name</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td>#{booking.id}</td>
                                        <td>{booking.customerName}</td>
                                        <td>{booking.bookingDate}</td>
                                        <td>
                                            {/* Simple logic to show what they booked */}
                                            {booking.tourId ? (
                                                <span className="badge bg-primary">Safari Tour (ID: {booking.tourId})</span>
                                            ) : (
                                                <span className="badge bg-warning text-dark">Hotel Room (ID: {booking.hotelId})</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className="badge bg-success">{booking.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingList;