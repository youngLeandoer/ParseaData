package com.diploma.service;
import com.diploma.model.ImportedData;
import com.diploma.repository.ImportedDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImportedDataService {

    private final ImportedDataRepository importedDataRepository;

    @Autowired
    public ImportedDataService(ImportedDataRepository importedDataRepository) {
        this.importedDataRepository = importedDataRepository;
    }

    public List<ImportedData> getAllImportedData() {
        return importedDataRepository.findAll();
    }

    public ImportedData saveImportedData(ImportedData importedData) {
        return importedDataRepository.save(importedData);
    }

}
