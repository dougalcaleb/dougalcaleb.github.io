var activeGroup = null;
var activeNote = null;
var nextFree = 0;
var editing = false;
var selectAllVis = false;
var selected = [];

document.querySelector(".new-general").addEventListener("click", newGroup);
document.querySelector(".new-check").addEventListener("click", newChecklist);
document.querySelector(".new-note").addEventListener("click", function() {
    newNote(activeGroup);
});
// document.addEventListener("keydown", keydn);

function keydn(event) {
	switch(event.keyCode) {
		case 78:
            if (!editing) {
                newGroup();
            }
            break;
        case 69: // nice
            if (!editing) {
                editing = true;
                var e = new CustomEvent("click", { "detail": "true1" });
                document.querySelector(".g"+activeGroup).children[1].children[1].dispatchEvent(e);
            }
            break;
	}
}

function newGroup() {

    if (document.querySelector(".note-active") != null) {
        document.querySelector(".note-active").classList.remove("note-active");
    }
    
    var ng = document.createElement("DIV");
    ng.classList.add("g"+nextFree, "group", "group-active", "usable");
    document.querySelector(".sidebar").appendChild(ng);
    ng.innerHTML = "<p contenteditable='false' spellcheck='false' class='group-title'>Group Title</p><div class='group-menu' title='Delete, edit, or select this group'><svg viewBox='0 0 24 24' class='group-menu-delete' title='Delete this group'><path fill='currentColor' d='M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z' /></svg><svg viewBox='0 0 24 24' class='group-menu-edit' title='Edit this title'><path fill='currentColor' d='M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z' /></svg><svg viewBox='0 0 24 24' class='group-menu-select'><path fill='currentColor' title='Select this group' d='M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z' /></svg></div><div class='group-notes'>    <div class='n"+(nextFree/1)+"-0 note note-active'>New Note</div>    </div>";

    if (activeGroup !== null) {
        document.querySelector(".g"+activeGroup).classList.remove("group-active");
        document.querySelector(".g"+activeGroup).classList.add("group-inactive");
    }
    
    if (document.querySelectorAll(".active-page").length >= 1) {
        document.querySelector(".active-page").classList.remove("active-page");
    }

    activeGroup = (nextFree/1);
    
    var nnp = document.createElement("DIV");
    nnp.classList.add("np-"+activeGroup+"-0", "active-page", "note-page");
    document.querySelector(".active").appendChild(nnp);
    // nnp.style.background = rand_hex_color();

    // nnp.innerHTML = "This is page "+0+" of group "+nextFree;

    nextFree++;
    notePreEdits();
    editing = true;
    var e = new CustomEvent("click", { "detail": "true2" }, false);
    document.querySelector(".g"+activeGroup).children[1].children[1].dispatchEvent(e);
}

function newNote(group) {
    // if there are no existing groups, create a new one, which has a new note in it by default
    if (document.querySelectorAll(".group").length === 0) {
        newGroup();
    } else {
        
        document.querySelector(".note-active").classList.remove("note-active");

        var nn = document.createElement("DIV");
        var nextNote = document.querySelector(".g"+group).children[2].children.length;
        nn.classList.add("n"+activeGroup+"-"+nextNote, "note", "note-active");
        document.querySelector(".g"+group).children[2].appendChild(nn);
        nn.innerHTML = "New Note";

        activeNote = (nextNote/1);

        document.querySelector(".active-page").classList.remove("active-page");

        var nnp = document.createElement("DIV");
        nnp.classList.add("np-"+activeGroup+"-"+nextNote, "active-page", "note-page");
        document.querySelector(".active").appendChild(nnp);
        // nnp.style.background = rand_hex_color();
        // nnp.innerHTML = "This is page "+nextNote+" of group "+activeGroup;

        notePreEdits();

        editing = true;
        var e = new CustomEvent("dblclick");
        document.querySelector(".n"+activeGroup+"-"+activeNote).dispatchEvent(e);
    }   
}

function newChecklist() {
    if (document.querySelectorAll(".group").length === 0) {
        newGroup();
        newChecklist();
    } else {
        var newCL = document.createElement("DIV");
        newCL.classList.add("checklist", "checklist-"+activeGroup+"-");
        newCL.innerHTML = "<div class='item'><svg viewBox='0 0 24 24'><path fill='currentColor' d='M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z' /></svg> <p class='item-content' contenteditable='true'>New Item</p></div>";
        document.querySelector(".active-page").appendChild(newCL);
    }
}

