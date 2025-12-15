import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const HotelDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [hotel, setHotel] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [message, setMessage] = useState('');

    // 1. Fetch Hotel Details (Port 8081)
    useEffect(() => {
        fetch(`http://localhost:8081/api/hotels/${id}`)
            .then(res => res.json())
            .then(data => setHotel(data))
            .catch(err => console.error("Error fetching hotel:", err));
    }, [id]);

    // 2. Handle Booking (Port 8082)
    const handleBooking = (e) => {
        e.preventDefault();

        const bookingPayload = {
            tourId: null, // No tour this time
            hotelId: id,  // Saving the Hotel ID
            customerName: customerName,
            bookingDate: bookingDate,
            status: "CONFIRMED"
        };

        fetch('http://localhost:8082/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingPayload)
        })
            .then(response => {
                if (response.ok) {
                    setMessage("✅ Room Reserved! Redirecting...");
                    setTimeout(() => navigate('/hotels'), 2000);
                } else {
                    setMessage("❌ Booking Failed. Hotel might be full.");
                }
            })
            .catch(error => {
                setMessage("❌ Server Error.");
            });
    };

    if (!hotel) return <div className="text-center mt-5">Loading Hotel...</div>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={hotel.imageUrl || "https://via.placeholder.com/600x400"}
                        alt={hotel.name}
                        className="img-fluid rounded shadow mb-3"
                    />
                    <h2>{hotel.name}</h2>
                    <p className="text-muted"><i className="bi bi-geo-alt"></i> {hotel.location}</p>
                    <div className="alert alert-info">
                        <strong>Inventory:</strong> {hotel.roomAvailable} rooms left
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h3 className="mb-4">Reserve a Room</h3>
                        {message && <div className={`alert ${message.includes('Reserved') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}

                        <form onSubmit={handleBooking}>
                            <div className="mb-3">
                                <label className="form-label">Guest Name</label>
                                <input
                                    type="text" className="form-control"
                                    value={customerName} onChange={(e) => setCustomerName(e.target.value)} required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Check-in Date</label>
                                <input
                                    type="date" className="form-control"
                                    value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required
                                />
                            </div>
                            <button type="submit" className="btn btn-warning w-100 btn-lg">
                                Pay KES{hotel.price} & Reserve
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;