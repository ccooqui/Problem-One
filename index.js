var arr = [
  {
    'guest_type': 'crew',
    'first_name': 'Marco',
    'last_name': 'Burns',
    'guest_booking': {
        'room_no': 'A0073',
        'some_array': [7,2,4]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'John',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Jane',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Albert',
    'last_name': 'Einstein',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'crew',
    'first_name': 'Jack',
    'last_name': 'Daniels',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Alan',
    'last_name': 'Turing',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
];

function mutateArray(a) {
    for (let i = 0; i < a.length; i++) {
        a[i] = flattenJson(a[i]);
    }
    return guestFilter(a);
}

// For each JSON object flatten any nested JSON objects recursively and return result
function flattenJson(arr) {
    let result = {};
    Object.keys(arr).forEach(key => {
       let value = arr[key];
       //Check if value stored is an array, if so do not flatten
       if (value.constructor === Array) {
           //Part 2. Check if array has key "some_total" and call array sum function
           if (key === "some_array") {
               result["some_total"] = arrSum(value);
           } else {
               result[key] = value;
           }
       }
       //Check if value stored is an object, if so recurse and flatten
       else if (typeof value === 'object') {
           let flattened = flattenJson(value);
           Object.keys(flattened).forEach(subKey => {
              result[`${subKey}`] = flattened[subKey];
           })
       } else {
           result[key] = value;
       }
    });
    return result;
}

//Take all numbers in an arrays sums them and returns the value
function arrSum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

//Sorts given array by if guest type is "guest"
function guestFilter(arr) {
    return arr.filter(function (obj) {
        return obj.guest_type === "guest";
    });
}

$(document).ready(function() {
    $('#originalArray').html(JSON.stringify(arr, null, 2));
    $('#resultsArray').html(JSON.stringify(mutateArray(arr), null, 2));
});
