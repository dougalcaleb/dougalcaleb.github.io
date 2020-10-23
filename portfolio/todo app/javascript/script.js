var activeGroup = null;
var activeNote = null;
var nextFree = 0;
var editing = false;
var selectAllVis = false;
var selected = [];
var canDelete = true;



document.querySelector(".new-general").addEventListener("click", function() {
    newGroup();
});
document.querySelector(".new-check").addEventListener("click", function() {
    newChecklist();
});
document.querySelector(".new-text").addEventListener("click", function() {
    newText();
});
document.querySelector(".new-note").addEventListener("click", function() {
    newNote();
});
document.querySelector(".select-deselect-all").addEventListener("click", selectAllGroups);


document.querySelector(".save").addEventListener("click", saveAllData);
document.querySelector(".load").addEventListener("click", loadAllData);
document.querySelector(".clear").addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

document.querySelector(".mark-complete").addEventListener("click", markComplete);
document.querySelector(".delete-complete").addEventListener("click", deleteAllComplete);

// TODO:
/*
- implement toolbar button functionality (currently in newnote probable)
- Removal of note sheets
- Mass group removal
- Check, uncheck and clear list items
- Color tags
*/



function newGroup(name = "Group Title", noteTitle = "New Note", createNewNote = true) {

    // remove current active note displayed
    if (document.querySelector(".note-active") != null) {
        document.querySelector(".note-active").classList.remove("note-active");
    }

    // if there are no groups, make the first group 0. otherwise, advance the next free group
    var classToAdd = 0;
    if (activeGroup == null) {
        classToAdd = 0;
    } else {
        classToAdd = (nextFree/1);
    }
    
    // create a new group element and add to sidebar
    var ng = document.createElement("DIV");
    ng.classList.add("g"+classToAdd, "group", "group-active", "usable");
    document.querySelector(".sidebar").appendChild(ng);
    ng.innerHTML = "<p contenteditable='false' spellcheck='false' class='group-title'>"+name+"</p><div class='group-menu' title='Delete, edit, or select this group (NO SELECTION OPTIONS)'><svg viewBox='0 0 24 24' class='group-menu-delete' title='Delete this group'><path fill='currentColor' d='M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z' /></svg><svg viewBox='0 0 24 24' class='group-menu-edit' title='Edit this title'><path fill='currentColor' d='M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z' /></svg><svg viewBox='0 0 24 24' class='group-menu-select'><path fill='currentColor' title='Select this group' d='M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z' /></svg></div><div class='group-notes'> </div>";

    // If there is an active group + page, remove it
    if (activeGroup != null) {
        document.querySelector(".g"+activeGroup).classList.remove("group-active");
        document.querySelector(".g"+activeGroup).classList.add("group-inactive");
    }
    if (document.querySelector(".active-page") != null) {
        document.querySelector(".active-page").classList.remove("active-page");
    }
    activeGroup = (document.querySelectorAll(".group")[document.querySelectorAll(".group").length-1].classList[0].split("g")[1]);
    nextFree++;

    // Add a new note to the new group
    if (createNewNote) {
        newNote(noteTitle);
    }
    
    //! EVENT LISTENERS

    // Add an event listener to the edit button for title editing. Called immediately after group is created as well
    ng.children[1].children[1].addEventListener("click", function(event) {

        editing = true;
        
        // give editability
        this.parentNode.parentNode.children[0].setAttribute("contenteditable", "true");
        this.parentNode.parentNode.children[0].focus();

        // create a selection range for the group title text
        var range = document.createRange();
        range.selectNodeContents(this.parentNode.parentNode.children[0]);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        // when enter, blur text
        this.parentNode.parentNode.children[0].addEventListener("keydown", function(e) {
            if (e.keyCode === 13) {
                this.blur();
                this.removeEventListener("keydown", null);
            }
        });

        // when blur, check if empty and correct and no longer editing
        this.parentNode.parentNode.children[0].addEventListener("blur", function() {
            if (this.innerHTML === "") {
                this.innerHTML = "Group Title";
            }
            this.setAttribute("contenteditable", "false");
            editing = false;
        });
    });

    // double click group title editing
    ng.children[0].addEventListener("dblclick", function() {

        editing = true;

        this.setAttribute("contenteditable", "true");
        this.focus();

        var range = document.createRange();
        range.selectNodeContents(this);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        this.addEventListener("keydown", function(e) {
            if (e.keyCode === 13) {
                this.blur();
                this.removeEventListener("keydown", null);
            }
        });

        this.addEventListener("blur", function() {
            if (this.innerHTML === "") {
                this.innerHTML = "Group Title";
            }
            this.setAttribute("contenteditable", "false");
            editing = false;
        });
    });

    // switch active group
    ng.addEventListener("click", function() {
        if (document.querySelector(".group-active") != null) {
            document.querySelector(".group-active").classList.add("group-inactive");
            document.querySelector(".group-active").classList.remove("group-active");
        }
        activeGroup = this.classList[0].split("g")[1];
        this.classList.toggle("group-active");
        this.classList.toggle("group-inactive");
    });

    // used to select first note in a newly active group
    ng.children[0].addEventListener("click", function() {
        activeGroup = this.parentNode.classList[0].split("g")[1];
        if (document.querySelector(".note-active") != null) {
            document.querySelector(".note-active").classList.remove("note-active");
        }
        document.querySelector(".n"+activeGroup+"-0").classList.add("note-active");
        if (document.querySelector(".active-page") != null) {
            document.querySelector(".active-page").classList.remove("active-page");
        }
        document.querySelector(".np-"+activeGroup+"-0").classList.add("active-page");
        activeNote = 0;
    });

    // group deleting
    ng.children[1].children[0].addEventListener("click", function() {
        if (canDelete) {
            this.parentNode.parentNode.style.animation = "delete 0.4s ease-out 0s 1 normal forwards";
            this.parentNode.parentNode.classList.remove("usable");
            var removing = parseInt(this.parentNode.parentNode.classList[0].split("g")[1]);
            setTimeout(remove = () => {
                this.parentNode.parentNode.remove();
                var groupId = this.parentNode.parentNode.classList[0].split("g")[1];
                var found = 0;
                for (var a = 0; a < document.querySelectorAll(".note-page").length; a++) {
                    if (document.querySelectorAll(".note-page")[a].classList[0].split("-")[1] == groupId && document.querySelector(".np-"+groupId+"-"+found) != null) {
                        document.querySelector(".np-"+groupId+"-"+found).remove();
                        found++;
                    }
                }
                selected.pop();
                var lastPossible = (document.querySelector(".sidebar").children.length-1);
                var e = new CustomEvent("click");
                document.querySelector(".sidebar").children[lastPossible].dispatchEvent(e);
                document.querySelector(".sidebar").children[lastPossible].children[0].dispatchEvent(e);
            }, 500);
        }
    });

    // group checkbox selection / deselection
    ng.children[1].children[2].addEventListener("click", function() {
        if (this.innerHTML == '<path fill="currentColor" d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"></path>') {
            // unchecked
            this.innerHTML = "<path fill='currentColor' d='M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z' />";
            selected[this.parentNode.parentNode.classList[0].split("g")[1]] = false;
            document.querySelector(".select-deselect-all").innerHTML = '<path fill="currentColor" d="M20,16V4H8V16H20M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16Z" />';
        } else {
            // checked
            canDelete = false;
            selectAllVis = false;
            toggleOmniSelect();
            this.innerHTML = "<path fill='currentColor' d='M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z' />";
            selected[this.parentNode.parentNode.classList[0].split("g")[1]] = true;
        }
        if (!selected.includes(true)) {
            toggleOmniSelect();
            canDelete = true;
        }
        if (!selected.includes(false)) {
            selectAllGroups(true);
        }
    });


    // add a new value to the selected array for group checkboxes
    selected.push(false);

    // Automatically select the title for quick editing
    editing = true;
    var e = new CustomEvent("click", { "detail": "true2" }, false);
    document.querySelector(".g"+activeGroup).children[1].children[1].dispatchEvent(e);
}







