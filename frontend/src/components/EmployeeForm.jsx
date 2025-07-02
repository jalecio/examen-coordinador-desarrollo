import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import employeeService from '../services/employeeService';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialEmployeeState = {
    nombres: '', apellidos: '', genero: '', estado_civil: '', fecha_nacimiento: '',
    dpi: '', nit: '', igss: '', irtra: '', direccion: '', salario: 0,
  };

  const [employee, setEmployee] = useState(initialEmployeeState);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      employeeService.getById(id)
        .then(response => {
          const empData = response.data;
          // Formatear la fecha para el input
          if (empData.fecha_nacimiento) {
            empData.fecha_nacimiento = new Date(empData.fecha_nacimiento).toISOString().split('T')[0];
          }
          setEmployee(empData);
        })
        .catch(e => console.error(e));
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const saveEmployee = (event) => {
    event.preventDefault();
    const operation = editMode
      ? employeeService.update(id, employee)
      : employeeService.create(employee);
    
    operation
      .then(() => {
        navigate('/employees');
      })
      .catch(e => console.error(e));
  };

  return (
    <div>
      <h2>{editMode ? 'Editar Empleado' : 'Nuevo Empleado'}</h2>
      <form onSubmit={saveEmployee}>
        <h4>Datos Personales</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nombres" className="form-label">Nombres</label>
            <input type="text" className="form-control" id="nombres" required name="nombres" value={employee.nombres} onChange={handleInputChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="apellidos" className="form-label">Apellidos</label>
            <input type="text" className="form-control" id="apellidos" required name="apellidos" value={employee.apellidos} onChange={handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="genero" className="form-label">Género</label>
            <input type="text" className="form-control" id="genero" name="genero" value={employee.genero} onChange={handleInputChange} />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="estado_civil" className="form-label">Estado Civil</label>
            <input type="text" className="form-control" id="estado_civil" name="estado_civil" value={employee.estado_civil} onChange={handleInputChange} />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="fecha_nacimiento" className="form-label">Fecha de Nacimiento</label>
            <input type="date" className="form-control" id="fecha_nacimiento" name="fecha_nacimiento" value={employee.fecha_nacimiento} onChange={handleInputChange} />
          </div>
        </div>
        
        <hr />
        <h4>Información de Identificación</h4>
        <div className="row">
            {/* Campos de DPI, NIT, IGSS, IRTRA... */}
            <div className="col-md-3 mb-3">
                <label htmlFor="dpi" className="form-label">DPI</label>
                <input type="text" className="form-control" id="dpi" name="dpi" value={employee.dpi} onChange={handleInputChange}/>
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="nit" className="form-label">NIT</label>
                <input type="text" className="form-control" id="nit" name="nit" value={employee.nit} onChange={handleInputChange}/>
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="igss" className="form-label">Afiliación IGSS</label>
                <input type="text" className="form-control" id="igss" name="igss" value={employee.igss} onChange={handleInputChange}/>
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="irtra" className="form-label">Afiliación IRTRA</label>
                <input type="text" className="form-control" id="irtra" name="irtra" value={employee.irtra} onChange={handleInputChange}/>
            </div>
        </div>
        <div className="mb-3">
            <label htmlFor="direccion" className="form-label">Dirección</label>
            <textarea className="form-control" id="direccion" rows="2" name="direccion" value={employee.direccion} onChange={handleInputChange}></textarea>
        </div>

        <hr />
        <h4>Información Salarial</h4>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="salario" className="form-label">Salario (Q)</label>
            <input type="number" step="0.01" className="form-control" id="salario" name="salario" value={employee.salario} onChange={handleInputChange} />
          </div>
        </div>
        
        <button type="submit" className="btn btn-success">Guardar</button>
        <Link to="/employees" className="btn btn-secondary ms-2">Cancelar</Link>
      </form>
    </div>
  );
};

export default EmployeeForm;