document.addEventListener('DOMContentLoaded', () => {
    // Employee data
    let employees = [
        { id: 1, name: 'John Doe', salary: 5000 },
        { id: 2, name: 'Jane Smith', salary: 6000 },
        { id: 3, name: 'Mark Johnson', salary: 5500 },
    ];

    // Get the employee list element
    const employeeList = document.getElementById('employee-list');

    // Get the modal elements
    const modal = document.getElementById('modal');
    const modalClose = document.getElementsByClassName('close')[0];
    const editNameInput = document.getElementById('edit-name');
    const editSalaryInput = document.getElementById('edit-salary');
    const saveChangesButton = document.getElementById('save-changes');

    // Function to display the modal with employee details
    function displayModal(employee) {
        editNameInput.value = employee.name;
        editSalaryInput.value = employee.salary;
        modal.style.display = 'block';
        modal.dataset.employeeId = employee.id;
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
        modal.dataset.employeeId = '';
    }

    // Function to update employee details
    function updateEmployeeDetails(employeeId, newName, newSalary) {
        employees = employees.map((employee) => {
            if (employee.id === employeeId) {
                employee.name = newName;
                employee.salary = newSalary;
            }
            return employee;
        });
        renderEmployeeList();
    }

    // Function to delete an employee
    function deleteEmployee(employeeId) {
        employees = employees.filter((employee) => employee.id !== employeeId);
        renderEmployeeList();
    }

    // Function to render the employee list
    function renderEmployeeList() {
        employeeList.innerHTML = '';

        employees.forEach((employee) => {
            // Create list item element
            const listItem = document.createElement('li');

            // Create name element
            const nameElement = document.createElement('span');
            nameElement.textContent = employee.name;
            listItem.appendChild(nameElement);

            // Create salary element
            const salaryElement = document.createElement('span');
            salaryElement.textContent = `Salary: $${employee.salary}`;
            listItem.appendChild(salaryElement);

            // Create edit icon
            const editIcon = document.createElement('i');
            editIcon.textContent = 'Edit'
            editIcon.className = 'fas fa-edit';
            editIcon.addEventListener('click', () => displayModal(employee));
            listItem.appendChild(editIcon);

            // Create delete icon
            const deleteIcon = document.createElement('i');
            deleteIcon.textContent = 'Delete'
            deleteIcon.className = 'fas fa-trash';
            deleteIcon.addEventListener('click', () => deleteEmployee(employee.id));
            listItem.appendChild(deleteIcon);

            // Append the list item to the employee list
            employeeList.appendChild(listItem);
        });
    }

    // Add employee event listener
    document.getElementById('add-employee').addEventListener('click', () => {
        const nameInput = document.getElementById('name');
        const salaryInput = document.getElementById('salary');

        const name = nameInput.value;
        const salary = salaryInput.value;

        if (name && salary) {
            const employeeId = employees.length + 1;
            const newEmployee = { id: employeeId, name, salary };
            employees.push(newEmployee);
            renderEmployeeList();

            nameInput.value = '';
            salaryInput.value = '';
        }
    });

    // Save changes event listener
    saveChangesButton.addEventListener('click', () => {
        const employeeId = Number(modal.dataset.employeeId);
        const newName = editNameInput.value;
        const newSalary = editSalaryInput.value;

        updateEmployeeDetails(employeeId, newName, newSalary);
        closeModal();
    });

    // Close modal event listener
    modalClose.addEventListener('click', closeModal);

    // Render initial employee list
    renderEmployeeList();
});
