// Get all grade cells
const gradeCells = document.querySelectorAll('[data-type="grade"]');

// Add an event listener to each grade cell (starting from the second cell)
for (let i = 1; i < gradeCells.length; i++) {
  const cell = gradeCells[i];
  cell.addEventListener('input', event => {
    // Get the row containing the grade cell
    const row = cell.parentNode;
    // Update the average column for the row
    updateAverage(row);
  });
}

// Update the average column for a given row and toggle the presentation of the average grade
function updateAverage(row) {
  // Get all grade cells for the row, including the new column
  const gradeCells = row.querySelectorAll('[data-type="grade"], [data-type="new"]');
  let sum = 0;
  let count = 0;
  // Calculate the sum of all entered grades and count the number of entered grades
  gradeCells.forEach(cell => {
    const value = parseFloat(cell.innerText);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      sum += value;
      count++;

      // Remove yellow background style if value is not '-'
      cell.style.backgroundColor = '';
    }
    else if (cell.innerText === '-') {
      sum += 0;
      count++;
      cell.style.backgroundColor = '';
    }
    else {
      cell.innerText = '-';
      cell.style.backgroundColor = 'yellow';
    }
  });
  // Calculate the average for the entered grades, rounding to the nearest whole number
  const average = count > 0 ? Math.round(sum / count) : '-';

  // Get the average cell in the row
  const averageCell = row.querySelector('[data-type="average"]');

  // Get the selected value of the grade toggle select element
  const selectedValue = gradeToggle.value;

  // Toggle the presentation of the average grade based on the selected value
  switch (selectedValue) {
    case 'percent':
      averageCell.innerText = `${average}%`;
      break;
    case 'letter':
      averageCell.innerText = convertToLetterGrade(average);
      break;
    case 'four-point':
      averageCell.innerText = convertToFourPointGrade(average);
      break;
    case 'letter-four-point':
      averageCell.innerText = `${convertToLetterGrade(average)} (${convertToFourPointGrade(average)})`;
      break;
    default:
      averageCell.innerText = '';
  }
  

  // Change the background and font color if the average is less than 60
  if (average < 60) {
    averageCell.style.backgroundColor = 'red';
    averageCell.style.color = 'white';
  } else {
    averageCell.style.backgroundColor = '';
    averageCell.style.color = '';
  }
}


// Count the number of cells with '-'
const countButton = document.getElementById("start");
const countDisplay = document.getElementById("num");
countButton.addEventListener("click", function() {
  let count = 0;
  const cells = document.querySelectorAll("td[data-type='grade'], td[data-type='new']");
  cells.forEach(cell => {
    const value = parseFloat(cell.innerText);
    if (isNaN(value) || value < 0 || value > 100) {
      cell.innerText = '-';
      cell.style.backgroundColor = 'yellow';
      count++;
    } else {
      cell.style.backgroundColor = 'white';
    }
  });
  countDisplay.textContent = count;
});


function addRow() {

  // Get the table body
  const tableBody = document.querySelector('tbody');

  // Create a new row element
  const newRow = document.createElement('tr');
  newRow.classList.add('student-row');

  // Add the name input cell
  const nameCell = document.createElement('td');
  nameCell.contentEditable = true;
  nameCell.classList.add('name-input');
  newRow.appendChild(nameCell);

  // Add the ID input cell
  const idCell = document.createElement('td');
  idCell.contentEditable = true;
  idCell.classList.add('id-input');
  newRow.appendChild(idCell);

  // Add the new column
  const newColumn = document.createElement('td');
  newColumn.contentEditable = true;
  newColumn.classList.add('grade-input');
  newColumn.setAttribute('data-type', 'new');
  newColumn.setAttribute('min', '0');
  newColumn.setAttribute('max', '100');
  newColumn.addEventListener('input', event => {
    const row = event.target.parentNode;
    updateAverage(row);
  });
  newRow.insertBefore(newColumn, newRow.querySelector('[data-type="average"]'));

  // Add the grade input cells
  for (let i = 0; i < 4; i++) {
    const gradeCell = document.createElement('td');
    gradeCell.contentEditable = true;
    gradeCell.classList.add('grade-input');
    gradeCell.setAttribute('data-type', 'grade');
    gradeCell.setAttribute('min', '0');
    gradeCell.setAttribute('max', '100');
    gradeCell.addEventListener('input', event => {
      const row = event.target.parentNode;
      updateAverage(row);
    });
    newRow.appendChild(gradeCell);
  }

  // Add the average cell
  const averageCell = document.createElement('td');
  averageCell.setAttribute('data-type', 'average');
  const averageSpan = document.createElement('span');
  averageSpan.classList.add('average');
  averageCell.appendChild(averageSpan);
  newRow.appendChild(averageCell);

  // Add the new row to the table
  tableBody.appendChild(newRow);
}