function newNote(data = "New Note") {
    // if there are no existing groups, create a new one
    if (document.querySelectorAll(".group").length === 0) {
        newGroup();
    } else {
        
        // remove current active note and page
        if (document.querySelector(".note-active") != null) {
                document.querySelector(".note-active").classList.remove("note-active");
            document.querySelector(".active-page").classList.remove("active-page");
        }
        
        // create new note node
        var nn = document.createElement("DIV");
        var nextNote = document.querySelector(".g"+activeGroup).children[2].children.length;
        nn.classList.add("n"+activeGroup+"-"+nextNote, "note", "note-active");
        document.querySelector(".g"+activeGroup).children[2].appendChild(nn);
        nn.innerHTML = data;

        activeNote = (nextNote/1);

        // create new note content page
        var nnp = document.createElement("DIV");
        nnp.classList.add("np-"+activeGroup+"-"+nextNote, "active-page", "note-page");
        document.querySelector(".active").appendChild(nnp);

        //! EVENT LISTENERS

        // note title edit on double click
        nn.addEventListener("dblclick", function() {

            editing = true;
                
            this.setAttribute("contenteditable", "true");
            this.focus();

            var range = document.createRange();
            range.selectNodeContents(this);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            this.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    this.blur();
                    this.removeEventListener("keydown", null);
                }
            });

            this.addEventListener("blur", function() {
                if (this.innerHTML === "") {
                    this.innerHTML = "New Note";
                }
                this.setAttribute("contenteditable", "false");
                editing = false;
            });
        });

        // show corresponding content page
        nn.addEventListener("click", function() {
            document.querySelector(".note-active").classList.remove("note-active");
            this.classList.add("note-active");
            activeNote = this.classList[0].split("-")[1];
            document.querySelector(".active-page").classList.remove("active-page");
            document.querySelector(".np-"+activeGroup+"-"+activeNote).classList.add("active-page");
        });

        // automatically select note title for quick editing
        editing = true;
        var e = new CustomEvent("dblclick");
        document.querySelector(".n"+activeGroup+"-"+activeNote).dispatchEvent(e);
    }   
}






