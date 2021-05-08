const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem;
let currentColumn;
let dragging = false;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  listArrays.forEach((array, ind) => {
    filteredArray = filterArray(array);
    localStorage.removeItem(`${arrayNames[ind]}Items`);
    localStorage.setItem(`${arrayNames[ind]}Items`, JSON.stringify(filteredArray));
  });
  // localStorage.setItem('backlogItems', JSON.stringify(backlogListArray));
  // localStorage.setItem('progressItems', JSON.stringify(progressListArray));
  // localStorage.setItem('completeItems', JSON.stringify(completeListArray));
  // localStorage.setItem('onHoldItems', JSON.stringify(onHoldListArray));
}

// filter arrays to remove empty items
const filterArray = (array) => {
  const filteredArray = array.filter(item => item !== null);
  return filteredArray;
}

// Create DOM Elements for each list item
const createItemEl = (columnEl, column, item, index) => {
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute('ondragstart', 'drag(event)');
  listEl.contentEditable = true;
  listEl.id = index;
  //listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
  listEl.setAttribute('onchange', `updateItem(${index}, ${column})`);
  // append
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
const updateDOM = () => {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
    updatedOnLoad = true;
  }
  // Backlog Column
  backlogList.textContent = ''; // remove list items
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogList, 0, backlogItem, index);
  })
  backlogListArray = filterArray(backlogListArray);
  // Progress Column
  progressList.textContent = '';
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressList, 1, progressItem, index);
  })
  progressListArray = filterArray(progressListArray);
  // Complete Column
  completeList.textContent = '';
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeList, 2, completeItem, index);
  })
  completeListArray = filterArray(completeListArray);
  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldList, 3, onHoldItem, index);
  })
  onHoldListArray = filterArray(onHoldListArray);
  // Update Local Storage
  updateSavedColumns();
}

// update item - delete if necessary, or update array value
const updateItem = (id, column) => {
  const selectedArray = listArrays[column];
  const selectedColumnEl = listColumns[column].children;
  console.log(dragging);
  if (!dragging) {
    if (!selectedColumnEl[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumnEl[id].textContent;
      //rebuildArrays();
    }
    updateDOM();
  }
}

// allow arrays to reflect drag and drop items
const rebuildArrays = () => {
  backlogListArray = [];
  progressListArray = [];
  completeListArray = [];
  onHoldListArray = [];
  for (let i =0; i < backlogList.children.length; i++) {
    backlogListArray.push(backlogList.children[i].textContent);
  }
  for (let i =0; i < progressList.children.length; i++) {
    progressListArray.push(progressList.children[i].textContent);
  }
  for (let i =0; i < completeList.children.length; i++) {
    completeListArray.push(completeList.children[i].textContent);
  }
  for (let i =0; i < onHoldList.children.length; i++) {
    onHoldListArray.push(onHoldList.children[i].textContent);
  }
  updateDOM();
}


// when item starts dragging
const drag = (e) => {
  draggedItem = e.target;
  console.log(draggedItem);
  //dragging = true;
}

// column allows for item to drop
const allowDrop = (e) => {
  e.preventDefault();
}

// when item enters column area
const dragEnter = (column) => {
  listColumns[column].classList.add('over');
  currentColumn = column;
}

// dropping item in Column
const drop = (e) => {
  e.preventDefault();
  //remove background color/padding
  listColumns.forEach((column) => {
    column.classList.remove('over');
  });
  // add item to column
  const parent = listColumns[currentColumn];
  parent.appendChild(draggedItem);
  // dragging complete
  dragging = false;
  rebuildArrays();
}

// add to column list, reset text box
const addToColumn = (column) => {
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  updateDOM();
  addItems[column].textContent = '';
}

// show add item input box
const showInputBox = (column) => {
  //addBtns[column].style.visibility = 'hidden'
  addBtns[column].setAttribute('style','visibility: hidden');
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}

// hide input box
const hideInputBox = (column) => {
  addBtns[column].setAttribute('style','visibility: visible');
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
}

// on load
updateDOM();
