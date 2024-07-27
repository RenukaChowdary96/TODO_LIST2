
(() => {
  // state variables
  let toDoListArray = [];
  // ui variables
  const form = document.querySelector(".form");
  const input = form.querySelector(".form__input");
  const ul = document.querySelector(".toDoList");

  // event listeners
  form.addEventListener('submit', e => {

    e.preventDefault();
    // give item a unique ID
    let itemId = String(Date.now());
    // get/assign input value
    let toDoItem = input.value;
    //pass ID and item into functions
    addItemToDOM(itemId , toDoItem);
    addItemToArray(itemId, toDoItem);

    input.value = '';
  });

  ul.addEventListener('click', e => {
    let id = e.target.getAttribute('data-id')
    if (!id) return
    removeItemFromDOM(id);
    removeItemFromArray(id);
  });


  function addItemToDOM(itemId, toDoItem) {

    const li = document.createElement('li')
    li.setAttribute("data-id", itemId);

    li.innerText = toDoItem

    ul.appendChild(li);
  }

  function addItemToArray(itemId, toDoItem) {

    toDoListArray.push({ itemId, toDoItem});
    console.log(toDoListArray)
  }

  function removeItemFromDOM(id) {

    var li = document.querySelector('[data-id="' + id + '"]');

    ul.removeChild(li);
  }

  function removeItemFromArray(id) {

    toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    console.log(toDoListArray);
  }

})();

