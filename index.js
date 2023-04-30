const inputEl = document.getElementById('input-field')
const addBtn = document.getElementById('add-button')
const shoppingList = document.getElementById('shopping-list')

addBtn.addEventListener('click', function() {
     let item = `
        <li id='${inputEl.value}'> ${inputEl.value} </li>
    `
    shoppingList.innerHTML += item
    inputEl.value = ""
})

shoppingList.addEventListener('click', function(e) {
    document.getElementById(e.target.id).remove()
})

