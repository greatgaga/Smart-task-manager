let items = [];
let visible_items = [];

let draggedIndex = null;

let filter;

window.onload = function() {
    const stored_items = localStorage.getItem("items");
    if (stored_items){
        items = JSON.parse(stored_items);
    }

    document.getElementById("all-toggle").checked = true;
    document.getElementById("dark-theme-toggle").checked = true;

    all_filter();
    completed_filter();
    active_filter();

    filter = "all";
    render_items();

    light_theme_switch();
    dark_theme_switch();

    set_theme();

    init_clear_cache_button();
};

function init_clear_cache_button() {
    const button = document.querySelector(".circle-button");

    if (!button) return; // button not found

    button.addEventListener("click", () => {
        button.classList.toggle("clicked");

        setTimeout(() => {
            button.classList.remove("clicked");
        }, 200);

        // Remove completed items
        items = items.filter(item => item.done !== true);

        update_storage();
        render_items();
    });
}

function update_storage(){
    localStorage.setItem("items", JSON.stringify(items));
}

function render_items(){
    visible_items = [];
    const task_list = document.getElementById("task_list");
    task_list.innerHTML = "";
    if (filter === "all"){
        items.forEach((item, index) =>  {
            if (item.done === false || item.done === true){   
                visible_items.push(item);
                // creating elements
                const chore_div = document.createElement("div");
                chore_div.className = "chores";
                chore_div.setAttribute("draggable", "true");
                chore_div.dataset.realIndex = index;
                chore_div.dataset.visibleIndex = visible_items.length;
                chore_div.addEventListener("dragstart", handleDragStart);
                chore_div.addEventListener("dragover", handleDragOver);
                chore_div.addEventListener("drop", handleDrop);
                visible_items.push(index);

                const label = document.createElement("label");
                label.className = "custom-checkbox";

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                
                const checkmark = document.createElement("span");
                checkmark.className = "checkmark";

                if (item.done === true){
                    checkbox.style.backgroundColor = "rgb(48, 45, 45)";
                    checkmark.style.backgroundColor = "black";
                }

                const input = document.createElement("input");
                input.value = item.item;

                const item_date = document.createElement("input");
                item_date.type = "date";
                item_date.value = item.due_date;    

                label.appendChild(checkbox);
                label.appendChild(checkmark);
                chore_div.appendChild(label);
                chore_div.appendChild(input);
                chore_div.appendChild(item_date);
                task_list.appendChild(chore_div);
                
                document.getElementById("task_input").value = "";

                checkbox.type = "checkbox";

                if (item.done === false){
                    checkbox.addEventListener("change", () => {
                        if (checkbox.checked) {
                            setTimeout(() => {chore_div.remove();}, 150)
                            items[index].done = true;
                            update_storage();
                            render_items();
                        }
                    });
                    input.addEventListener("blur", () => {
                        items[index].item = input.value;
                        update_storage();
                    });

                    item_date.addEventListener("change", () => {
                        items[index].due_date = item_date.value;
                        update_storage();
                    });
                }
            }
        });
    }
    else if (filter === "completed"){
        items.forEach((item, index) =>  {
            if (item.done === true){   
                visible_items.push(item);
                // creating elements
                const chore_div = document.createElement("div");
                chore_div.className = "chores";
                chore_div.setAttribute("draggable", "true");
                chore_div.dataset.realIndex = index;
                chore_div.dataset.visibleIndex = visible_items.length;
                chore_div.addEventListener("dragstart", handleDragStart);
                chore_div.addEventListener("dragover", handleDragOver);
                chore_div.addEventListener("drop", handleDrop);
                visible_items.push(index);

                const label = document.createElement("label");
                label.className = "custom-checkbox";

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.style.backgroundColor = "rgb(48, 45, 45)";
                
                const checkmark = document.createElement("span");
                checkmark.className = "checkmark";
                checkmark.style.backgroundColor = "black";

                const input = document.createElement("input");
                input.value = item.item;

                const item_date = document.createElement("input");
                item_date.type = "date";
                item_date.value = item.due_date;    

                label.appendChild(checkbox);
                label.appendChild(checkmark);
                chore_div.appendChild(label);
                chore_div.appendChild(input);
                chore_div.appendChild(item_date);
                task_list.appendChild(chore_div);
                
                document.getElementById("task_input").value = "";

                checkbox.type = "checkbox";
            }
        });
    }
    else {
        items.forEach((item, index) =>  {
            if (item.done === false){   
                visible_items.push(item);
                // creating elements
                const chore_div = document.createElement("div");
                chore_div.className = "chores";
                chore_div.setAttribute("draggable", "true");
                chore_div.dataset.realIndex = index;
                chore_div.dataset.visibleIndex = visible_items.length;
                chore_div.addEventListener("dragstart", handleDragStart);
                chore_div.addEventListener("dragover", handleDragOver);
                chore_div.addEventListener("drop", handleDrop);
                visible_items.push(index);

                const label = document.createElement("label");
                label.className = "custom-checkbox";

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                
                const checkmark = document.createElement("span");
                checkmark.className = "checkmark";

                const input = document.createElement("input");
                input.value = item.item;

                const item_date = document.createElement("input");
                item_date.type = "date";
                item_date.value = item.due_date;    

                label.appendChild(checkbox);
                label.appendChild(checkmark);
                chore_div.appendChild(label);
                chore_div.appendChild(input);
                chore_div.appendChild(item_date);
                task_list.appendChild(chore_div);
                
                document.getElementById("task_input").value = "";

                checkbox.type = "checkbox";

                checkbox.addEventListener("change", () => {
                    if (checkbox.checked) {
                        setTimeout(() => {chore_div.remove();}, 150)
                        items[index].done = true;
                        update_storage();
                        render_items();
                    }
                    input.addEventListener("blur", () => {
                        items[index].item = input.value;
                        update_storage();
                    });

                    item_date.addEventListener("change", () => {
                        items[index].due_date = item_date.value;
                        update_storage();
                    });
                });
                input.addEventListener("blur", () => {
                    items[index].item = input.value;
                    update_storage();
                });

                item_date.addEventListener("change", () => {
                    items[index].due_date = item_date.value;
                    update_storage();
                });
            }
        });    
    }
}

