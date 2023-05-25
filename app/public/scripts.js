console.log('welcome!');

async function search() {
    let query = document.querySelector('#inputs > input').value;
    let result = await(await fetch(`http://localhost:3001/search/${query}`)).json();
    let authors = '';
    for(let i of result.authors) {
        console.log(i);
        authors += `${i.last_name}, ${i.first_name}`
    }
    let titles = ''
    for(let i of result.titles) {
        console.log(i);
        titles += `${i.title} | Remaining: ${i.stock} | Borrowed: ${i.stock - i.inventory}<HTML><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</HTML>`
    }
    console.log(authors);
    console.log(titles);
    document.getElementById('resultbox').innerHTML = `
        Authors: ${authors}
            <br>
        Titles: ${titles}
    `;
};