function notePreEdits() {
    var cloneFrom = document.querySelector(".wrap");
    var cloneTo = cloneFrom.cloneNode(true);

    // console.log(cloneTo);

    cloneFrom.parentNode.replaceChild(cloneTo, cloneFrom);

    document.querySelector(".new-general").addEventListener("click", newGroup);
    document.querySelector(".new-check").addEventListener("click", newChecklist);
    document.querySelector(".new-note").addEventListener("click", function() {
        newNote(activeGroup);
    });
    document.querySelector(".select-deselect-all").addEventListener("click", function() {
        selectAllGroups();
    });
    // document.addEventListener("keydown", keydn);

    noteEdits();
}

function noteEdits() {

    // group title edit via "e" press (event sent in keydn), via edit btn click, or via new group btn
    for(var a = 0; a < document.querySelectorAll(".group-menu-edit").length; a++) {
        document.querySelectorAll(".group-menu-edit")[a].addEventListener("click", function(event) {

            editing = true;
            
            // if using e, wait for stack clear so e is not counted as an input
            if (event.detail === "true1" || event.detail === "true2") {
                setTimeout(waitForStackClear = () => {
                    this.parentNode.parentNode.children[0].setAttribute("contenteditable", "true");
                    this.parentNode.parentNode.children[0].focus();
                }, 0);
            } else {
                this.parentNode.parentNode.children[0].setAttribute("contenteditable", "true");
                this.parentNode.parentNode.children[0].focus();
            }

            // create a selection range for the group title text
            var range = document.createRange();
            range.selectNodeContents(this.parentNode.parentNode.children[0]);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            // when enter
            this.parentNode.parentNode.children[0].addEventListener("keydown", function(e) {
                if (e.keyCode === 13) {
                    this.blur();
                    this.removeEventListener("keydown", null);
                }
            });

            this.parentNode.parentNode.children[0].addEventListener("blur", function() {
                if (this.innerHTML === "") {
                    this.innerHTML = "Group Title";
                }
                this.setAttribute("contenteditable", "false");
                // if (event.detail === 1) {
                    editing = false;
                // }
            });
        });
    }

    // group title edit via double click
    for(var b = 0; b < document.querySelectorAll(".group").length; b++) {
        document.querySelectorAll(".group-title")[b].addEventListener("dblclick", function() {

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
    }

    // active group switching
    for (var c = 0; c < document.querySelectorAll(".group").length; c++) {
        document.querySelectorAll(".group")[c].addEventListener("click", function() {
            if (document.querySelectorAll(".group-active").length > 0) {
                document.querySelector(".group-active").classList.toggle("group-inactive");
                document.querySelector(".group-active").classList.toggle("group-active");
            }
            activeGroup = this.classList[0].split("")[1];
            this.classList.toggle("group-active");
            this.classList.toggle("group-inactive");
        });
    }

    // used to navigate instead of clicking on groups due to bugs with clicks
    for (var ca = 0; ca < document.querySelectorAll(".group-title").length; ca++) {
        document.querySelectorAll(".group-title")[ca].addEventListener("click", function() {
            activeGroup = this.parentNode.classList[0].split("")[1];
            document.querySelector(".note-active").classList.remove("note-active");
            document.querySelector(".n"+activeGroup+"-0").classList.add("note-active");
            document.querySelector(".active-page").classList.remove("active-page");
            document.querySelector(".np-"+activeGroup+"-0").classList.add("active-page");
        });
    }

    // editing of note title in nav
    for (var d = 0; d < document.querySelectorAll(".note").length; d++) {
        document.querySelectorAll(".note")[d].addEventListener("dblclick", function() {

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
    }

    // removal of groups
    for (var e = 0; e < document.querySelectorAll(".group-menu-delete").length; e++) {
        document.querySelectorAll(".group-menu-delete")[e].addEventListener("click", function() {
            this.parentNode.parentNode.style.animation = "delete 0.4s ease-out 0s 1 normal forwards";
            this.parentNode.parentNode.classList.remove("usable");
            setTimeout(remove = () => {
                this.parentNode.parentNode.style.display = "none";
                var groupId = this.parentNode.parentNode.classList[0].split("g")[1];
                var found = 0;
                for (var a = 0; a < document.querySelectorAll(".note-page").length; a++) {
                    if (document.querySelectorAll(".note-page")[a].classList[0].split("-")[1] == groupId && document.querySelector(".np-"+groupId+"-"+found) != null) {
                        document.querySelector(".np-"+groupId+"-"+found).style.display = "none";
                        found++;
                    }
                }
                var lastPossible = 0;
                for (var b = 0; b < document.querySelectorAll(".group").length; b++) {
                    if (document.querySelectorAll(".group")[b].classList.contains("usable")) {
                        lastPossible = (b/1);
                    }
                }
                var e = new CustomEvent("click");
                document.querySelector(".g"+lastPossible).dispatchEvent(e);
            }, 500);
        });
    }

    // select and deselect groups
    for (var f = 0; f < document.querySelectorAll(".group-menu-select").length; f++) {
        document.querySelectorAll(".group-menu-select")[f].addEventListener("click", function() {
            if (this.innerHTML == '<path fill="currentColor" d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"></path>') {
                // unchecked
                this.innerHTML = "<path fill='currentColor' d='M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z' />";
                // toggleOmniSelect();
                selected[this.parentNode.parentNode.classList[0].split("")[1]] = false;
            } else {
                // checked
                selectAllVis = false;
                toggleOmniSelect();
                this.innerHTML = "<path fill='currentColor' d='M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z' />";
                selected[this.parentNode.parentNode.classList[0].split("")[1]] = true;
            }
            if (!selected.includes(true)) {
                toggleOmniSelect();
            }
        });
    }

    // show active notes when a note is clicked in nav
    for (var g = 0; g < document.querySelectorAll(".note").length; g++) {
        document.querySelectorAll(".note")[g].addEventListener("click", function() {
            document.querySelector(".note-active").classList.remove("note-active");
            this.classList.add("note-active");
            activeNote = this.classList[0].split("-")[1];
            document.querySelector(".active-page").classList.remove("active-page");
            document.querySelector(".np-"+activeGroup+"-"+activeNote).classList.add("active-page");
        });
    }

    selected = [];
    for (var z = 0; z < document.querySelectorAll(".group-menu-select").length; z++) {
        selected.push(false);
    }
}

// show / hide "Select All" section
function toggleOmniSelect() {
    if (selectAllVis) {
        document.querySelector(".sidebar").style.height = "calc(40vw - 80px";
        document.querySelector(".sidebar").style.top = "0";
        document.querySelector(".sidebar").style.borderTopLeftRadius = "5px";
        selectAllVis = false;
    } else {
        document.querySelector(".sidebar").style.height = "calc(40vw - 80px - 2vw)";
        document.querySelector(".sidebar").style.top = "2vw";
        document.querySelector(".sidebar").style.borderTopLeftRadius = "0px";
        selectAllVis = true;
    }
}

// select and deselect all groups
function selectAllGroups(onlyVis) {
    if (onlyVis) {
        document.querySelector(".select-deselect-all").innerHTML = '<path fill="currentColor" d="M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16M13,14L20,7L18.59,5.59L13,11.17L9.91,8.09L8.5,9.5L13,14Z" />';
    } else {
        if (!selected.includes(false)) { // unckecking all
            // console.log("Selected included no falses");
            document.querySelector(".select-deselect-all").innerHTML = '<path fill="currentColor" d="M20,16V4H8V16H20M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16Z" />';
            for (let a = 0; a < selected.length; a++) {
                selected[a] = false;
                document.querySelectorAll(".group-menu-select")[a].innerHTML = '<path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" />';
            }
            toggleOmniSelect();
        } else { // checking all
            document.querySelector(".select-deselect-all").innerHTML = '<path fill="currentColor" d="M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16M13,14L20,7L18.59,5.59L13,11.17L9.91,8.09L8.5,9.5L13,14Z" />';
            for (let b = 0; b < selected.length; b++) {
                selected[b] = true;
                document.querySelectorAll(".group-menu-select")[b].innerHTML = '<path fill="currentColor" d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"></path>';
            }
        }
    }
}


notePreEdits();
// toggleOmniSelect();