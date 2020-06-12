$(function(){

    // function to remove Todo List Item
    function rmvToDoItem(){
        $(this).parent().parent().remove()
        console.log("Rmv Called")
    }

    // function to change Status of Item
    function doneStatusItem(){
        console.log("Item done")
    }

    // Function To Delete Item or Change Status of an Todo List item
    $('#addtodoitemBtn').click(() => {
            let todoText = $('#itemValue').val();
            $('#itemValue').val("");

            //creating Todo List Item
            let trItem = document.createElement("TR")
            trItem.classList.add("todolistitem")
            let tdItemText = document.createElement("TD")

            tdItemText.innerHTML = todoText
            let tdItemBtn = document.createElement("TD")
            tdItemBtn.classList.add("text-right")

            let dnBtn = document.createElement("BUTTON")
            dnBtn.classList.add("btn", "btn-info", "btn-sm")
            dnBtn.innerText = "Done"
            dnBtn.addEventListener('click', doneStatusItem)
            
            tdItemBtn.appendChild(dnBtn)

            let delBtn = document.createElement("BUTTON")
            delBtn.classList.add("btn", "btn-danger", "btn-sm")
            delBtn.innerText = "Delete"
            delBtn.addEventListener('click', rmvToDoItem)

            tdItemBtn.appendChild(delBtn)

            trItem.appendChild(tdItemText)
            trItem.appendChild(tdItemBtn)

            document.getElementById('todolist').appendChild(trItem)
    });

})

{/* <tr class="todolistitem">
    <td>Mark</td>
    <td class="text-right">
        <button class="btn btn-info btn-sm">Done</button>
        <button class="btn btn-danger btn-sm">Delete</button>
    </td>
</tr> */}