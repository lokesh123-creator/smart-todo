let list = document.getElementById("list");
let addbtn =document.getElementById("btn");
let input = document.getElementById("task");
let clear = document.getElementById("clear");
let taskCount = document.getElementById("taskCount");
let completedCount = document.getElementById("completedCount");
let remainingCount =document.getElementById("remainingCount");

input.addEventListener("keydown", function(event) {
     if(event.key === "Enter") {
        addbtn.click();
     }
});

//save all tasks to LocalStorage
function saveTask() {
    let tasks = [];
    document.querySelectorAll("#list li").forEach(function(li){
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        })
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Create a new task
function createTask(taskText, completed = false) {
    let li = document.createElement("li");
    li.innerText = taskText

    if(completed) {
        li.classList.add("completed");
    }

    let del_button= document.createElement("button");
    del_button.innerText = "Delete";
    del_button.style.marginLeft = "10px";

    del_button.addEventListener("click",function(){
        li.remove();
        saveTask();
        updateCounter();
    })

    let done_button = document.createElement("button");
    done_button.style.marginLeft = "10px";
    done_button.innerText = completed ? "Undo" : "Done";
    done_button.addEventListener("click",function(){
        li.classList.toggle("completed");
        done_button.innerText =  li.classList.contains("completed") ? "UNDO" : "DONE";
          saveTask();
          updateCounter();
    })
      li.appendChild(del_button);
      li.appendChild(done_button);
      list.appendChild(li);

}

//load tasks
function loadTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        createTask(task.text, task.completed)
    })
    updateCounter();
}


//updating Task counter
function updateCounter() {
    const total = list.children.length;
    const completd = document.querySelectorAll("#list .completed").length;
    const remaining = total - completd;

    taskCount.innerText = "Tasks : " + total;
    remainingCount.innerText = "Remaining : " + remaining
    completedCount.innerText = "completed : " + completd;
}

clear.addEventListener("click",function() {
    let confiremd = confirm("Are you sure?");

    if(confiremd) {
        list.innerHTML = "";
        saveTask();
        updateCounter();
        alert("All tasks cleared");
    }
});

addbtn.addEventListener("click",function() {
    let taskText = input.value.trim();
    if(taskText === "") {
        alert("Please enter a task.")
        return;
    }

    const tasks = document.querySelectorAll("#list li");
    let exists = [...tasks].some(
        li => li.firstChild.textContent === taskText
    );
    if(exists) {
        alert("Task already exists.");
        return;
    }
    createTask(taskText);
    saveTask();
    updateCounter();

    input.value = "";
    input.focus();

});
loadTask();