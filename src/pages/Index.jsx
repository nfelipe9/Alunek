import React from "react";

const Index = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-400 to-purple-800 h-900 border-1 border-gray-400">
      <div className="">
        <h1 className="pt-7 bg- text-4xl text-center font-bold text-white">
          Proyectos De Investigación
        </h1>
        <img
          className="pt-6 h-full w-full"
          src="images/Indicadores.png"
          alt="Indicadores"
        />
      </div>
      <div className="bg-gradient-to-r from-indigo-400 to-purple-800 h-70 border-1 border-gray-400">
        <div className="pt-10">
          <h2 className="text-4xl text-center font-bold text-white">
            Controla todas tus tareas desde la plataforma
          </h2>
          <p className="pt-10 text-xl text-center text-gray-200">
            Es muy importante hacer seguimiento a tus proyectos. En la
            plataforma de la universidad tienes todas estas herramientas para
            que lo hagas de una buena manera y tu proyecto sea un éxito
          </p>
          <p className="pt-5 my-2 mx-10 text-l text-center text-gray-200">
            «Las operaciones mantienen las luces encendidas, la estrategia
            proporciona una luz al final del túnel, pero la gestión del proyecto
            es el motor del tren que hace avanzar a la organización.» – Joy
            Gumz.
          </p>
        </div>
      </div>
      <div className="">
        <div className="p-10 flex">
          <div className="max-w-sm border border-gray-400 rounded-2xl m-10 ml-20 p-5 overflow-hidden shadow-2xl">
            <img className="w-" src="/images/cardIndex(1).jpg" alt="Organiza" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl text-gray-200 text-center mb-2">
                Organiza Tus Proyectos
              </div>
              <p className="text-gray-300 text-base">
              Nuestro compromiso con el fomento de la empleabilidad de los estudiantes se ve reflejado en la máxima 
              puntuación otorgada en este aspecto en el ranking internacional QS Stars.
              </p>
            </div>
          </div>
          <div className="max-w-sm border border-gray-400 rounded-2xl m-10 p-5 overflow-hidden shadow-2xl">
            <img
              className="w-full"
              src="/images/cardIndex2.jpg"
              alt="Organiza"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl text-gray-200 text-center mb-2">
                Comparte Tus Ideas
              </div>
              <p className="text-gray-300 text-base">
              El mundo ha cambiado y el empleo también. Hoy, además de dominar los conocimientos de tu especialidad 
              es necesario tener habilidades personales, digitales, internacionales y multidisciplinares.
              </p>
            </div>
          </div>
        </div>
        <section className="pb-10 bg-gradient-to-r from-indigo-400 to-purple-800 -mt-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {/* Card 1 */}
              <div className="lg:pt-20 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-gray-200 w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-sitemap"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Crea Y Edita Tareas
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                    Encontrarás un modelo de formación que combina excelencia académica, 
                    experiencia internacional, personalización y adquisición de nuevas competencias.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="w-full md:w-4/12 pt-12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-gray-200 w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-purple-400">
                      <i className="fas fa-users"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Controla Los Recursos
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                    Centrado en metodología, prácticas y herramientas el posgrado forma a los participantes en temas como negociación, 
                    liderazgo y gestión de proyectos complejos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3*/}
              <div className="pt-20 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-gray-200 w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-hands-helping"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Alcanza Tus Metas</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                    Laboraras en el campo de la gestión de proyectos, como director, gerente de oficina de Proyectos (PMO),
                    consultor independiente, gerentes de proyectos, desarrollador y analista.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row  justify-between items-center content-center bg-gray-200 h-20 w-full sm:h22">
        <img
            className="p-1 mx-20 h-16 flex-row inset-x-2 "
            src="images/logo.png"
            alt="Indicadores"
          />
        <h6 className="pt-2 mx-20 flex-row font-semibold text-center text-gray-700">
          EQUIPO ALUNEK @ 2021          
        </h6>
        <img
        className="p-1 mx-20 h-16 flex-row inset-x-2 "
        src="images/MisionTic.png"
        alt="Indicadores"
        />
        
          
        </div>
      </div>
    </div>
  );
};

export default Index;
