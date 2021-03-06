const saveBtn = document.getElementById('save-btn');
const newNoteBtn = document.getElementById('new-note-btn');

const noteTitle = document.getElementById('note-title');
const noteBody = document.getElementById('note-body');
const noteList = document.getElementById('note-list');


loadNotes();

noteTitle.addEventListener('input', () => {
    if (noteTitle.value === "") {
        saveBtn.style.display = "none";
    } else if (noteBody.value !== "") {
        saveBtn.style.display = "initial";
    }
});

noteBody.addEventListener('input', () => {
    if (noteBody.value === "") {
        saveBtn.style.display = "none";
    } else if (noteTitle.value !== "") {
        saveBtn.style.display = "initial";
    }
});

function loadNotes() {
    
    fetch(`/api/notes`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            const listNote = document.createElement(`div`);
            listNote.setAttribute("class", "note");
            listNote.setAttribute("data-noteid", data[i].id);
            
            listNote.innerText = data[i].title;

            let icon = document.createElement('i');
            icon.setAttribute("class", "fas fa-trash-alt right");
            
            icon.addEventListener("click", (e) => {
                e.stopPropagation();

                fetch(`/api/note/delete/${data[i].id}`, {
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json',
                    }
                }).then((response) => {
                    location.reload();
                });
            });

            listNote.append(icon);

            listNote.addEventListener("click", () => {

                fetch(`/api/note/${data[i].id}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    noteTitle.setAttribute("disabled", true);
                    noteBody.setAttribute("disabled", true);

                    noteTitle.value = data.title;
                    noteBody.value = data.body;

                    saveBtn.style.display = "none";
                });

            });

            noteList.append(listNote);
        }
    })
    .catch((error) => {
        console.error(error);
    });

    saveBtn.style.display = "none";
    

}


newNoteBtn.addEventListener('click', () => {
    noteTitle.value = "";
    noteBody.value = "";

    noteTitle.removeAttribute("disabled");
    noteBody.removeAttribute("disabled");
});


saveBtn.addEventListener('click', () => {
    let title = document
        .getElementById('note-title')
        .value.trim();
    
    let body = document
        .getElementById('note-body')
        .value.trim();

    let note = { title: title, body: body};

    fetch(`/api/notes`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    })
    .catch((error) => {
        console.error(error);
    });

    location.reload();
});
