// const newFormHandler = async (event) => {
//     event.preventDefault();
  
//     const post_name = document.querySelector('#post_name').value.trim();
//     const post_body = document.querySelector('#post_body').value.trim();
    
//     //should I add comment info here too?
//       //like mirror the same logic below but for comments?
  
//     if (post_name && post_body) {
//       const response = await fetch(`/api/post`, {
//         method: 'POST',
//         body: JSON.stringify({ post_name, post_body }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert('Failed to create post');
//         console.log(response)
//       }
//     }
//   };
  
//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
  
//       const response = await fetch(`/api/posts/${id}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert('Failed to delete post');
//         console.log(response)
//       }
//     }
//   };
  
//   document
//     .querySelector('.new-post-form')
//     .addEventListener('submit', newFormHandler);
  
//   document
//     .querySelector('.post-list')
//     .addEventListener('click', delButtonHandler);
  