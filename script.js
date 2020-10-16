//Get Quote from API

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show Loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;    
}

//Hide Loader
function complete() {
    
        quoteContainer.hidden = false;
        loader.hidden = true;
    
}

async function getQuote() {
    loading();
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        if (data.quoteAuthor === '') {
            authorText.innerText = 'unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

       if (data.quoteText.length > 50) {
           quoteText.classList.add('long-quote');
       }
       else{
           quoteText.classList.remove('long-quote')
       }
        quoteText.innerText = data.quoteText;
        
        complete();
        throw new Error('oops');
    }
    
    catch (error) {
        getQuote()
        console.log('whoops, no quote', error)
    }
}


function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', geQuote)
twitterBtn.addEventListener('click', tweetQuote);


getQuote();
