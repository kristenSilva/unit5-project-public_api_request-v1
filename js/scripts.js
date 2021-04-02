const gallery = document.getElementById('gallery');
const userURL = 'https://randomuser.me/api/?results=12&nat=us';

/**
 * FETCH FUNCTIONS
 */
// Created in Trehouse course ****REMEMBER TO ADD LINK********
// function fetchData(url){
//     return fetch(url)
//             .then(checkStatus)
//             .then(res => res.json())
//             .catch(error => console.log('Looks like there was a problem', error));
// }
generateModal();
fetch(userURL)
    .then(response => response.json())
    .then(data => generateGallery(data.results))
    .then(results => addClick(results));

/**
 * getEmployees
 */
// async function getEmployees(url){
//     const employees = await getJSON(url);
//     return Promise.all(employees);
// }

/**
 * generateGallery
    * @param {array} results array of response objects 
    * @return {array} same array result is returned
    * Creates the 12 `div` elements with employee information
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
    return results;
}

/**
 * generateModal
    * Creates the 'static' HTML elements of the modal window
    * Modal window hidden by default
    * Event listener on modal button to hide modal window on 'click'
 */
function generateModal(){
    let divModal = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container"></div>
            </div>
        </div>
    `;
    gallery.insertAdjacentHTML('afterend', divModal);
    const modalWindow = document.querySelector('.modal-container');
    modalWindow.style.display = 'none';

    const modalButton = document.getElementById('modal-close-btn');
    modalButton.addEventListener('click', () => modalWindow.style.display = 'none');
}

/**
 * updateModal
 * @param {object} employee - single employee object from original array of response objects
 */
function updateModal(employee) {
    let modalInfo = document.querySelector('.modal-info-container');
    modalInfo.innerHTML = `
        <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="modal-text">${employee.email}</p>
        <p class="modal-text cap">${employee.location.city}</p>
        <hr>
        <p class="modal-text">${formatTelephone(employee.phone)}</p>
        <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, 
            ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
        <p class="modal-text">Birthday: ${formatDate(employee.dob.date)}</p>
    `;
}

/**
 * addClick
    * @param {array} results array of response objects 
    * Attaches an event listener to each `div` element containing employee
    * Event listener fills modal container with respective employee information & displays modal
 */
function addClick(results){
    const cards = document.querySelectorAll('.card');
    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', () => {
            const modal = document.querySelector('.modal-container');
            modal.style.display = 'inherit';
            updateModal(results[i]);
        });
    }
}

/**
 * 
 * FORMATTING FUNCTIONS
 * 
 */
 function formatTelephone(text){
    const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
    return text.replace(regex, '($1) $2-$3');
  }

function formatDate(text){
    const date = new Date(text);
    let month = date.getMonth()+1;
    let day = date.getDate();
    const year = date.getFullYear();
    if(day < 10){
        day = '0' + day;
    }
    if(month < 10){
        month = '0' + month;
    }
    return `${month}/${day}/${year}`;
}