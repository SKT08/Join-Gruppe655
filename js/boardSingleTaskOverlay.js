
// ~~~~~~~~Task overlay~~~~~~~~~
/**
 * This function renders the task overlay
 * 
 * @param {number} taskNumber - task number of aktive task
 */
function renderOverlayTask(taskNumber) {

    document.getElementById('idTaskOverlay').innerHTML = singleTaskOvHtmlTemp(taskNumber);
    addDataSingleTaskOverlay(taskNumber);

}
/**
 * This function returns the HTML Code for the task overlay
 * 
 * @param {number} taskNr - number of clicked task
 * @returns - returns the HTML Code for the task overlay
 */
function singleTaskOvHtmlTemp(taskNr) {
    return /*html*/ `    
    <section id="idBackgroundTaskOverlay" class="backgroundTaskOverlay" onclick="closeSingleTaskOverlay()">
        <div id="idBgOuterContainerTaskOverlay" class="bgOuterContainerTaskOverlay" onclick="innerClick(event)">
            <div id="idBgInnerContainerTaskOverlay" class="bgInnerContainerTaskOverlay taskOvText">
                <div id="idTopAreaOv" class="topAreaOv d-flex justify-content-between">
                    <div id="idTaskTypeOv" class="singlTaskType"> </div>
                    <div id="idTaskCloseOv" role="button" onclick="closeSingleTaskOverlay()">
                        <img src="../assets/img/taskOverlayClose.svg" alt="">
                    </div>
                </div>
                <div id="idTaskHeadlineOv" class="taskHeadlineOv"></div>
                <div id="idTaskDescriptionOv" class="taskDescriptionOv"></div>
                <div id="idDueDateContainerOv" class="dueDateAndUrgencyContainerOv">
                    <span class="taskOvSectionHeadline">Due date:</span>
                    <span id="idDueDateOv"></span>
                </div>
                <div id="idUrgencyContainerOv" class="dueDateAndUrgencyContainerOv">
                    <span class="taskOvSectionHeadline">Priority:</span>
                    <div id="idUrgencySubContainerOv" class="urgencySubContainerOv">
                        <span id="idUrgencyOv"></span>
                        <img id="idSingleTaskPrioImgOv" src="" alt="">
                    </div>
                </div>
                <div id="idAssingedToContainer">
                    <span id="idAssingedTo" class="taskOvSectionHeadline">Assinged To:</span>
                    <div id="idSingleTaskMemberContainerOV" class="singleTaskMemberContainerOV">
                        <!-- extra function taskOverlayMember(activeTask) for adding Members-->
                    </div>
                </div>
                <div id="idSubTaskContainerOv">
                    <span id="idSubTaskOv" class="taskOvSectionHeadline">Subtasks:</span>
                    <div id="idSubTaskSubContainerOv" class="singleTaskSubTaskContainerOV">
                        <!-- extra function taskOverlaySubTasks(activeTask) for adding subtasks-->
                    </div>
                </div>
                <div id="idBottomAreaOv" class="d-flex justify-content-end">
                    <div id="idBottomAreaContainerOv" class="d-flex align-item-center">
                        <div id="idDeleteContainerOv" class="bottomAreaSubContainer" role="button" onclick="deleteTask(${taskNr})">
                            <img src="../assets/img/taskOverlayTrash.svg" alt="waste">
                            <span>Delete</span>
                        </div>
                        <div id="idBottomAreaContainerSeparatorOv" class="bottomAreaContainerSeparatorOv"></div> 
                        <div id="idEditContainer"  class="bottomAreaSubContainer">
                            <img src="../assets/img/taskOverlayEdit.svg" alt="edit">
                            <span>Edit</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`
}

/**
 * this function removes all html in container idTaskOverlay
 */
function closeSingleTaskOverlay() {
    document.getElementById('idTaskOverlay').innerHTML = '';
}

/**
 * this function calls different function for adding values from task JSON to html
 * 
 * @param {number} taskNumber - number of clicked task
 */
function addDataSingleTaskOverlay(taskNr) {
    let activeTask = taskJson[taskNr];
    addTaskTitle(activeTask.headline, 'Ov');
    colorTaskType(activeTask.taskType, 'Ov');
    document.getElementById('idTaskDescriptionOv').innerText = activeTask.description;
    taskOverlayDate(activeTask);
    taskOverlayPrio(activeTask);
    taskOverlayMember(activeTask);
    taskOverlaySubTasks(activeTask);

}

/**
 * This function get the due date and give to idTaskDescriptionOv the formated date
 * 
 * @param {object} activeTask - single task
 */
function taskOverlayDate(activeTask) {
    let taskDate = new Date(activeTask.dueDate);
    let taskMonth = taskDate.getMonth().toString();
    let taskDay = taskDate.getDate().toString();
    let taskYear = taskDate.getFullYear().toString();
    taskDay = (taskDay.length == 2) ? taskDay : ('0' + taskDay);
    taskMonth = (taskMonth.length == 2) ? taskMonth : ('0' + taskMonth);
    document.getElementById('idDueDateOv').innerText = taskDay + '/' + taskMonth + '/' + taskYear;
}

/**
 * This function add to the html the urgency and the related image
 * 
 * @param {object} activeTask - single task
 */
