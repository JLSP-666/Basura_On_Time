// src/UI/ItemNavBar/ItemNavBar.jsx
import { NavLink } from "react-router-dom";
import './ItemNavBar.css';

export const ItemNavBar = ({ route, icon: Icon, label, children, className }) => {
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        `navlink-button flex items-center gap-2 px-3 py-2 rounded-md font-semibold transition
         ${isActive ? 'active text-lime-400' : 'text-white hover:text-lime-400'} 
         ${className ?? ''}`
      }
    >
      {
        children ? (
          children
        ) : (
          <>
            {Icon && <Icon size={20} />}
            <span>{label}</span>
          </>
        )
      }
    </NavLink>
  );
};
