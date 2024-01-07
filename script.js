        function buildTable() {
            // ПОЛУЧЕНИЕ ДАННЫХ 
            const rawData = document.getElementById('table-structure').value;
            const rows = rawData.split('\n');

            // ЗАГОЛОВКИ СТОЛБЦОВ
            const headers = rows[0].split('\t');

            // МАССИВ ОБЪЕКТОВ 
            const data = [];
            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split('\t');
                const rowObject = {};
                for (let j = 0; j < headers.length; j++) {
                    rowObject[headers[j]] = values[j];
                }
                data.push(rowObject);
            }

            //СОЗДАНИЕ ТАБЛ
            $('#data-table').DataTable({
                columns: headers.map(header => ({ "header": header, "data": header })),
                data: data,
            });
        }
        //ФУНКЦИЯ СОХРАНЕНИЯ ТАБЛ(ПОКА ТОЛЬКО В Excel Формат)
        function saveTable(){
            const table = document.getElementById('data-table');
            const csvData = [];
            const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
            csvData.push(headers.join('\t'));
            const rows = Array.from(table.querySelectorAll('tr'));
            rows.forEach(row => {
                const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent);
                csvData.push(cells.join('\t'));
            });
            const csvContent = csvData.join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'table.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        //Функция добовления существующей табл
        $(document).ready(function() {
            $('#excel-file').change(function(e) {
                var file = e.target.files[0];
                var reader = new FileReader();
    
                reader.onload = function(e) {
                    var data = new Uint8Array(e.target.result);
                    var workbook = XLSX.read(data, { type: 'array' });
                    var worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
                    var tableHtml = '<table id="data-table" class="display">';
                    for (var i = 0; i < jsonData.length; i++) {
                        tableHtml += '<tr>';
                        for (var j = 0; j < jsonData[i].length; j++) {
                            if (i === 0) {
                                tableHtml += '<th>' + jsonData[i][j] + '</th>';
                            } else {
                                tableHtml += '<td>' + jsonData[i][j] + '</td>';
                            }
                        }
                        tableHtml += '</tr>';
                    }
                    tableHtml += '</table>';
    
                    $('#data-table-container').html(tableHtml);
                    $('#data-table').DataTable();
                };
    
                reader.readAsArrayBuffer(file);
            });
        });