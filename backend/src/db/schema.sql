-- ===============================
-- Tablas de apoyo / catálogos
-- ===============================

CREATE TABLE IF NOT EXISTS RutinaEstado (
    ID SERIAL PRIMARY KEY,
    descripcion VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS PasoEstado (
    ID SERIAL PRIMARY KEY,
    descripcion VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS RecordatorioFrecuencia (
    ID SERIAL PRIMARY KEY,
    descripcion VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS UsuarioRol (
    ID SERIAL PRIMARY KEY,
    descripcion VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS UsuarioNivel (
    ID SERIAL PRIMARY KEY,
    descripcion VARCHAR(45) NOT NULL
);

-- ===============================
-- Tablas principales
-- ===============================

CREATE TABLE IF NOT EXISTS Usuario (
    ID SERIAL PRIMARY KEY,
    rolID INT REFERENCES UsuarioRol(ID)
);

CREATE TABLE IF NOT EXISTS Infante (
    infanteID INT PRIMARY KEY REFERENCES Usuario(ID),
    nivelID INT REFERENCES UsuarioNivel(ID)
);

CREATE TABLE IF NOT EXISTS Adulto (
    adultoID INT PRIMARY KEY REFERENCES Usuario(ID),
    pin INT
);

CREATE TABLE IF NOT EXISTS Rutina (
    ID SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    estadoID INT REFERENCES RutinaEstado(ID),
    fechaCreacion DATE,
    imagen TEXT,
    usuarioID INT REFERENCES Usuario(ID)
);

CREATE TABLE IF NOT EXISTS Paso (
    ID SERIAL PRIMARY KEY,
    orden INT,
    descripcion VARCHAR(70),
    estadoID INT REFERENCES PasoEstado(ID),
    imagen TEXT,
    audio TEXT,
    rutinaID INT REFERENCES Rutina(ID)
);

CREATE TABLE IF NOT EXISTS Motivacion (
    ID SERIAL PRIMARY KEY,
    icono TEXT,
    descripcion VARCHAR(200),
    fechaObtencion TIMESTAMP,
    rutinaID INT REFERENCES Rutina(ID)
);

CREATE TABLE IF NOT EXISTS Cancelacion (
    ID SERIAL PRIMARY KEY,
    fechaHora TIMESTAMP,
    rutinaID INT REFERENCES Rutina(ID)
);

CREATE TABLE IF NOT EXISTS DiaHoraActivacion (
    ID SERIAL PRIMARY KEY,
    diaSemana VARCHAR(20),
    horaActivacion TIME,
    rutinaID INT REFERENCES Rutina(ID)
);

CREATE TABLE IF NOT EXISTS Recordatorio (
    ID SERIAL PRIMARY KEY,
    descripcion VARCHAR(100),
    frecuenciaID INT REFERENCES RecordatorioFrecuencia(ID),
    hora TIME,
    diaSemana VARCHAR(30),
    sonido TEXT,
    color VARCHAR(45),
    rutinaID INT REFERENCES Rutina(ID)
);
