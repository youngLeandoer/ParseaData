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
            // Build DataTable
            $('#data-table').DataTable({
                columns: headers.map(header => ({ "header": header, "data": header })),
                data: data,
            });
        }