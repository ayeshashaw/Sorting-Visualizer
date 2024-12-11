// DOM Element Selections
const stage = document.getElementById('stage');
const generateBtn = document.getElementById('generateBtn');
const solveBtn = document.getElementById('solveBtn');
const selectAlgorithm = document.getElementById('selectAlgorithm');
const numbersBars = document.getElementById('numbersBars');

let array = [];

// Generate a random array function
function generateArray(size) {
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  renderArray();
}

// Render the array as bars
function renderArray() {
  stage.innerHTML = '';
  array.forEach((value) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${Math.max(value, 5)}%`;
    bar.textContent = value;
    stage.appendChild(bar);
  });
}

// Delay function for visualization
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
  const bars = document.querySelectorAll('.bar');
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = 'red';
      bars[j + 1].style.backgroundColor = 'red';
      
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderArray();
        await delay(200);
      }
      
      bars[j].style.backgroundColor = '#3498db';
      bars[j + 1].style.backgroundColor = '#3498db';
    }
  }
}

// Selection Sort
async function selectionSort() {
  const bars = document.querySelectorAll('.bar');
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    bars[minIndex].style.backgroundColor = 'red';
    
    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = 'yellow';
      
      if (array[j] < array[minIndex]) {
        bars[minIndex].style.backgroundColor = '#3498db';
        minIndex = j;
        bars[minIndex].style.backgroundColor = 'red';
      }
      
      await delay(200);
      bars[j].style.backgroundColor = '#3498db';
    }
    
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      renderArray();
      await delay(200);
    }
    
    bars[minIndex].style.backgroundColor = '#3498db';
  }
}

// Quick Sort
async function quickSort(left = 0, right = array.length - 1) {
  if (left < right) {
    let pivotIndex = await partition(left, right);
    await quickSort(left, pivotIndex - 1);
    await quickSort(pivotIndex + 1, right);
  }
}

// Partition function for Quick Sort
async function partition(left, right) {
  const bars = document.querySelectorAll('.bar');
  let pivot = array[right];
  let i = left - 1;
  
  bars[right].style.backgroundColor = 'red'; // Pivot element
  
  for (let j = left; j < right; j++) {
    bars[j].style.backgroundColor = 'yellow';
    
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      renderArray();
      await delay(200);
    }
    
    bars[j].style.backgroundColor = '#3498db';
  }
  

  [array[i + 1], array[right]] = [array[right], array[i + 1]];
  renderArray();
  await delay(200);
  
  bars[right].style.backgroundColor = '#3498db';
  return i + 1;
}

// Merge Sort
async function mergeSort(start = 0, end = array.length - 1) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
  }
}


async function merge(start, mid, end) {
  const bars = document.querySelectorAll('.bar');
  const left = array.slice(start, mid + 1);
  const right = array.slice(mid + 1, end + 1);
  
  let i = 0, j = 0, k = start;
  
  while (i < left.length && j < right.length) {
    bars[start + i].style.backgroundColor = 'red';
    bars[mid + 1 + j].style.backgroundColor = 'yellow';
    
    await delay(200);
    
    if (left[i] <= right[j]) {
      array[k] = left[i];
      i++;
    } else {
      array[k] = right[j];
      j++;
    }
    
    renderArray();
    await delay(200);
    
    bars[start + i - 1].style.backgroundColor = '#3498db';
    bars[mid + 1 + j - 1].style.backgroundColor = '#3498db';
    
    k++;
  }
  
  while (i < left.length) {
    array[k] = left[i];
    renderArray();
    await delay(200);
    i++;
    k++;
  }
  
  while (j < right.length) {
    array[k] = right[j];
    renderArray();
    await delay(200);
    j++;
    k++;
  }
}

// Event Listener for Generate New Array Button
generateBtn.addEventListener('click', () => {
  generateArray(parseInt(numbersBars.value));
});

// Event Listener for Solve Button
solveBtn.addEventListener('click', async () => {
  // Disable buttons during sorting
  generateBtn.disabled = true;
  solveBtn.disabled = true;
  selectAlgorithm.disabled = true;

  try {
    const algorithm = selectAlgorithm.value;
    switch(algorithm) {
      case 'bubbleSort':
        await bubbleSort();
        break;
      case 'selectionSort':
        await selectionSort();
        break;
      case 'quickSort':
        await quickSort();
        break;
      case 'MergeSort':
        await mergeSort();
        break;
    }
  } catch (error) {
    console.error('Sorting error:', error);
  } finally {
    // Re-enable buttons after sorting
    generateBtn.disabled = false;
    solveBtn.disabled = false;
    selectAlgorithm.disabled = false;
  }
});

// Initial array generation
generateArray(parseInt(numbersBars.value));