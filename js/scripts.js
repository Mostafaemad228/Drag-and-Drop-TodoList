

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




// drage and drop function
function dragTasks() {
    document.querySelectorAll(".dragItem").forEach((task, i) => {

        task.addEventListener("dragstart", function () {
            // console.log("start");
            drag = task
        });


        task.addEventListener("dragend", function () {
            // console.log("end");
            drag = null
        });


        Boxs.forEach(box => {
            box.addEventListener("dragover", function (e) {
                e.preventDefault();
                if (this.dataset.columns == "in progress") {
                    this.style.backgroundColor = '#8957E5';
                }
                else if (this.dataset.columns == "completed") {
                    this.style.backgroundColor = '#238636';

                    // setTimeout(() => {
                    //     task.style.display = 'none';
                    // }, 4000);
                }



            });

            box.addEventListener("dragleave", function () {
                this.style.backgroundColor = '#010409';
                this.style.color = '#E6EDF3';


            });

            box.addEventListener("drop", function () {
                this.append(drag);
                this.style.backgroundColor = '#010409';
                this.style.color = '#E6EDF3';

            });

        });

    });




}

dragTasks()





























