const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loader
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loder
const complete = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// show new quotes
const newQuote = () => {
    loading();
    // pick random quote
    //const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
    console.log(quote);
    // check if author field is blank
    if (!quote.author) {
        author.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // check the quote length
    if (quote.text.lenth > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    // hide loader
    complete();
}

// get quotes from api
/*
async function getQuotes() {
    const apiUrl = 'https://quotes.rest/qod?language=en';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes['contents']['quotes'][0]['quote']);
        newQuote();
    } catch (e) {
        console.log('error');
        // catch error
    }
}*/

// using arrow function
const getQuotes = async () => {
    //const apiUrl = 'https://quotes.rest/qod?language=en ';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes);
        newQuote();
    } catch (e) {
        getQuotes(); // reload
        console.log(e);
        // catch error
    }
}

// tweet quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank');
}

// event listner
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();
//newQuote();
//loading();