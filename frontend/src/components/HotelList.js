import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch from HOTEL SERVICE (Port 8081)
        fetch('http://localhost:8081/api/hotels')
            .then(res => res.json())
            .then(data => {
                setHotels(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <div className="text-center mt-5">Loading Hotels...</div>;

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Luxury Lodges & Hotels</h2>
            <div className="row">
                {hotels.map(hotel => (
                    <div key={hotel.id} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            {/* Make sure your Hotel Entity has imageUrl! */}
                            <img
                                src={hotel.imageUrl || "https://via.placeholder.com/300"}
                                className="card-img-top"
                                alt={hotel.name}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{hotel.name}</h5>
                                <p className="text-muted"><i className="bi bi-geo-alt"></i> {hotel.location}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-warning text-dark">KES{hotel.price} / night</span>
                                    <small>{hotel.roomAvailable} rooms left</small>
                                </div>
                                <Link to={`/hotels/${hotel.id}`} className="btn btn-outline-dark w-100 mt-3">
                                    Check Availability
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelList;