import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import employeeService from '../services/employeeService';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    employeeService.getAll()
      .then(response => {
        setEmployees(response.data);
      })
      .catch(e => console.error(e));
  };

  const deleteEmployee = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar a este empleado?')) {
      employeeService.remove(id)
        .then(() => {
          loadEmployees(); // Recargar la lista después de eliminar
        })
        .catch(e => console.error(e));
    }
  };

  return (
    <div>
      <h1>Listado de Empleados</h1>
      <Link to="/employees/new" className="btn btn-primary mb-3">
        Nuevo Empleado
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>DPI</th>
            <th>Salario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.nombres} {emp.apellidos}</td>
              <td>{emp.dpi}</td>
              <td>Q{Number(emp.salario).toFixed(2)}</td>
              <td>
                <Link to={`/employees/edit/${emp.id}`} className="btn btn-sm btn-info">Editar</Link>
                <button onClick={() => deleteEmployee(emp.id)} className="btn btn-sm btn-danger ms-2">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;