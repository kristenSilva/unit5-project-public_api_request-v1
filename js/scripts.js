const gallery = document.getElementById('gallery');
const userURL = 'https://randomuser.me/api/?results=12';

/**
 * FETCH FUNCTIONS
 */
fetch(userURL)
.then(response => response.json())
.then(data => generateGallery(data.results))
//.then(data => console.log(data.results[0]));

/**
 * generateGallery
 * @param {results} object - response object returned from `fetch()` method
 */
function generateGallery(results){
    let divCard =``;
    for(let i = 0; i < results.length; i++){
        divCard += `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${results[i].picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${results[i].name.first} ${results[i].name.last}</h3>
                <p class="card-text">${results[i].email}</p>
                <p class="card-text cap">${results[i].location.city}, ${results[i].location.state}</p>
            </div>
        </div>
    `;
    }  
    gallery.insertAdjacentHTML('beforeend', divCard);
}

/**
 * generateModal
 */
function generateModal(results){

}