$(document).ready(function () {
    $('.slider').slick({
        centerMode: true,
        centerPadding: '100px',
        slidesToShow: 3,
        variableWidth: true,
        touchMove: true,
        arrows: true,
        focusOnSelect: true,
        swipeToSlide: true,
        initialSlide: 4,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        initialSlide: 4,
        asNavFor: '.slider'
    });

    if (parsedUrl.searchParams.get("id") > 0) {
        console.log("invited to play game id: " + parsedUrl.searchParams.get("id"));
        console.log("you are player number: " + parsedUrl.searchParams.get("player"));
        player = parseInt(parsedUrl.searchParams.get("player"));
        gameidnum = parseInt(parsedUrl.searchParams.get("id"));
        opponent = decodeURIComponent(parsedUrl.searchParams.get("name"));
        $("#gameid").attr("value", parsedUrl);

        $('#opponentWelcomeModal').modal('show');
        $('#opponentWelcomeModal').on('shown.bs.modal', function (event) {
            var modal = $(this);
            modal.find('.modal-title').text('You have been invited to play by ' + opponent);
        });
        inplay();
        inplayselected();
    }
    else {
        player = 1;
        // dataRef.ref('games/').orderByChild("gameid").limitToLast(1).once("child_added", function(snapshot) {
        // console.log("firebase last game id is :" + snapshot.val().id);
        // gameidnum=snapshot.val().id + 1;
        // console.log("new game id will be: " + gameidnum);
        // });    
    }
});


var user;
var recordeduser;
var parsedUrl = new URL(window.location.href);
var gameidnum;  /*initial game only*/
var opponent = decodeURIComponent(parsedUrl.searchParams.get("name"));
var dataRef = firebase.database();
var gamestarted=0;


console.log(gameidnum);
console.log(opponent);

localStorage.clear();




// Store the username into localStorage using "localStorage.setItem"



$("#invite").on("click", function (event) {
    // This line prevents the page from refreshing when a user hits "enter".
    event.preventDefault();
    // the one who invites will be player 1
    invite();
});

var newgameid;
var player;


function invite() {


    console.log("ouch");
    user = $(".userNameInput").val().trim();
    console.log("submitted user " + user);
    localStorage.setItem("name", user);
    if (user == "") {
        //  alert("You must first enter a user name to generate game URL or to play") ; 
        $('#exampleModal').modal('show');
        return;
    }
    localStorage.setItem("gameid", gameidnum);
    recordeduser = localStorage.getItem("name");
    console.log("submitted user " + user);
    console.log("recorded user " + recordeduser);
    $(".userNameInput").attr("placeholder", user);
    gamestarted = 1;

    dataRef.ref('games/').orderByChild("gameid").limitToLast(1).once("child_added", function (snapshot) {
        console.log("firebase last game id is :" + snapshot.val().id);
        gameidnum = snapshot.val().id + 1;
        console.log("new game id will be: " + gameidnum);
        urlShare = window.location.href + "?id=" + gameidnum + "&player=2" + "&name=" + encodeURIComponent(user);
        $("#gameid").attr("value", urlShare);
        createGameRecord();
    });




};


// On swipe event
// $('.slider').on('swipe', function(event, slick, direction){
//   console.log(direction);
//   console.log(event);

// });
var playerSelection = 4;

$('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    console.log(nextSlide);
    playerSelection = nextSlide;
});


function inplay() {

    $("#invite").html("Playing This Game:");
    $("#invite").css("pointer-events", "none");

    $("#opponentSelected").append("<div class='jumbotron'> <h2 class='text-center'>COPY GAME URL AND SEND LINK TO YOUR OPPONENT. <BR>WE WILL LET YOU KNOW HERE WHEN YOUR OPPONENT JOINS, HOLD TIGHT!</h2></div>");
    $("#opponents").append("<div class='card'><div class='card-header'>Trash Talk Window:</div> <div class='card-body'><p class='card-text'><br><br><br><br><br><br></div></div>");

};

function inplayselected() {

    dataRef.ref('games/' + gameidnum + '/player' + 2).on("value", function (snapshot) {
        // console.log("player two name is :" + snapshot.val().playername);
        if (player === 1) {
            opponent = snapshot.val().playername;
        };
        if (snapshot.val().playername != null) {
            $("#opponent").attr("value", opponent);
            $("#opponentSelected").empty();
            $("#opponentSelected").append("<div class='jumbotron'> <h2 class='text-center'>YOUR OPPONENT HAS JOINED, WAITING ON PLAY!</h2></div>");
        }
    });

};


//   function after commiting selection
$(document).on("click", '#playButton', commit);

