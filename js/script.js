$(function() {

  var users = [];           //Stores user information
  var seatsSelected = [];   //Stores currently selected seats

  //List of names used to randomly populate users array
  var randomUserNames = ["Charlie", "Benson", "Karen", "Katie", "Steve", "Erika", "Dave", "Ray", "Chelsea", "Ithica", "Jennifer", "Shanita", "Josh", "John", "Travis"];

  /*-----------CACHE-------------*/

  var $seat = $(".seat");
  var $registrationForm = $("#registration");
  var $seatingContainer = $("#seating-container");

  /*-----------GENERAL TASKS-------------*/

  //User object constructor
  function User(name, email, seatNumber) {
      this.name = name;
      this.email = email;
      this.seatNumber = seatNumber;
  };

  //Adds user object to users array
  function addUser(name, email, seatNumber) {
    var user = new User(name, email, seatNumber);
    users.push(user); //g
  }

  //Loops through users array and adds user names to seats
  function updateSeatOwner() {
    users.forEach(function(user) { //g
      $("#" + user.seatNumber).children(".owner-name").text(user.name);
    });
  }

  /*-----------RANDOM RESERVATION TASKS-------------*/

  //Generates random integer between 0 and n (inclusive)
  function generateRandomInt(n) {
    return Math.floor(Math.random() * (n + 1));
  }

  //Randomly reserves seats, generates random users, and assigns users to seats
  function assignRandomUsers() {
    var isRandomlyAssigned, randomName, randomEmail, randomSeatNumber;

    $seat.each(function() {
      var isRandomlyAssigned = generateRandomInt(1);
      if (isRandomlyAssigned) {
        $(this).addClass("reserved");
        randomName = randomUserNames[generateRandomInt(14)];
        randomEmail = randomName.toLowerCase() + "@example.com";
        randomSeatNumber = this.id;
        addUser(randomName, randomEmail, randomSeatNumber);
      }
    });
  }

  /*-----------SEAT SELECTION TASKS-------------*/

  //Adds/removes selection from queue && toggles .selected class
  function manageSeatsSelected($currentSeat) {
    var seatNumber = this.id;
    var seatIndex = seatsSelected.findIndex(function(seat) { //g
      return seat.attr("id") === seatNumber;
    });
    var notSelected = seatIndex === -1;

    if (notSelected) {
      seatsSelected.push($currentSeat); //g
    } else {
      seatsSelected.splice(seatIndex, 1); //g
    }

    $currentSeat.toggleClass("selected");
  }

  //Scrolls down to form on selection of seat (only after first selection)
  function scrollToForm() {
    if (seatsSelected.length === 1) { //g
        $('html,body').animate({
            scrollTop: $registrationForm.offset().top
        }, 'slow');
    }
  }

  //Notifies user that clicked seat is unavialable
  function warnUser() {
    alert("No sitting in other people's laps! Choose another seat.");
  }

  //Clears form inputs
  function clearForm() {
    $registrationForm[0].reset();
  }

  /*-----------SUBMIT SELECTION TASKS-------------*/

  //Creates new user from registration form input values
  function createUser() {
      var name = $("#name").val();
      var email = $("#email").val();
      var seatNumber;
      for (var i = 0; i < seatsSelected.length; i++) { //g
          seatNumber = seatsSelected[i].attr("id");
          addUser(name, email, seatNumber);
      }
  }

  /*-----------EVENT LISTENERS-------------*/

  //Handles seat selection
  $seat.on("click", function() {
    var $currentSeat = $(this);
    var notReserved = !($currentSeat.hasClass("reserved"));

    if (notReserved) {
      $registrationForm.fadeIn(2500);
      manageSeatsSelected.call(this, $currentSeat);
      scrollToForm();
    } else {
      warnUser();
    }
  });

  //Handles reservation form submission
  $registrationForm.on("submit", function(e) {
      e.preventDefault();
      createUser();
      for (var i = 0; i < seatsSelected.length; i++) { //g
          seatsSelected[i].addClass("reserved").removeClass("selected");
      }
      seatsSelected = []; //g
      updateSeatOwner();
      clearForm();
      $registrationForm.hide();
  });

  //Handles hover events over seats
  $seatingContainer.on("mouseenter mouseleave", ".reserved", function() {
    $(this).children(".owner-name").toggle();
  });

  /*-----------INITIAL SETUP-------------*/

  $registrationForm.hide();
  assignRandomUsers();
  updateSeatOwner();
  // $(".row").hide().each(function(i) {
  //   $(this).delay(250*i).fadeIn(700);
  // });

});




//display selected seats on form
//add available seats counter
//keep hover from changing seat size
//add reserve confirmation
//add name validation
//replace arrays with jQuery selections
