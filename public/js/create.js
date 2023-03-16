console.log(document.querySelector('.create-form'));

const createPostFormHandler = async (event) => {
    event.preventDefault();
    
    console.log("Form submitted");
    
    const post_name = document.querySelector('#post_name').value.trim();
    const post_body= document.querySelector('#post_body').value.trim();
    
    if (post_body && post_name) {
        const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({ post_name, post_body }),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        document.location.replace('/profile');
        } else {
            console.log(response);
            alert(response.statusText);
        }
    }
};
    
document
.querySelector('.create-form')
.addEventListener('submit', createPostFormHandler);