// 
// $(document).ready(function(){
//
//   var $seatSelected;
//   var $submit = $("#submit");
//   var $seat = $(".seat");
//   var users = [];
//
//   function User(name, email, seatNumber) {
//       this.name = name;
//       this.email = email;
//       this.seatNumber = seatNumber;
//   };
//
//   function createUser(){
//     var name = $("#name").val();
//     var email = $("#email").val();
//     var user = new User(name, email, seatNumber);
//     users.push(user);
//   }
//
//     $submit.on("submit", function(){
//       var seatNumber = $seatSelected.attr("id");
//       createUser();
//       seatNumber.addClass("reserved");
//     });
//
// });
