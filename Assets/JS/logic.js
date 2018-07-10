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

      dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        if  (parsedUrl.searchParams.get("id") > 0) 
            {        
                console.log("invited to play game id: " + parsedUrl.searchParams.get("id"));
                console.log("you are player number: " + parsedUrl.searchParams.get("player"));
                player = parsedUrl.searchParams.get("player");
                inplay();
        }
        else {
            player=1;
            console.log("firebase last game id is :" + snapshot.val().gameid);
        newgameid=snapshot.val().gameid + 1;
        console.log("new game id will be: " + newgameid);
        }
          });    
    });


    var user;
    var recordeduser;
    var parsedUrl = new URL(window.location.href);
    var gameidnum=parsedUrl.searchParams.get("id"); 
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
        gameinfo();
    });

    var gameidnum=1;
    var newgameid;
    var player;

    function gameinfo() {
        
       
        console.log("ouch");
        user = $("#user").val().trim();
        localStorage.setItem("name", user);
        localStorage.setItem("gameid", gameidnum);
        recordeduser=localStorage.getItem("name");
        console.log("submitted user" + user);
        console.log("recorded user" + recordeduser);
        $('#user').attr("placeholder",user);
 

        dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
            // Change the HTML to reflect
            console.log("firebase last game id is :" + snapshot.val().gameid);
            newgameid=snapshot.val().gameid + 1;
            console.log("new game id will be: " + newgameid);
            urlShare = window.location.href + "?id=" + newgameid + "&player=2" + "&name=" + encodeURIComponent(user);
            $("#gameid").attr("value",urlShare);
              });    

          

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

    console.log(playerSelection);
    dataRef.ref().push({
        played: playerSelection, 
        playername: user, 
        player: player,
        gameid: gameidnum,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      gameidnum=+1;

// $('.slider').slick('unslick');
$('.slider').remove();
$("#playButton").css("pointer-events", "none");
if (playerSelection===0) { 
    $('#player1').prepend("<div id='selectedplay'><img src='Assets/Images/rock_s.jpeg'></div>");
};
if (playerSelection===1) { 
    $('#player1').prepend("<div id='selectedplay'><img src='Assets/Images/paper_s.jpeg'></div>");
};
if (playerSelection===2) { 
    $('#player1').prepend("<div id='selectedplay'><img src='Assets/Images/scissors_s.jpeg'></div>");
};
if (playerSelection===3) { 
    $('#player1').prepend("<div id='selectedplay'><img src='Assets/Images/lizard_s.jpeg'></div>");
};
if (playerSelection===4) { 
    $('#player1').prepend("<div id='selectedplay'><img src='Assets/Images/spock_s.jpeg'></div>");
};
};


function inplay(){

 $("#opponent").attr("value",opponent);
 $("#opponentSelected").append("<div class='jumbotron'> <h2 class='text-center'>YOUR OPPONENT HAS JOINED, WAITING ON PLAY!</h2></div>");
 $("#opponents").append("<div class='card'><div class='card-header'>Tash Talk Window:</div> <div class='card-body'><p class='card-text'><br><br><br><br></div></div>");
};
