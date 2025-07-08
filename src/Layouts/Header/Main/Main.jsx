import logo from "../../../assets/img/icons/logo.png";
import TextBox from '../../../UI/Text-Box/Text-Box';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import './Main.css';

const Main = () => {
  return (
    <main className="FontGeologica">

      <section id="inicio" className="section-offset bg-white text-[var(--Voscuro2)] py-30 px-6 flex flex-col items-center justify-center text-center min-h-[50vh]">

        <img src={logo} alt="logo"
          className="w-40 sm:w-60 md:w-80 lg:w-96 xl:w-[300px] 2xl:w-[400px]"
        />

        <p className="FontCursiveClean text-[var(--Voscuro2)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl ">
          Basura On Time
        </p>

      </section>


      {/* Servicios */}
      <section id="servicios" className="section-offset py-16 px-6 bg-[var(--Voscuro)] text-white text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Nuestros Servicios</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          <TextBox />
          <TextBox />
          <TextBox />
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="section-offset py-20 px-6 bg-white text-[var(--Voscuro2)] text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10">¿Cómo funciona?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          <div className="p-4">
            <h3 className="text-xl md:text-2xl font-bold mb-2">1. Registrate</h3>
            <p className="text-base md:text-xl">Crea tu cuenta y elegí tu zona.</p>
          </div>
          <div className="p-4">
            <h3 className="text-xl md:text-2xl font-bold mb-2">2. Pedí recolección</h3>
            <p className="text-base md:text-xl">Seleccioná el tipo de residuos y la fecha de retiro.</p>
          </div>
          <div className="p-4">
            <h3 className="text-xl md:text-2xl font-bold mb-2">3. Nosotros pasamos</h3>
            <p className="text-base md:text-xl">Un camión se encarga de retirarlos según lo programado.</p>
          </div>
        </div>
      </section>

      {/* Impacto positivo */}
      <section id="impacto-positivo" className="section-offset bg-[var(--Voscuro2)] py-20 px-6 text-center text-white">
        <h2 className="text-2xl md:text-4xl font-semibold mb-14">Impacto positivo</h2>
        <div className="grid md:grid-cols-4 gap-10 max-w-[1200px] mx-auto">
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold mb-2">+10,000</h3>
            <p className="text-sm md:text-base">Usuarios registrados</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold mb-2">+50 Tn</h3>
            <p className="text-sm md:text-base">Residuos reciclados</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold mb-2">+120</h3>
            <p className="text-sm md:text-base">Camiones activos</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold mb-2">24/7</h3>
            <p className="text-sm md:text-base">Servicio disponible</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-white text-[var(--Voscuro2)] py-10 px-4 FontGeologica">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

          {/* Enlaces */}
          <div>
            <h4 className="text-lg mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#inicio" className="hover:underline">Inicio</a></li>
              <li><a href="#servicios" className="hover:underline">Servicios</a></li>
              <li><a href="#como-funciona" className="hover:underline">Cómo funciona</a></li>
              <li><a href="#impacto-positivo" className="hover:underline">Impacto positivo</a></li>
              <li><a href="#contacto" className="hover:underline">Información</a></li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h4 className="text-lg FontGeologica mb-4">Síguenos</h4>
            <div className="flex justify-center gap-6 text-2xl">
              <a href="https://www.facebook.com/profile.php?id=61577996528752" target="_blank" aria-label="Facebook" className="hover:text-[var(--Vclaro)]">
                <FaFacebook />
              </a>
              <a href="https://x.com/OnBasura" target="_blank" aria-label="Twitter" className="hover:text-[var(--Vclaro)]">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/ba_on_time/" target="_blank" aria-label="Instagram" className="hover:text-[var(--Vclaro)]">
                <FaInstagram />
              </a>
            </div>
          </div>


          {/* Contacto */}
          <div>
            <h4 className="text-lg FontGeologica">Contacto</h4>
            <p className="text-sm">brayanaguirresena@gmail.com</p>
            <p className="text-sm">+57 310 366 9604</p>
            <p className="text-sm">Colombia</p>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-10 text-xs FontGeologica text-[var(--Voscuro2)] text-center">
          © {new Date().getFullYear()} Basura On Time. Todos los derechos reservados.
        </div>
      </footer>

    </main>
  )
}

export default Main;
