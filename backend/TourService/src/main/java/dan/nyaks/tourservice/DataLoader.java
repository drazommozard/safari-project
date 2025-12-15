package dan.nyaks.tourservice;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {
    private final TourRepository tourRepository;
    @Override
    public void run(String... args) throws Exception {
        //autorun on app start
        //check if data exists
        if (tourRepository.count() < 1) {
            Tour tour1 = new Tour();
            tour1.setTitle("Maasai Mara Safari");
            tour1.setDescription("Experience the Great Migration.");
            tour1.setPrice(45000.0);
            tour1.setDuration("3 Days");
            tour1.setImageUrl("https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80");

            Tour tour2 = new Tour();
            tour2.setTitle("Amboseli Elephant Watch");
            tour2.setDescription("Views of Kilimanjaro and giant elephants.");
            tour2.setPrice(30000.0);
            tour2.setDuration("2 Days");
            tour2.setImageUrl("https://images.unsplash.com/photo-1547471080-7541e89b4f69?auto=format&fit=crop&w=800&q=80");

            Tour tour3 = new Tour();
            tour3.setTitle("Diani Beach Getaway");
            tour3.setDescription("Relax on the white sands of the coast.");
            tour3.setPrice(60000.0);
            tour3.setDuration("5 Days");
            tour3.setImageUrl("https://images.unsplash.com/photo-1590523278135-9598f482bd9c?auto=format&fit=crop&w=800&q=80");

            tourRepository.save(tour1);
            tourRepository.save(tour2);
            tourRepository.save(tour3);

            System.out.println("🤟 Sample Tours Loaded!");
        }
    }

}
