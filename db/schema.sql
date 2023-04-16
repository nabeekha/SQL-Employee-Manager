DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;

USE cms_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    constraint fk_department FOREIGN KEY (department_id) references department(id) on delete cascade 
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    constraint fk_role FOREIGN KEY (role_id) references role(id) on delete cascade,
    manager_id INT,
    constraint fk_manager FOREIGN KEY (manager_id) references employee(id) on delete set null
);