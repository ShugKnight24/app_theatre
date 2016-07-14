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


//Event listener for when seat is clicked
$($seat).on("click", function() {
    if ($($seat.not(".reserved"))) {
        $($regForm).fadeIn(2500);
        $seatSelected = $(this);
    }
});


//
//
//     $reservedSeat.hover();



  function User(name, email, seatNumber) {
    this.name = name;
    this.email = email;
    this.seatNumber = seatNumber;
  };

  function createUser(){
  var name = $("#name").val();
  console.log(name);
  var email = $("#email").val();
  var seatNumber = $seatSelected.attr("id");
  var user = new User(name, email, seatNumber);
  users.push(user);
  }

  $regForm.on("submit", function(event){
    event.preventDefault();
    var seatNumber = $seatSelected.attr("id");
    console.log(seatNumber);
    createUser();
    $seatSelected.addClass("reserved");//add class to the element not the id value
  });

  $($reservedSeat).hover(function() {
      $customerInfo.fadeIn(1500);

});
