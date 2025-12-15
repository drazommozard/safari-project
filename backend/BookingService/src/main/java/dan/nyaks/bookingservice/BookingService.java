package dan.nyaks.bookingservice;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@AllArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final RestTemplate restTemplate;

    public Booking createBooking(Booking booking) {

        // 1. CHECK TOUR
        if (booking.getTourId() != null) {
            String tourUrl = "http://localhost:8080/api/tours/" + booking.getTourId();
            restTemplate.getForObject(tourUrl, Object.class); // Crashes if Tour missing
        }

        // 2. CHECK HOTEL (This is the new part!)
        if (booking.getHotelId() != null) {
            String hotelUrl = "http://localhost:8081/api/hotels/" + booking.getHotelId();
            restTemplate.getForObject(hotelUrl, Object.class); // Crashes if Hotel missing
        }

        // 3. If we survived both checks, save the booking
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
