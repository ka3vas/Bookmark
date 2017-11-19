// Listen for form submit
document.querySelector('#myForm').addEventListener('submit', saveBookmark);

function fetchBookmarks() {
  // Get item from localStorage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Get output id
  const bookmarksResults = document.querySelector('#bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for (let i = 0; i < bookmarks.length; i++) {
    const name = bookmarks[i].name;
    const url = bookmarks[i].url;

    bookmarksResults.innerHTML += `
    <div class="card card-block bg-faded">
      <h3>${name}
        <a class="btn btn-primary float-right" target="_blank" href="${url}">Visit</a>
        <a onclick="deleteBookmark('${url}')" class="btn btn-danger float-right" href="#">Delete</a>
      </h3>
    </div>
    `;
  }
}

function deleteBookmark(url) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {

      bookmarks.splice(i, 1); // Remove the URL
    }
  }

  // Re-set back to lockalStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form!');
    
    return false;
  }

  const exprss = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(exprss);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL!');
    
    return false;
  }

  return true;
}

// Save Bookmark
function saveBookmark(e) {
  const siteName = document.querySelector('#siteName').value;
  const siteUrl = document.querySelector('#siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl,
  };

  /*
    // Local Storage test
    localStorage.setItem('test', 'Hello Storage World!');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // Test if bookmarks is null
  if (localStorage.getItem('bookmarks') === null) {
    const bookmarks = [];

    bookmarks.push(bookmark);
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get item from localStorage
    const bookmarks2 = JSON.parse(localStorage.getItem('bookmarks')); 

    bookmarks2.push(bookmark);
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks2));
  }

  document.querySelector('#myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}






