const error = (e) => console.log(e.target.responseText);

/**
 * Get one or all careers.
 * @param {string} id - Optional. The id of the career to retrieve.
 */
function get(id) {
    let url = "http://localhost:3001/api/careers";
    if (id) {
        url = `${url}?id=${id}`;
    }

    axios.get(url)
        .then(response => {
            if (!id) {
                renderCareers(response.data)
            } else {
                edit(response.data)
            }
        })
        .catch(error => {
            console.error('Error making the request (GET):', error);
        });
}

/**
 * Sends career data to be saved or updated based on the existence of an ID.
 */
function saveCareer() {
    let id = document.getElementById('id').value;
    const careerData = {
        name: document.getElementById('name').value,
        code: document.getElementById('code').value,
        description: document.getElementById('description').value
    }

    if (!id) {
        createCareer(careerData);
    } else {
        updateCareer(id, careerData);
    }
}

/**
 * Sends career data to create a new career entry.
 * @param {object} careerData - The data of the career to be created.
*/
function createCareer(careerData) {
    axios.post('http://localhost:3001/api/careers', careerData)
        .then(response => {
            clearFormValues();
            get();
        })
        .catch(error => {
            console.error('Error making the request (POST):', error);
        });
}

/**
 * Sends career data to be deleted.
 * @param {string} id -The id of the career to delete.
 */
function deleteCareer(id) {
    if (confirm('¿Estas seguro de querer eliminar esta carrera?')) {
        axios.delete('http://localhost:3001/api/careers?id=' + id)
            .then(response => {
                get();
                clearFormValues();
            })
            .catch(error => {
                console.error('Error making the request (DELETE):', error);
            })
    }
}

/**
 * Show all the values to edit in the form
 * @param {Array} careers - An array of objects representing careers.
 */
function edit(career) {
    // Show all the values in the form
    document.getElementById('id').value = career._id;
    document.getElementById('name').value = career.name;
    document.getElementById('code').value = career.code;
    document.getElementById('description').value = career.description;
}

/**
 * Updates career data on the server.
 * @param {string} id - The ID of the career to be updated.
 * @param {object} careerData - The data of the career to be updated.
*/
function updateCareer(id, careerData) {
    axios.put('http://localhost:3001/api/careers?id=' + id, careerData)
        .then(response => {
            clearFormValues();
            get();
        })
        .catch(error => {
            console.error('Error making the request (PUT):', error);
        });
}

/**
 * Renders a HTML table of careers.
 * @param {Array} careers - An array of objects representing careers.
 */
function renderCareers(careers) {
    let template = "";
    careers.forEach(career => {
        template += `
            <tr>
                <td>${career.name}</td>
                <td>${career.code}</td>
                <td>${career.description}</td>
                <td>
                    <button class="btn btn-danger btn-sm mb-1" onclick="deleteCareer('${career._id}')">Delete</button>
                    <button class="btn btn-secondary btn-sm" onclick="get('${career._id}')">Edit</button>
                </td>
            </tr>`;
    });

    document.getElementById('careerBody').innerHTML = template;
}

/**
 * Clear the values ​​of each element of the careers form.
 */
function clearFormValues() {
    document.getElementById('id').value = "";
    document.getElementById('name').value = "";
    document.getElementById('code').value = "";
    document.getElementById('description').value = "";
}

get();