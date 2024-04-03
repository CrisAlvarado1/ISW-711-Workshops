let container = document.getElementById("container");

// This is the thead for the courses tables in different careers.
const theadCourses = `
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Credits</th>
    </tr>
  </thead>
`;

// This is the thead for the teachers tables in different careers
const theadTeacher = `
  <thead>
    <tr>
      <th scope="col">Cedula</th>
      <th scope="col">Name</th>
    </tr>
  </thead>
`;

/**
 * Builds HTML table rows for courses or teachers.
 *
 * @param {Object} data - Object representing courses or teachers data.
 * @param {string} type - Type of data: 'courses' or 'teachers'.
 * @returns {string} - HTML table rows for courses or teachers.
 */
const buildTableRows = (data, type) => {
  let htmlTableRows = "";
  data.forEach((item) => {
    if (type === 'courses') {
      htmlTableRows += `
        <tr class="">
          <td class="">${item.name}</td>
          <td class="">${item.credits}</td>
        </tr>
      `;
    } else if (type === 'teachers') {
      htmlTableRows += `
        <tr class="">
          <td class="">${item.teacher.cedula}</td>
          <td class="">${item.teacher.first_name} ${item.teacher.last_name}</td>
        </tr>
      `;
    }
  });
  return htmlTableRows;
};

/**
 * Builds HTML content for courses and their assigned teachers.
 *
 * @param {Object} coursesData - Object representing courses data.
 * @param {Object} teacherData - Object representing teachers data.
 * @returns {string} HTML content.
 */
const buildHTMLContent = (coursesData, teacherData) => {
  if (coursesData && teacherData) {
    return `
      <p class="text-center lead">Courses and their assigned teachers</p>
      <div class="col-6">
        <h3 class="h5 text-center mb-2">Courses</h3>
        <table class="table table-hover">
          ${theadCourses}
          <tbody>
            ${coursesData}
          </tbody>
        </table>
      </div>
      <div class="col-6">
        <h3 class="h5 text-center mb-2">Teachers</h3>
        <table class="table table-hover">
          ${theadTeacher}
          <tbody>
            ${teacherData}
          </tbody>
        </table>
      </div>
    `;
  } else {
    return `
      <p class="text-center lead mb-5">No courses and teachers assigned</p>
    `;
  }
};

/**
 * Builds and injects HTML content based on careers data.
 *
 * @param {Object} careersData - Object containing careers information.
 */
const buildHTML = (careersData) => {
  container.innerHTML = "";
  careersData.data.getAllCareers.forEach((career) => {
    let coursesData = buildTableRows(career.courses, 'courses');
    let teacherData = buildTableRows(career.courses, 'teachers');
    let htmlContent = buildHTMLContent(coursesData, teacherData);

    let html = `
      <div class="row mt-4">
        <div class="text-center mb-1">
          <h2 class="display-5">${career.name}</h2>
        </div>
        ${htmlContent}
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
