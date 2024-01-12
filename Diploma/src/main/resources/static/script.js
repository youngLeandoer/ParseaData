// Функция для обработки загрузки Excel файла
function handleFileUpload(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetNames = workbook.SheetNames;

            const selectedSheet = workbook.Sheets[sheetNames[0]];

            const jsonData = XLSX.utils.sheet_to_json(selectedSheet, { header: 1 });

            buildColumnMappingInterface(jsonData);
        };

        reader.readAsArrayBuffer(file);
    }
}

// Функция для построения интерфейса для соответствия колонок
function buildColumnMappingInterface(data) {
    const columnMappingContainer = document.getElementById('column-mapping-container');
    columnMappingContainer.innerHTML = '';

    const headers = data[0];

    headers.forEach((header, index) => {
        const label = document.createElement('label');
        label.textContent = header;

        const select = document.createElement('select');
        select.id = `column-select-${index}`;

        const optionDefault = document.createElement('option');
        optionDefault.value = '';
        optionDefault.text = 'Select Column';
        select.add(optionDefault);

        const databaseColumns = ['Column1', 'Column2', 'Column3'];

        databaseColumns.forEach(column => {
            const option = document.createElement('option');
            option.value = column;
            option.text = column;
            select.add(option);
        });

        columnMappingContainer.appendChild(label);
        columnMappingContainer.appendChild(select);
    });

    const continueButton = document.getElementById('continue-button');
    continueButton.style.display = 'block';
}

// Функция для продолжения после соответствия колонок
function continueAfterMapping() {
}

// Назначение обработчика событий на элемент выбора файла(ненужная)
const fileInput = document.getElementById('excel-file');
fileInput.addEventListener('change', handleFileUpload);

// ФУНКЦИЯ СОЗДАНИЯ ТАБЛИЦЫ
function buildTable() {
    const rawData = document.getElementById('table-structure').value;
    const rows = rawData.split('\n');

    const headers = rows[0].split('\t');

    const data = [];
    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split('\t');
        const rowObject = {};
        for (let j = 0; j < headers.length; j++) {
            rowObject[headers[j]] = values[j];
        }
        data.push(rowObject);
    }

    const dataTable = document.getElementById('data-table');

    if (!dataTable) {
        console.error("Элемент с id 'data-table' не найден.");
        return;
    }

    if ($.fn.DataTable.isDataTable('#data-table')) {
        $('#data-table').DataTable().destroy();
    }

    const headerRow = dataTable.querySelector('thead tr');
    if (headerRow) {
        headerRow.innerHTML = '';
        headers.forEach(header => {
            const th = document.createElement('th');
            th.innerHTML = header;
            headerRow.appendChild(th);
        });
    }
    const columns = headers.map(header => ({ "data": header }));
    $('#data-table').DataTable({
        columns: columns,
        data: data,
    });
}
// Функция для отправки данных в базу данных
function saveToDatabase(data) {
    $.ajax({
        type: 'POST',
        url: '/api/imported-data/import',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            console.log('Данные успешно импортированы в бд:', response);
            alert('Данные успешно импортированы в бд.');
        },
        error: function (error) {
            console.error('ошибка при импортировании в бд:', error);
            alert('ошибка при импортировании в бд');
        }
    });
}

// Функция для сохранения таблицы в Excel
function saveTable() {
    const table = document.getElementById('data-table');
    const csvData = [];
    const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
    csvData.push(headers);
    const rows = Array.from(table.querySelectorAll('tr'));
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent);
        csvData.push(cells);
    });

    const headersRow = csvData.shift();

    const data = csvData.map(row => {
        const rowData = {};
        headersRow.forEach((header, index) => {
            rowData[header] = row[index];
        });
        return rowData;
    });

    // Отправка данных в базу данных
    saveToDatabase(data);
}

const createTableButton = document.getElementById('create-table-button');
if (createTableButton) {
    createTableButton.addEventListener('click', buildTable);
}

const saveTableButton = document.getElementById('save-table-button');
if (saveTableButton) {
    saveTableButton.addEventListener('click', saveTable);
}
