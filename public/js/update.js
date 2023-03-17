console.log(document.querySelector('.update-form'));

const updateCommentFormHandler = async (event) => {
    event.preventDefault();
    
    console.log("Form submitted");
    
    const post_id = document.querySelector('input[name="post_id"]').value;
    const comment_content= document.querySelector('#comment_content').value.trim();
    
    if (post_id && comment_content) {
        const response = await fetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify({ post_id, comment_content }),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        document.location.reload();
        } else {
            console.log(response);
            alert(response.statusText);
        }
    }
};
    
document
.querySelector('.update-form')
.addEventListener('submit', updateCommentFormHandler);