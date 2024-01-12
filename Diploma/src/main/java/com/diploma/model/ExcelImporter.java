package com.diploma.model;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ExcelImporter {

    public static List<ImportedData> importFromExcel(InputStream inputStream) {
        List<ImportedData> listOfImportedData = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(inputStream)) {
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            // Пропускаем заголовок
            if (rowIterator.hasNext()) {
                rowIterator.next();
            }

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                ImportedData importedData = createImportedDataFromRow(row);
                listOfImportedData.add(importedData);
            }
        } catch (IOException e) {
            e.printStackTrace(); // Обработка ошибок чтения файла
        }

        return listOfImportedData;
    }

    private static ImportedData createImportedDataFromRow(Row row) {
        ImportedData importedData = new ImportedData();

        // Предположим, что столбцы в Excel соответствуют полям ImportedData
        Cell cell;

        // Получение данных из ячеек и установка их в объект ImportedData
        cell = row.getCell(0); // Первая ячейка
        if (cell != null) {
            importedData.setColumn1(cell.getStringCellValue());
        }

        cell = row.getCell(1); // Вторая ячейка
        if (cell != null) {
            importedData.setColumn2(cell.getStringCellValue());
        }
        return importedData;
    }
}
