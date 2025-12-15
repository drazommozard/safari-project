package dan.nyaks.hotelservice;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final HotelRepository hotelRepository;

    @Override
    public void run(String... args) throws Exception {
        if (hotelRepository.count() < 1) {

            // Hotel 1: Luxury
            Hotel hotel1 = new Hotel();
            hotel1.setName("Mara Serena Safari Lodge");
            hotel1.setLocation("Masai Mara Triangle");
            hotel1.setPrice(25000.0);
            hotel1.setRoomAvailable(15);
            hotel1.setImageUrl("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80");

            // Hotel 2: Budget / City
            Hotel hotel2 = new Hotel();
            hotel2.setName("Nairobi Transit Hotel");
            hotel2.setLocation("Nairobi CBD");
            hotel2.setPrice(45000.0);
            hotel2.setRoomAvailable(50);
            hotel2.setImageUrl("https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80");

            // Hotel 3: Coastal Resort
            Hotel hotel3 = new Hotel();
            hotel3.setName("Baobab Beach Resort");
            hotel3.setLocation("Diani Beach");
            hotel3.setPrice(18000.0);
            hotel3.setRoomAvailable(10);
            hotel3.setImageUrl("https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80");

            hotelRepository.save(hotel1);
            hotelRepository.save(hotel2);
            hotelRepository.save(hotel3);

            System.out.println("✅ Sample Hotels Loaded!");
        }

    }

}