function commit() {
    if (gamestarted === 0 && player===1) {
        console.log("in play is zero");
        $('#createGameFirstModal').modal('show');
        return;
    }
    user = $(".userNameInput").val().trim();
    if (user == "" || user == null) {
        // alert("You must first enter a user name to generate game URL or to play") ; 
        $('#exampleModal').modal('show');
        return;
    }
    inplayselected();

    console.log(playerSelection);
    // $('.slider').slick('unslick');
    $('.slider').remove();
    $("#playButton").css("pointer-events", "none");
    if (playerSelection === 0) {
        $('#player1').prepend("<div id='selectedplay'><img class='centeredimg' src='Assets/Images/rock_s.jpeg'></div>");
    };
    if (playerSelection === 1) {
        $('#player1').prepend("<div id='selectedplay'><img  class='centeredimg' src='Assets/Images/paper_s.jpeg'></div>");
    };
    if (playerSelection === 2) {
        $('#player1').prepend("<div id='selectedplay'><img  class='centeredimg' src='Assets/Images/scissors_s.jpeg'></div>");
    };
    if (playerSelection === 3) {
        $('#player1').prepend("<div id='selectedplay'><img  class='centeredimg' src='Assets/Images/lizard_s.jpeg'></div>");
    };
    if (playerSelection === 4) {
        $('#player1').prepend("<div id='selectedplay'><img  class='centeredimg' src='Assets/Images/spock_s.jpeg'></div>");
    };

    var gamedata = {
        // player: player, 
        //     playerdata : {
        played: playerSelection,
        playername: user,
        gameid: gameidnum,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
        // }
    }

    console.log(gamedata);
    var updates = {};
    updates['games/' + gameidnum + '/player' + player] = gamedata;

    whoWon();
    return firebase.database().ref().update(updates);

};



function copyFunction() {
    event.preventDefault();
    /* Get the text field */
    var copyText = document.getElementById("gameid");
    /* Select the text field */
    copyText.select();
    /* Copy the text inside the text field */
    document.execCommand("copy");
    /* Alert the copied text */
    console.log("Copied the text: " + copyText.value);
}

var description = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];

function whoWon() {


    dataRef.ref('games/' + gameidnum + '/player' + 2).on("value", function (snapshot) {
        // console.log("player two name is :" + snapshot.val().playername);
        played2 = snapshot.val().played;
        if (played1 != null && played2 != null) {
            compare(played1, played2);
        }
    });

    dataRef.ref('games/' + gameidnum + '/player' + 1).on("value", function (snapshot) {
        // console.log("player two name is :" + snapshot.val().playername);
        played1 = snapshot.val().played;
        if (played1 != null && played2 != null) {
            compare(played1, played2);
        }
    });
};

resultDescription = [
    ["Tie", "Paper Covers Rock", "Rock Crushes Scissors", "Rock Crushes Lizzard", "Spock Vaporizes Rock"],
    ["Paper Covers Rock", "Tie", "Scissors Cut Paper", "Lizard Eats Paper", "Paper Disproves Spock"],
    ["Rock Crushes Scissors", "Rock Crushes Scissors", "Tie", "Scissors Decapitate Lizard", "Spock Smashes Scissors"],
    ["Rock Crushes Lizzard", "Lizard Eats Paper", "Scissors Decapitate Lizard", "Tie", "Lizard Poisons Spock"],
    ["Spock Vaporizes Rock", "Paper Disproves Spock", "Spock Smashes Scissors", "Lizard Poisons Spock", "Tied, quit trying to both be Spock!"]
];

function compare(played1, played2) {
    if (player === 1) {
        vartext = "Your Opponent Picked: " + description[played2].toUpperCase() ;
    }
    if (player === 2) {
        vartext = "Your Opponent Picked: " + description[played1].toUpperCase();;
    }
    // $("#opponentSelected").append(vartext);

    vartext2 = "<div class='jumbotron'> <h2 class='text-center'>"
        + vartext + "<br><br>" + resultDescription[played1][played2] + "!</h2></div>";
    $("#opponentSelected").empty();
    $("#opponentSelected").append(vartext2);
};



$("#modalSave").on("click", function (event) {
    user = $(".userNameInputModal").val().trim();
    if (user == "" || user == null) {
        // alert("You must first enter a user name to generate game URL or to play") ; 
        $('#exampleModal').modal('show');
    }
    console.log(user + "saved as user name from modal");
    $(".userNameInput").attr("placeholder", user);
    $(".userNameInputModal").attr("placeholder", user);
    $(".userNameInput").attr("value", user);
    $(".userNameInputModal").attr("value", user);
    invite();
});

$("#modalSaveInvited").on("click", function (event) {
    user = $("#opponentNameResponse").val().trim();
    console.log("test modal save invited");
    if (user == "" || user == null) {
        // alert("You must first enter a user name to generate game URL or to play") ; 
        $('#opponentWelcomeModal').modal('show');
    }
    console.log(user + "saved as user name from modal");
    $(".userNameInput").attr("placeholder", user);
    //    $(".userNameInput").attr("placeholder","leo placeholder");
    $(".userNameInputModal").attr("placeholder", user);
    $(".userNameInput").attr("value", user);
    $(".userNameInputModal").attr("value", user);

    var gamedata = {
        playername: user,
        gameid: gameidnum,
        datejoined: firebase.database.ServerValue.TIMESTAMP
    }
    var updates = {};
    updates['games/' + gameidnum + '/player' + 2] = gamedata;
    return firebase.database().ref().update(updates);
});




function createGameRecord() {
    var gamestarted=1;
    console.log(gamestarted);
    inplay();
    inplayselected();

    var gamedata = {
        id: gameidnum,
        createdBy: user,
        datecreated: firebase.database.ServerValue.TIMESTAMP
    }
    var updates = {};
    updates['games/' + gameidnum] = gamedata;
    return firebase.database().ref().update(updates);
    

};