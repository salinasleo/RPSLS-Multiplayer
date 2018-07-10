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
    });


    var user;
    var recordeduser;
    var parsedUrl = new URL(window.location.href);
    var gameidnum=parsedUrl.searchParams.get("id"); 
    var opponent = decodeURIComponent(parsedUrl.searchParams.get("opponent"));
    console.log(gameidnum);
    console.log(opponent);

    localStorage.clear();

   
    

    // Store the username into localStorage using "localStorage.setItem"
 


    $("#invite").on("click", function(event) {
        // This line prevents the page from refreshing when a user hits "enter".
        event.preventDefault();
        gameinfo();
    });


    function gameinfo() {
        
       
        console.log("ouch");
        user = $("#user").val().trim();
        gameidnum = $("#gameid").val().trim();
        localStorage.setItem("name", user);
        localStorage.setItem("gameid", gameidnum);
        recordeduser=localStorage.getItem("name");
        console.log("submitted user" + user);
        console.log("recorded user" + recordeduser);
        $('#user').attr("placeholder",user);
        var urlShare = window.location.href + "?id=" + gameidnum + "&opponent=" + encodeURIComponent(user);
        console.log(urlShare);

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
    database.ref().push({
        played: playerSelection, 
        player: user, 
        gameid: gameidnum,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

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

var database = firebase.database();