import React, { useEffect, useState } from "react";

const PageWrapper = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Activa la animación justo después de montar
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 10); // corto delay para asegurar que las clases iniciales se apliquen

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ease-out transform min-h-screen ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
