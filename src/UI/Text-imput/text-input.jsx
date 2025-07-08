const LoginForm = () => {
    return (
      <form className="flex flex-col items-center gap-4 w-full max-w-">
       
  
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full px-4 py-2 rounded-full text-center text-gray-600 placeholder-gray-400 focus:outline-none"
        />
  
        <hr className="w-2/3 border-gray-400" />
  
        <button
          type="submit"
          className="w-full bg-black text-white font-bold py-2 rounded-full hover:opacity-90 transition"
        >
          Iniciar sesión
        </button>
  
        <button
          type="button"
          className="w-full bg-black text-white font-bold py-2 rounded-full hover:opacity-90 transition"
        >
          Crear Cuenta
        </button>
      </form>
    );
  };
  
  export default LoginForm;
  