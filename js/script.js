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

    $($seat).on("click", function(){
        if (!($(this).hasClass("reserved"))) {
            $($regForm).fadeIn(2500);
            $seatSelected = $(this); //Stores seat selected for use in submit event listener
            $seatSelected.addClass("selected");
        }
        $('html,body').animate({ //Scrolls to top of form when seat is selected
            scrollTop: $($regForm).offset().top
        }, 'slow');
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
        console.log(name);
        var email = $("#email").val();
        var seatNumber = $seatSelected.children("p").text();
        var user = new User(name, email, seatNumber);
        console.log(user);
        users.push(user);
        console.log(users);
    }

    //Submit event listener: creates user object and adds "reserved" class to seat

    $regForm.on("submit", function(event) {
        event.preventDefault();
        createUser();
        $seatSelected.addClass("reserved");
        resetMouseover();
        $($regForm)[0].reset(); //resets form after submit
    });


    function resetMouseover() {
        $(".reserved").on("mouseover", function() {
            var hoveredSeat = $(this).children("p").text();
            var seatOwner;
            console.log("hoveredSeat: " + hoveredSeat);
            users.forEach(function(user) {
                if (user.seatNumber === hoveredSeat) {
                    seatOwner = user;
                }
            });
            $(this).children("p").text(seatOwner.name + " " + seatOwner.seatNumber);
        });
    }
});


//on hover on available seat, change background color
//toggle selected seats
//add multiple seats
//display selected seats on form
//on hover (reserved seats) display user info on reserved seats
//add border-radius to form elements
//add available seats counter
//add responsiveness
