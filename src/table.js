import './table.css';

const movies = [
  { id: 26, title: 'Побег из Шоушенка', imdb: 9.30, year: 1994 },
  { id: 25, title: 'Крёстный отец', imdb: 9.20, year: 1972 },
  { id: 27, title: 'Крёстный отец 2', imdb: 9.00, year: 1974 },
  { id: 1047, title: 'Тёмный рыцарь', imdb: 9.00, year: 2008 },
  { id: 223, title: 'Криминальное чтиво', imdb: 8.90, year: 1994 },
];

const table = document.getElementById('movies');
const tbody = table.querySelector('tbody');

function renderInitialRows() {
  tbody.innerHTML = '';

  movies.forEach((movie) => {
    const tr = document.createElement('tr');

    tr.dataset.id = movie.id;
    tr.dataset.title = movie.title;
    tr.dataset.year = movie.year;
    tr.dataset.imdb = movie.imdb.toFixed(2);

    tr.innerHTML = `
      <td>#${movie.id}</td>
      <td>${movie.title}</td>
      <td>(${movie.year})</td>
      <td>imdb: ${movie.imdb.toFixed(2)}</td>
    `;

    tbody.appendChild(tr);
  });
}

renderInitialRows();

const sortSteps = [
  { field: 'id', dir: 'asc' },
  { field: 'id', dir: 'desc' },
  { field: 'title', dir: 'asc' },
  { field: 'title', dir: 'desc' },
  { field: 'year', dir: 'asc' },
  { field: 'year', dir: 'desc' },
  { field: 'imdb', dir: 'asc' },
  { field: 'imdb', dir: 'desc' },
];

let stepIndex = 0;

function updateHeaderArrow(field, dir) {
  const ths = table.querySelectorAll('th');

  ths.forEach((th) => {
    th.textContent = th.dataset.fieldName;
  });

  const active = table.querySelector(`th[data-field="${field}"]`);
  if (!active) return;

  const arrow = dir === 'asc' ? ' ↑' : ' ↓';
  active.textContent = active.dataset.fieldName + arrow;
}

function sortTable() {
  const { field, dir } = sortSteps[stepIndex];

  const rows = Array.from(tbody.querySelectorAll('tr'));

  const isNumeric = field === 'id' || field === 'year' || field === 'imdb';

  rows.sort((a, b) => {
    const aVal = a.dataset[field];
    const bVal = b.dataset[field];

    if (isNumeric) {
      const aNum = Number(aVal);
      const bNum = Number(bVal);
      return dir === 'asc' ? aNum - bNum : bNum - aNum;
    }

    if (aVal === bVal) return 0;
    if (dir === 'asc') return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  rows.forEach((row) => tbody.appendChild(row));

  updateHeaderArrow(field, dir);

  stepIndex = (stepIndex + 1) % sortSteps.length;
}

setInterval(sortTable, 2000);
