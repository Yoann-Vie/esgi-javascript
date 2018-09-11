function ucfirst(text){
    return text.slice(0, 1).toUpperCase() + (text.slice(1)).toLowerCase();
}
function capitalize(text) {
    let words = text.split(" ");
    words = words.map((w) => {
        return ucfirst(w);
    });

    return words.join(" ");
}
function camelCase(text) {
    return capitalize(text).split(" ").join("");
}
function snake_case(text) {
    return text.toLowerCase().split(" ").join("_");
}
function prop_access(object, path) {
    let pathSteps = path.split(".");
    let result = object;
    for (let step in pathSteps) {
        if (typeof result[pathSteps[step]] !== "undefined") {
            result = result[pathSteps[step]];
        } else {
            result = undefined;
            break;
        }
    }

    return result;
}
function leet(text) {
    let mapping = {
        a: 4,
        e: 3,
        i: 1,
        o: 0,
    };
    text = text.toLowerCase();
    Object.keys(mapping).map((key, index) => {
        text = text.replace(new RegExp(key, 'g'), mapping[key]);
    });

    return text;
}
function verlan(text) {
    let words = text.split(" ");
    words = words.map((w) => {
        return w.split("").reverse().join("");
    });

    return words.join(" ");
}
function yoda(text) {
    return text.split(" ").reverse().join(" ");
}
function vig(text) {
    // TODO
}

// TESTS
console.log(ucfirst("hello world"));
console.log(capitalize("hello world"));
console.log(camelCase("hello world"));
console.log(snake_case("Hello World"));
let testObject = {
    animal: {
        type: {
            name: 'Tigre'
        }
    }
};
console.log(prop_access(testObject, "animal.type.name"));
console.log(prop_access(testObject, "animal.bateau.name"));
console.log(leet("anaconda"));
console.log(verlan("Hello world"));
console.log(yoda("Hello world"));
