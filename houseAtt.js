var app = new Vue({
    el: '#app',
    data: {
        "dataGlance": [], //array vacía para poner los members
        "theads": ["Party", "Number of Reps", "% Voted with Party"],
        /*//array de lo que quiero poner en el thead*/
        "dataLeast": [],
        "theadsTab": ["Name", "Number of Missed Votes", "% Missed Votes"],
        "dataMost": []
    }
});

var data;
var allMembers;

fetch("https://api.propublica.org/congress/v1/113/house/members.json", {

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
    allMembers = data.results[0].members;

    getStatistics();
    selectedLeastSenate();
    selectedMostSenate();

    console.log(data);

}).catch(function (error) {
    // called when an error occurs anywhere in the chain
    console.log("Request failed: " + error.message);
});


//var members = data.results[0].members; // Creo una var para acceder al Json


var statistics = { //Creo un objeeto Json
    "numberOfRepubicans": 0,
    "numberOfDemocrats": 0,
    "numberOfIndependents": 0,
    "TotalNumber": 0,
    "VotesWithPartyR": 0,
    "VotesWithPartyD": 0,
    "VotesWithPartyI": 0,
    "TotalAvg": 0
}

var selected = [];
var selectedLeastAttenSen = [];
var selectedMostAttenSen = [];



function getStatistics() {
    var comptadorR = []; //arrays vacías para llenar con el if
    var comptadorD = [];
    var comptadorI = [];

    var avgR = 0;
    var avgD = 0;
    var avgI = 0;
    var avgT = 0;

    for (var i = 0; i < allMembers.length; i++) {

        avgT += allMembers[i].votes_with_party_pct;

        if (allMembers[i].party == "R") { //si encuentra un miembro de R, lo pone en la array vacía correspondiente

            comptadorR.push(allMembers[i]);
            avgR += allMembers[i].votes_with_party_pct; //en cada loop va sumando el valor de votes w/party en avgR
        }
        if (allMembers[i].party == "D") {

            comptadorD.push(data.results[0].members[i]);
            avgD = avgD + allMembers[i].votes_with_party_pct;
        }
        if (allMembers[i].party == "I") { //si encuentra un miembro de R, lo pone en la array vacía correspondiente

            comptadorI.push(allMembers[i]);
            avgI += allMembers[i].votes_with_party_pct; //en cada loop va sumando el valor de votes w/party en avgR
        }

    }

    avgR = avgR / comptadorR.length;
    avgD = avgD / comptadorD.length;
    avgI = avgI / comptadorI.length;
    avgT = avgT / allMembers.length;
    
    if (isNaN(avgR)) {
            avgI=0;
        }
    if (isNaN(avgD)) {
            avgI=0;
        }
    if (isNaN(avgI)) {
            avgI=0;
        }


    statistics.numberOfRepubicans = comptadorR.length; // para calcular cuantso hay de cada uno
    statistics.numberOfDemocrats = comptadorD.length;
    statistics.TotalNumber = (allMembers.length);
    statistics.VotesWithPartyR = avgR.toFixed(2);
    statistics.VotesWithPartyD = avgD.toFixed(2);
    statistics.VotesWithPartyI = avgI.toFixed(2);
    statistics.TotalAvg = avgT.toFixed(2);

    app.dataGlance = statistics;


    /*document.getElementById("totalReps").textContent = statistics.numberOfRepubicans; //vincula con el elemento ID de la tabla del HTML
    document.getElementById("totalDemo").textContent = statistics.numberOfDemocrats;
    document.getElementById("totalIndep").textContent = statistics.numberOfIndependents;
    document.getElementById("VotesR").textContent = statistics.VotesWithPartyR; //vincula con el elemento ID de la tabla del HTML
    document.getElementById("VotesD").textContent = statistics.VotesWithPartyD;
    document.getElementById("VotesI").textContent = statistics.VotesWithPartyI;
    document.getElementById("totalAvg").textContent = statistics.TotalAvg;
    document.getElementById("totalNumber").textContent = statistics.TotalNumber;*/
}