function newChecklist(data = "New Item") {
    // if there are no existing groups, create one and add then a checklist
    if (document.querySelectorAll(".group").length === 0) {
        newGroup();
        newChecklist();
    } else {

        // create new checklist item and append to active content page
        var newCL = document.createElement("DIV");
        newCL.classList.add("checklist", "checklist-"+activeGroup+"-");
        newCL.innerHTML = "<div class='item'><svg viewBox='0 0 24 24'><path fill='currentColor' d='M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z' /></svg> <p class='item-content' contenteditable='true'>"+data+"</p></div>";
        document.querySelector(".active-page").appendChild(newCL);

        newCL.children[0].children[0].addEventListener("click", function() {
            if (this.parentNode.parentNode.classList.contains("checked")) {
                this.innerHTML = '<path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"></path>';
                this.parentNode.parentNode.classList.remove("checked");
            } else {
                this.innerHTML = '<path fill="currentColor" d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />';
                this.parentNode.parentNode.classList.add("checked");
            }
        });
    }
}






function newText(data = "New Text Note") {
    // if there are no existing groups, create one and add then a text item
    if (document.querySelectorAll(".group").length === 0) {
        newGroup();
        newText();
    } else {
        // create new text item and append to active content page
        var newTxt = document.createElement("DIV");
        newTxt.classList.add("text", "text-"+activeGroup+"-");
        newTxt.setAttribute("contenteditable", true);
        newTxt.innerHTML = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z" /></svg>'+data;
        document.querySelector(".active-page").appendChild(newTxt);

        //! EVENT LISTENERS

        newTxt.addEventListener("mouseover", function() {
            this.children[0].innerHTML = '<path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />';
        });
        newTxt.addEventListener("mouseout", function() {
            this.children[0].innerHTML = '<path fill="currentColor" d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z"></path>';
        });
        newTxt.children[0].addEventListener("click", function() {
            this.parentNode.remove();
        });
    }
}


function markComplete() {
    for (let a = 0; a < document.querySelectorAll(".checked").length; a++) {
        if (document.querySelectorAll(".checked")[a].classList.contains("complete")) {
            document.querySelectorAll(".checked")[a].style.color = "";
            document.querySelectorAll(".checked")[a].style.textDecoration = "";
            document.querySelectorAll(".checked")[a].classList.remove("complete");
        } else {
            document.querySelectorAll(".checked")[a].style.color = "#999";
            document.querySelectorAll(".checked")[a].style.textDecoration = "line-through";
            document.querySelectorAll(".checked")[a].classList.add("complete");
        }
    }
}

function deleteAllComplete() {
    for (let a = 0; a < document.querySelectorAll(".complete").length; a++) {
        if (document.querySelectorAll(".complete")[a] != undefined) {
            setTimeout(function() {
                document.querySelectorAll(".complete")[0].remove();
            }, 0);
        }
    }

    for (let a = 0; a < document.querySelectorAll(".checked").length; a++) {
        if (document.querySelectorAll(".checked")[a] != undefined) {
            setTimeout(function() {
                document.querySelectorAll(".checked")[0].remove();
            }, 0);
        }
    }
}


