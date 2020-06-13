$(function(){

    // function to remove Todo List Item
    function rmvToDoItem(){
        $.ajax({
            url: '/api/todos',
            method: 'DELETE',
            data: {
                title: $(this).parent().parent().children(':first-child').html()
            },
            success: (data) => {
                $(this).parent().parent().remove()
            }
        })
    }

    // Req Function to change Status of Item
    function toggleStatusItem(){

        // POST request for Item: not <-> done
        $.ajax({
            url: '/api/todos/toggledone',
            method: 'POST',
            data: {
                title: $(this).parent().parent().children(':first-child').html(),
                isDone: $(this).hasClass("done")?false:true
            },
            success: (result) => {
                // On Successfully toggling class, mechanism to switch List of given item
                if($(this).hasClass("done")){ // done -> not done
                    $(this).parent().parent().detach().appendTo('#todolist')
                    $(this).html("Done")
                }
                else{//not done -> done
                    $(this).parent().parent().detach().appendTo('#completedlist')
                    $(this).html("Unfinished ?")
                }

                $(this).toggleClass("done")
            }
        })
    }

    //Function To Populate Todo List Item
    function populateTodoItem(todoText, isDone){

        let trItem = document.createElement("TR")
            trItem.classList.add("todolistitem")
            let tdItemText = document.createElement("TD")

            tdItemText.innerHTML = todoText
            let tdItemBtn = document.createElement("TD")
            tdItemBtn.classList.add("text-right")

            let dnBtn = document.createElement("BUTTON")
            dnBtn.classList.add("btn", "btn-info", "btn-sm")
            dnBtn.innerText = "Done"
            dnBtn.addEventListener('click', toggleStatusItem)

            if(isDone){
                dnBtn.classList.add("done")
                dnBtn.innerText = "Unfinished ?"
            }

            
            tdItemBtn.appendChild(dnBtn)

            let delBtn = document.createElement("BUTTON")
            delBtn.classList.add("btn", "btn-danger", "btn-sm")
            delBtn.innerText = "Delete"
            delBtn.addEventListener('click', rmvToDoItem)

            tdItemBtn.appendChild(delBtn)

            trItem.appendChild(tdItemText)
            trItem.appendChild(tdItemBtn)

            if(isDone){
                document.getElementById('completedlist').appendChild(trItem)
            } else {
                document.getElementById('todolist').appendChild(trItem)
            }
    }

    //Function to Add Item in todo List
    $('#addtodoitemBtn').click(() => {
            let todoText = $('#itemValue').val();
            $('#itemValue').val("");

            //document.getElementById('todolist').appendChild(trItem)
            $.ajax({
                url: 'api/todos',
                method: 'POST',
                data: {
                    title: todoText
                },
                success: (data) => {
                    populateTodoItem(todoText, false)
                }
            })
    });

    $.ajax({
        url: '/api/todos',
        method: 'GET',
        success: (data) => {
            if(!jQuery.isEmptyObject(data)){
                data.taskList.tasks.map((todoItem) => {
                    populateTodoItem(todoItem.title, todoItem.done)
                })
            }
        }
    })

})
