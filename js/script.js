//javascript / jQuery for our project!
$(document).ready(function() {});

  var $seatSelected;
  var $submit = $("#submit");
  var $seat = $(".seat");
  var users = [];
  var $regForm = $("#reg");
  var $reservedSeat = $(".reserved");
  // var $customerInfo = $(______ ? ? ? ? ? ______);


  //hide form when page loads

  $($regForm).hide();


/*-----------ON SEAT CLICK EVENT-------------*/

  //Seat clicked event listener: if seat is not reserved, fadein form && store seat selected

  $($seat).on("click", function() {
      if ($($seat.not(".reserved"))) {
          $($regForm).fadeIn(2500);
          $seatSelected = $(this);          //Stores seat selected for use in submit event listener
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

  function createUser(){
  var name = $("#name").val();
  console.log(name);
  var email = $("#email").val();
  var seatNumber = $seatSelected.attr("id");
  var user = new User(name, email, seatNumber);
  users.push(user);
  }

  //Submit event listener: creates user object and adds "reserved" class to seat

  $regForm.on("submit", function(event){
    event.preventDefault();
    createUser();
    $seatSelected.addClass("reserved");
  });


  /*----------ON SEAT HOVER EVENT---------*/


  // $($reservedSeat).hover(function() {
  //     $customerInfo.fadeIn(1500);

});
