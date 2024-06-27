import React, { useState, useEffect } from 'react';
import '../../secciones/Styles.css';

const AddAlojamiento = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoAlojamiento, setTipoAlojamiento] = useState('');
    const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [precioPorDia, setPrecioPorDia] = useState('');
    const [cantidadDormitorios, setCantidadDormitorios] = useState('');
    const [cantidadBanios, setCantidadBanios] = useState('');
    const [estado, setEstado] = useState('Disponible');

    useEffect(() => {
        const obtenerTiposAlojamientos = async () => {
            try {
                const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
                if (response.ok) {
                    const data = await response.json();
                    setTiposAlojamiento(data);
                } else {
                    console.error('Error al obtener tipos de alojamiento');
                }
            } catch (error) {
                console.error('Error al conectarse con el servidor:', error);
            }
        };

        obtenerTiposAlojamientos();
    }, []);

    const agregarAlojamiento = async (e) => {
        e.preventDefault();
        
        const latitudValue = parseFloat(latitud);
        const longitudValue = parseFloat(longitud);

        if (isNaN(latitudValue) || latitudValue < -90 || latitudValue > 90) {
            alert('La latitud debe ser un número entre -90 y 90');
            return;
        }

        if (isNaN(longitudValue) || longitudValue < -180 || longitudValue > 180) {
            alert('La longitud debe ser un número entre -180 y 180');
            return;
        }

        const data = {
            Titulo: titulo,
            Descripcion: descripcion,
            idTipoAlojamiento: tipoAlojamiento,
            Latitud: latitudValue,
            Longitud: longitudValue,
            PrecioPorDia: parseInt(precioPorDia, 10),
            CantidadDormitorios: parseInt(cantidadDormitorios, 10),
            CantidadBanios: parseInt(cantidadBanios, 10),
            Estado: estado,
        };

        console.log('Datos a enviar:', data); 

        try {
            const response = await fetch('http://localhost:3001/alojamiento/createAlojamiento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Tipo de alojamiento creado correctamente');
                console.log('Respuesta del servidor:', result); 
            } else {
                console.error('Error en la respuesta del servidor:', result); 
                alert('Error al crear el tipo de alojamiento: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: No se pudo establecer el servicio');
        }
    };

    return (
        <div className='form-container'>
            <h1>Nuevo Alojamiento</h1>
            <form onSubmit={agregarAlojamiento}>
                <div>
                    <label htmlFor='titulo'>Titulo</label>
                    <input
                        type='text'
                        id='titulo'
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='descripcion'>Descripcion</label>
                    <textarea
                        id='descripcion'
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='tipoAlojamiento'>Tipo Alojamiento</label>
                    <select
                        id='tipoAlojamiento'
                        value={tipoAlojamiento}
                        onChange={(e) => setTipoAlojamiento(e.target.value)}
                    >
                        <option value="">Selecciona tipo alojamiento</option>
                        {tiposAlojamiento.map((tipo) => (
                            <option key={tipo.idTipoAlojamiento} value={tipo.idTipoAlojamiento}>
                                {tipo.Descripcion}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor='precioPorDia'>Precio por dia</label>
                    <input
                        type='text'
                        id='precioPorDia'
                        value={precioPorDia}
                        onChange={(e) => setPrecioPorDia(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='latitud'>Latitud</label>
                    <input
                        type='text'
                        id='latitud'
                        value={latitud}
                        onChange={(e) => setLatitud(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='longitud'>Longitud</label>
                    <input
                        type='text'
                        id='longitud'
                        value={longitud}
                        onChange={(e) => setLongitud(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='cantidadDormitorios'>Cantidad Dormitorios</label>
                    <input
                        type='number'
                        id='cantidadDormitorios'
                        value={cantidadDormitorios}
                        onChange={(e) => setCantidadDormitorios(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='cantidadBanios'>Cantidad Baños</label>
                    <input
                        type='number'
                        id='cantidadBanios'
                        value={cantidadBanios}
                        onChange={(e) => setCantidadBanios(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='estado'>Estado</label>
                    <select
                        id='estado'
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="Disponible">Disponible</option>
                        <option value="Reservado">Reservado</option>
                    </select>
                </div>
                <button type='submit'>Agregar</button>
            </form>
        </div>
    );
};

export default AddAlojamiento;