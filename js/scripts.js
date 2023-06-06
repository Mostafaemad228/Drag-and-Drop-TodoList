let todo_task = document.querySelector('[name="todo-title"]');
let AddBTN = document.querySelector(".AddBTN");
let dataContainer = document.querySelector(".Data-items_todos");
let Boxs = document.querySelectorAll(".Box");


let drag= null; 

AddBTN.addEventListener("click", function () {
    
    if (todo_task.value != "") {

        let itemRecord = ''
        itemRecord += `<div class="dragItem border border-2" draggable="true" > 
                            <div class="d-flex mb-3" >
                                <div class="p-2" >
                                    <span  > ${todo_task.value} </span>
                                </div>
                                
                                <div  class="ml-auto p-2"> <button class="btn btn-danger DeleteTodo "> x </button> </div> 
                            </div>
                        </div>`
    


        dataContainer.innerHTML += itemRecord
        todo_task.value = ""

        document.querySelectorAll(".DeleteTodo").forEach(btn => {
            btn.addEventListener("click", function () {
                this.parentElement.parentElement.parentElement.style.display = "none"
             });

        });

    }
 

});
