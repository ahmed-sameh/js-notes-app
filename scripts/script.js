const notesListHook =  document.getElementById('notes');
const addBtn =  document.getElementById('add-btn');

// get stored notes from local storage and send them to add Note function to render it
const storedNotes = JSON.parse(localStorage.getItem('notes'))
if(storedNotes) {
  storedNotes.forEach(note => {
    addNote(note);
  })
}

// handling add note button
addBtn.addEventListener('click', () => {addNote()})


// main function the responsible to create notes and render it 
function addNote(noteText = '') {

  // creating note and its inner html content
  const noteEl = document.createElement('div');
  noteEl.className = 'note';
  
  noteEl.innerHTML = `
  <div class="tools-bar">
  <button class="edit-btn" title='Edit Note'><i class="fas fa-edit"></i></button>
  <button class="delete-btn" title='Delete Note'><i class="fas fa-trash-alt"></i></button>
  </div>
  
  <div class ="text-area">
  <textarea name="note" class="note-input hidden" placeholder="Enter Your note..."></textarea>
  <div class ="final-note"></div>
  </div>
  `;
  
  // add events listener to handling user interactons as edit and delete notes
  const editBtn = noteEl.querySelector('.edit-btn');
  const deleteBtn =  noteEl.querySelector('.delete-btn');
  const noteTextArea = noteEl.querySelector('textarea');
  const noteDiv = noteEl.querySelector('.final-note');

  //  update note textarea and note div when there is rendering of local storage restored notes
  if(noteText) {
    console.log(noteText)
    noteTextArea.value = noteText;
    noteDiv.innerText = noteTextArea.value;
  }
  
  // toggle between edit mood and solid mood
  editBtn.addEventListener('click', noteToggleHandler);

  function noteToggleHandler() {
    noteDiv.classList.toggle('hidden');
    noteTextArea.classList.toggle('hidden');
  }
  
  //  update local storage and note div on user input event
  noteTextArea.addEventListener('input', event => {
    noteDiv.innerText = '';
    const {value: enterednote } = event.target;
    noteDiv.innerText = enterednote;
    updateLocalStorage()
  })

  //  handling user delete note action
  deleteBtn.addEventListener('click', () => {
    noteEl.remove();
    updateLocalStorage();
  })
  notesListHook.append(noteEl)

}

//  function resposble to update local storage
function updateLocalStorage() {
  const notesTextAreas = document.querySelectorAll('textarea');
  let notes = [];

  notesTextAreas.forEach(note => {
    notes.push(note.value)
  });

  localStorage.setItem('notes', JSON.stringify(notes));
  
}