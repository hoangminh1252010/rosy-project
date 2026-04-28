package backend.controller;

import backend.model.Quotation;
import backend.repository.QuotationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotations")
@CrossOrigin(origins = "http://localhost:5173") // Cho phép React gọi API
public class QuotationController {

    private final QuotationRepository repository;

    public QuotationController(QuotationRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Quotation createQuotation(@RequestBody Quotation quotation) {
        return repository.save(quotation);
    }

    @GetMapping
    public List<Quotation> getAll() {
        return repository.findAll();
    }
}