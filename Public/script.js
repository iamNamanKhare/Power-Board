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


    //----------------for Notes----------------------------

    let addNoteBtn = $('#addNoteBtn')
    let editNoteBtn = $('#editNoteBtn')
    let deleteNoteBtn = $('#deleteNoteBtn')

    addNoteBtn.click(() => {
        console.log('Add Notes button clicked')
        $.ajax({
            url: '/api/notes',
            type: 'POST',
            data: {
                noteTitle: $('#noteTitle').val(),
                noteDesc: $('#noteDesc').val()
            },
            success: (result) => {
                console.log("Notes List fetched")
                console.log(result)
            }
        })
    })

    editNoteBtn.click(() => {
        console.log('Edit Notes button clicked')
        $.ajax({
            url: '/api/notes/edit',
            type: 'POST',
            data: {
                noteTitle: $('#editNoteTitle').val(),
                noteDesc: $('#editNoteDesc').val(),
                objectID: $('#editNoteId').val()
            },
            success: (result) => {
                console.log("EDIT NOTE")
                console.log(result)
            }
        })
    })

    deleteNoteBtn.click(() => {
        console.log('DELETE Notes button clicked')
        $.ajax({
            url: '/api/notes',
            type: 'DELETE',
            data: {
                noteTitle: $('#deletNoteTitle').val(),
            },
            success: (result) => {
                console.log("DELETED NOTE")
                console.log(result)
            }
        })
    })

    //------------------------end notes----------------------------------

    //------------------------FOR NEWS API-------------------------------
    
    let newsBtn = $('#newsBtn')

    newsBtn.click(() => {
        console.log("News Button Clicked")
        $.ajax({
            url: '/api/news',
            type: 'GET',
            success: (response) => {
                console.log("News Fetched")
                console.log(response)
            }
        })
    })

})