package dan.nyaks.tourservice;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TourService {

    private final   TourRepository tourRepository;

    public Tour createTour(Tour tour) {
        return tourRepository.save(tour);
    }

    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    public Tour getTourById(Long id) {
        return tourRepository.findById(id).get();
    }
    public List<Tour> searchTour(String keyword) {
        return tourRepository.findByTitleContainingIgnoreCase(keyword);
    }
}
