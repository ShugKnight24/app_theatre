$(function() {

  var users = [];
  var seatsSelected = [];
  var randomUserNames = ["Charlie", "Benson", "Karen", "Katie", "Steve", "Erika", "Dave", "Ray", "Chelsea", "Ithica", "Jennifer", "Shanita", "Josh", "John", "Travis"];

  var $seat = $(".seat");
  var $regForm = $("#reg");
  var $submit = $("#submit");


  //On page load
  hideForm();
  assignRandomUsers();
  updateSeatOwner();


  /*-----------RANDOMLY RESERVE SEATING ON PAGE LOAD-------------*/

  function generateRandomInt(n) {
    return Math.floor(Math.random() * (n + 1));
  }

  function addUser(name, email, seatNumber) {
    var user = new User(name, email, seatNumber);
    users.push(user);
  }

  function updateSeatOwner() {
    users.forEach(function(user) {
      $("#" + user.seatNumber).children(".owner-name").text(user.name);
    });
  }
  
  function assignRandomUsers() {
    var isRandomlyAssigned, randomName, randomEmail, randomSeatNumber;
    $seat.each(function() {
      var isRandomlyAssigned = generateRandomInt(1);
      if (isRandomlyAssigned) {
        $(this).addClass("reserved");
        var randomName = randomUserNames[Math.floor(Math.floor(Math.random() * 15))];
        var randomEmail = randomName.toLowerCase() + "@example.com";
        var randomSeatNumber = this.id;
        var randomUser = new User(randomName, randomEmail, randomSeatNumber);
        users.push(randomUser); //g
      }
    });
  }



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

  function scrollToForm() {
    if (seatsSelected.length === 1) {
        $('html,body').animate({ //Scrolls down to top of form when seat is selected
            scrollTop: $regForm.offset().top
        }, 'slow');
    }
  }

  function hideForm() {
    $regForm.hide();
  }

  function warnUser() {
    alert("No sitting in other people's laps! Choose another seat.");
  }

  function clearForm() {
    $regForm[0].reset();
  }

  $seat.on("click", function() {
    var $currentSeat = $(this);
    var notReserved = !($currentSeat.hasClass("reserved"));

    if (notReserved) {
      showForm();
      manageSeatsSelected.call(this, $currentSeat);
      scrollToForm();
    } else {
      hideForm();
      warnUser();
    }
  });


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
      for (var i = 0; i < seatsSelected.length; i++) {  //use $ select+each instead of arr+for
          seatNumber = seatsSelected[i].attr("id");
          var user = new User(name, email, seatNumber);
          users.push(user);
      }
  }

  //Submit event listener: creates user object and adds "reserved" class to seat

  $regForm.on("submit", function(e) {
      e.preventDefault();
      createUser();
      for (var i = 0; i < seatsSelected.length; i++) { //use $ select+each instead of arr+for
          seatsSelected[i].addClass("reserved").removeClass("selected");
      }
      seatsSelected = [];                              //line redundant if using $ selection
      updateSeatOwner();
      clearForm();
      hideForm();
  });

  //Displays associated user info on mouseenter event on reserved seats

  $("#seating-container").on("mouseenter mouseleave", ".reserved", function() {
    $(this).children(".owner-name").toggle();
  });




});


//*priority* fix bug: each time form is submitted seat owner name is prepended to seat on hover an additional time

//display selected seats on form
//add available seats counter
//making hover more uniform with seats vs seats+user info
//add random colors for different users?
//when seats are selected, then reserved seat is clicked on, the form is hidden until another         //available seat is clicked on
//add reserve confirmation
//add name validation
//fix bug: scrolls to form after every selection (should only scroll once)
//is seatsSelected array necessary? Can a JQuery selection be used for .selected?
