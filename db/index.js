const connection = require('./connection');

class DB {

    constructor(connection){
        this.connection = connection
    }

    viewAllEmp(){
        return this.connection.query('SELECT * FROM employee;');
    }
    
    addDept(department) {
        return this.connection.query('INSERT INTO department SET ?', department)
    }
}

module.exports = new DB(connection);