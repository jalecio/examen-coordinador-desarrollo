CREATE TABLE empleados (
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    genero VARCHAR(50),
    estado_civil VARCHAR(50),
    fecha_nacimiento DATE,
    dpi VARCHAR(20) UNIQUE,
    nit VARCHAR(20),
    igss VARCHAR(20),
    irtra VARCHAR(20),
    direccion TEXT,
    salario NUMERIC(10, 2)
);