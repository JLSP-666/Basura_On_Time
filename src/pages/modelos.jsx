import Logo from '../components/Logo';
import GoogleLoginButton from '../components/GoogleLoginButton';
import AppleLoginButton from '../components/AppleLoginButton';
import Divider from '../components/Divider';
import CreateAccountForm from '../components/CreateAccountForm';
import Footer from '../components/Footer';

const XLanding = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-black">
      <div className="flex flex-1">
        <Logo />

        <div className="w-1/2 flex flex-col justify-center px-8">
          <h1 className="text-5xl font-bold mb-12 leading-tight">
            Lo que está <br /> pasando ahora
          </h1>

          <h2 className="text-2xl font-bold mb-6">Únete Hoy</h2>

          <GoogleLoginButton />
          <AppleLoginButton />
          <Divider />
          <CreateAccountForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default XLanding;
