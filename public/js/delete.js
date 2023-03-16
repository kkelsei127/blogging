const deleteButtons = document.querySelectorAll('.delete-post-btn');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const postId = button.dataset.post.id;

      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          // Reload the page or update the UI to reflect the deletion
          location.reload();
        } else {
          const error = await response.json();
          console.error(error);
        }
      } catch (error) {
        console.log(error);
      }
    });
  });