package com.diploma.controller;
import com.diploma.model.ExcelImporter;
import com.diploma.model.ImportedData;
import com.diploma.service.ImportedDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/imported-data")
public class ImportedDataController {

    private final ImportedDataService importedDataService;

    @Autowired
    public ImportedDataController(ImportedDataService importedDataService) {
        this.importedDataService = importedDataService;
    }

    @PostMapping("/import")
    public ResponseEntity<?> importData(@RequestBody List<ImportedData> importedDataList,
                                        @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            if (file != null) {
                // Реализация метода для импорта данных из Excel и сохранения в БД
                InputStream inputStream = file.getInputStream();
                List<ImportedData> importedDataListFromFile = ExcelImporter.importFromExcel(inputStream);

                // Сохранение данных из файла в БД
                for (ImportedData importedData : importedDataListFromFile) {
                    importedDataService.saveImportedData(importedData);
                }
            }

            // Сохранение данных из запроса в БД
            for (ImportedData importedData : importedDataList) {
                importedDataService.saveImportedData(importedData);
            }

            return ResponseEntity.ok("Данные успешно импортированы.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("ошибка при импортировании: " + e.getMessage());
        }
    }

    @PostMapping("/import-list")
    public ResponseEntity<String> importDataList(@RequestBody List<ImportedData> importedDataList) {
        try {
            importedDataService.saveImportedData((ImportedData) importedDataList);

            return ResponseEntity.ok("Данные успешно импортированы.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("ошибка при импортировании: " + e.getMessage());
        }
    }

    @PostMapping("/save-to-database")
    public ResponseEntity<String> saveToDatabase(@RequestBody List<ImportedData> importedDataList) {
        try {
            // Ваш код для сохранения данных в базе данных
            importedDataService.saveImportedData((ImportedData) importedDataList); 

            return ResponseEntity.ok("Данные успешно импортированы в бд.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("ошибка при импортировании в бд: " + e.getMessage());
        }
    }

    @PostMapping("/import-file")
    public String importData(@RequestParam("file") MultipartFile file) {
        try {
            // Реализация метода для импорта данных из Excel и сохранения в БД
            InputStream inputStream = file.getInputStream();
            List<ImportedData> importedDataList = ExcelImporter.importFromExcel(inputStream);

            // Сохранение данных в БД
            for (ImportedData importedData : importedDataList) {
                importedDataService.saveImportedData(importedData);
            }

            return "Success";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    @GetMapping("/all")
    public List<ImportedData> getAllImportedData() {
        return importedDataService.getAllImportedData();
    }

    @PostMapping("/save")
    public ImportedData saveImportedData(@RequestBody ImportedData importedData) {
        return importedDataService.saveImportedData(importedData);
    }
}
