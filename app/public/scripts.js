console.log('welcome!');

async function search() {
    let query = document.querySelector('#inputs > input').value;
    let result = await(await fetch(`http://localhost:3001/search/${query}`)).json();
    let authors = '';
    for(let i of result.authors) {
        authors += `${i.last_name}, ${i.first_name}`
    }
    let titles = ''
    for(let i of result.titles) {
        titles += `${i.title} | Remaining: ${i.stock} | Borrowed: ${i.stock - i.inventory}<HTML><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</HTML>`
    }
    document.getElementById('resultbox').innerHTML = `
        Authors: ${authors}
            <br>
        Titles: ${titles}
    `;
};

function register() {
    /* const addBookBtn = document.querySelector('#addBookBtn'); */
    const author = document.querySelector('#author');
    const title = document.querySelector('#title');
    const genre = document.querySelector('#genre');
    const year = document.querySelector('#year');
    const amount = document.querySelector('#amount');


      
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          author: author.value,
          title: title.value,
          genre: genre.value,
          year: year.value,
          inventory: amount.value,
        })
      };
      fetch('http://localhost:3001/register', options)
      .then(response => console.log(response))
      .catch(err => {
        console.error(err)
      })
};

async function remove() {
    console.log('called');
    const title = document.querySelector('#book_title');
    const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title.value })
      };
    await fetch('http://localhost:3001/delete', options)
        .catch(err => { console.error(err) })
};