// show / hide "Select All" section
function toggleOmniSelect() {
    if (selectAllVis) {
        document.querySelector(".sidebar").style.height = "calc(40vw - 80px";
        document.querySelector(".sidebar").style.top = "0";
        document.querySelector(".sidebar").style.borderTopLeftRadius = "5px";
        canDelete = true;
        selectAllVis = false;
    } else {
        document.querySelector(".sidebar").style.height = "calc(40vw - 80px - 2vw)";
        document.querySelector(".sidebar").style.top = "2vw";
        document.querySelector(".sidebar").style.borderTopLeftRadius = "0px";
        canDelete = false;
        selectAllVis = true;
    }
}

// select and deselect all groups
function selectAllGroups(onlyVis) {
    if (onlyVis === true) {
        canDelete = false;
        document.querySelector(".select-deselect-all").innerHTML = '<path fill="currentColor" d="M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16M13,14L20,7L18.59,5.59L13,11.17L9.91,8.09L8.5,9.5L13,14Z" />';
    } else {
        if (!selected.includes(false)) { // unckecking all
            // console.log("Selected included no falses");
            document.querySelector(".select-deselect-all").innerHTML = '<path fill="currentColor" d="M20,16V4H8V16H20M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16Z" />';
            for (let a = 0; a < selected.length; a++) {
                selected[a] = false;
                document.querySelectorAll(".group-menu-select")[a].innerHTML = '<path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" />';
            }
            canDelete = true;
            toggleOmniSelect();
        } else { // checking all
            canDelete = false;
            // console.log("Selected has falses, setting all to true for full selection");
            document.querySelector(".select-deselect-all").innerHTML = '<path fill="currentColor" d="M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16M13,14L20,7L18.59,5.59L13,11.17L9.91,8.09L8.5,9.5L13,14Z" />';
            for (let b = 0; b < selected.length; b++) {
                selected[b] = true;
                document.querySelectorAll(".group-menu-select")[b].innerHTML = '<path fill="currentColor" d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"></path>';
            }
        }
    }
}


// var userDataLayout = {
//     1: {
//         title: "New Group",
//         notes: {
//             1: {
//                 title: "New Note",
//                 info: {
//                     1: {
//                         type: "check",
//                         data: "New Item",
//                         completed: false
//                     },
//                     2: {
//                         type: "text",
//                         data: "New Text Note"
//                     }
//                 }
//             }
//         }
//     }
// };

function saveAllData() {
    let newSave = {};
    for (let a = 0; a < document.querySelectorAll(".group").length; a++) {
        let newObj = {};
        newObj = {};
        newObj.title = document.querySelector(".g"+a).children[0].innerHTML;
        newObj.notes = {};
        for (let b = 0; b < document.querySelector(".g"+a).children[2].children.length; b++) {
            newObj.notes[b] = {};
            newObj.notes[b].title = document.querySelector(".g"+a).children[2].children[b].innerText;
            newObj.notes[b].info = {};
            for (let c = 0; c < document.querySelector(".np-"+a+"-"+b).children.length; c++) {
                newObj.notes[b].info[c] = {};
                if (document.querySelector(".np-"+a+"-"+b).children[c].classList.contains("checklist")) {
                    newObj.notes[b].info[c].type = "check";
                    if (document.querySelector(".np-"+a+"-"+b).children[c].classList.contains("complete")) {
                        newObj.notes[b].info[c].completed = true;
                    } else {
                        newObj.notes[b].info[c].completed = false;
                    }
                    newObj.notes[b].info[c].data = document.querySelector(".np-"+a+"-"+b).children[c].children[0].children[1].innerText;
                } else {
                    newObj.notes[b].info[c].type = "text";
                    newObj.notes[b].info[c].data = document.querySelector(".np-"+a+"-"+b).children[c].innerText;
                }
            }
        }
        newSave[a] = newObj;
    }
    // return newSave;
    localStorage.setItem("userData", JSON.stringify(newSave));
}

function loadAllData() {
    let loadSave = JSON.parse(localStorage.getItem("userData"));
    for (let a = 0; a < obj_length(loadSave); a++) {
        newGroup(loadSave[a].title,"",false);
        for (let b = 0; b < obj_length(loadSave[a].notes); b++) {
            newNote(loadSave[a].notes[b].title);
            for (let c = 0; c < obj_length(loadSave[a].notes[b].info); c++) {
                if (loadSave[a].notes[b].info[c].type === "text") {
                    newText(loadSave[a].notes[b].info[c].data);
                } else {
                    newChecklist(loadSave[a].notes[b].info[c].data);
                }
            }
        }
    }
}

function dumpData() {
    console.log(JSON.parse(localStorage.getItem("userData")));
}

// loadAllData();