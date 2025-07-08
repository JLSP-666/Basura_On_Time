import { NavLink } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md"; // Ícono de volver moderno


export const ItemNavBar = ({ route }) => {
  return (
    <NavLink to={route}>
      <button className="group cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 active:scale-95 flex items-center gap-2 bg-[rgb(0,50,37)] text-white px-6 py-3 rounded-2xl shadow-md">
        <MdArrowBackIosNew className="text-2xl group-hover:scale-110 transition-transform" />
        <span className="text-base font-semibold tracking-wide">Volver</span>
      </button>
    </NavLink>
  );
};

export default ItemNavBar;
