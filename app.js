const { useState, useEffect } = React;
const { Ghost, Gamepad2, Trophy, User, Mail, ExternalLink } = lucide;

const App = () => {
  const [glowColor, setGlowColor] = useState('purple');
  const [githubStats, setGithubStats] = useState({ repos: 0, contributions: 0 });

  useEffect(() => {
    const colors = ['#FF0080', '#7928CA', '#0070F3'];
    let colorIndex = 0;
    
    const interval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setGlowColor(colors[colorIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/KozaWorld');
        const data = await response.json();
        setGithubStats({
          repos: data.public_repos || 0,
          contributions: 0
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      }
    };

    fetchGithubStats();
    const interval = setInterval(fetchGithubStats, 300000);
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      title: "TextRPG Maker",
      description: "A powerful engine for creating text-based RPG adventures. Build your own RPG stories with our intuitive engine.",
      tech: ["Game Engine", "RPG", "Text-Based"],
      link: "https://kozacreations.itch.io/text-based-rpg-kozaengine"
    },
    {
      title: "EoServ Private Server Launcher",
      description: "Custom launcher for managing and connecting to private Endless Online servers. Streamline your EO private server experience.",
      tech: ["Game Launcher", "Endless Online", "Networking"],
      link: "https://kozacreations.itch.io/eoserv-custom-launcher"
    },
    {
      title: "Endless Online Encyclopedia",
      description: "Comprehensive database and reference guide for Endless Online. Explore items, monsters, and game mechanics.",
      tech: ["Database", "Wiki", "Game Guide"],
      link: "https://kozacreations.itch.io/eoencyclopedia"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Rest of the component code remains the same */}
      {/* Header Section */}
      <header className="text-center mb-16 relative">
        <div 
          className="absolute inset-0 blur-[100px] opacity-50"
          style={{ 
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            transition: 'background 0.5s ease'
          }}
        />
        <h1 className="text-6xl font-bold mb-4 relative">
          KOZA
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            WORLD
          </span>
        </h1>
        <div className="flex items-center justify-center gap-4 text-xl">
          <Ghost className="animate-bounce" />
          <span>PRESS START TO EXPLORE</span>
          <Ghost className="animate-bounce" />
        </div>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-6 rounded-lg text-center transform hover:scale-105 transition-transform">
          <Trophy className="mx-auto mb-2" />
          <h3 className="text-xl font-bold">Repositories</h3>
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
            LEVEL {githubStats.repos}
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6 rounded-lg text-center transform hover:scale-105 transition-transform">
          <Gamepad2 className="mx-auto mb-2" />
          <h3 className="text-xl font-bold">Contributions</h3>
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-200">
            {githubStats.contributions} XP
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all"
          >
            <h3 className="text-xl font-bold mb-2 text-purple-400">{project.title}</h3>
            <p className="mb-4 text-gray-300">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, i) => (
                <span key={i} className="px-2 py-1 bg-purple-900/50 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
            >
              View Project <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <footer className="text-center">
        <h2 className="text-2xl font-bold mb-4">CONNECT WITH ME</h2>
        <div className="flex justify-center gap-6">
          <a href="https://github.com/KozaWorld" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
            <User size={24} />
          </a>
          <a href="#" className="hover:text-purple-400 transition-colors">
            <Mail size={24} />
          </a>
          <a href="https://kozacreations.itch.io" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
            <Ghost size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
