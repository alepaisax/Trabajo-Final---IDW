import React, { useState, useEffect } from 'react';
import '../../secciones/Styles.css';

const CrudAlojamientoServicio = () => {
    const [idAlojamiento, setIdAlojamiento] = useState('');
    const [idServicio, setIdServicio] = useState('');
    const [alojamientos, setAlojamientos] = useState([]);
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        const obtenerAlojamientos = async () => {
            try {
                const response = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
                if (response.ok) {
                    const data = await response.json();
                    setAlojamientos(data);
                } else {
                    console.error('Error al obtener alojamientos');
                }
            } catch (error) {
                console.error('Error al conectarse con el servidor:', error);
            }
        };

        const obtenerServicios = async () => {
            try {
                const response = await fetch('http://localhost:3001/servicio/getAllServicios');
                if (response.ok) {
                    const data = await response.json();
                    setServicios(data);
                } else {
                    console.error('Error al obtener servicios');
                }
            } catch (error) {
                console.error('Error al conectarse con el servidor:', error);
            }
        };

        obtenerAlojamientos();
        obtenerServicios();
    }, []);

    const crearAlojamientoServicio = async (e) => {
        e.preventDefault();

        const data = {
            idAlojamiento: parseInt(idAlojamiento, 10),
            idServicio: parseInt(idServicio, 10),
        };

        try {
            const response = await fetch('http://localhost:3001/alojamientosServicios/createAlojamientoServicio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Relación alojamiento-servicio creada correctamente');
                console.log('Respuesta del servidor:', result); 
            } else {
                console.error('Error en la respuesta del servidor:', result); 
                alert('Error al crear la relación alojamiento-servicio: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: No se pudo establecer el servicio');
        }
    };

    return (
        <div className='form-container'>
            <h1>Nueva Relación Alojamiento-Servicio</h1>
            <form onSubmit={crearAlojamientoServicio}>
                <div>
                    <label htmlFor='idAlojamiento'>Alojamiento</label>
                    <select
                        id='idAlojamiento'
                        value={idAlojamiento}
                        onChange={(e) => setIdAlojamiento(e.target.value)}
                    >
                        <option value="">Selecciona alojamiento</option>
                        {alojamientos.map((alojamiento) => (
                            <option key={alojamiento.idAlojamiento} value={alojamiento.idAlojamiento}>
                                {alojamiento.Titulo}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor='idServicio'>Servicio</label>
                    <select
                        id='idServicio'
                        value={idServicio}
                        onChange={(e) => setIdServicio(e.target.value)}
                    >
                        <option value="">Selecciona servicio</option>
                        {servicios.map((servicio) => (
                            <option key={servicio.idServicio} value={servicio.idServicio}>
                                {servicio.Nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type='submit'>Agregar</button>
            </form>
        </div>
    );
};
export default CrudAlojamientoServicio