//javascript / jQuery for our project!
$(document).ready(function() {

    var seatSelected = [];
    var $submit = $("#submit");
    var $seat = $(".seat");
    var users = [];
    var $regForm = $("#reg");


    //hide form when page loads

    $($regForm).hide();


    /*-----------RANDOMLY RESERVE SEATING ON PAGE LOAD-------------*/
    //generate an array of seats
    var allSeats = $("#seating-container").children().children(); //select rows.//select seats(direct children)
    for (var i = 0; i < 24; i++) {
        var random = Math.floor((Math.random() * 2));
        if (random === 0) {
            $(allSeats[i]).addClass("reserved");
        }
    }
    //assign class reserved

    /*-----------ON SEAT CLICK EVENT-------------*/

    //Seat clicked event listener: if seat is not reserved, fadein form && store seat selected

    $($seat).on("click", function() {
        if (!($(this).hasClass("reserved"))) {
            $($regForm).fadeIn(2500);
            seatSelected.push($(this)); //Stores seat selected for use in submit event listener
            seatSelected[seatSelected.length - 1].toggleClass("selected");
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
            $(this).children("p").text($(this).attr("id"));
        });
    }

});



//display selected seats on form
//add available seats counter
//making hover more uniform with seats vs seats+user info
//add random colors for different users?
//add random user info to randomly generated reserved seats
