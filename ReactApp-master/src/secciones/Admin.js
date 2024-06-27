import React, { useState } from 'react';
import CrudTipoAlojamientos from '../crud/TipoAlojamientos/CrudTipoAlojamientos';
import AddAlojamiento from '../crud/Alojamientos/AddAlojamiento';
import RudAlojamientos from '../crud/Alojamientos/RudAlojamientos';
import CrudServicios from '../crud/Servicios/CrudServicios';
import CrudAlojamientoServicio from '../crud/AlojamientoServicio/CrudAlojamientoServicio';
import './Styles.css';

const Admin = () => {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

    const mostrarFormulario = (opcion) => {
        setOpcionSeleccionada(opcion);
    };

    const volver = () => {
        setOpcionSeleccionada(null);
    };

    return (
        <div>
                {opcionSeleccionada === null ? (
                    <div className="admin-background">
                        <h1 className="admin-titulo">ADMINISTRACIÓN</h1>
                        <hr></hr>
                        <button className="admin-boton" onClick={() => mostrarFormulario('tipoAlojamientos')}>
                            TIPO ALOJAMIENTOS
                        </button>
                        <button className="admin-boton" onClick={() => mostrarFormulario('alojamientos')}>
                            ALOJAMIENTOS
                        </button>
                        <button className="admin-boton" onClick={() => mostrarFormulario('servicios')}>
                            SERVICIOS
                        </button>
                        <button className="admin-boton" onClick={() => mostrarFormulario('alojamientoServicios')}>
                            ALOJAMIENTO SERVICIOS
                        </button>
                    </div>
                ) : (
                    <div className='contenedores-formularios'>
                        <div>
                            {opcionSeleccionada === 'tipoAlojamientos' && <CrudTipoAlojamientos />}
                                {opcionSeleccionada === 'alojamientos' && (
                                    <>
                                        <AddAlojamiento />
                                        <RudAlojamientos />
                                    </>
                                )}
                            {opcionSeleccionada === 'servicios' && <CrudServicios />}
                            {opcionSeleccionada === 'alojamientoServicios' && <CrudAlojamientoServicio />}
                        </div>
                        <button className="admin-boton volver-boton" onClick={volver}>Volver</button>
                    </div>
                )}
        </div>
    );
};

export default Admin;