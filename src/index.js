/*

2. A priority value selected from a dropdown (Links to an external site.) that 
is used to determine the color of the text in the list (e.g. red for high priority, 
yellow for medium, green for low)

3. As an additional challenge, implement a sorting functionality that displays the 
tasks in ascending or descending order based on priority
<i class="far fa-arrow-up"></i> arrow up
<i class="far fa-arrow-down"></i> arrow down

4. An additional input field (e.g. user, duration, date due)
<i class="far fa-info-square"></i> icon for info?

5. Ability to edit tasks
<i class="far fa-square"></i> icon for to be completed
<i class="far fa-check-square"></i> icon for completed
<i class="far fa-edit"></i> icon for edit

6. Something of your choice! The main objective is to add a feature that allows the 
user's input to affect the DOM*/

document.addEventListener("DOMContentLoaded", () => {

  //adds icons kit
  document.body.onLoad = addIconScript();

  function addIconScript(){
    const newScript = document.createElement('script');
    newScript.crossOrigin ="anonymous";
    newScript.src = "https://kit.fontawesome.com/8cb2420af7.js";
    document.head.appendChild(newScript);
  }

  //selects the form and adds a listener to the submit button
  document.querySelector("#create-task-form").addEventListener('submit', formSubmitHandler);

  //prevents default submit, stores input value (or prompts for input,) then calls function addTask
  function formSubmitHandler(evt) {
      evt.preventDefault();
      let input = document.querySelector('#new-task-description');
      if (input.value != ''){
        addTask(input.value);
        input.value = '';
      }else{
        alert("Please enter a task!")
      }
    };

  /*creates a list element, interpolates the passed in argument of input.value from 
  formSubmitHandler and interpolates to the li and finally appends to parent ul element.*/
  
  /*There is a bug in WebKit regarding images and icons ignoring click events when theyre directly clicked that can 
  be fixed by setting the styling to pointer-events:none. See the span elements on the buttons.*/
  function addTask(task){
    let ul = document.querySelector('#tasks');
    let li = document.createElement('li');
    li.innerHTML = `
      <span class = 'task'>${task}</span>
      <button name = 'delete' style = "height:30px;width:30px;font-size:12px"  type = 'button'><span class="far fa-trash-alt fa-lg" style="pointer-events:none" ></span></button>
      <button name = 'check-off' style = "height:30px;width:30px;font-size:12px" type = 'button'><span class="far fa-square fa-lg" style="pointer-events:none"></span></button>
    `;
    li.classList.add('task-item');
    ul.appendChild(li);
  }

  //task management
  //added event listener for buttons in ul element
  document.querySelector('ul').addEventListener('click', handleTaskClick);

  //passes click event to the correct function based on button.name
  function handleTaskClick(e){
    if(e.target.name === 'delete'){
      deleteTask(e);
    }else if(e.target.name === 'check-off'){
      checkTask(e);
    }
  }

  //you'll never believe that this function deletes the task
  function deleteTask(e){
    let task = e.target.parentNode;
    task.remove();
  }

  //this function crosses off (or uncrosses) tasks and checks (or unchecks) the checkbox button next to them when completed
  function checkTask(e){
    let task = e.target.parentNode
    let checkIcon = e.target.querySelector('span');
    if (checkIcon.className.includes("fa-square")){
      checkIcon.classList.remove("fa-square");
      checkIcon.classList.add("fa-check-square");
      task.style.textDecoration = 'line-through';
    }else if (checkIcon.className.includes("fa-check-square")){
      checkIcon.classList.remove("fa-check-square");
      checkIcon.classList.add("fa-square");
      task.style.textDecoration = 'none';
    };
  };


});
