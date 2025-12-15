import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const TourList = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [keyword, setKeyword] = useState(''); // New State for Search

    // Function to fetch all tours (Default)
    const fetchTours = () => {
        setLoading(true);
        fetch('http://localhost:8080/api/tours')
            .then(response => response.json())
            .then(data => {
                setTours(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    // Function to search tours (When button clicked)
    const searchTours = (e) => {
        e.preventDefault(); // Stop page reload
        setLoading(true);
        fetch(`http://localhost:8080/api/tours/search?keyword=${keyword}`)
            .then(response => response.json())
            .then(data => {
                setTours(data);
                setLoading(false);
            });
    };

    // Initial Load
    useEffect(() => {
        fetchTours();
    }, []);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
    if (error) return <div className="alert alert-danger text-center mt-5">Error: {error}</div>;

    return (
        <div className="container mt-4">
            {/* SEARCH BAR SECTION */}
            <div className="row justify-content-center mb-4">
                <div className="col-md-6">
                    <form onSubmit={searchTours} className="d-flex gap-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search safaris (e.g. Mara)..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">Search</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => { setKeyword(''); fetchTours(); }}>Reset</button>
                    </form>
                </div>
            </div>

            {/* TOUR CARDS SECTION */}
            <h2 className="text-center mb-4">Available Safari Tours</h2>
            <div className="row">
                {tours.map(tour => (
                    <div key={tour.id} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            {/* Image Section - Displays the URL from your backend */}
                            <img
                                src={tour.imageUrl || "https://via.placeholder.com/300?text=No+Image"}
                                className="card-img-top"
                                alt={tour.title}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />

                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{tour.title}</h5>
                                <p className="card-text text-muted">{tour.description}</p>
                                <div className="mt-auto">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="badge bg-success fs-6">KES{tour.price}</span>
                                        <small className="text-muted fw-bold">{tour.duration}</small>
                                    </div>
                                    {/* Replace the old button with this Link */}
                                    <Link to={`/tours/${tour.id}`} className="btn  btn-primary w-100">
                                        View Details & Book
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourList;