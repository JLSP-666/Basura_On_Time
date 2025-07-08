import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logoBasuraOnTime from '../../assets/img/icons/logoBasuraOnTime.png';
import { TfiMapAlt } from "react-icons/tfi";
import { IoDocumentText } from "react-icons/io5";
import { RiTruckFill } from "react-icons/ri";
import { ItemNavBar } from '../../UI/ItemNavBar/ItemNavBar';
import { FaUserTie } from "react-icons/fa";

import './PanelAdmin.css';

const PanelAdmin = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        Swal.fire({
            icon: 'error',
            title: 'Sesión cerrada',
            showConfirmButton: false,
            timer: 1500,
        }).then(() => navigate('/Admin'));
    };

    return (
        <section className="sectFirst min-h-screen flex flex-col md:flex-row bg-[var(--Voscuro2)]">

            {/* Sidebar PC */}
            <div className="hidden md:flex flex-col justify-center items-center xl:w-120 2xl:w-160 h-screen bg-[var(--Voscuro2)] fixed left-0 z-10">
                <img className="xl:w-50 2xl:w-90" src={logoBasuraOnTime} alt="Logo Basura On Time" />
                <p className="FontCursive xl:text-5xl 2xl:text-5xl text-center text-white">BASURA ON TIME</p>
            </div>

            {/* Header Móvil Fijo */}
            <div className="md:hidden bg-[var(--Voscuro2)] w-full flex flex-col items-center pt-2 pb-4 fixed top-0 left-0 z-50">
                <img src={logoBasuraOnTime} alt="Logo Basura On Time" className="w-28 h-auto mt-2" />
                <p className="FontCursive text-3xl text-white mt-2">BASURA ON TIME</p>
            </div>

            {/* Contenido Principal */}
            <div className="flex-1 flex flex-col items-center justify-start xl:ml-120 2xl:ml-180 px-4 pt-28 md:pt-6 pb-6 FontGeologica relative">

                <p className="text-lg md:text-5xl text-white mt-25 sm:mt-2 text-center">
                    Panel de Administración
                </p>


                <div className="grid grid-cols-2 sm:grid-cols-2 mt-7 sm:mt-10 items-center gap-4 md:gap-8 w-full max-w-[600px]">

                    <ItemNavBar route="/Camiones">
                        <button className="group cursor-pointer flex flex-col justify-center items-center text-white bg-[var(--Voscuro2)]
                        rounded-2xl w-32 h-32 md:w-60 md:h-60 text-base md:text-3xl gap-2 md:gap-3
                        transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95">
                            <RiTruckFill className="w-14 h-14 md:w-35 md:h-35 transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105" />
                            Camiones
                        </button>
                    </ItemNavBar>

                    <ItemNavBar route="/Rutas">
                        <button className="group cursor-pointer flex flex-col justify-center items-center text-white bg-[var(--Voscuro2)]
                        rounded-2xl w-32 h-32 md:w-60 md:h-60 text-base md:text-3xl gap-2 md:gap-3
                        transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95">
                            <TfiMapAlt className="w-14 h-14 md:w-35 md:h-35 transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105" />
                            Rutas
                        </button>
                    </ItemNavBar>

                    <ItemNavBar route="/Solicitudes">
                        <button className="group cursor-pointer flex flex-col justify-center items-center text-white bg-[var(--Voscuro2)]
                        rounded-2xl w-32 h-32 md:w-60 md:h-60 text-base md:text-3xl gap-2 md:gap-3
                        transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95">
                            <IoDocumentText className="w-14 h-14 md:w-35 md:h-35 transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105" />
                            Solicitudes
                        </button>
                    </ItemNavBar>

                    <ItemNavBar route="/Conductores">
                        <button className="group cursor-pointer flex flex-col justify-center items-center text-white bg-[var(--Voscuro2)]
                        rounded-2xl w-32 h-32 md:w-60 md:h-60 text-base md:text-3xl gap-2 md:gap-3
                        transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95">
                            <FaUserTie className="w-14 h-14 md:w-35 md:h-35 transition-transform duration-300 group-hover:rotate-2 group-hover:scale-105" />
                            Conductores
                        </button>
                    </ItemNavBar>

                </div>



                {/* Botón Cerrar Sesión */}
                <button
                    className="group cursor-pointer mt-5 mr-5 ml-5 mb-2  bg-red-500 text-white px-9 py-6 sm:px-6 sm:py-4 text-lg md:text-xl rounded-lg  hover:bg-red-600 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95"
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </button>


            </div>

        </section>
    );
};

export default PanelAdmin;