function taskOverlayPrio(activeTask) {
    document.getElementById('idUrgencyOv').innerText = activeTask.urgency;
    taskUrgency(activeTask.urgency, 'Ov');
}

/**
 * this function gets the member information from contactJson based on the member tracked for this single task
 * 
 * @param {object} activeTask - clicked task
 */
function taskOverlayMember(activeTask) {
    const MEMBER = activeTask.member;
    document.getElementById('idSingleTaskMemberContainerOV').innerHTML = taskOverlayMemberContainer(MEMBER);
}

/**
 * this function returns the complete HTML code for all members of this task
 * 
 * @param {object} MEMBER - all members of task
 * @returns - HTML Code for all member of task
 */
function taskOverlayMemberContainer(MEMBER) {
    let memberHTML = '';
    for (let i = 0; i < MEMBER.length; i++) {
        const contactMember = contactJSON.find(contact => contact.name === MEMBER[i]);
        if (contactMember) {
            const memberColor = contactMember.bgColor.slice(1);
            memberHTML += taskOverlayMemberHTML(MEMBER[i], memberColor, contactMember.initials, i);  
        }
    }
    return memberHTML
}

/**
 * this function returns the HTML code for a single member of this task
 * 
 * @param {string} memberName - name of member
 * @param {string} memberColor - background color for disk of member
 * @param {string} memberinitials - intitials of member
 * @param {number} i - count of loop
 * @returns - HTML for single member of this task
 */
function taskOverlayMemberHTML(memberName, memberColor, memberinitials, i) {
    return /*html*/ `
    <div id="idSingleTaskMemberSubContainerOV${i}" class="singleTaskMemberSubContainerOV">
        <div id="idSingleTaskMemberInitialsOv${i}" class="memberDiskOv memberBgColor${memberColor}">${memberinitials}</div>
        <span id="idSingleTaskMemberFullNameOv${i}">${memberName}</span>
    </div>`
}

/**
 * this function gets the sub task information from contactJson based on the sub tasks tracked for this single task
 * 
 * @param {object} activeTask - selected task
 */
function taskOverlaySubTasks(activeTask) {
    const TASKS = activeTask.subTaskText;
    document.getElementById('idSubTaskSubContainerOv').innerHTML = taskOverlaySubTaskContainer(TASKS);
}

/**
 * this function returns the complete HTML code for all subtasks of this task
 * 
 * @param {object} TASKS  - all subtasks of task
 * @returns - HTML Code for all subtasks of task
 */
function taskOverlaySubTaskContainer(TASKS){
    let tasksHTML = '';
    for (let i = 0; i < TASKS.length; i++) {
        let taskChecked = TASKS[i].checked ? "checked" : '';
        tasksHTML += taskOverlaySubTaskHTML(TASKS[i].label, taskChecked, i); 
    }
    return tasksHTML
}

/**
 * this function returns the HTML code for a single subtask of this task
 * 
 * @param {string} taskLabel - text of subtask
 * @param {string} taskChecked - checked if checked is true. If false string is empty
 * @param {number} i - count of loop 
 * @returns 
 */
function taskOverlaySubTaskHTML(taskLabel, taskChecked, i) {
    return /*html*/ `
    <div id="idSingleSubTaskContainerOv${i}"  class="singleTaskSubTaskSubContainerOV">
        <input id="idSingleSubTaskChkboxOv${i}" type="checkbox" class="check_box" ${taskChecked}>
        <label id="idSingleSubTaskLabelOv${i}" for="idSingleSubTaskChkboxOv${i}">${taskLabel}</label>
    </div>`
}

/**
 * this function calls the pop up for delete task
 * 
 * @param {number} taskNr 
 */
function deleteTask(taskNr) {
    document.getElementById('idTaskOverlay').innerHTML += popUp(taskNr);
}

/**
 * This function returns the HTNL code for the delete PopUp
 * 
 * @param {number} taskNr 
 * @returns - html code for the delete PopUp
 */
function popUp(taskNr) {
    return /*html*/ `
    <div id="idDeletePopUpBackground" class="deletePopUpBg">
        <div id="idDeletePopUpContainer" class="deletePopUpContainer text-center">
            <h5>You will delete this task?</h5>
               <p> Please confirm.</p>
            <div id="idDeletePopUpButtonSection" class="d-flex justify-content-between align-item-center p-4 w-100" >
                <div id="idDeletePopUpButtonCancel" class="deletePopUpButton" onclick="deleteTaskCancel(${taskNr})" role="button">Cancel</div>
                <div id="idDeletePopUpButtonConfirm" class="deletePopUpButton" onclick="deleteTaskConfirm(${taskNr})" role="button">Confirm</div>
            </div>
        </div>
    </div>`
}

/**
 * This function get the task JSON from Backend, removes the selected task and the overlay task card and send the task JSON back to Backend
 * 
 * @param {number} taskNr 
 */
async function deleteTaskConfirm(taskNr) {
    taskJson = await loadJSON(KEY_for_JSON_TASKS);
    taskJson.splice(taskNr, 1);
    setItem(KEY_for_JSON_TASKS, taskJson)
    document.getElementById('idTaskOverlay').innerHTML = '';
    renderTasks();
}

/**
 * This function removes the delete popup
 * 
 * @param {number} taskNr 
 */
function deleteTaskCancel(taskNr) {
    renderOverlayTask(taskNr); 
}