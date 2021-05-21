/*

3. As an additional challenge, implement a sorting functionality that displays the 
tasks in ascending or descending order based on priority
    1. create two button elements that sit next to or under div#list.h2
      a. button elements should match styling of other button elements
    2. add a click event for the button elements that sorts priority levels of tasks

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
  formSubmitHandler and interpolates to the li and appends to parent ul element.
  inserts dropdown menu to submit with colored flags for priority levels and styles that select element.*/
  
  /*FYI There is a bug in WebKit regarding images and icons ignoring click events when theyre directly clicked that can 
  be fixed by setting the styling to pointer-events:none. See the span elements on the buttons.*/
  function addTask(task){
    let ul = document.querySelector('#tasks');
    let li = document.createElement('li');
    li.innerHTML = `
      <span class = 'task'>${task}</span>
      <select id = 'priority' class = 'priority-selector'>
        <option value='null'>Priority</option>
        <option value='green' style='color:green;'>⚑</option>
        <option value='yellow' style='color:gold;'>⚑⚑</option>
        <option value='red' style='color:red;'>⚑⚑⚑</option>
      </select>
      <button name = 'delete' style = "height:30px;width:30px;font-size:12px"  type = 'button'>
        <span class="far fa-trash-alt fa-lg" style="pointer-events:none" ></span>
      </button>
      <button name = 'check-off' style = "height:30px;width:30px;font-size:12px" type = 'button'>
        <span class="far fa-square fa-lg" style="pointer-events:none"></span>
      </button>
    `;
    li.classList.add('task-item');
    ul.appendChild(li);

    //this adds styling to the select element
    let prior = document.querySelector('.priority-selector')
    let dropdownStyle = document.createElement('style');
    dropdownStyle.innerHTML = `
      #priority {
      -webkit-appearance: button;
      -moz-appearance: button;
      -webkit-user-select: none;
      -moz-user-select: none;
      -webkit-padding-end: 0px;
      -moz-padding-end: 0px;
      -webkit-padding-start: 0px;
      -moz-padding-start: 0px;
      background-color: #FFFF;
      border: 1px solid #000;
      border-radius: 2px;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
      font-size: inherit;
      margin: 0;
      overflow: hidden;
      padding-top: 4px;
      padding-bottom: 5px;
      width: auto;
     }
     `;
    prior.appendChild(dropdownStyle);
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
    }else if(e.target.className === 'priority-selector'){
      setPriority(e);
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

  //this function styles the text of the task based on the selected priority level
  function setPriority(e){
    let task = e.target.parentNode
    let priorityLevel = e.target.value
    if (priorityLevel === 'green'){
      task.style.color = 'green';
    }else if(priorityLevel === 'yellow'){
      task.style.color = 'orange';
    }else if(priorityLevel = 'red'){
      task.style.color = 'red'
    }else{
      task.style.color = 'black';
    }
  }


});
