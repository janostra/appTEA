import React, { createContext, useContext, useState, ReactNode } from 'react';
import { convertirHorarioAISO } from '../scripts/date-converter';

interface Paso {
    descripcion: string;
    imagen: string | null;
}

interface RutinaContextType {
    nombre: string;
    setNombre: (nombre: string) => void;
    imagenUri: string | null;
    setImagenUri: (uri: string | null) => void;
    horarios: { hora: string; dia: string }[];
    setHorarios: (horarios: { hora: string; dia: string }[]) => void;
    pasos: Paso[];
    agregarPaso: (paso: Paso) => void;
    limpiarRutina: () => void;
    obtenerHorariosISO: () => string[];
}

const RutinaContext = createContext<RutinaContextType | undefined>(undefined);

export const RutinaProvider = ({ children }: { children: ReactNode }) => {
    const [nombre, setNombre] = useState('');
    const [imagenUri, setImagenUri] = useState<string | null>(null);
    const [horarios, setHorarios] = useState<{ hora: string; dia: string }[]>([]);
    const [pasos, setPasos] = useState<Paso[]>([]);

    const agregarPaso = (paso: Paso) => {
        setPasos((prev) => [...prev, paso]);
    };

    const limpiarRutina = () => {
        setNombre('');
        setImagenUri(null);
        setHorarios([]);
        setPasos([]);
    };

    const obtenerHorariosISO = () => {
        return horarios.map(h => convertirHorarioAISO(h));
    };

    return (
        <RutinaContext.Provider
            value={{ nombre, setNombre, imagenUri, setImagenUri, horarios, setHorarios, pasos, agregarPaso, limpiarRutina, obtenerHorariosISO }}
        >
            {children}
        </RutinaContext.Provider>
    );
};

export const useRutina = () => {
    const context = useContext(RutinaContext);
    if (!context) {
        throw new Error('useRutina debe usarse dentro de un RutinaProvider');
    }
    return context;
};
