import React, { useState, useEffect } from 'react';
import '../../secciones/Styles.css';

const CrudServicios = () => {
    const [servicios, setServicios] = useState([]);
    const [nuevoTipo, setNuevoTipo] = useState('');
    const [editandoTipo, setEditandoTipo] = useState(null);
    const [servicioEditado, setServicioEditado] = useState('');
  
    useEffect(() => {
      obtenerServicios();
    }, []);
  
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
        console.error('Error:', error);
      }
    };
  
    const agregarServicio = async (e) => {
      e.preventDefault();
      const json = {
        Nombre: nuevoTipo,
      };
  
      try {
        const response = await fetch('http://localhost:3001/servicio/createServicio', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(json),
        });
        if (response.ok) {
          alert('Servicio creado correctamente');
          setNuevoTipo('');
          obtenerServicios();
        } else {
          alert('Error al crear el servicio');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error: No se pudo establecer el servicio');
      }
    };
  
    const eliminarServicio = async (idServicio) => {
      try {
        const response = await fetch(`http://localhost:3001/servicio/deleteServicio/${idServicio}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Servicio eliminado correctamente');
          obtenerServicios();
        } else {
          alert('Error al eliminar servicio');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error: No se pudo establecer el servicio');
      }
    };
  
    const editarServicio = async (idServicio) => {
      const json = {
        Nombre: servicioEditado,
      };
  
      try {
        const response = await fetch(`http://localhost:3001/servicio/updateServicio/${idServicio}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(json),
        });
        if (response.ok) {
          alert('Servicio actualizado correctamente');
          cancelarEdicion();
          obtenerServicios();
        } else {
          alert('Error al actualizar servicio');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error: No se pudo establecer el servicio');
      }
    };
  
    const cancelarEdicion = () => {
      setEditandoTipo(null);
      setServicioEditado('');
    };
  
    return (
      <div className='tipos-servicios'>
        <h1>Servicios</h1>
        <form onSubmit={agregarServicio}>
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
          {servicios.map(tipo => (
            <li key={tipo.idServicio}>
              {editandoTipo === tipo.idServicio ? (
                <>
                  <input
                    type='text'
                    value={servicioEditado}
                    onChange={(e) => setServicioEditado(e.target.value)}
                  />
                  <div className='botones'>
                    <button onClick={() => editarServicio(tipo.idServicio)}>Guardar</button>
                    <button onClick={cancelarEdicion}>Cancelar</button>
                  </div>
                </>
              ) : (
                <>
                  {tipo.Nombre} 
                  <div className='botones'>
                    <button onClick={() => setEditandoTipo(tipo.idServicio)}>Editar</button>
                    <button onClick={() => eliminarServicio(tipo.idServicio)}>Eliminar</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
export default CrudServicios