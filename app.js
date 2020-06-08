// Selectors
const toDoInput = document.querySelector('.to-do-input');
const toDoButton = document.querySelector('.to-do-button');
const toDoList = document.querySelector('.to-do-list');
const filterOption = document.querySelector('.filter-toDo');

// Event listeners
document.addEventListener('DOMContentLoaded', getToDos)   // If everything is loaded, run this function of getToDos
toDoButton.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo);

// Functions
function addToDo(event) {
    // Prevent form from submitting
    event.preventDefault();

    // Prevent user from submitting blank input
    if (toDoInput.value === "") {
        document.forms["to-do-form"]["to-do-input"].style.border = "1px solid rgb(226, 85, 104)";
        delayTransition();
        return;
    }

    // To-do DIV
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add("toDo");

    // Create LI
    const newToDo = document.createElement('li');
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add('toDo-item');
    toDoDiv.appendChild(newToDo);

    // ADD TO-DOs TO LOCAL STORAGE
    saveLocalToDos(toDoInput.value);

    // COMPLETED button (checkmark)
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>'
    completedButton.classList.add("completed-button");
    toDoDiv.appendChild(completedButton);

    // TRASH button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"> </i>'
    trashButton.classList.add("trash-button");
    toDoDiv.appendChild(trashButton);

    // APPEND to list
    toDoList.appendChild(toDoDiv);
    
    //CLEAR ToDoInput Value
    toDoInput.value = "";
}

// ERROR MESSAGE IF USER LEFT THE INPUT BLANK
function borderless() {
    document.forms["to-do-form"]["to-do-input"].style.border = "none";
}
function delayTransition() {
    setTimeout(borderless, 1000);
}

function deleteCheck(event) {
    const item = event.target;  // .target is what you are clicking on (li, fas fa-check, or fas fa-trash, which were  created in the addToDo function above)
    const toDo = item.parentElement;
    
    // DELETE TO-DO
    if (item.classList[0] === 'trash-button') {
        // Remove Local To-do
        removeLocalToDos(toDo);     // Removing the whole "toDo" <div> (aka removing the whole to-do-task)
        // Animation
        toDo.classList.add('fall');
        toDo.addEventListener('transitionend', function() {
            toDo.remove();
        });
    }

    // CHECKMARK ANIMATION
    if (item.classList[0] === "completed-button") {
        toDo.classList.toggle("completed");     // Assign a class of "completed" to the to-do-task's <div>
    }

    // CHECKMARKED-ARRAY
    checkmarkedArray = [];
    let completedStatus = item.parentElement.classList.value;
    if (completedStatus === "toDo completed") {  // If the to-do-task was assigned the class "completed", then store it
        checkmarkedArray.push(toDo);
        // SAVING CHECKMARKED-ARRAY TO LOCAL STORAGE 
        completedTask = toDo.children[0].innerText;
        saveLocalCompleted(completedTask);
    } else {
        removeUnchecked(toDo);
    }
    // DELETING CHECKMARKED FROM OLD array using splice function

    // RE-ADDING THEM IF UN-CHECKMARKED
    //CREATE GITHUB REPOSITORY TITLE: TO-DO-LIST APPLICATION
}

function filterToDo(event) {
    const toDos = toDoList.childNodes;
    toDos.forEach(function(toDo) {
        switch(event.target.value) {
            case "all":
                toDo.style.display = "flex";
                break;
            case "completed":
                if(toDo.classList.contains('completed')) {
                    toDo.style.display = "flex";
                } else {
                    toDo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!toDo.classList.contains('completed')) {
                    toDo.style.display = "flex";
                } else {
                    toDo.style.display = "none";
                }
                break;
        }
    })
}

// SAVING TO-DOs ON LOCAL COMPUTER
function saveLocalToDos(toDo) {
    // CHECK if the to-do you want to add already exists or not
    let toDos;
    if (localStorage.getItem("toDos") === null) {
        toDos = [];
    } else {
        toDos = JSON.parse(localStorage.getItem("toDos"));
    }
    toDos.push(toDo);
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

// SAVING TO-DOs ON LOCAL COMPUTER
function saveLocalCompleted(toDo) {
    // CHECK if the to-do you want to add already exists or not
    let toDos;
    if (localStorage.getItem("completedToDos") === null) {
        toDos = [];
    } else {
        toDos = JSON.parse(localStorage.getItem("completedToDos"));
    }
    toDos.push(toDo);
    localStorage.setItem("completedToDos", JSON.stringify(toDos));
}

function getToDos() {
    // CHECK if the to-do you want to add already exists or not
    let toDos;
    if (localStorage.getItem("toDos") === null) {
        toDos = [];
    } else {
        toDos = JSON.parse(localStorage.getItem("toDos"));
    }
    toDos.forEach(function(toDo) {
        // To-do DIV
        const toDoDiv = document.createElement('div');
        toDoDiv.classList.add("toDo");

        // Create LI
        const newToDo = document.createElement('li');
        newToDo.innerText = toDo;
        newToDo.classList.add('toDo-item');
        toDoDiv.appendChild(newToDo);

        // COMPLETED button (checkmark)
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"> </i>'
        completedButton.classList.add("completed-button");
        toDoDiv.appendChild(completedButton);

        // TRASH button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"> </i>'
        trashButton.classList.add("trash-button");
        toDoDiv.appendChild(trashButton);

        // APPEND to list
        toDoList.appendChild(toDoDiv);
    });
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function removeLocalToDos(toDo) {
     // CHECK if the to-do you want to delete exists or not
     let toDos;
     if (localStorage.getItem("toDos") === null) {
         toDos = [];
     } else {
         toDos = JSON.parse(localStorage.getItem("toDos"));
     }
     const toDoInnerText = toDo.children[0].innerText;
     const toDoIndex = toDos.indexOf(toDoInnerText);
     toDos.splice(toDoIndex, 1);
     localStorage.setItem("toDos", JSON.stringify(toDos));
}

// REMOVE FROM CHECKMARKED-ARRAY (if user accidentally clicks "completed" but wants to revert it)
function removeUnchecked(toDo) {
    // CHECK if the to-do you want to delete exists or not
    let completed;
    if (localStorage.getItem("completedToDos") === null) {
        completed = [];
    } else {
        completed = JSON.parse(localStorage.getItem("completedToDos"));
    }
    const toDoInnerText = toDo.children[0].innerText;
    const toDoIndex = completed.indexOf(toDoInnerText);
    completed.splice(toDoIndex, 1);
    localStorage.setItem("completedToDos", JSON.stringify(completed));
}