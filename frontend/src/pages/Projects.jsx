import { FaGithub, FaExternalLinkAlt, FaCode, FaServer, FaMobileAlt } from 'react-icons/fa';

const projects = [
  {
    title: "Code Compilation Platform",
    description:
      "A distributed microservices platform for multi-language code execution, built with real-time communication and robust admin tools.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/abhijeetGupta7/Code_Submisson_Platform_BACKEND",
    live: "",
    tech: ["TypeScript", "Fastify", "MongoDB", "Redis", "Docker"],
    category: "backend"
  },
  {
    title: "Ride Sharing Platform",
    description:
      "A real-time ride booking app with location tracking, JWT-based auth, and WebSocket-powered driver-rider communication.",
    image: "https://api.time.com/wp-content/uploads/2016/11/confirmation_01.png",
    github: "https://github.com/abhijeetGupta7/Ridee-overview",
    live: "https://ride-frontend.onrender.com",
    tech: ["React", "Tailwind", "Node.js", "WebSocket", "Google Maps API"],
    category: "fullstack"
  },
  {
    title: "Pokédex App",
    description:
      "A sleek and interactive Pokémon browser built with PokéAPI, featuring search, filters, and individual detail views.",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    github: "https://github.com/abhijeetGupta7/Pokedex",
    live: "https://pokedex-pi-black.vercel.app/",
    tech: ["React", "Vite", "React Router"],
    category: "frontend"
  },
];

const categoryIcons = {
  backend: <FaServer className="text-blue-500" />,
  frontend: <FaMobileAlt className="text-purple-500" />,
  fullstack: <FaCode className="text-green-500" />,
};

export default function Projects() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-8 lg:px-20 min-h-screen text-gray-800">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 relative inline-block">
          <span className="relative z-10">My Projects</span>
          <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-200 opacity-40 -z-0"></span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Here are some of my featured projects. Each one was built to solve unique challenges and demonstrate different aspects of my skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-56 overflow-hidden group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex space-x-2">
                  {project.tech.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white/90 text-gray-800 px-2 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs bg-white/90 text-gray-800 px-2 py-1 rounded-full">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm flex items-center">
                {categoryIcons[project.category]}
                <span className="ml-2 text-xs font-medium capitalize">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-900">
                  {project.title}
                </h2>
                <div className="flex space-x-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                    title="View Code"
                  >
                    <FaGithub size={18} />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                      title="Live Demo"
                    >
                      <FaExternalLinkAlt size={16} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-4 flex-1">{project.description}</p>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors cursor-default"
                      title={t}
                    >
                      {t.length > 10 ? `${t.substring(0, 8)}..` : t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-gray-500 mb-4">Want to see more?</p>
        <a
          href="https://github.com/abhijeetGupta7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
        >
          <FaGithub className="mr-2" />
          View All Projects on GitHub
        </a>
      </div>
    </div>
  );
}
