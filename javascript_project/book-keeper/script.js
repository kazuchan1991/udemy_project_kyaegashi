const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// validate form
const validate = (nameValue, urlValue) => {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert('please submit values for both fields');
        return false;
    }
    if (!urlValue.match(regex)) {
        alert('please provide a valid web address');
        return false;
    }
    // valid
    return true
}

// show modal
const showModal = () => {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

// fetch bookmarks
const fetchBookmarks = () => {
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        // create bookmarks array in local storage
        bookmarks = [
            {
                name: 'Facebook',
                url: 'https://www.facebook.com'
            }
        ];
        localStorage.setItem('bookmarks', bookmarks);
    }
}

// handle data from form
const storeBookmark = (e) => {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('http://') && (!urlValue.includes('https://'))) {
        urlValue = `https://${urlValue}`
    }
    if (!validate(nameValue, urlValue)) {
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    console.log(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    //fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// event listener
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => {modal.classList.remove('show-modal')});
window.addEventListener('click', (e) => {
    (e.target === modal ? modal.classList.remove('show-modal') : false)
});

bookmarkForm.addEventListener('submit', storeBookmark);

// on load
fetchBookmarks();