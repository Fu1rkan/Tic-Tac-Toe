let fields = [
    null,
    'X',
    null,
    null,
    null,
    'O',
    'X',
    null,
    null
]

function render() {
    let html = '<table>';
    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let value = fields[index];
            let className = '';
            if (value === 'O') {
                className = 'circle';
            } else if (value === 'X') {
                className = 'cross';
            }
            html += `<td class="${className}">${value ? value : ''}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    document.getElementById('content').innerHTML = html;
}

render();