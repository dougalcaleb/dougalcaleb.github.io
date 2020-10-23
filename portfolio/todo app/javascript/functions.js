console.log("Using Javascript Basic Functions v1.1.6");

// return the length of an object, given an object
function obj_length(obj) {
    if (typeof obj !== "object") {
        return "INVALID PARAMETERS";
    }
    let length = 0;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            length++;
        }
    }
    return length;
}

// return the last value of an array, given an array
function arr_last(arr) {
    if (typeof arr !== "object") {
        return "INVALID PARAMETERS";
    }
    return arr[arr.length-1];
}

// rotate the values in an array, given an array
function arr_rotate(arr, dir = 1) {
    if (typeof arr !== "object") {
        return "INVALID PARAMETERS";
    }
    if (dir === 0) {        // left
        arr.push(arr[0]);
        arr.shift();
        return arr;
    } else if (dir === 1) { // right
        arr.unshift(arr_last(arr));
        arr.pop();
        return arr;
    } else {
        return "INVALID DIRECTION";
    }
}

// remove a value from an array, given an array, an index or value, and all instances or not
function arr_remove(arr, idx, all = false) {
    if (typeof idx !== "boolean" || typeof all !== "boolean" || typeof arr !== "object") {
        return "INVALID PARAMETERS; INCORRECT TYPE. REQUIRES: {ARRAY: ARRAY}, {INDEX/VALUE: INT/VAL}, {REMOVE ALL INSTANCES OF VALUE: BOOL}";
    }
    if (idx >= 0 && !all) {
        arr.splice(idx, 1);
        return arr;
    } else if (idx < 0 && !all) {
        return "INVALID INDEX. MUST BE GREATER THAN OR EQUAL TO 0";
    } else if (all) {
        for (let a = 0; a < arr.length; a++) {
            if (arr[a] === idx) {
                arr.splice(a, 1);
            }
        }
        return arr;
    } else {
        return "INVALID PARAMETERS. REQUIRES: {ARRAY}, {INDEX/VALUE}, {REMOVE ALL INSTANCES OF VALUE}";
    }
}

// insert a value into an array, given an array, an index, and a value
function arr_insert(arr, idx, value) {
    if (typeof arr !== "object" || typeof idx !== "number") {
        return "INVALID PARAMETERS; INCORRECT TYPE. REQUIRES: {ARRAY: ARRAY}, {INDEX: INT}, {VALUE: ANY}";
    }
    if (!arr || !idx || !value) {
        return "INVALID PARAMETERS";
    }
    arr.splice(idx, 0, value);
    arr.join();
    return arr;
}

// return a random hexidecimal color
function rand_hex_color() {
    let finalColor = "#",
    colors = [],
    rand = 0;

    for (let a = 0; a < 6; a++) {
        rand = Math.floor(Math.random()*16);
        switch(rand) {
            case 0:
                colors.push("0");
                break;
            case 1:
                colors.push("1");
                break;
            case 2:
                colors.push("2");
                break;
            case 3:
                colors.push("3");
                break;
            case 4:
                colors.push("4");
                break;
            case 5:
                colors.push("5");
                break;
            case 6:
                colors.push("6");
                break;
            case 7:
                colors.push("7");
                break;
            case 8:
                colors.push("8");
                break;
            case 9:
                colors.push("9");
                break;
            case 10:
                colors.push("a");
                break;
            case 11:
                colors.push("b");
                break;
            case 12:
                colors.push("c");
                break;
            case 13:
                colors.push("d");
                break;
            case 14:
                colors.push("e");
                break;
            case 15:
                colors.push("f");
                break;
        }
    }

    for (let b in colors) {
        finalColor += colors[b];
    }

    return finalColor;
}