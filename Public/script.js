$(function(){
    let deleteBtn = $('#deleteTaskBtn')
    let toggleDoneBtn = $('#toggleDoneBtn')
    let toggleTitleBtn = $('#toggleTitleBtn')

    let donetaskID = $('#donetaskID')
    let toggleValue = $('#toggleValue')
    let tasktitle = $('#tasktitle')

    let titletaskID = $('#titletaskID')
    let newTitle = $('#newTaskTitle')

    deleteBtn.click(() => {
        console.log('delete button clicked')

        $.ajax({
            url: '/api/todos',
            type: 'DELETE',
            data: {
                title: tasktitle.val()
            },
            success: function(result) {
                console.log(result)
            }
        });
    })

    toggleDoneBtn.click(() => {
        console.log('toggleDone button clicked')

        $.ajax({
            url: '/api/todos/toggledone',
            type: 'POST',
            data: {
                objectID: donetaskID.val(),
                isDone: toggleValue.val()
            },
            success: function(result) {
                console.log(result)
            }
        });
    })

    toggleTitleBtn.click(() => {
        console.log('toggle Title button clicked')

        $.ajax({
            url: '/api/todos/toggletitle',
            type: 'POST',
            data: {
                objectID: titletaskID.val(),
                title: newTitle.val()
            },
            success: function(result) {
                console.log(result)
            }
        });
    })
})