import { useState } from 'react';
import './Conductores.css';
import logoBasuraOnTime from '../../assets/img/icons/logoBasuraOnTime.png';
import { MdEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { ItemNavBar } from '../../UI/BotonBack/BotonBack';
import Swal from 'sweetalert2';
import axios from 'axios';

const Conductores = () => {
  const fk_id_usuario = localStorage.getItem('fk_id_usuario');
  const token = localStorage.getItem('token')
  const [id_rol] = useState(3); // Rol fijo para conductor

  const [conductores, setConductores] = useState([]);
  const [nuevoConductor, setNuevoConductor] = useState({
    nombres: '', apellidos: '', telefono: '', tipo_licencia: '', fecha_vencimiento_licencia: '',
    email: '', password: ''
  });

  const [modoEdicion, setModoEdicion] = useState(false);
  const [conductorEditarIndex, setConductorEditarIndex] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [showForm, setShowForm] = useState(false);

  


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

    console.log(nuevoConductor);
    console.log(fk_id_usuario, id_rol)
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

      localStorage.removeItem('fk_id_usuario', fk_id_usuario)

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
  };

  const conductoresFiltrados = conductores.filter(conductor =>
    Object.values(conductor).some(valor =>
      valor?.toString().toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  return (
    <section className="sectFirst min-h-screen flex flex-col md:flex-row bg-[var(--Voscuro2)]">
      {/* Sidebar PC */}
      <div className="hidden md:flex flex-col justify-center items-center h-screen bg-[var(--Voscuro2)] fixed left-0 z-10 xl:w-75 2xl:w-140">
        <div className="absolute top-4 left-4 z-50">
          <ItemNavBar route="/PanelAdmin" content=" " />
        </div>
        <img className="xl:w-50 2xl:w-90" src={logoBasuraOnTime} alt="Logo Basura On Time" />
        <p className="FontCursive xl:text-4xl 2xl:text-5xl text-center text-white">BASURA ON TIME</p>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col items-center justify-start xl:ml-25 2xl:ml-[250px] px-4 pt-28 md:pt-6 pb-6 FontGeologica relative w-full overflow-y-auto">

        <div className="mt-35 sm:mt-10 2xl:ml-80 xl:ml-50 bg-[var(--Voscuro2)] p-6 rounded-lg w-full max-w-[900px]">
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
            <div className="hidden md:grid grid-cols-7 gap-2 text-center items-center text-lg rounded-t-md h-14 p-3 border border-[var(--Vclaro3)] bg-[var(--Voscuro4)]">
              <p>Nombres</p><p>Apellidos</p><p>Teléfono</p><p>Licencia</p><p>Vence</p><p>Email</p><p>Acción</p>
            </div>

            {conductoresFiltrados.map((conductor, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-2 text-left md:text-center text-sm md:text-lg p-4 border border-[var(--Vclaro3)]">
                <p>{conductor.nombres}</p>
                <p>{conductor.apellidos}</p>
                <p>{conductor.telefono}</p>
                <p>{conductor.tipo_licencia}</p>
                <p>{conductor.fecha_vencimiento_licencia}</p>
                <p className="truncate max-w-[150px]" title={conductor.email}>{conductor.email}</p>
                <div className="flex gap-2 md:justify-center">
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