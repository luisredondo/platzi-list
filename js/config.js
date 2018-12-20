// Llamadas al DOM
const addComment = document.getElementById('add-comment');
const contentToAdd = document.getElementById('text-to-add');
const notesContainer = document.getElementById('notes-container');
const completeNotes = document.getElementById('completed-notes').children[1];

EventListeners();

function EventListeners() {

    document.addEventListener('click', RemoveNote);
    document.addEventListener('DOMContentLoaded', LoadElementsLocalStorage);
    addComment.addEventListener('click', AddNote);
    notesContainer.addEventListener('click', AddToCompletes)

};

function AddNote(e) {
    if (e.target.className == 'add-btn' || e.target.className == 'fas fa-plus') {

        let note = `
          <div class="note">
          <div class="checkbox-btn" id="checkbox-btn"><i class="fas fa-check"></i></div>
          <span class="text-content">${contentToAdd.value}</span>
          <div class="delete-btn" id="delete-btn"><i class="fas fa-trash-alt"></i></div>
          </div>
          `;

        AddToLocalStorage(contentToAdd.value);

        notesContainer.innerHTML = note + notesContainer.innerHTML;

        contentToAdd.value = "";
    }
}

function RemoveNote(e) {
    if (e.target.className == 'fas fa-trash-alt') {
        e.target.parentElement.parentElement.remove();
        RemoveFromLocalStorage(e.target.parentElement.parentElement.children[1].innerHTML);

        console.log(e.target.parentElement.parentElement.children[1].innerHTML)
    }
}

function AddToCompletes(e) {
    if (e.target.className == 'checkbox-btn' || e.target.className == 'fas fa-check') {
        let location;

        if (e.target.className == 'checkbox-btn') {
            location = e.target.parentElement.children[1].innerText;
        } else {
            location = e.target.parentElement.parentElement.children[1].innerText
        }

        let note = `
          <div class="completed-note">
          <span class="text-content">${location}</span>
          <div class="delete-btn" id="delete-btn"><i class="fas fa-trash-alt"></i></div>
          </div>
          `;

        completeNotes.innerHTML = note + completeNotes.innerHTML;

        RemoveFromLocalStorage(location);

        if (e.target.className == 'checkbox-btn')
            e.target.parentElement.remove();
        else
            e.target.parentElement.parentElement.remove();
    }
}

function LoadElementsLocalStorage() {
    let items;

    items = LocalStorageRequest();

    items.forEach((item) => {
        let note = `
          <div class="note">
          <div class="checkbox-btn" id="checkbox-btn"><i class="fas fa-check"></i></div>
          <span class="text-content">${item}</span>
          <div class="delete-btn" id="delete-btn"><i class="fas fa-trash-alt"></i></div>
          </div>
          `;

        notesContainer.innerHTML = note + notesContainer.innerHTML;
    });
}

function AddToLocalStorage(item) {
    let items;

    items = LocalStorageRequest();
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}

function LocalStorageRequest() {
    let items;

    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    return items;
}

function RemoveFromLocalStorage(item) {
    let items, deleteItem;

    deleteItem = item;
    items = LocalStorageRequest();

    items.forEach((item, index) => {
        if (deleteItem === item) {
            items.splice(index, 1);
        }
    });

    localStorage.setItem('items', JSON.stringify(items));
}