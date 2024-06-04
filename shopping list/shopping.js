// console.log('it works')
const shoppingForm = document.querySelector(`.shopping`);
const list = document.querySelector(`.list`);

//need array to hold our state
let items = [];

function handleSubmit(e) {
  e.preventDefault();
  // console.log('submitted');

  const name = e.currentTarget.item.value;
  console.log("name:: ");
  if (!name) return; //if it is emty then stop from running it

  const item = {
    name,
    id: Date.now(),
    complete: false,
  };

  //push the item into our state
  items.push(item);
  // console.log(`there are now ${items.length} in your state`);
  e.target.reset(); //clear form
  list.dispatchEvent(new CustomEvent(`itemsUpdated`));
}

function displayItem() {
  // console.log('items: ', items);
  const html = items
    .map(
      (item) => `<li class = "shopping-item">
        <input value="${item.id}" type = 'checkbox' ${
        item.complete ? "checked" : ""
      }>
        <span class = 'itemName'>${item.name}</span>
        <button aria-label='Remove ${item.name}' value="${
        item.id
      }">&times</button>
        </li>`
    )
    .join("");
  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  console.log("mirrorToLocalStorages");
  console.info(`saving items to localstorage`);
  localStorage.setItem(`items`, JSON.stringify(items));
}

function restoreFromLocalStorage() {
  console.info(`restoring from LS`);
  const listItemString = localStorage.getItem(`items`);
  if (listItemString) {
    const lstItem = JSON.parse(listItemString);
    // items = lstItem;
    items.push(...lstItem);
    list.dispatchEvent(new CustomEvent(`itemsUpdated`));
  }
}

function markAsComplete(id) {
  console.log(`mark as complete`, id);
  const itemRef = items.find((item) => item.id === id);
  console.log(itemRef);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent(`itemsUpdated`));
}

function deleteItem(id) {
  console.log("DELETIENG ITEM", id);
  items = items.filter((item) => item.id !== id);
  console.log(items);
  list.dispatchEvent(new CustomEvent(`itemsUpdated`));
}

shoppingForm.addEventListener(`submit`, handleSubmit);
list.addEventListener(`itemsUpdated`, displayItem);
list.addEventListener(`itemsUpdated`, mirrorToLocalStorage);

//Event delegation: we listen or the click on the list <ul> but then delegate the click over to the button if that is what was clicked
list.addEventListener(`click`, function (e) {
  const id = parseInt(e.target.value);
  if (e.target.matches(`button`)) {
    deleteItem(id);
  }

  if (e.target.matches(`input[type="checkbox"]`)) {
    markAsComplete(id);
  }
});

restoreFromLocalStorage();
