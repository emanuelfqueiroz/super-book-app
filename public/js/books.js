function loadRecentBooks() {
    console.log('Loading recent books...');
    fetch('/book/_partials/recent')
        .then(response => response.text())
        .then(html => {
            document.getElementById('recent-books-container').innerHTML = html;
        })
        .catch(error => {
            
            fetch('/notfound.html')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('recent-books-container').innerHTML = html;
                })
                .catch(err => {
                    console.error('Error loading notfound.html:', err);
                    document.getElementById('recent-books-container').innerHTML = 'Error loading content';
                });
        });
}

loadBookAnalysis = (bookId) => {
    console.log('Loading sentiment analysis for book:', bookId);
    fetch(`/book/_partials/analysis/${bookId}`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('book-analysis').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading sentiment analysis:', error);
            document.getElementById('book-analysis').innerHTML = 'Error loading content';
        });
}


// Load on page ready
document.addEventListener('DOMContentLoaded', loadRecentBooks);