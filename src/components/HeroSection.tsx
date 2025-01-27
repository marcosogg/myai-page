const HeroSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary animate-gradient bg-[length:400%_400%]">
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Your Next Project
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Build something amazing with modern web technologies
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;