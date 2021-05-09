const connection = require('./connection');

class DB {

    constructor(connection) {
        this.connection = connection
    }

    viewAllEmp() {
        return this.connection.query('SELECT * FROM employee;');
    }

    viewAllPositions() {
        return this.connection.query('SELECT * FROM position;');
    }

    viewAllDept() {
        return this.connection.query('SELECT * FROM department;');
    }

    addEmp(employee) {
        return this.connection.query('INSERT INTO employee SET ?', employee)
    }

    addPosition(position) {
        return this.connection.query('INSERT INTO position SET ?', position)
    }

    addDept(department) {
        return this.connection.query('INSERT INTO department SET ?', department)
    }

    updateEmp(employeeId, positionId) {
        return this.connection.query(
            "UPDATE employee SET position_id = ? WHERE id = ?;",
            [positionId, employeeId]
        );
    }
}

module.exports = new DB(connection);