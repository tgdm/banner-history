$(document).ready(function() {
    const sheetID = '1CL1c0g2-tAaalUnNRexqS_F8WVeMdmQrrlw5IQ9-0_o';
    const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
    const query = encodeURIComponent('Select *');
    const url = `${base}&tq=${query}`;

    $.get(url, function(data) {
        const jsonData = JSON.parse(data.substr(47).slice(0, -2));
        const table = $('<table>').addClass('table');
        const headerRow = $('<tr>');
        jsonData.table.cols.forEach(col => {
            headerRow.append($('<th>').text(col.label));
        });
        table.append(headerRow);

        jsonData.table.rows.forEach(row => {
            const rowElement = $('<tr>');
            row.c.forEach(cell => {
                rowElement.append($('<td>').text(cell.v));
            });
            table.append(rowElement);
        });

        $('#data-table').append(table);
    });
});
