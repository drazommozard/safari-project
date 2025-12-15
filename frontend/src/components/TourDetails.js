import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TourDetails = () => {
    const { id } = useParams(); // Get the ID from the URL (e.g., 1)
    const navigate = useNavigate(); // To redirect user after booking

    // State for the Tour Data
    const [tour, setTour] = useState(null);

    // State for the Booking Form
    const [customerName, setCustomerName] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [message, setMessage] = useState('');

    // 1. Fetch the specific Tour Details on load
    useEffect(() => {
        fetch(`http://localhost:8080/api/tours/${id}`)
            .then(res => res.json())
            .then(data => setTour(data))
            .catch(err => console.error("Error fetching tour:", err));
    }, [id]);

    // 2. Handle the Booking Submission
    const handleBooking = (e) => {
        e.preventDefault(); // Stop page refresh

        const bookingPayload = {
            tourId: id,
            hotelId: null, // We are skipping hotels for now
            customerName: customerName,
            bookingDate: bookingDate,
            status: "PENDING"
        };

        // Note: Booking Service runs on Port 8082
        fetch('http://localhost:8082/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingPayload)
        })
            .then(response => {
                if (response.ok) {
                    setMessage("✅ Booking Confirmed! Redirecting...");
                    setTimeout(() => navigate('/'), 2000); // Go back home after 2 seconds
                } else {
                    setMessage("❌ Booking Failed. Try again.");
                }
            })
            .catch(error => {
                console.error("Booking Error:", error);
                setMessage("❌ Server Error. Is Booking Service (8082) running?");
            });
    };

    if (!tour) return <div className="text-center mt-5">Loading Details...</div>;

    return (
        <div className="container mt-5">
            <div className="row">
                {/* LEFT SIDE: Tour Information */}
                <div className="col-md-6">
                    <img
                        src={tour.imageUrl || "https://via.placeholder.com/600x400"}
                        alt={tour.title}
                        className="img-fluid rounded shadow mb-3"
                    />
                    <h2>{tour.title}</h2>
                    <p className="lead">{tour.description}</p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Price:</strong> KES{tour.price}</li>
                        <li className="list-group-item"><strong>Duration:</strong> {tour.duration}</li>
                    </ul>
                </div>

                {/* RIGHT SIDE: Booking Form */}
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h3 className="mb-4">Book This Safari</h3>

                        {message && <div className={`alert ${message.includes('Confirmed') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}

                        <form onSubmit={handleBooking}>
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Select Date</label>
                                {/* This is your Calendar UI Requirement */}
                                <input
                                    type="date"
                                    className="form-control"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-success w-100 btn-lg">
                                Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourDetails;