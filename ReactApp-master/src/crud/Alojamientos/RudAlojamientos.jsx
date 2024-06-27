import React, { useState, useEffect } from 'react';
import '../../secciones/Styles.css';

const RudAlojamientos = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [alojamientoEditando, setAlojamientoEditando] = useState(null);
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
  const [tipoAlojamiento, setTipoAlojamiento] = useState('');
  const [estado, setEstado] = useState('');
  const [filtroTitulo, setFiltroTitulo] = useState('');

  useEffect(() => {
    const obtenerAlojamientos = async () => {
      try {
        const alojamientosResponse = await fetch('http://localhost:3001/alojamiento/getAlojamientos');

        if (alojamientosResponse.ok) {
          const data = await alojamientosResponse.json();
          console.log('Alojamientos Data:', data);

          const alojamientosTipoDescripcion = await Promise.all(
            data.map(async alojamiento => {
              try {
                const tipoResponse = await fetch(`http://localhost:3001/tiposAlojamiento/getTipoAlojamiento/${alojamiento.idTipoAlojamiento}`);
                if (tipoResponse.ok) {
                  const dataTipo = await tipoResponse.json();
                  console.log('Tipo Data:', dataTipo);
                  return { ...alojamiento, tipoAlojamientoDescripcion: dataTipo.Descripcion };
                } else {
                  console.log('Error fetching tipoAlojamiento:', tipoResponse.statusText);
                  return alojamiento;
                }
              } catch (error) {
                console.log('Fetch tipoAlojamiento error:', error);
                return alojamiento;
              }
            })
          );
          setAlojamientos(alojamientosTipoDescripcion);
        } else {
          console.log('Error fetching alojamientos:', alojamientosResponse.statusText);
        }
      } catch (error) {
        console.log('Fetch alojamientos error:', error);
      }
    };

    const obtenerTiposAlojamiento = async () => {
      try {
        const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
        if (response.ok) {
          const data = await response.json();
          setTiposAlojamiento(data);
        } else {
          console.log('Error fetching tiposAlojamiento:', response.statusText);
        }
      } catch (error) {
        console.log('Fetch tiposAlojamiento error:', error);
      }
    };

    obtenerAlojamientos();
    obtenerTiposAlojamiento();
  }, []);

  const eliminarAlojamiento = async (idAlojamiento) => {
    try {
      const response = await fetch(`http://localhost:3001/alojamiento/deleteAlojamiento/${idAlojamiento}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAlojamientos(alojamientos.filter(alojamiento => alojamiento.idAlojamiento !== idAlojamiento));
      } else {
        console.log('Error deleting alojamiento:', response.statusText);
      }
    } catch (error) {
      console.log('Delete alojamiento error:', error);
    }
  };

  const obtenerAlojamientoPorId = async (idAlojamiento) => {
    try {
      const response = await fetch(`http://localhost:3001/alojamiento/getAlojamiento/${idAlojamiento}`);
      if (response.ok) {
        const alojamiento = await response.json();
        setAlojamientoEditando(alojamiento);
        setTipoAlojamiento(alojamiento.idTipoAlojamiento);
        setEstado(alojamiento.Estado);
        setFormularioVisible(true);
      } else {
        console.log('Error fetching alojamiento:', response.statusText);
      }
    } catch (error) {
      console.log('Fetch alojamiento error:', error);
    }
  };

  const editarAlojamiento = async () => {
    try {
      const response = await fetch(`http://localhost:3001/alojamiento/putAlojamiento/${alojamientoEditando.idAlojamiento}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...alojamientoEditando, idTipoAlojamiento: tipoAlojamiento, Estado: estado }),
      });
      if (response.ok) {
        const index = alojamientos.findIndex(alojamiento => alojamiento.idAlojamiento === alojamientoEditando.idAlojamiento);
        const updatedAlojamientos = [...alojamientos];
        updatedAlojamientos[index] = { ...alojamientoEditando, idTipoAlojamiento: tipoAlojamiento, Estado: estado };
        setAlojamientos(updatedAlojamientos);
        cancelarEdicion();
      } else {
        console.log('Error updating alojamiento:', response.statusText);
      }
    } catch (error) {
      console.log('Update alojamiento error:', error);
    }
  };

  const cancelarEdicion = () => {
    setAlojamientoEditando(null);
    setFormularioVisible(false);
    setTipoAlojamiento('');
    setEstado('');
  };

  return (
    <div>
      <div className='filtro'>
        <label htmlFor='filtroTitulo'>Filtrar por Título:</label>
        <input
          type='text'
          id='filtroTitulo'
          value={filtroTitulo}
          onChange={(e) => setFiltroTitulo(e.target.value)}
        />
      </div>
      <div className="container-table">
        <table className='table'>
          <thead>
            <tr>
              <th className='tableTit'>Título</th>
              <th className='tableDes'>Descripción</th>
              <th className='tableTip'>Tipo de Alojamiento</th>
              <th className='tableLat'>Latitud</th>
              <th className='tableLon'>Longitud</th>
              <th className='tablePre'>Precio por día</th>
              <th className='tableCantD'>Cantidad de dormitorios</th>
              <th className='tableCantB'>Cantidad de baños</th>
              <th className='tableEst'>Estado</th>
              <th className='tableAcc'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alojamientos
              .filter(alojamiento => alojamiento.Titulo.toLowerCase().includes(filtroTitulo.toLowerCase()))
              .map((alojamiento) => (
                <tr key={alojamiento.idAlojamiento} className='table-row'>
                  <td className='tableTit'>{alojamiento.Titulo}</td>
                  <td className='tableDes'>{alojamiento.Descripcion}</td>
                  <td className='tableTip'>{alojamiento.tipoAlojamientoDescripcion}</td>
                  <td className='tableLat'>{alojamiento.Latitud}</td>
                  <td className='tableLon'>{alojamiento.Longitud}</td>
                  <td className='tablePre'>{alojamiento.PrecioPorDia}</td>
                  <td className='tableCantD'>{alojamiento.CantidadDormitorios}</td>
                  <td className='tableCantB'>{alojamiento.CantidadBanios}</td>
                  <td className='tableEst'>{alojamiento.Estado}</td>
                  <td className='tableAcc'>
                    <button className='button-edit' onClick={() => obtenerAlojamientoPorId(alojamiento.idAlojamiento)}>Editar</button>
                    <button className='button-delete' onClick={() => eliminarAlojamiento(alojamiento.idAlojamiento)}>Eliminar</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {formularioVisible && (
        <div className='formulario-edicion'>
          <h2>Editar Alojamiento</h2>
          <label htmlFor='titulo'>Título:</label>
          <input
            type='text'
            id='titulo'
            value={alojamientoEditando.Titulo}
            onChange={(e) => setAlojamientoEditando({ ...alojamientoEditando, Titulo: e.target.value })}
          />

          <label htmlFor='descripcion'>Descripción:</label>
          <input
            type='text'
            id='descripcion'
            value={alojamientoEditando.Descripcion}
            onChange={(e) => setAlojamientoEditando({ ...alojamientoEditando, Descripcion: e.target.value })}
          />

          <label htmlFor='precioPorDia'>Precio Por Día:</label>
          <input
            type='text'
            id='precioPorDia'
            value={alojamientoEditando.PrecioPorDia}
            onChange={(e) => setAlojamientoEditando({ ...alojamientoEditando, PrecioPorDia: e.target.value })}
          />

          <label htmlFor='latitud'>Latitud:</label>
          <input
            type='text'
            id='latitud'
            value={alojamientoEditando.Latitud}
            onChange={(e) => setAlojamientoEditando({ ...alojamientoEditando, Latitud: e.target.value })}
          />

          <label htmlFor='longitud'>Longitud:</label>
          <input
            type='text'
            id='longitud'
            value={alojamientoEditando.Longitud}
            onChange={(e) => setAlojamientoEditando({ ...alojamientoEditando, Longitud: e.target.value })}
          />

          <label htmlFor='cantidadDormitorios'>Cantidad Dormitorios:</label>
          <input
            type='number'
            id='cantidadDormitorios'
            value={alojamientoEditando.CantidadDormitorios}
            onChange={(e) => setAlojamientoEditando({ ...alojamientoEditando, CantidadDormitorios: e.target.value })}
          />

          <label htmlFor='cantidadBanios'>Cantidad Baños:</label>
          <input
            type='number'
            id='cantidadBanios'
            value={alojamientoEditando.CantidadBanios}
            onChange={(e) => setAlojamientoEditando({ ...alojamientoEditando, CantidadBanios: e.target.value })}
          />

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

          <button onClick={editarAlojamiento}>Guardar Cambios</button>
          <button onClick={cancelarEdicion}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default RudAlojamientos;