let inp = document.querySelector("#input");
let btn = document.querySelector("#button");
let ull = document.querySelector("#ul");
let form = document.querySelector("#todoForm");



// form.addEventListener("submit", function (e) {
//     e.preventDefault(); // Stops form from submitting & refreshing page

//     if (inp.value.trim() !== "") { // Prevent adding empty tasks
//         let items = document.createElement("li");
//         items.innerText = inp.value;
       
//         let delBtn=document.createElement("button");
//         delBtn.innerText="delete";
//         delBtn.classList.add(
//             "py-1", "px-3", "bg-red-500", "text-white", "rounded-md", "hover:bg-red-700", "transition", "duration-300"
//         );
//         delBtn.addEventListener("click", function () {
//             items.remove(); // Remove the task on click
//         });
        
//         items.appendChild(delBtn);
//         items.classList.add("flex", "justify-between", "items-center", "py-2", "border-b", "border-gray-300");
//         ull.appendChild(items);
//         inp.value = ""; // Clear input field after adding
//     }
// });




let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Load existing tasks

// Function to render tasks
function renderTasks() {
    ull.innerHTML = ""; // Clear previous list

    tasks.forEach((task, index) => {
        let items = document.createElement("li");
        items.innerText = task;
        items.classList.add("flex", "justify-between", "items-center", "py-2", "border-b", "border-gray-300");

        // Create Delete Button
        let delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.classList.add(
            "py-1", "px-3", "bg-red-500", "text-white", "rounded-md", "hover:bg-red-700", "transition", "duration-300"
        );

        // Delete task on button click
        delBtn.addEventListener("click", function () {
            tasks.splice(index, 1); // Remove from array
            localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage
            renderTasks(); // Re-render list
        });

        items.appendChild(delBtn);
        ull.appendChild(items);
    });
}

// Load tasks when page loads
renderTasks();

// Add task on form submission
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (inp.value.trim() !== "") {
        tasks.push(inp.value); // Add to array
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Store in localStorage
        inp.value = ""; // Clear input
        renderTasks(); // Re-render list
    }
});