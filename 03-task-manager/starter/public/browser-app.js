//getting form and task elements
const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')

// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible';
  try {
    //get tasks from the server/database,axios.get() gets data from the base route,which is
    //app.use('/api/v1/tasks', tasks) defined in the server file app.js 
    const { data: { tasks },} = await axios.get('/api/v1/tasks');

    //Check if there is no data.If no data display that there are no tasks to show
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      loadingDOM.style.visibility = 'hidden';
      return;
    }

    //If there is data(tasks available),loop through each task and display it
    const allTasks = tasks.map((task) => {
        //get all details from each single task,& display these db values by inserting them
        //in html elements,then displaying them,like mixing php and html,here its JS and html
        const { completed, _id: taskID, name } = task;
        return `<div class="single-task ${completed && 'task-completed'}">
                <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
                <div class="task-links">

                <!-- edit link -->
                <a href="task.html?id=${taskID}"  class="edit-link">
                <i class="fas fa-edit"></i>
                </a>
                <!-- delete btn -->
                <button type="button" class="delete-btn" data-id="${taskID}">
                <i class="fas fa-trash"></i>
                </button>
                </div>
                </div>`
      }).join('');
    tasksDOM.innerHTML = allTasks;
  } 
  catch (error) {
    tasksDOM.innerHTML ='<h5 class="empty-list">There was an error, please try later....</h5>';
  }

  loadingDOM.style.visibility = 'hidden';
}

showTasks();

// delete task /api/tasks/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target;
  //the delete icon(fas fa-trash) is clicked,which is a child element of the delete button,
  //making the delete button the parent element having a class called delete-btn
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible';
    const id = el.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = 'hidden';
});

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  //get the value entered by the user on the front end
  const name = taskInputDOM.value

  try {
    //{name} as second argument is send to the server via the body.req method,then used to 
    //create a new task in the database
    await axios.post('/api/v1/tasks', { name });
    showTasks();
    taskInputDOM.value = '';
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = `success, task added`;
    formAlertDOM.classList.add('text-success');
  }
  catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }

  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);

})
