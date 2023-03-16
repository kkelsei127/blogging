const posts = Array.from(document.querySelectorAll('.post'))
        .map(input => input.value.trim())
        .join(',');