function add_task() {
    const task_input = document.getElementById("task_input");
    const date_input = document.getElementById("due_date");

    const new_item = task_input.value.trim();
    const new_date = date_input.value.trim();

    if (new_item) {
        items.push({ item: new_item, done: false, due_date: new_date });
        update_storage();
        render_items();
    }

    task_input.value = "";
    date_input.value = "";
}

function all_filter(){
    const all_toggle = document.getElementById("all-toggle");
    all_toggle.addEventListener("change", () => {
        if (all_toggle.checked) {
            filter = "all";
            render_items();
        }
    });
}

function completed_filter(){
    const completed_toggle = document.getElementById("only-completed-toggle");
    completed_toggle.addEventListener("change", () => {
        if (completed_toggle.checked) {
            filter = "completed";
            render_items();
        }
    });
}

function active_filter(){
    const active_toggle = document.getElementById("only-active-toggle");
    active_toggle.addEventListener("change", () => {
        if (active_toggle.checked) {
            filter = "active";
            render_items();
        }
    });
}

function dark_theme_switch(){
    const dark_toggle = document.getElementById("dark-theme-toggle");
    dark_toggle.addEventListener('change', () =>  {
        localStorage.setItem('theme', "dark");
        set_theme();
    });
}

function light_theme_switch(){
    const light_toggle = document.getElementById("light-theme-toggle");
    light_toggle.addEventListener('change', () =>  {
        localStorage.setItem('theme', "light");
        set_theme();
    });
}

function set_theme(){
    const theme = localStorage.getItem("theme");
    const all_p = document.querySelectorAll("p");
    const all_h1 = document.querySelectorAll("h1");
    if (theme === "dark"){
        document.body.style.backgroundColor = "rgb(48, 45, 45)";
        all_p.forEach(p => p.style.color = "white");
        all_h1.forEach(h1 => h1.style.color = "white");
    }
    else {
        document.body.style.backgroundColor = "rgb(224, 217, 217)";
        all_p.forEach(p => p.style.color = "black");
        all_h1.forEach(h1 => h1.style.color = "black");
    }
}

function handleDragStart(e) {
    draggedIndex = +e.currentTarget.dataset.visibleIndex;
    e.dataTransfer.effectAllowed = "move";
}

function handleDragOver(e){
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}

function handleDrop(e){
    e.preventDefault();
    const targetIndex = +e.currentTarget.dataset.visibleIndex;

    if (draggedIndex === targetIndex) return;

    const draggedRealIndex = visible_items[draggedIndex];
    const targetRealIndex = visible_items[targetIndex];

    const [draggedItem] = items.splice(draggedRealIndex, 1);
    items.splice(targetRealIndex, 0, draggedItem);

    update_storage();
    render_items();
}