function selectedLeastSenate() {

    var orderedVotesParty = data.results[0].members.sort(function (a, b) {

        return (a.missed_votes_pct - b.missed_votes_pct)
    });

    console.log(orderedVotesParty);

    console.log("Fem el 10%");
    var tenPerCent = (orderedVotesParty.length * 10) / 100;
    console.log(selectedLeastAttenSen)
    console.log("arrodonim")
    tenPerCent = Math.round(tenPerCent);
    console.log(tenPerCent);


    for (var i = 0; i < tenPerCent; i++) {

        selectedLeastAttenSen.push(orderedVotesParty[i]);
    }

    for (var i = tenPerCent; i < orderedVotesParty.length; i++) {


        if (selectedLeastAttenSen[selectedLeastAttenSen.length - 1].missed_votes_pct == orderedVotesParty[i].missed_votes_pct) {
            selectedLeastAttenSen.push(orderedVotesParty[i]);

        }
    }
    console.log(selectedLeastAttenSen);
    app.dataLeast = selectedLeastAttenSen;
}


function selectedMostSenate() {


    var orderedVotesParty = data.results[0].members.sort(function (a, b) {

        return (b.missed_votes_pct - a.missed_votes_pct)
    });

    console.log(orderedVotesParty);

    console.log("Fem el 10%");
    var tenPerCent = (orderedVotesParty.length * 10) / 100;
    console.log(selected)
    console.log("arrodonim")
    tenPerCent = Math.round(tenPerCent);
    console.log(tenPerCent);

    for (var i = 0; i < tenPerCent; i++) {

        selectedMostAttenSen.push(orderedVotesParty[i]);
    }

    for (var i = tenPerCent; i < orderedVotesParty.length; i++) {


        if (selectedMostAttenSen[selectedMostAttenSen.length - 1].missed_votes_pct == orderedVotesParty[i].missed_votes_pct) {
            selectedMostAttenSen.push(orderedVotesParty[i]);

        }
    }
    console.log(selectedMostAttenSen);
    app.dataMost = selectedLeastAttenSen;
}

function makeLeastAttenSenate(array) {

    TableLeastAttSen.innerHTML = "";

    for (var i = 0; i < array.length; i = i + 1) {
        //    console.log(array[i].first_name);

        var trsena = document.createElement("tr");

        var tdNam = document.createElement("td");
        var tdNumPartVot = document.createElement("td");
        var tdperCentPartVot = document.createElement("td");
        var aUrl = document.createElement("a");

        aUrl.textContent = array[i].last_name + ", " + array[i].first_name;
        tdNumPartVot.textContent = array[i].missed_votes;
        tdperCentPartVot.textContent = array[i].missed_votes_pct;
        aUrl.setAttribute("href", array[i].url);


        tdNam.appendChild(aUrl);
        trsena.appendChild(tdNam);
        trsena.appendChild(tdNumPartVot);
        trsena.appendChild(tdperCentPartVot);

        TableLeastAttSen.appendChild(trsena);

    }
}

function makeMostAttenSenate(array) {

    TableMostAttSen.innerHTML = "";

    for (var i = 0; i < array.length; i = i + 1) {
        //    console.log(array[i].first_name);

        var trsena = document.createElement("tr");

        var tdNam = document.createElement("td");
        var tdNumPartVot = document.createElement("td");
        var tdperCentPartVot = document.createElement("td");
        var aUrl = document.createElement("a");

        aUrl.textContent = array[i].last_name + ", " + array[i].first_name;
        tdNumPartVot.textContent = array[i].missed_votes;
        tdperCentPartVot.textContent = array[i].missed_votes_pct;
        aUrl.setAttribute("href", array[i].url);


        tdNam.appendChild(aUrl);
        trsena.appendChild(tdNam);
        trsena.appendChild(tdNumPartVot);
        trsena.appendChild(tdperCentPartVot);

        TableMostAttSen.appendChild(trsena);

    }
}
