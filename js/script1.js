//javascript / jQuery for our project!
$(document).ready(function() {});
var $seat = $(".seat");
var $regForm = $("#reg");
var $reservedSeat = $(".reserved");

// var $customerInfo = $(______ ? ? ? ? ? ______);


//hide form when page loads
$($regForm).hide();


//Event listener for when seat is clicked
$($seat).on("click", function() {
    if ($($seat.not(".reserved"))) {
        $($regForm).fadeIn(2500);
    }
});


//
//
//     $reservedSeat.hover();

$($reservedSeat).hover(function() {
    $customerInfo.fadeIn(1500);
});
