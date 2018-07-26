var tablaSenate = new Vue({
    el: '#tablaSenate',
    data: {
        "members": [], //array vacía para poner los members
        "theads": ["Name", "Party", "State", "Years in office", "%votes w/party"] //array de lo que quiero poner en el thead

    }
});


var data;

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {

    method: "GET",
    headers: {
        'X-API-Key': 'wf1BtZh7Kmgo0hT1H2AfcpZqf5OKp50GoTdw7u0l'
    }
}).then(function (response) {

    if (response.ok) {

        return response.json();
    }

    throw new Error(response.statusText);
}).then(function (json) {

    // do something with json data

    data = json;
    tablaSenate.members = data.results[0].members;
    //    updateMembers(data.results[0].members);
    fillDropdown(data.results[0].members);

    console.log(data);

}).catch(function (error) {
    // called when an error occurs anywhere in the chain
    console.log("Request failed: " + error.message);
});





var senateTableBody = document.getElementById("senateTable");
//    var members = data.results[0].members;



// listener de cbox reps

document.getElementById("Republican").addEventListener("click", function () {
    console.log("Republican clicked");
    getSelectedMembers(data.results[0].members);
});

// listener de cbox demo

document.getElementById("Democrat").addEventListener("click", function () {
    console.log("Democrat clicked");
    getSelectedMembers(data.results[0].members);
});

//listener de cbox indepe

document.getElementById("Independent").addEventListener("click", function () {
    console.log("Independent clicked");
    getSelectedMembers(data.results[0].members);
});

document.getElementById("dropd").addEventListener("change", function () { //event listener pel dropdown tb
    console.log("dropdownCanviat");
    getSelectedMembers(data.results[0].members);
});


//function updateMembers(array) {
//
////    senateTableBody.innerHTML = "";
//
//    for (var i = 0; i < array.length; i = i + 1) {
//        //    console.log(array[i].first_name);
//
//        var trsena = document.createElement("tr");
//
//        var tdNam = document.createElement("td");
//        var tdParty = document.createElement("td");
//        var tdState = document.createElement("td");
//        var tdYears = document.createElement("td");
//        var tdVotes = document.createElement("td");
//        var aUrl = document.createElement("a");
//
//        aUrl.textContent = array[i].last_name + ", " + array[i].first_name;
//        tdParty.textContent = array[i].party;
//        tdState.textContent = array[i].state;
//        tdYears.textContent = array[i].seniority;
//        tdVotes.textContent = array[i].votes_with_party_pct;
//
//        aUrl.setAttribute("href", array[i].url);
//
//
//        tdNam.appendChild(aUrl);
//
//        trsena.appendChild(tdNam);
//        trsena.appendChild(tdParty);
//        trsena.appendChild(tdState);
//        trsena.appendChild(tdYears);
//        trsena.appendChild(tdVotes);
//
//
//        senateTableBody.appendChild(trsena);
//
//    }
//}
//*/

// funcio per filtrar

function getSelectedMembers(array) {

    var cbR = document.getElementById("Republican");
    var cbD = document.getElementById("Democrat");
    var cbI = document.getElementById("Independent"); // agafo referencia del input checkbox
    var dpD = document.getElementById("dropd");
    var selected = []; // buido array de seleccionats

    // comença for loop per tots els members

    for (var i = 0; i < array.length; i++) {

        if (cbR.checked && array[i].party == "R" && (dpD.value == "All States" || dpD.value == data.results[0].members[i].state)) { // si el checkbox rep esta checked && el member[i] te el valor de la key party igual a "R"

            selected.push(array[i]); // el member si compleix condicions el poso a l'array slected.
        }

        if (cbD.checked && array[i].party == "D" && (dpD.value == "All States" || dpD.value == data.results[0].members[i].state)) {

            selected.push(array[i]); // el member si compleix condicions el poso a l'array slected.
        }

        if (cbI.checked && array[i].party == "I" && (dpD.value == "All States" || dpD.value == data.results[0].members[i].state)) { //en la ultima condicio ha de complir una de les dues. o el valor es all states o es un element members[i]state

            selected.push(array[i]); // el member si compleix condicions el poso a l'array slected.
        }
        if (!cbR.checked && !cbD.checked && !cbI.checked && (dpD.value == "All States" || dpD.value == data.results[0].members[i].state)) {

            selected.push(array[i]);
        }

    }

    tablaSenate.members = selected;
}

function fillDropdown(array) {

    var dpD = document.getElementById("dropd"); //agafo referencia del input dropdown
    var statesSelected = []; // buido array de seleccionats


    var allStates = document.createElement("option"); //creo el element option
    allStates.textContent = "All States";
    dpD.appendChild(allStates);

    for (var i = 0; i < array.length; i++) {

        if (!statesSelected.includes(array[i].state)) { // si el element array[i].state no esta inclos a stateselected
            statesSelected.push(array[i].state);
        }
        statesSelected.sort();
    }


    for (var i = 0; i < statesSelected.length; i++) {

        var opt = document.createElement("option"); //creo el element option
        opt.textContent = statesSelected[i];
        dpD.appendChild(opt);
    }
}
