function search(item, arr, midpoint, divBy, iterations = 0) {
    if (!midpoint && midpoint != 0) {
        midpoint = Math.floor(arr.length/2);
        divBy = 4;
    }
    if (iterations > 200) {
        console.error("Failure: Iterations ran away");
        return "FAILED";
    }
    if (midpoint > item) {
        let nextMidpoint = midpoint - Math.ceil(arr.length/divBy);
        divBy *= 2;
        iterations++;
        return search(item, arr, nextMidpoint, divBy, iterations);
    } else if (midpoint < item) {
        let nextMidpoint = midpoint + Math.ceil(arr.length/divBy);
        divBy *= 2;
        iterations++;
        return search(item, arr, nextMidpoint, divBy, iterations);
    } else if (midpoint == item) {
        console.log("Midpoint Search found the value",midpoint,"in",iterations,"iterations");
        return [midpoint, iterations];
    }
}

function linearSearch(item, arr) {
    for (let a = 0; a < arr.length; a++) {
        if (arr[a] == item) {
            console.log("Linear Search found the value",a,"in",a+1,"iterations");
            return a;
        }
    }
}