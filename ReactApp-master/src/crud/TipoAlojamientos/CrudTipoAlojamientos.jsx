import React, { useState, useEffect } from 'react';
import '../../secciones/Styles.css';

const CrudTipoAlojamientos = () => {
    const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
    const [nuevoTipo, setNuevoTipo] = useState('');
    const [editandoTipo, setEditandoTipo] = useState(null);
    const [descripcionEditada, setDescripcionEditada] = useState('');
  
    useEffect(() => {
      obtenerTiposAlojamiento();
    }, []);
  
    const obtenerTiposAlojamiento = async () => {
      try {
        const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
        if (response.ok) {
          const data = await response.json();
          setTiposAlojamiento(data);
        } else {
          console.error('Error al obtener tipos de alojamiento');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const agregarTipoAlojamiento = async (e) => {
      e.preventDefault();
      const json = {
        Descripcion: nuevoTipo,
      };
  
      try {
        const response = await fetch('http://localhost:3001/tiposAlojamiento/createTipoAlojamiento', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(json),
        });
        if (response.ok) {
          alert('Tipo de alojamiento creado correctamente');
          setNuevoTipo('');
          obtenerTiposAlojamiento();
        } else {
          alert('Error al crear el tipo de alojamiento');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error: No se pudo establecer el servicio');
      }
    };
  
    const eliminarTipoAlojamiento = async (idTipoAlojamiento) => {
      try {
        const response = await fetch(`http://localhost:3001/tiposAlojamiento/deleteTipoAlojamiento/${idTipoAlojamiento}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Tipo de alojamiento eliminado correctamente');
          obtenerTiposAlojamiento();
        } else {
          alert('Error al eliminar tipo de alojamiento');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error: No se pudo establecer el servicio');
      }
    };
  
    const editarTipoAlojamiento = async (idTipoAlojamiento) => {
      const json = {
        Descripcion: descripcionEditada,
      };
  
      try {
        const response = await fetch(`http://localhost:3001/tiposAlojamiento/putTipoAlojamiento/${idTipoAlojamiento}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(json),
        });
        if (response.ok) {
          alert('Tipo de alojamiento actualizado correctamente');
          cancelarEdicion();
          obtenerTiposAlojamiento();
        } else {
          alert('Error al actualizar tipo de alojamiento');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error: No se pudo establecer el servicio');
      }
    };
  
    const cancelarEdicion = () => {
      setEditandoTipo(null);
      setDescripcionEditada('');
    };
  
    return (
      <div className='tipos-alojamiento'>
        <h1>Tipos de Alojamiento</h1>
        <form onSubmit={agregarTipoAlojamiento}>
          <label htmlFor='nuevoTipo'>Nuevo Tipo:</label>
          <input
            type='text'
            id='nuevoTipo'
            value={nuevoTipo}
            onChange={(e) => setNuevoTipo(e.target.value)}
          />
          <button type='submit'>Agregar</button>
        </form>
        <ul>
          {tiposAlojamiento.map(tipo => (
            <li key={tipo.idTipoAlojamiento}>
              {editandoTipo === tipo.idTipoAlojamiento ? (
                <>
                  <input
                    type='text'
                    value={descripcionEditada}
                    onChange={(e) => setDescripcionEditada(e.target.value)}
                  />
                  <div className='botones'>
                    <button onClick={() => editarTipoAlojamiento(tipo.idTipoAlojamiento)}>Guardar</button>
                    <button onClick={cancelarEdicion}>Cancelar</button>
                  </div>
                </>
              ) : (
                <>
                  {tipo.Descripcion}
                  <div className='botones'>
                    <button onClick={() => setEditandoTipo(tipo.idTipoAlojamiento)}>Editar</button>
                    <button onClick={() => eliminarTipoAlojamiento(tipo.idTipoAlojamiento)}>Eliminar</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default CrudTipoAlojamientos