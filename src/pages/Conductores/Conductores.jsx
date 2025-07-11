import { useState, useEffect } from 'react';
import './Conductores.css';
import logoBasuraOnTime from '../../assets/img/icons/logoBasuraOnTime.png';
import { MdEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { ItemNavBar } from '../../UI/BotonBack/BotonBack';
import Swal from 'sweetalert2';
import axios from 'axios';

const Conductores = () => {
  const fk_id_usuario = localStorage.getItem('fk_id_usuario');
  const token = localStorage.getItem('token');
  const [id_rol] = useState(3); // Rol fijo para conductor
  const URLM = 'https://express-latest-6gmf.onrender.com/mostrarConductores';

  const [conductores, setConductores] = useState([]);
  const [nuevoConductor, setNuevoConductor] = useState({
    nombres: '', apellidos: '', telefono: '', tipo_licencia: '', fecha_vencimiento_licencia: '',
    email: '', password: ''
  });

  const [modoEdicion, setModoEdicion] = useState(false);
  const [conductorEditarIndex, setConductorEditarIndex] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchConductores = async () => {
      try {
        const response = await axios.get(
          URLM,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log('Conductores:', response.data.data);
        setConductores(response.data.data);
      } catch (error) {
        console.error('Error al cargar conductores:', error);
      }
    };

    fetchConductores();
  }, [fk_id_usuario, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoConductor({ ...nuevoConductor, [name]: value });
  };

  const handleSubmitDriver = async (e) => {
    e.preventDefault();
    const {
      nombres, apellidos, telefono, tipo_licencia,
      fecha_vencimiento_licencia, email, password
    } = nuevoConductor;

    if (!nombres || !apellidos || !telefono || !tipo_licencia || !fecha_vencimiento_licencia || !email || !password) {
      Swal.fire({ title: 'Error', text: 'Todos los campos son obligatorios.', icon: 'warning', confirmButtonColor: '#0A372D' });
      return;
    }

    Swal.fire({ title: 'Procesando...', text: 'Registrando conductor...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
      const response = await axios.post('https://express-latest-6gmf.onrender.com/agregarConductor/conductores', {
        id_rol,
        email,
        nombres,
        apellidos,
        telefono,
        password,
        tipo_licencia,
        fecha_vencimiento_licencia,
        fk_id_camion: fk_id_usuario
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('fk_id_usuario');

      Swal.fire({ title: 'Éxito', text: 'Conductor registrado correctamente', icon: 'success', timer: 2000, showConfirmButton: false });
      setConductores([...conductores, nuevoConductor]);
      resetForm();
      setShowForm(false);
    } catch (error) {
      const msg = error.response?.data?.message || 'Ocurrió un error al registrar el conductor.';
      Swal.fire({ title: 'Error', text: msg, icon: 'error', confirmButtonColor: '#0A372D' });
    }
  };

  const resetForm = () => {
    setNuevoConductor({ nombres: '', apellidos: '', telefono: '', tipo_licencia: '', fecha_vencimiento_licencia: '', email: '', password: '' });
    setModoEdicion(false);
    setConductorEditarIndex(null);
  };

  const conductoresFiltrados = conductores.filter(conductor =>
    Object.values(conductor).some(valor =>
      valor?.toString().toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  return (
    <section className="sectFirst min-h-screen flex flex-col md:flex-row bg-[var(--Voscuro2)]">

      {/* Sidebar PC */}
      <div className="hidden md:flex flex-col justify-center items-center h-screen bg-[var(--Voscuro2)] fixed left-0 z-10 xl:w-30 2xl:w-80">
        <div className="absolute top-4 left-4 z-50 xl:scale-80 2xl:scale-100">
          <ItemNavBar route="/PanelAdmin" content=" " />
        </div>
        <img className="xl:w-20 2xl:w-50" src={logoBasuraOnTime} alt="Logo Basura On Time" />
        <p className="FontCursive xl:text-lg 2xl:text-4xl text-center text-white">BASURA ON TIME</p>
      </div>

      {/* Header móvil */}
      <div className="md:hidden bg-[var(--Voscuro2)] w-full flex flex-col items-center pt-8 pb-5 fixed top-0 left-0 z-50">
        <div className="absolute top-2 left-2 z-50 scale-80">
          <ItemNavBar route="/PanelAdmin" content=" " />
        </div>
        <img src={logoBasuraOnTime} alt="Logo Basura On Time" className="w-28 h-auto mt-2" />
        <p className="FontCursive text-base md:text-3xl text-white mt-2">BASURA ON TIME</p>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col items-center justify-start xl:ml-15 2xl:ml-[250px] px-4 pt-28 md:pt-6 pb-6 FontGeologica relative w-full overflow-y-auto">

        <div className="mt-35 sm:mt-10 2xl:ml-20 xl:ml-20 bg-[var(--Voscuro2)] p-6 rounded-lg w-full max-w-[1100px]">
          <h1 className="text-xl md:text-5xl text-white mb-6 text-center">Gestión de Conductores</h1>

          <div className="flex flex-col md:flex-row gap-5 sm:gap-77 mb-6">
            <button onClick={() => setShowForm(true)} className="group cursor-pointer rounded-md w-full md:w-40 h-12 bg-[var(--Vclaro3)] text-white text-sm md:text-xl transition-all hover:scale-105 hover:shadow-2xl active:scale-95">
              Agregar
            </button>
            <input
              type="text"
              className="text-white rounded-md border border-[var(--Vclaro3)] text-center w-full h-12 md:w-120 text-sm md:text-xl"
              placeholder="Buscar conductor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="w-full text-white">
            {/* Cabecera para desktop */}
            <div className="hidden md:grid grid-cols-9 gap-2 text-center items-center text-lg rounded-t-md h-14 p-3 border border-[var(--Vclaro3)] bg-[var(--Voscuro4)]">
              <p>Nombres</p><p>Apellidos</p><p>Teléfono</p><p>Licencia</p><p>Vence</p><p>Email</p><p>Estado</p><p>Placa</p><p>Accion</p>
            </div>

            {/* Lista conductores */}
            {conductoresFiltrados.length === 0 ? (
              <p className='text-white text-center mt-3 text-sm'>No hay conductores que coincidan.</p>
            ) : conductoresFiltrados.map((conductor, index) => (
              <div
                key={index}
                className="border border-[var(--Vclaro3)] rounded-md p-4 mb-4 text-white md:grid md:grid-cols-9 md:text-center md:p-4 md:mb-0 md:items-center"
              >
                {/* Desktop */}
                <p className="hidden md:block">{conductor.nombres}</p>
                <p className="hidden md:block">{conductor.apellidos}</p>
                <p className="hidden md:block">{conductor.telefono}</p>
                <p className="hidden md:block">{conductor.tipo_licencia}</p>
                <p className="hidden md:block truncate max-w-[150px]">{conductor.fecha_vencimiento_licencia}</p>
                <p className="hidden md:block truncate max-w-[150px]" title={conductor.email}>{conductor.email}</p>
                <p className="hidden md:block">{conductor.estado}</p>
                <p className="hidden md:block">{conductor.placa}</p>

                {/* Móvil */}
                <div className="block md:hidden mb-2">
                  <p><span className="font-bold">Nombres: </span>{conductor.nombres}</p>
                  <p><span className="font-bold">Apellidos: </span>{conductor.apellidos}</p>
                  <p><span className="font-bold">Teléfono: </span>{conductor.telefono}</p>
                  <p><span className="font-bold">Licencia: </span>{conductor.tipo_licencia}</p>
                  <p><span className="font-bold">Vence: </span>{conductor.fecha_vencimiento_licencia}</p>
                  <p className="break-words"><span className="font-bold">Email: </span>{conductor.email}</p>
                  <p><span className="font-bold">Estado: </span>{conductor.estado}</p>
                  <p><span className="font-bold">Placa: </span>{conductor.placa}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => { setShowForm(true); setModoEdicion(true); setConductorEditarIndex(index); setNuevoConductor(conductor); }} className="w-10 h-10 bg-[var(--Vclaro3)] text-white rounded-md flex items-center justify-center hover:scale-105"><MdEdit /></button>
                    <button className="w-10 h-10 bg-[var(--Rojo)] text-white rounded-md flex items-center justify-center hover:scale-105"><AiOutlineDelete /></button>
                  </div>
                </div>

                {/* Botones desktop */}
                <div className="hidden md:flex gap-2 justify-center">
                  <button onClick={() => { setShowForm(true); setModoEdicion(true); setConductorEditarIndex(index); setNuevoConductor(conductor); }} className="w-10 h-10 bg-[var(--Vclaro3)] text-white rounded-md flex items-center justify-center hover:scale-105"><MdEdit /></button>
                  <button className="w-10 h-10 bg-[var(--Rojo)] text-white rounded-md flex items-center justify-center hover:scale-105"><AiOutlineDelete /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <form onSubmit={handleSubmitDriver} className="bg-[var(--Voscuro4)] p-6 rounded-lg shadow-lg w-96 text-white flex flex-col gap-4">
            <h2 className="text-2xl mb-2">{modoEdicion ? 'Editar Conductor' : 'Agregar Conductor'}</h2>
            <input type="text" name="nombres" value={nuevoConductor.nombres} onChange={handleInputChange} placeholder="Nombres" className="p-2 rounded bg-[var(--Voscuro2)] text-white border" />
            <input type="text" name="apellidos" value={nuevoConductor.apellidos} onChange={handleInputChange} placeholder="Apellidos" className="p-2 rounded bg-[var(--Voscuro2)] text-white border" />
            <input type="text" name="telefono" value={nuevoConductor.telefono} onChange={handleInputChange} placeholder="Teléfono" className="p-2 rounded bg-[var(--Voscuro2)] text-white border" />
            <input type="text" name="tipo_licencia" value={nuevoConductor.tipo_licencia} onChange={handleInputChange} placeholder="Tipo de Licencia" className="p-2 rounded bg-[var(--Voscuro2)] text-white border" />
            <input type="date" name="fecha_vencimiento_licencia" value={nuevoConductor.fecha_vencimiento_licencia} onChange={handleInputChange} className="p-2 rounded bg-[var(--Voscuro2)] text-white border" />
            <input type="email" name="email" value={nuevoConductor.email} onChange={handleInputChange} placeholder="Correo electrónico" className="p-2 rounded bg-[var(--Voscuro2)] text-white border" />
            <input type="password" name="password" value={nuevoConductor.password} onChange={handleInputChange} placeholder="Contraseña" className="p-2 rounded bg-[var(--Voscuro2)] text-white border" />
            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="bg-[var(--Rojo)] px-4 py-2 rounded">Cancelar</button>
              <button type="submit" className="bg-[var(--Vclaro3)] px-4 py-2 rounded">Guardar</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default Conductores;
