let container = document.getElementById("container");

/**
 * Builds HTML list items for the courses.
 *
 * @param {Object} careerData - Object representing a career.
 * @returns {string} - HTML list items for courses.
 */
const buildCourseListItems = (careerData) => {
  let htmlListItems = "";
  careerData.courses.forEach((course) => {
    htmlListItems += `
      <li class="list-group-item">${course.name}</li>
    `;
  });
  return htmlListItems;
};

/**
 * Builds HTML list items for the teachers.
 *
 * @param {Object} careerData - Object representing a career.
 * @returns {string} - HTML list items for teachers.
 */
const buildTeacherListItems = (careerData) => {
  let htmlListItems = "";
  careerData.courses.forEach((course) => {
    htmlListItems += `
      <li class="list-group-item">
        ${course.teacher.first_name} ${course.teacher.last_name}
      </li>
    `;
  });
  return htmlListItems;
};

/**
 * Builds and injects HTML content based on careers data.
 *
 * @param {Object} careersData -Object containing careers information.
 */
const buildHTML = (careersData) => {
  container.innerHTML = "";
  careersData.data.getAllCareers.forEach((career) => {
    let coursesListItems = buildCourseListItems(career);
    let teacherListItems = buildTeacherListItems(career);

    let html = `
      <div class="row mt-4">
        <div class="text-center mb-1">
          <h2 class="display-5">${career.name}</h2>
        </div>
        <p class="text-center lead">Courses and their assigned teachers</p>
        <div class="col-6">
          <h3 class="h5 text-center mb-2">Courses</h3>
          <ol class="list-group list-group-numbered">
            ${coursesListItems}
          </ol>
        </div>
        <div class="col-6">
          <h3 class="h5 text-center mb-2">Teachers</h3>
          <ol class="list-group list-group-numbered">
            ${teacherListItems}
          </ol>
        </div>
      </div>
    `;
    container.innerHTML += html;
  });
};

/**
 * Executes a query to fetch data related to careers, courses, and teachers from the API.
 */
const retrieveCareerRelationatedData = () => {
  const query = `
  {
    getAllCareers {
      name
      code
      description
      courses {
        name
        credits
        teacher {
          first_name
          last_name
          cedula
          age
        }
      }
    }
  }
  `;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  };

  fetch("http://localhost:3001/graphql", requestOptions)
    .then((response) => response.json())
    .then((data) => buildHTML(data))
    .catch((error) => console.error("Error:", error));
};

retrieveCareerRelationatedData();
