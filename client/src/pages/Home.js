import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { motion } from 'framer-motion';
import SculptureModel from '../components/SculptureModel';

function Home() {
  return (
    <div className="min-h-screen text-white pt-20">
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Global background is visible now */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black z-0"></div>

        <div className="z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter"
          >
            SHARP OFFICIAL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
          >
            SKINHEAD • PUNK • REGGAE • ACCESSORIES
          </motion.p>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-3 rounded-full font-bold text-lg uppercase hover:bg-gray-200 transition-colors"
            >
              Explorar Colección
            </motion.button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Autenticidad Rebelde</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Desde las botas militares hasta los accesorios más contundentes.
              Nuestra colección celebra la cultura underground con piezas seleccionadas
              para quienes no siguen las reglas.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-64 bg-gray-800 rounded-lg overflow-hidden">
              <img src="/images/skinhead.jpg" alt="Style 1" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-64 bg-gray-800 rounded-lg overflow-hidden translate-y-8">
              <img src="/images/punk.jpg" alt="Style 2" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light leading-relaxed">
          Bienvenidos a la comunidad Sharp Official el espacio ideal para pasar un momento fenomenal en todos los aspectos. Cuando te sumerges en la profundidad de nuestro servicio encuentras la fortaleza, inspiración, motivación, y absoluta conciencia para respetar cualquier cultura sea la que sea, sin distinciones, ni mucho menos agresiones, el objetivo es sencillo : Ser parte de la transformación, dando nuestro mayor esfuerzo posible para aportar esperanza a la comunidad, mediante conversaciones e incluso compras-ventas, logrando armonía y unidad holistica. La fundación Sharp Official es un proyecto que busca promover la cultura underground, la cultura punk, la cultura skinhead, la cultura reggae y la cultura de los accesorios, para que todos puedan disfrutar de la cultura es necesario absoluto respeto. Date una vuelta por el sitio y descubre la desconocido.
        </p>
        <div className="flex justify-center mb-16">
          <img
            src="/images/LOgoSharp.jpg"
            alt="Sharp Official Logo"
            className="w-full max-w-2xl object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-96">
            <SculptureModel modelUrl="/models/black_leather_boot.glb" rotation={[0, Math.PI * 1.2, 0]} />
          </div>
          <div className="h-96">
            <SculptureModel modelUrl="/models/boots.glb" rotation={[0, Math.PI * 1.2, 0]} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
