-- CreateTable
CREATE TABLE "RutinaEstado" (
    "ID" SERIAL NOT NULL,
    "descripcion" VARCHAR(30) NOT NULL,

    CONSTRAINT "RutinaEstado_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "PasoEstado" (
    "ID" SERIAL NOT NULL,
    "descripcion" VARCHAR(30) NOT NULL,

    CONSTRAINT "PasoEstado_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "RecordatorioFrecuencia" (
    "ID" SERIAL NOT NULL,
    "descripcion" VARCHAR(45) NOT NULL,

    CONSTRAINT "RecordatorioFrecuencia_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "UsuarioRol" (
    "ID" SERIAL NOT NULL,
    "descripcion" VARCHAR(45) NOT NULL,

    CONSTRAINT "UsuarioRol_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "UsuarioNivel" (
    "ID" SERIAL NOT NULL,
    "descripcion" VARCHAR(45) NOT NULL,

    CONSTRAINT "UsuarioNivel_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "ID" SERIAL NOT NULL,
    "rolID" INTEGER,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Infante" (
    "infanteID" INTEGER NOT NULL,
    "nivelID" INTEGER,

    CONSTRAINT "Infante_pkey" PRIMARY KEY ("infanteID")
);

-- CreateTable
CREATE TABLE "Adulto" (
    "adultoID" INTEGER NOT NULL,
    "pin" INTEGER,

    CONSTRAINT "Adulto_pkey" PRIMARY KEY ("adultoID")
);

-- CreateTable
CREATE TABLE "Rutina" (
    "ID" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "estadoID" INTEGER,
    "fechaCreacion" TIMESTAMP(3),
    "imagen" TEXT,
    "usuarioID" INTEGER,

    CONSTRAINT "Rutina_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Paso" (
    "ID" SERIAL NOT NULL,
    "orden" INTEGER,
    "descripcion" VARCHAR(70),
    "estadoID" INTEGER,
    "imagen" TEXT,
    "audio" TEXT,
    "rutinaID" INTEGER,

    CONSTRAINT "Paso_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Motivacion" (
    "ID" SERIAL NOT NULL,
    "icono" TEXT,
    "descripcion" VARCHAR(200),
    "fechaObtencion" TIMESTAMP(3),
    "rutinaID" INTEGER,

    CONSTRAINT "Motivacion_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Cancelacion" (
    "ID" SERIAL NOT NULL,
    "fechaHora" TIMESTAMP(3),
    "rutinaID" INTEGER,

    CONSTRAINT "Cancelacion_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "DiaHoraActivacion" (
    "ID" SERIAL NOT NULL,
    "diaSemana" VARCHAR(20),
    "horaActivacion" TIMESTAMP(3),
    "rutinaID" INTEGER,

    CONSTRAINT "DiaHoraActivacion_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Recordatorio" (
    "ID" SERIAL NOT NULL,
    "descripcion" VARCHAR(100) NOT NULL,
    "frecuenciaID" INTEGER,
    "hora" TIMESTAMP(3),
    "diaSemana" VARCHAR(30),
    "sonido" TEXT,
    "color" VARCHAR(45),
    "rutinaID" INTEGER,

    CONSTRAINT "Recordatorio_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolID_fkey" FOREIGN KEY ("rolID") REFERENCES "UsuarioRol"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infante" ADD CONSTRAINT "Infante_nivelID_fkey" FOREIGN KEY ("nivelID") REFERENCES "UsuarioNivel"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infante" ADD CONSTRAINT "Infante_infanteID_fkey" FOREIGN KEY ("infanteID") REFERENCES "Usuario"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adulto" ADD CONSTRAINT "Adulto_adultoID_fkey" FOREIGN KEY ("adultoID") REFERENCES "Usuario"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rutina" ADD CONSTRAINT "Rutina_estadoID_fkey" FOREIGN KEY ("estadoID") REFERENCES "RutinaEstado"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rutina" ADD CONSTRAINT "Rutina_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuario"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paso" ADD CONSTRAINT "Paso_estadoID_fkey" FOREIGN KEY ("estadoID") REFERENCES "PasoEstado"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paso" ADD CONSTRAINT "Paso_rutinaID_fkey" FOREIGN KEY ("rutinaID") REFERENCES "Rutina"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motivacion" ADD CONSTRAINT "Motivacion_rutinaID_fkey" FOREIGN KEY ("rutinaID") REFERENCES "Rutina"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cancelacion" ADD CONSTRAINT "Cancelacion_rutinaID_fkey" FOREIGN KEY ("rutinaID") REFERENCES "Rutina"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaHoraActivacion" ADD CONSTRAINT "DiaHoraActivacion_rutinaID_fkey" FOREIGN KEY ("rutinaID") REFERENCES "Rutina"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recordatorio" ADD CONSTRAINT "Recordatorio_frecuenciaID_fkey" FOREIGN KEY ("frecuenciaID") REFERENCES "RecordatorioFrecuencia"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recordatorio" ADD CONSTRAINT "Recordatorio_rutinaID_fkey" FOREIGN KEY ("rutinaID") REFERENCES "Rutina"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
