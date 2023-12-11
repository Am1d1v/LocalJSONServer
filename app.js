

const container = document.querySelector('.container');
const btn1 = document.querySelector('.btn');
const val = document.querySelector('.val');
const output = document.querySelector('.output');
const baseurl = 'http://localhost:3000/';

// Fetch posts when page is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    const url = baseurl + 'posts';
    fetch(url)
    .then(res => res.json())
    .then(data => {
        pageContents(data);
    })
});

// Options for fetch request
btn1.addEventListener('click',(event) => {
    const url = baseurl + 'posts';
    // Post content
    const body = {
        title: val.value,
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
});


function pageContents(data){
    console.log(data);
}