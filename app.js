

const container = document.querySelector('.container');
const createNew = document.querySelector('.btn');
const inputValue = document.querySelector('.val');
const output = document.querySelector('.output');
const baseurl = 'http://localhost:3000/';
const createButton = createMyElement(container, 'button', 'Load Posts')

// Fetch posts when page is loaded
window.addEventListener('DOMContentLoaded', getAllPosts);


// Options for fetch request
createNew.addEventListener('click', addPost);

// Show all posts in log
createButton.addEventListener('click', getAllPosts)
createButton.classList.add('btn')

// Show all post on page
function pageContents(data){
    output.innerHTML = '';

    
    
    data.forEach((element, index) => {
        console.log(element);

        // Inputs wrapper
        const main = createMyElement(output, 'div', '');
        main.classList.add('outputInner')

        // Create title informantion
        const inputOne = createMyElement(main, 'input', '');
        inputOne.value = element.title;
        inputOne.classList.add('output-title');

        // Create author information
        const inputTwo = createMyElement(main, 'input', '');
        inputTwo.value = element.author;
        inputTwo.classList.add('output-author');

        // Inputs buttons for updating and deleting data
        const btns = createMyElement(main, 'div', '');
        btns.classList.add('btnsContainer')

        // Update data button
        const inputBtnUpdate = createMyElement(btns, 'button', 'Update');
        inputBtnUpdate.addEventListener('click', (event) => {
            const json = {
                title: inputOne.value,
                author: inputTwo.value
            };

            // Load new data
            updateItem(json, element.id);
        });

        // Delete data button
        const inputBtnDelete = createMyElement(btns, 'button', 'Delete');
        inputBtnDelete.addEventListener('click', () => {
            const url = baseurl + 'posts/' + element.id ;
            fetch(url, {
                method: 'DELETE'
            })
            main.remove();
        });
        

    })
}

// Update Item
function updateItem(json, id){
  
    const url = baseurl + 'posts/' + id ;

    // Fetch options
    const options = {
        method: 'PUT',
        body: JSON.stringify(json),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    };
    
    // Fetch data
    fetch(url, options)
    .then(res => res.json())
    .then(data => {
        pageContents(data);
    })
}

// Create DOM elements with DB data
function createMyElement(parent, typeOfElement, html){
    const element = document.createElement(typeOfElement);

    parent.append(element);
    element.innerHTML = html;
    
    return element;
}

// Add new post 
function addPost(event){
        event.preventDefault();
    
        const title = inputValue.value || 'default title'
        const url = baseurl + 'posts';
        // Post content
        const body = {
            title: title,
            author: 'Author1'
        };
        // Fetch options
        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        };
    
        fetch(url, options)
        .then(res => res.json())
        .then(data => {
            pageContents(data);
        })
}

// Show all posts()
function getAllPosts(event){

    const url = baseurl + 'posts';
    fetch(url)
    .then(res => res.json())
    .then(data => {
        pageContents(data);
    })
} 
