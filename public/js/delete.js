const deleteButtons = document.querySelectorAll('.delete-post-btn');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const postId = document.querySelector('button[name="post_id"]').value
      console.log(postId)
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          // Reload the page or update the UI to reflect the deletion
          document.location.reload();
        } else {
          const error = await response.json();
          console.error(error);
        }
      } catch (error) {
        console.log(error);
      }
    });
  });