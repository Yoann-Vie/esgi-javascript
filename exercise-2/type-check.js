function getType(object) {
    if (object === null) {
        return null
    }
    let t = (typeof object);
    if (t === 'object') {
        object = String(object.constructor);
        if (/^(?:function|object) ([a-z0-9-]+)\(?/i.test(object)) {
            t = RegExp.$1;
            if (/^html[a-z]*element$/i.test(t)) {
                t = 'element'
            }
        } else {
            t = undefined
        }
    }

    return t.substr(0, 1).toLowerCase() + t.substr(1);
}
function type_check_v1(test, type) {
    return type === getType(test);
}
function type_check_v2(test, type) {
    if (typeof type.type !== "undefined" && !type_check_v1(test, type.type)) {
        return false;
    }
    if (typeof type.value !== "undefined" && test !== type.value) {
        return false;
    }
    if (typeof type.enum !== "undefined") {
        for(let i in type.enum) {
            if (type.enum[i] === test) {
                return true;
            }
        }
        return false;
    }
    
    return true;
}
function type_check(test, types) {
    if (typeof types.properties === "undefined") {
        return type_check_v2(test, types);
    }
    let results = [];
    if (typeof types.type !== "undefined" && types.type.toLowerCase() === 'array') {
        if (type_check_v1(types.properties[0], 'Object')) {
            results = types.properties.map( function(value, key) {
                if (typeof test[key] === 'undefined') {
                    return false;
                }
                return type_check(test[key], value)
            });
        }
        if (type_check_v1(types.properties[0], 'string')) {
            let availableTypes = types.properties;
            results = test.map( function(value, key) {
                let type = getType(value);
                return availableTypes.indexOf(type) !== -1;
            });
        }
    }
    if (typeof types.type !== "undefined" && types.type.toLowerCase() === 'object') {
        results = Object.keys(types.properties).map( function(objectKey, index) {
            let value = types.properties[objectKey];
            if (typeof test[objectKey] === 'undefined') {
                return false;
            }
            return type_check(test[objectKey], value)
        });
    }
    for (let i in results) {
        if (results[i] === false) {
            return false;
        }
    }

    return true;
}

console.log(type_check_v1(1, 'number'));
console.log(type_check_v1('test', 'number'));

console.log(type_check_v2({prop1: 1}, 'Object'));
console.log(type_check_v2('foo', {type: 'string', value: 'foo'}));
console.log(type_check_v2('foo', {type: 'string', value: 'bar'}));
console.log(type_check_v2(3, {enum: ['foo', 'bar', 3]}));
console.log(type_check_v2(3, {enum: ['foo', 'bar', 'test']}));
console.log("type check");
console.log(type_check({
    prop1: 2,
    prop2: 'text',
    prop3: {
        prop31: 12,
        prop32: 12,
    },
}, {
    type: "object",
    properties: {
        prop1: {type: 'number'},
        prop2: {type: 'string', enum: ['val1', 'val2']},
        prop3: {
            type: 'object',
            properties: {
                prop31: 'number',
                prop32: 'string'
            }
        },
        prop4: {type: 'array', properties: ['boolean']}
    }
}));
console.log(type_check({
    prop1: 2,
    prop2: 'val1',
    prop3: {
        prop31: 12,
        prop32: '12',
    },
    prop4: [true, 1],
}, {
    type: "object",
    properties: {
        prop1: {type: 'number'},
        prop2: {type: 'string', enum: ['val1', 'val2']},
        prop3: {
            type: 'object',
            properties: {
                prop31: 'number',
                prop32: 'string'
            }
        },
        prop4: {type: 'array', properties: [{type: 'boolean'}, {type: 'number'}]}
    }
}));
console.log(type_check({
    prop1: 2,
    prop2: 'val1',
    prop3: {
        prop31: 12,
        prop32: '12',
    },
    prop4: [true, true, false],
}, {
    type: "object",
    properties: {
        prop1: {type: 'number'},
        prop2: {type: 'string', enum: ['val1', 'val2']},
        prop3: {
            type: 'object',
            properties: {
                prop31: 'number',
                prop32: 'string'
            }
        },
        prop4: {type: 'array', properties: ['boolean']}
    }
}));
// console.log(type_check([{prop1: 2}, {prop1: 'text'}], {
//     type: "array",
//     properties: [{
//         type: "object",
//         properties: {
//             prop1: {type: 'number'},
//         }
//     }]
// }));
