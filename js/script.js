//javascript / jQuery for our project!
$(document).ready(function() {

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
  var seatNumber = $seatSelected.children("p").text();
  var user = new User(name, email, seatNumber);
  console.log(user);
  users.push(user);
  console.log(users);
  }

  //Submit event listener: creates user object and adds "reserved" class to seat

  $regForm.on("submit", function(event){
    event.preventDefault();
    createUser();
    $seatSelected.addClass("reserved");
    resetMouseover();
  });


  /*----------ON SEAT HOVER EVENT---------*/

  function resetMouseover(){
     $(".reserved").on("mouseover", function() {
       var hoveredSeat = $(this).children("p").text();
       var seatOwner;
       console.log("hoveredSeat: " + hoveredSeat);
       users.forEach(function(user){
         if (user.seatNumber === hoveredSeat) {
           seatOwner = user;
         }
       });
       $(this).children("p").text(seatOwner.name);
    });
  }
});

//change text content of seats from "seat" to seat number
//use seat text content to get seat number instead of id && remove id from seats
//on hover on available seat, change background color
//toggle selected seats
//add multiple seats
//display selected seats on form
//on hover (reserved seats) display user info on reserved seats
//on hover (available seats) change opacity of seat (css)
//fix form scroll issue
//add border-radius to form elements
//add available seats counter
//safari stacks form elements
//add responsiveness
//clear inputs after submit
