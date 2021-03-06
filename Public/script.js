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
        dnBtn.classList.add("btn", "btn-info", "btn-sm", "inlineBtn")
        dnBtn.innerText = "Done"
        dnBtn.addEventListener('click', toggleStatusItem)

        if(isDone){
            dnBtn.classList.add("done")
            dnBtn.innerText = "Unfinished ?"
        }

        
        tdItemBtn.appendChild(dnBtn)

        let delBtn = document.createElement("BUTTON")
        delBtn.classList.add("btn", "btn-danger", "btn-sm", "inlineBtn")
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


    // ---------------------------For Notes--------------------------------

    function rmvNoteItem(){

        let noteT = $(this).parent().parent().children(':first-child').children().val()

        $.ajax({
            url: '/api/notes',
            method: 'DELETE',
            data: {
                noteTitle: noteT
            },
            success: (data) => {
                // $(this).parent().parent().remove()
                //to be changed
                $(this).parent().parent().parent().remove()
            }
        })
    }

    function saveNoteItem(){
        
        var noteT = $(this).parent().parent().children(':first-child').children().val()
        var noteD = $(this).parent().parent().children(':nth-child(2)').val()

        $.ajax({
            url: '/api/notes/edit',
            method: 'POST',
            data: {
                noteTitle: noteT,
                noteDesc: noteD
            },
            success: (data) => {
                console.log("Note Saved Successfully")
            }
        })
    }

    function populateNote(noteTitle, noteDesc){

        let cardTitleElement = document.createElement("h5")
        cardTitleElement.classList.add("card-title")
        cardTitleElement.innerHTML = `<textarea readonly style ="max-width: 90%; height: 25px">${noteTitle}</textarea>`

        let textElement = document.createElement("textarea")
        textElement.innerHTML = noteDesc
        textElement.classList.add("card-text", "form-control")
        textElement.style.minHeight = "150px"
        
        let saveBtn = document.createElement("button")
        saveBtn.classList.add("btn", "btn-outline-info", "btn-sm")
        saveBtn.innerText = "Save Note"
        saveBtn.style.margin = "5px"
        saveBtn.addEventListener('click', saveNoteItem)

        let delBtn = document.createElement("button")
        delBtn.classList.add("btn", "btn-outline-danger", "btn-sm")
        delBtn.innerText = "Delete Note"
        delBtn.style.margin = "5px"
        delBtn.addEventListener('click', rmvNoteItem)

        let btnWrapper = document.createElement('div')
        btnWrapper.appendChild(saveBtn)
        btnWrapper.appendChild(delBtn)
        
        btnWrapper.style.padding = "5px"

        let cardBody = document.createElement("div")
        cardBody.classList.add("card-body")
        cardBody.style.padding = "5px"

        cardBody.appendChild(cardTitleElement)
        cardBody.appendChild(textElement)
        cardBody.appendChild(btnWrapper)

        let outerDiv = document.createElement("div")
        outerDiv.classList.add("card", "card-block", "mx-2")
        outerDiv.style.width = "18rem"
        outerDiv.style.minWidth = "250px"

        outerDiv.appendChild(cardBody)

        outerDiv.style.margin = "5px"

        $('#notelist').append(outerDiv)
    }

    $('#addNoteBtn').click(() => {

        let noteTitle = $('#noteTitle').val()
        let noteDesc = $('#noteDesc').val()

        $.ajax({
            url: '/api/notes',
            method: 'POST',
            data: {
                noteTitle: noteTitle,
                noteDesc: noteDesc
            },
            success: (data) => {

                populateNote(noteTitle, noteDesc)
                $('#noteTitle').val("")
                $('#noteDesc').val("")
            }
        })
    })

    // --------------------END NOTES---------------------------

    //-------------------FOR NEWS API --------------------------
    // <div class="card card-block mx-2" style="width: 18rem; min-width: 250px;">
    //     <img class="card-img-top" src="./tom-crew-7HuTGlUfQSo-unsplash.jpg" alt="Card image cap">
    //     <div class="card-body">
    //         <h5 class="card-title">Card title</h5>
    //         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //         <a href="" class="card-link">Read More</a>
    //     </div>
    // </div>

    function populateNewsItem(imgSrc, newsTitle, readMoreLink){
        var divHeader = document.createElement("div")
        divHeader.classList.add("card", "card-block", "mx-2")
        divHeader.style.width = "18rem"
        divHeader.style.minWidth = "250px"

        var imgEle = document.createElement("img")
        imgEle.classList.add("card-img-top")
        var imgSrcAttr = document.createAttribute("src")
        imgSrcAttr.value = imgSrc
        imgEle.setAttributeNode(imgSrcAttr)

        var divCardBody = document.createElement("div")

        var newsP = document.createElement("P")
        newsP.classList.add("card-text")
        newsP.innerHTML = newsTitle

        var readMore = document.createElement("a")
        readMore.innerHTML = "Read More"
        var hrefAttr = document.createAttribute("href")
        hrefAttr.value = readMoreLink
        readMore.classList.add("card-link")
        readMore.setAttributeNode(hrefAttr)
        var targetAttr = document.createAttribute("target")
        targetAttr.value = "_blank"
        readMore.setAttributeNode(targetAttr)

        divCardBody.append(newsP)
        divCardBody.append(readMore)

        divHeader.append(imgEle)
        divHeader.append(divCardBody)
        document.getElementById("newsList").append(divHeader)
    }

    function refreshNews(){
        $.ajax({
            url: '/api/news',
            method: 'GET',
            success: (data) => {
                console.log(data)
                data.articles.map((article) => {
                    populateNewsItem(article.urlToImage, article.title, article.url)
                })
            }
        })
    }

    $('#refreshNewsBtn').click(() => {
        refreshNews()
    })

    // --------------ON PAGE LOAD REQUESTS-----------------------

    // Populate Todo list items from DB in UI
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

    // Populate Notes List Items from DB in UI
    $.ajax({
        url: '/api/notes',
        method: 'GET',
        success: (data) => {
            if(!jQuery.isEmptyObject(data)){
                data.notes.notesList.map((item) => {
                    populateNote(item.title, item.desc)
                })
            }
        }
    })

    //Populate News Item on page load
    refreshNews()
})
