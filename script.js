console.log("QuickNotes App is running!");
const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const noteCategory = document.getElementById("note-category");
const notesList = document.getElementById("notes-list");
const searchInput = document.getElementById("search-input");
const noteCount = document.getElementById("note-count");
const errorMessage = document.getElementById("error-message");
let notes = [];
let filteredNotes = [];
function render() {
    notesList.innerHTML = "";
filteredNotes.forEach(function(note) {
   const li = document.createElement("li");

li.textContent = `${note.text} (${note.category})`;

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.addEventListener("click", function() {
    deleteNote(note.id);
    render();
});
li.appendChild(deleteButton);

notesList.appendChild(li);

});
noteCount.textContent = `You have ${notes.length} notes.`;
}
function addNote(text, category) {
    const note = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date()
    };
    notes.push(note);
    filteredNotes = [...notes];
}
function deleteNote(id) {
    notes = notes.filter(function(note) {
        return note.id !== id;
    });
}
function searchNotes(searchTerm) {
    const term = searchTerm.toLowerCase();

    filteredNotes = notes.filter(function(note) {
        return note.text.toLowerCase().includes(term);
    });
}
searchInput.addEventListener("input", function() {
    searchNotes(searchInput.value);
    render();
});
noteForm.addEventListener("submit", function(event) {
    event.preventDefault();
const text = noteInput.value.trim();
const category = noteCategory.value;
if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
}
if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
}
addNote(text, category);
noteInput.value = "";
errorMessage.textContent = "";
render();
});
render();