const { prompt } = require('inquirer');
const db = require('./db')
require('console.table');


const start = async () => {
    const { question } = await prompt({
        name: 'question',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all employees', 'View all positions', 'View all departments', 'Add employee', 'Add position', 'Add department', 'Update employee role', 'Exit'],
    })
    switch (question) {
        case 'View all employees':
            viewAllEmp();
            break;
        case 'View all positions':
            viewAllPositions();
            break;
        case 'View all departments':
            viewAllDept();
            break;
        case 'Add employee':
            addEmp();
            break;
        case 'Add position':
            addPosition();
            break;
        case 'Add department':
            addDept();
            break;
        case 'Update employee role':
            updateEmp();
            break;
        default:
            return quit();
    };
};

const viewAllEmp = async () => {
    try {
        const employees = await db.viewAllEmp();
        console.log('\n');
        console.table(employees);
        start();
    }
    catch (err) { console.log(err) }
};

const viewAllPositions = async () => {
    try {
        const position = await db.viewAllPositions();
        console.log('\n');
        console.table(position);
        start();
    }
    catch (err) { console.log(err) }
};

const viewAllDept = async () => {
    try {
        const departments = await db.viewAllDept();
        console.log('\n');
        console.table(departments);
        start();
    }
    catch (err) { console.log(err) }
};

const addEmp = async () => {
    const position = await db.viewAllPositions();
    const employees = await db.viewAllEmp();

    const employee = await prompt([
        {
            name: 'first_name',
            message: "What is the new employee's first name?",
        },
        {
            name: 'last_name',
            message: "What is the new employee's last name?",
        },
    ]);

    const positionChoices = position.map(({ id, title }) => ({
        name: title,
        value: id,
    }));

    const { positionId } = await prompt({
        type: "list",
        name: "position_id",
        message: "What is the new employee's position?",
        choices: positionChoices,
    });

    employee.position_id = positionId

    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));

    managerChoices.unshift({ name: 'None', value: null })

    const { managerId } = await prompt({
        type: "list",
        name: "manager_id",
        message: "Who is the new employee's manager?",
        choices: managerChoices,
    });

    employee.manager_id = managerId;

    await db.addEmp(employee);
    console.log(`added ${employee.first_name} ${employee.last_name} as new employee`);

    start();
};

const addPosition = async () => {
    const position = await prompt([
        {
            name: 'title',
            message: "What is the title of the new position?",
        },
        {
            name: 'salary',
            message: "What is the salary of the new position?",
        },
    ]);

    await db.addPosition(position);
    console.log(`added ${position.name} as new position`);

    start();
}

const addDept = async () => {
    const department = await prompt({
        name: 'name',
        message: "What is the name of the new department?",
    });

    await db.addDept(department);
    console.log(`added ${department.name} as new department`);

    start();
}

const updateEmp = async () => {
    const employees = await db.viewAllEmp();
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await prompt({
        name: 'employeeId',
        type: 'list',
        message: 'Which employee will be udated?',
        choices: employeeChoices
    });

    const position = await db.viewAllPositions()

    const roleChoices = position.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { positionId } = await prompt({
        name: 'positionId',
        type: 'list',
        message: 'What role will this employee have?',
        choices: roleChoices
    });
    await db.updateEmp(employeeId, positionId);
    console.log('Updated employees role.')
    start()

}

const quit = () => {
    console.log('Ok BYE!')
    process.exit();
}

start();