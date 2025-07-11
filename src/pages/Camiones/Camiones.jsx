// ...importaciones
import { useState, useEffect } from 'react';
import './Camiones.css';
import logoBasuraOnTime from '../../assets/img/icons/logoBasuraOnTime.png';
import { MdEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { ItemNavBar } from '../../UI/BotonBack/BotonBack';
import Swal from 'sweetalert2';
import axios from 'axios';

const Camiones = () => {
  const token = localStorage.getItem('token');
  const URLM = 'https://express-latest-6gmf.onrender.com/settingsTruck';
  const URLAdd = 'https://express-latest-6gmf.onrender.com/addTruck';
  const URLDelete = 'https://express-latest-6gmf.onrender.com/deleteTruck';
  const URLEdit = 'https://express-latest-6gmf.onrender.com/modifyTruck';

  const [modoEdicion, setModoEdicion] = useState(false);
  const [camionEditarIndex, setCamionEditarIndex] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [camiones, setCamiones] = useState([]);

  const [nuevoCamion, setNuevoCamion] = useState({
    placa: '',
    modelo: '',
    capacidad: 'Alta',
    estado_camion: 'Activo',
    marca: '',
    tipo_c: 'Recolección'
  });

  const mostrarCamiones = async () => {
    try {
      const response = await axios.get(URLM, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCamiones(response.data.data);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los camiones.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#0A372D',
      });
    }
  };

  useEffect(() => {
    mostrarCamiones();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCamion({ ...nuevoCamion, [name]: value });
  };

  const resetForm = () => {
    setNuevoCamion({
      placa: '',
      modelo: '',
      capacidad: 'Alta',
      estado_camion: 'Activo',
      marca: '',
      tipo_c: 'Recolección'
    });
  };

  const handleSubmitTruck = async (e) => {
    e.preventDefault();
    const { placa, modelo, capacidad, estado_camion, marca, tipo_c } = nuevoCamion;

    if (!placa || !modelo || !capacidad || !estado_camion || !marca || !tipo_c) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios.',
        icon: 'warning',
        confirmButtonColor: '#0A372D',
      });
      return;
    }

    Swal.fire({
      title: 'Procesando...',
      text: modoEdicion ? 'Actualizando camión...' : 'Registrando camión...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const datos = {
        ...nuevoCamion,
        modelo: nuevoCamion.modelo.toString(),
        marca: nuevoCamion.marca.toString()
      };

      if (modoEdicion) {
        await axios.put(URLEdit, datos, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire({ title: 'Camión actualizado', icon: 'success', timer: 2000, showConfirmButton: false });
      } else {
        const response = await axios.post(URLAdd, datos, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Respuesta del backend:', response.data);
        const id_usuario = response.data.id_camion
        console.log(id_usuario);
        localStorage.setItem('fk_id_usuario', id_usuario)
        Swal.fire({ title: 'Camión registrado', icon: 'success', timer: 2000, showConfirmButton: false });
      }

      setShowForm(false);
      resetForm();
      setModoEdicion(false);
      setCamionEditarIndex(null);
      mostrarCamiones();
    } catch (error) {
      console.error('Error completo:', error);

      let mensaje = 'Ocurrió un error inesperado.';
      if (error.response?.data?.message) {
        mensaje = error.response.data.message;
      } else if (error.response?.data) {
        mensaje = JSON.stringify(error.response.data);
      } else if (error.message) {
        mensaje = error.message;
      }

      Swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        confirmButtonColor: '#0A372D',
      });
    }
  };

  const handleEliminar = (index) => {
    const camion = camiones[index];
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el camión permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(URLDelete, {
            headers: { Authorization: `Bearer ${token}` },
            data: { placa: camion.placa }
          });
          Swal.fire({ title: 'Camión eliminado', icon: 'success', timer: 2000, showConfirmButton: false });
          mostrarCamiones();
        } catch {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar el camión.',
            icon: 'error',
            confirmButtonColor: '#0A372D',
          });
        }
      }
    });
  };

  const driveCancelTruck = () => {
    Swal.fire({
      title: 'Cancelación',
      text: "Se ha cancelado el ingreso / edición del camión",
      icon: 'info',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      setShowForm(false);
      resetForm();
      setModoEdicion(false);
      setCamionEditarIndex(null);
    });
  };

  const camionesFiltrados = camiones.filter(camion =>
    Object.values(camion).some(valor =>
      valor?.toString().toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  return (
    <section className="sectFirst min-h-screen flex flex-col md:flex-row bg-[var(--Voscuro2)]">

      {/* Sidebar PC */}
      <div className="hidden md:flex flex-col justify-center items-center w-28 xl:w-90 2xl:w-140 h-screen bg-[var(--Voscuro2)] fixed left-0 z-10">
        <div className="absolute top-4 left-4 z-50">
          <ItemNavBar route="/PanelAdmin" content=" " />
        </div>
        <img className="w-20 xl:w-40 2xl:w-90" src={logoBasuraOnTime} alt="Logo" />
        <p className="FontCursive text-3xl xl:text-4xl 2xl:text-5xl text-center text-white">BASURA ON TIME</p>
      </div>

      {/* Header móvil */}
      <div className="md:hidden bg-[var(--Voscuro2)] w-full fixed top-0 left-0 z-50 flex flex-col items-center pt-6 pb-2">
        <div className="absolute top-2 left-2 z-50 scale-75">
          <ItemNavBar route="/PanelAdmin" content=" " />
        </div>
        <img src={logoBasuraOnTime} alt="Logo" className="w-28 h-auto mt-2" />
        <p className="FontCursive text-white text-base mt-1">BASURA ON TIME</p>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center justify-start
        ml-[0] md:ml-[28] xl:ml-[60px] 2xl:ml-[180px]
        px-4 pt-32 md:pt-6 pb-20 md:pb-6 FontGeologica relative w-full overflow-y-auto">

        <div className="mt-30 sm:mt-15 xl:ml-70 2xl:ml-100 bg-[var(--Voscuro2)] p-6 rounded-lg w-full max-w-[800px] max-h-[70vh] overflow-y-auto overflow-x-auto">
          <h1 className="text-lg md:text-5xl text-white mb-6 text-center">Gestión de camiones</h1>

          <div className="flex flex-col md:flex-row gap-8 mb-6">
            <button onClick={() => setShowForm(true)} className="rounded-md w-full md:w-40 h-12 bg-[var(--Vclaro3)] text-white text-sm md:text-xl hover:scale-105">Agregar</button>
            <input
              type="text"
              className="text-white rounded-md border border-[var(--Vclaro3)] text-center w-full h-12 md:w-120 text-sm md:text-xl"
              placeholder="Buscar camión..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="w-full text-white">
            {/* Tabla cabezal solo desktop */}
            <div className="hidden md:grid grid-cols-6 gap-2 text-center items-center text-lg rounded-t-md h-14 p-3 border border-[var(--Vclaro3)] bg-[var(--Voscuro4)] min-w-[700px]">
              <p>Placa</p><p>Modelo</p><p>Capacidad</p><p>Tipo</p><p>Marca</p><p>Acción</p>
            </div>

            {/* Filas */}
            {camionesFiltrados.length === 0 ? (
              <p className="text-center mt-3 text-white text-sm">No hay camiones que coincidan.</p>
            ) : (
              camionesFiltrados.map((camion, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-2 text-left md:text-center text-sm md:text-lg p-4 border border-[var(--Vclaro3)] min-w-[220px] md:min-w-[700px]"
                >
                  <p><span className="font-bold md:hidden">Placa: </span>{camion.placa}</p>
                  <p><span className="font-bold md:hidden">Modelo: </span>{camion.modelo}</p>
                  <p><span className="font-bold md:hidden">Capacidad: </span>{camion.capacidad}</p>
                  <p><span className="font-bold md:hidden">Tipo: </span>{camion.tipo_c}</p>
                  <p><span className="font-bold md:hidden">Marca: </span>{camion.marca}</p>
                  <div className="flex gap-2 md:justify-center justify-start mt-2 md:mt-0">
                    <button
                      onClick={() => {
                        setShowForm(true);
                        setModoEdicion(true);
                        setCamionEditarIndex(index);
                        setNuevoCamion(camion);
                      }}
                      className="w-10 h-10 bg-[var(--Vclaro3)] text-white rounded-md flex items-center justify-center hover:scale-105"
                      title="Editar"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => handleEliminar(index)}
                      className="w-10 h-10 bg-[var(--Rojo)] text-white rounded-md flex items-center justify-center hover:scale-105"
                      title="Eliminar"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

  {/* Modal Formulario */}
    {showForm && (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
     <form onSubmit={handleSubmitTruck} className="bg-[var(--Voscuro4)] p-6 rounded-lg shadow-lg w-96 text-white flex flex-col gap-4">
      <h2 className="text-2xl mb-2">{modoEdicion ? 'Editar Camión' : 'Agregar Camión'}</h2>

       <input
         type="text"
         name="placa"
         value={nuevoCamion.placa}
         onChange={handleInputChange}
         placeholder="Placa"
         required
         disabled={modoEdicion}
         className="p-2 rounded bg-[var(--Voscuro2)] text-white placeholder-white border"
       />
       <input
         type="text"
         name="modelo"
         value={nuevoCamion.modelo}
         onChange={handleInputChange}
         placeholder="Modelo"
          required
         className="p-2 rounded bg-[var(--Voscuro2)] text-white placeholder-white border"
        />
       <select
         name="capacidad"
         value={nuevoCamion.capacidad}
         onChange={handleInputChange}
         className="p-2 rounded bg-[var(--Voscuro2)] text-white border"
        >
         <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>


        <input
          type="text"
          name="marca"
          value={nuevoCamion.marca}
          onChange={handleInputChange}
          placeholder="Marca"
          required
          className="p-2 rounded bg-[var(--Voscuro2)] text-white placeholder-white border"
        />
        <select
          name="tipo_c"
          value={nuevoCamion.tipo_c}
          onChange={handleInputChange}
          className="p-2 rounded bg-[var(--Voscuro2)] text-white border"
        >
          <option value="Recolección">Recolección</option>
          <option value="Traslado">Traslado</option>
        </select>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={driveCancelTruck}
            className="bg-[var(--Rojo)] px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-[var(--Vclaro3)] px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
    )}
    </section>
  );
}

export default Camiones;
