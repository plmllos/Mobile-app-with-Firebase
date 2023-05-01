import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: ''
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListinDB = ref(database, 'shopping list' )

const inputEl = document.getElementById('input-field')
const addBtn = document.getElementById('add-button')
const shoppingList = document.getElementById('shopping-list')

addBtn.addEventListener('click', function() {
    let inputValue = inputEl.value
    if (inputValue) {
        push(shoppingListinDB, inputValue)
    }
    inputEl.value = ""
})

onValue(shoppingListinDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        shoppingList.innerHTML = ''

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            addItemtoShopping(currentItem)
        }
    } else {
        shoppingList.innerHTML = 'No items...'
    }
})

function addItemtoShopping(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue 
    
    newEl.addEventListener("click", function() {
        let idOfItem = ref(database, `shopping list/${itemID}`)
        remove(idOfItem)
    })

    shoppingList.append(newEl)
}
