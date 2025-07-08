const GoogleLoginButton = () => (
    <button className="flex items-center justify-between w-full border border-gray-300 rounded-full px-4 py-2 mb-3 hover:bg-gray-100 transition">
      <div className="flex items-center space-x-3">
        <img
          src="https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"
          alt="Avatar"
          className="w-6 h-6 rounded-full"
        />
        <span>Inicia sesión como jahir</span>
      </div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="Google"
        className="w-5 h-5"
      />
    </button>
  );
  
  export default GoogleLoginButton;