// Add an event listener to the grade toggle select element
const gradeToggle = document.getElementById('grade-toggle');

// Add an event listener to the select element
gradeToggle.addEventListener('change', () => {
  // Loop through all student rows
  const studentRows = document.querySelectorAll('.student-row');
  studentRows.forEach(row => {
    // Update the average column for the row
    updateAverage(row);
  });
});


// Function to convert a percentage grade to an American letter grade
function convertToLetterGrade(average) {
  if (average >= 93) {
    return 'A';
  } 
  else if (average >= 90 && average <= 92) {
    return 'A-';
  }
  else if (average >= 87 && average <= 89) {
    return 'B+';
  }
  else if (average >= 83 && average <= 86) {
    return 'B';
  }
  else if (average >= 80 && average <= 82) {
    return 'B-';
  }
  else if (average >= 77 && average <= 79) {
    return 'C+';
  }
  else if (average >= 73 && average <= 76) {
    return 'C';
  }
  else if (average >= 70 && average <= 72) {
    return 'C-';
  }
  else if (average >= 67 && average <= 69) {
    return 'D+';
  }
  else if (average >= 63 && average <= 66) {
    return 'D';
  }
  else if (average >= 60 && average <= 62) {
    return 'D-';
  }
  else {
    return 'F';
  }
}

// Function to convert a percentage grade to an American 4.0 grade
function convertToFourPointGrade(average) {
  if (average >= 93) {
    return '4.0';
  } 
  else if (average >= 90 && average <= 92) {
    return '3.7';
  }
  else if (average >= 87 && average <= 89) {
    return '3.3';
  }
  else if (average >= 83 && average <= 86) {
    return '3.0';
  }
  else if (average >= 80 && average <= 82) {
    return '2.7';
  }
  else if (average >= 77 && average <= 79) {
    return '2.3';
  }
  else if (average >= 73 && average <= 76) {
    return '2.0';
  }
  else if (average >= 70 && average <= 72) {
    return '1.7';
  }
  else if (average >= 67 && average <= 69) {
    return '1.3';
  }
  else if (average >= 63 && average <= 66) {
    return '1.0';
  }
  else if (average >= 60 && average <= 62) {
    return '0.7';
  }
  else if (average >= 0 && average <= 59) {
    return '0.0';
  }
}

function addColumn() {
  const table = document.querySelector('table');
  const rows = table.querySelectorAll('tr');
  
  // Get the number of the last assignment
  const lastAssignment = parseInt(rows[0].querySelectorAll('th')[rows[0].querySelectorAll('th').length - 2].innerText.replace('Assignment ', ''));
  
  // Create the new column header
  const th = document.createElement('th');
  th.innerText = `Assignment ${lastAssignment + 1}`;
  th.setAttribute('data-type', 'new');
  
  // Insert the new column header
  const lastCol = rows[0].querySelectorAll('th')[rows[0].querySelectorAll('th').length - 1];
  rows[0].insertBefore(th, lastCol);
  
  // Insert new column cells
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const td = document.createElement('td');
    td.classList.add('grade-input');
    td.setAttribute('data-type', 'new');
    td.setAttribute('contenteditable', true);
    td.setAttribute('min', '0');
    td.setAttribute('max', '100');
    td.addEventListener('input', event => {
      const row = event.target.parentNode;
      updateAverage(row);
      const value = parseFloat(event.target.innerText);
      if (value < 0) {
        event.target.innerText = '0';
      } else if (value > 100) {
        event.target.innerText = '100';
      }
    });
    
    // Insert the new column cell
    const lastCell = row.querySelectorAll('td')[row.querySelectorAll('td').length - 1];
    row.insertBefore(td, lastCell);
  }
}


const saveTableButton = document.querySelector('#save-table');
saveTableButton.addEventListener('click', function() {

  // Get the table data and save it
  const tableData = document.querySelector('#grades-table').outerHTML;
  localStorage.setItem('savedTable', tableData);
});

const loadTableButton = document.querySelector('#load-table');
loadTableButton.addEventListener('click', function() {

  // Get the saved table data and display it
  const savedTableData = localStorage.getItem('savedTable');
  document.querySelector('#grades-table').outerHTML = savedTableData;
});
