const inputBox = document.getElementById("input-box");
const dateBox = document.getElementById("date-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onclick = function () {
            li.classList.toggle("checked");
            saveData();
        };

        let text = document.createElement("span");
        text.textContent = inputBox.value;
        text.className = "text";
        
        let date = document.createElement("span");
        date.textContent = dateBox.value;
        date.className = "date";

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.className = "delete";
        span.onclick = function () {
            li.remove();
            saveData();
        };

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(date);
        li.appendChild(span);
        listContainer.appendChild(li);
    }
    inputBox.value = "";
    dateBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN" && e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    let items = listContainer.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
        let checkbox = items[i].getElementsByTagName("input")[0];
        checkbox.onclick = function () {
            items[i].classList.toggle("checked");
            saveData();
        };
        let span = items[i].getElementsByClassName("delete")[0];
        span.onclick = function () {
            items[i].remove();
            saveData();
        };
    }
}

showTask();
