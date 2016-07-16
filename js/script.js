//javascript / jQuery for our project!
$(document).ready(function() {

  var seatSelected = [];
  var $submit = $("#submit");
  var $seat = $(".seat");
  var users = [];
  var randomUserNames = ["Charlie", "Benson", "Karen", "Katie", "Steve", "Erika", "Dave", "Ray", "Chelsea", "Ithica", "Jennifer", "Shanita", "Josh", "John", "Travis"];
  var $regForm = $("#reg");


  //hide form when page loads

  $($regForm).hide();


  /*-----------RANDOMLY RESERVE SEATING ON PAGE LOAD-------------*/

  var allSeats = $("#seating-container").children().children();

  function assignRandomUsers() {
    var randomName;
    var randomEmail;
    var randomSeatNumber;
    var randomUser;
    for (var i = 0; i < allSeats.length; i++) {
        var random = Math.floor(Math.random() * 2);
        if (random === 0) {
          randomName = randomUserNames[Math.floor(Math.random() * 15)];
          randomEmail = randomName.toLowerCase() + "@example.com";
          randomSeatNumber = $(allSeats[i]).children("p").text();
          randomUser = new User(randomName, randomEmail, randomSeatNumber);
          users.push("randomUser"); //g
          $(allSeats[i]).addClass("reserved");
        }
    }
  }

  assignRandomUsers();
  resetClasses();

  /*-----------ON SEAT CLICK EVENT-------------*/

  //Seat clicked event listener: if seat is not reserved, fadein form && store seat selected

  $($seat).on("click", function() {
      if (!($(this).hasClass("reserved"))) {
          $($regForm).fadeIn(2500);
          var seatNumber = $(this).children("p").text();
          var seatIndex = seatSelected.findIndex(function(seat) {
            return seat.children("p").text() === seatNumber;
          });
          var isSelected = seatIndex >= 0;
          if (!isSelected) {
            seatSelected.push($(this)); //Stores seat selected for use in submit event listener
          } else if (isSelected) {
            seatSelected.splice(seatIndex, 1);
          }
          $(this).toggleClass("selected");
      } else if ($(this).hasClass("reserved")) {
          $($regForm).hide();
          alert("No sitting in other people's laps! Choose another seat.");
      }
      if ($(this).hasClass("selected")) {
          $('html,body').animate({ //Scrolls to top of form when seat is selected
              scrollTop: $($regForm).offset().top
          }, 'slow');
      }
  })


  /*----------USER OBJECT CONSTRUCTOR---------*/


  function User(name, email, seatNumber) {
      this.name = name;
      this.email = email;
      this.seatNumber = seatNumber;
  };


  /*----------ON FORM SUBMIT EVENT---------*/


  // Creates object from user input and pushes object to array

  function createUser() {
      var name = $("#name").val();
      var email = $("#email").val();
      var seatNumber;
      for (var i = 0; i < seatSelected.length; i++) {
          seatNumber = seatSelected[i].children("p").text();
          var user = new User(name, email, seatNumber);
          users.push(user);
      }
  }

  //Submit event listener: creates user object and adds "reserved" class to seat

  $regForm.on("submit", function(event) {
      event.preventDefault();
      createUser();
      for (var i = 0; i < seatSelected.length; i++) {
          seatSelected[i].addClass("reserved");
      }
      seatSelected = [];
      resetClasses(); //
      $($regForm)[0].reset(); //resets form after submit
      $($regForm).hide();
  });

  //Displays associated user info on mouseenter event on reserved seats

  function resetClasses() {
      $(".reserved").on("mouseenter", function() {
          var hoveredSeat = $(this).children("p").text();
          var seatOwner;
          users.forEach(function(user) {
              if (user.seatNumber === hoveredSeat) {
                  seatOwner = user;
              }
          });
          $(this).children("p").html(seatOwner.name + "<br>" + seatOwner.seatNumber);
      });
      $(".reserved").on("mouseleave", function() {
          $(this).children("p").html($(this).attr("id"));
      });
  }

});



//display selected seats on form
//add available seats counter
//making hover more uniform with seats vs seats+user info
//add random colors for different users?
//add random user info to randomly generated reserved seats
//when seats are selected, then reserved seat is clicked on, the form is hidden until another available seat is clicked on 
