// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(document).ready(function(){

  $.ajax({
    method: "GET",
    url: "/product" //gets product in position 0 aka only item yeezy
  }).done((product) => {
    $(".to_buy_list").prepend(createListElement(product)); //prepends item into the list with description
  });


  // collapsible functionality for index
  $('.collapsible').collapsible();

});

function createListElement(object) { //creates simple list item need to implement overload for different categories
  let item = `
   <li>
      <div class="collapsible-header">${object.title}</div>
      <div class="collapsible-body">${object.description}</div>
   </li>`;

  return item;
}
