# Safari Booking Platform - Backend Microservices

This directory contains the server-side code for the Safari Booking Platform, organized as three independent Spring Boot microservices.

## Service Overview

1.  **tour-service (Port 8080)**
    * Responsibilities: Manages safari tour catalog, details, and search functionality.
    * Database: H2 In-Memory Database (Table: TOURS).

2.  **hotel-service (Port 8081)**
    * Responsibilities: Manages hotel inventory, pricing, and availability.
    * Database: H2 In-Memory Database (Table: HOTELS).

3.  **booking-service (Port 8082)**
    * Responsibilities: Handles reservation logic for both tours and hotels.
    * Database: H2 In-Memory Database (Table: BOOKINGS).

---

## Installation and Execution

### Prerequisites
* Java Development Kit (JDK) 17 or higher
* Apache Maven

### Startup Procedure
These services must be running simultaneously to ensure full system functionality.

1.  **Start the Tour Service:**
    * Navigate to `tour-service`.
    * Run `TourServiceApplication.java`.
    * Verify it is running on port **8080**.

2.  **Start the Hotel Service:**
    * Navigate to `hotel-service`.
    * Run `HotelServiceApplication.java`.
    * Verify it is running on port **8081**.

3.  **Start the Booking Service:**
    * Navigate to `booking-service`.
    * Run `BookingServiceApplication.java`.
    * Verify it is running on port **8082**.

### API Documentation
The project includes automated API documentation generated via SpringDoc/OpenAPI. Once the services are running, the documentation is accessible at:

* **Tour Service:** http://localhost:8080/swagger-ui/index.html
* **Hotel Service:** http://localhost:8081/swagger-ui/index.html
* **Booking Service:** http://localhost:8082/swagger-ui/index.html