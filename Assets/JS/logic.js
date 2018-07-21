$(document).ready(function(){
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

      if  (parsedUrl.searchParams.get("id") > 0) 
      {   
          console.log("invited to play game id: " + parsedUrl.searchParams.get("id"));
          console.log("you are player number: " + parsedUrl.searchParams.get("player"));
          player = parseInt(parsedUrl.searchParams.get("player"));
          gameidnum=parseInt(parsedUrl.searchParams.get("id")); 
          opponent = decodeURIComponent(parsedUrl.searchParams.get("name"));
          $("#gameid").attr("value",parsedUrl);

          $('#opponentWelcomeModal').modal('show');  
          $('#opponentWelcomeModal').on('shown.bs.modal', function (event) {
            var modal = $(this);
            modal.find('.modal-title').text('You have been invited to play by ' + opponent) ;
          });
          inplay();
  }
  else {
      player=1;
        dataRef.ref('games//').orderByChild("gameid").limitToLast(1).on("child_added", function(snapshot) {
        console.log("firebase last game id is :" + snapshot.val().gameid);
        gameidnum=snapshot.val().gameid + 1;
        console.log("new game id will be: " + gameidnum);
        });    
    }});


    var user;
    var recordeduser;
    var parsedUrl = new URL(window.location.href);
    var gameidnum =1;  /*initial game only*/
    var opponent = decodeURIComponent(parsedUrl.searchParams.get("name"));
    var dataRef =firebase.database();

    console.log(gameidnum);
    console.log(opponent);

    localStorage.clear();

   
    

    // Store the username into localStorage using "localStorage.setItem"
 


    $("#invite").on("click", function(event) {
        // This line prevents the page from refreshing when a user hits "enter".
        event.preventDefault();
        // the one who invites will be player 1
        invite();
    });

    var gameidnum;
    var newgameid;
    var player;
    var user;


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
        recordeduser=localStorage.getItem("name");
        console.log("submitted user " + user);
        console.log("recorded user " + recordeduser);
        $(".userNameInput").attr("placeholder",user);
 

        dataRef.ref('games//').orderByChild("gameid").limitToLast(1).on("child_added", function(snapshot) {
            console.log("firebase last game id is :" + snapshot.val().gameid);
            gameidnum=snapshot.val().gameid + 1;
            console.log("new game id will be: " + gameidnum);
            });   
            urlShare = window.location.href + "?id=" + newgameid + "&player=2" + "&name=" + encodeURIComponent(user);
            $("#gameid").attr("value",urlShare);
            createGameRecord(); 
         

    };


// On swipe event
// $('.slider').on('swipe', function(event, slick, direction){
//   console.log(direction);
//   console.log(event);

// });
var playerSelection =4;

$('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    console.log(nextSlide);
    playerSelection = nextSlide;
  });



//   function after commiting selection
$(document).on("click", '#playButton', commit);

function commit(){
    user = $(".userNameInput").val().trim();
    if (user == "" || user == null) {
        // alert("You must first enter a user name to generate game URL or to play") ; 
        $('#exampleModal').modal('show');
        return;
   }

    console.log(playerSelection);

    var gamedata =  {
        // player: player, 
        //     playerdata : {
                played: playerSelection, 
                playername: user, 
                gameid: 999,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
    // }
    }

    console.log(gamedata);
    var updates = {};
    var testnum=104;
    updates['games/' + testnum] = {player: player};
    updates['games/' + gameidnum + '/player' + player] = gamedata;

    return firebase.database().ref().update(updates);
    
    // dataRef.ref(gameidnum).child(player).set({
    //     played: playerSelection, 
    //     playername: user, 
    //     player: player,
    //     gameid: gameidnum,
    //     dateAdded: firebase.database.ServerValue.TIMESTAMP
    //   });
      gameidnum=+1;
      whoWon();

// $('.slider').slick('unslick');
$('.slider').remove();
$("#playButton").css("pointer-events", "none");
if (playerSelection===0) { 
    $('#player1').prepend("<div id='selectedplay'><img class='centeredimg' src='Assets/Images/rock_s.jpeg'></div>");
};
if (playerSelection===1) { 
    $('#player1').prepend("<div id='selectedplay'><img  class='centeredimg' src='Assets/Images/paper_s.jpeg'></div>");
};
if (playerSelection===2) { 
    $('#player1').prepend("<div id='selectedplay'><img  class='centeredimg' src='Assets/Images/scissors_s.jpeg'></div>");
};
if (playerSelection===3) { 
    $('#player1').prepend("<div id='selectedplay'><img  class='centeredimg' src='Assets/Images/lizard_s.jpeg'></div>");
};
if (playerSelection===4) { 
    $('#player1').prepend("<div id='selectedplay'><img  class='centeredimg' src='Assets/Images/spock_s.jpeg'></div>");
};
};


function inplay(){

 $("#opponent").attr("value",opponent);
 $("#opponentSelected").append("<div class='jumbotron'> <h2 class='text-center'>YOUR OPPONENT HAS JOINED, WAITING ON PLAY!</h2></div>");
 $("#opponents").append("<div class='card'><div class='card-header'>Trash Talk Window:</div> <div class='card-body'><p class='card-text'><br><br><br><br><br><br></div></div>");
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

function whoWon() {

    var Ref = firebase.database().ref(gameidnum + '/player');
    Ref.on('value', function(snapshot) {
      console.log("played was " + snapshot.val().played);
    });
};



$("#modalSave").on("click", function(event) {
    user = $(".userNameInputModal").val().trim();
    if (user == "" || user == null) {
        // alert("You must first enter a user name to generate game URL or to play") ; 
        $('#exampleModal').modal('show');
    }
       console.log(user + "saved as user name from modal");
       $(".userNameInput").attr("placeholder",user);
       $(".userNameInputModal").attr("placeholder",user);
       $(".userNameInput").attr("value",user);
       $(".userNameInputModal").attr("value",user);
       invite();
});

$("#modalSaveInvited").on("click", function(event) {
    user = $("#opponentNameResponse").val().trim();
    console.log("test modal save invited");
    if (user == "" || user == null) {
        // alert("You must first enter a user name to generate game URL or to play") ; 
        $('#opponentWelcomeModal').modal('show');
    }
       console.log(user + "saved as user name from modal");
       $(".userNameInput").attr("placeholder",user);
    //    $(".userNameInput").attr("placeholder","leo placeholder");
       $(".userNameInputModal").attr("placeholder",user);
       $(".userNameInput").attr("value",user);
       $(".userNameInputModal").attr("value",user);
});




function createGameRecord(){
   var gamedata =  {
                id: gameidnum,
                createdBy: user,
                datecreated: firebase.database.ServerValue.TIMESTAMP
    }

    var updates = {};
    updates['games/' + gameidnum] = gamedata;
    return firebase.database().ref().update(updates);
};