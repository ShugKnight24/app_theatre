//javascript / jQuery for our project!
$(function() {

  var users = [];
  var seatsSelected = [];
  var randomUserNames = ["Charlie", "Benson", "Karen", "Katie", "Steve", "Erika", "Dave", "Ray", "Chelsea", "Ithica", "Jennifer", "Shanita", "Josh", "John", "Travis"];

  var $seat = $(".seat");
  var $regForm = $("#reg");
  var $submit = $("#submit");


  //On page load, hide form
  $regForm.hide();


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

  function showForm() {
    $regForm.fadeIn(2500);
  }

  function manageSeatsSelected($currentSeat) {
    var seatNumber = this.id;
    var seatIndex = seatsSelected.findIndex(function(seat) {
      return seat.attr("id") === seatNumber;
    });
    var notSelected = seatIndex === -1;

    if (notSelected) {
      seatsSelected.push($currentSeat);
    } else {
      seatsSelected.splice(seatIndex, 1);
    }

    $currentSeat.toggleClass("selected");
  }

  function hideForm() {
    $regForm.hide();
  }

  function warnUser() {
    alert("No sitting in other people's laps! Choose another seat.");
  }

  $seat.on("click", function() {
    var $currentSeat = $(this);
    var notReserved = !($currentSeat.hasClass("reserved"));

    if (notReserved) {
      showForm();
      manageSeatsSelected.call(this, $currentSeat);
    } else {
      hideForm();
      warnUser();
    }

    if ($currentSeat.hasClass("selected") && seatsSelected.length === 1) {
        $('html,body').animate({ //Scrolls down to top of form when seat is selected
            scrollTop: $regForm.offset().top
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
      for (var i = 0; i < seatsSelected.length; i++) {
          seatNumber = seatsSelected[i].children("p").text();
          var user = new User(name, email, seatNumber);
          users.push(user);
      }
  }

  //Submit event listener: creates user object and adds "reserved" class to seat

  $regForm.on("submit", function(event) {
      event.preventDefault();
      createUser();
      for (var i = 0; i < seatsSelected.length; i++) {
          seatsSelected[i].addClass("reserved");
      }
      seatsSelected = [];
      resetClasses(); //
      $regForm[0].reset(); //resets form after submit
      $regForm.hide();
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
          $(this).children("p").html(this.id);
      });
  }

});



//display selected seats on form
//add available seats counter
//making hover more uniform with seats vs seats+user info
//add random colors for different users?
//add random user info to randomly generated reserved seats
//when seats are selected, then reserved seat is clicked on, the form is hidden until another         //available seat is clicked on
//add reserve confirmation
//add name validation
//fix bug: scrolls to form after every selection (should only scroll once)
