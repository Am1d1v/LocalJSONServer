

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


function pageContents(data){
    console.log(data);
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
    
        const url = baseurl + 'posts';
        // Post content
        const body = {
            title: inputValue.value,
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

// Show all posts
function getAllPosts(event){

    const url = baseurl + 'posts';
    fetch(url)
    .then(res => res.json())
    .then(data => {
        pageContents(data);
    })
}