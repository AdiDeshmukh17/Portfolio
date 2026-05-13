import Navbar from './Components/Navbar';
import HeroSection from './Components/HeroSection';
import About from './Components/About';
import SkillsSection from './Components/Skill';
import Projects from './Components/Project';
import Contact from './Components/Contact';

function App() {
  return (
    <div className="bg-gray-950 text-white">
      <Navbar />
      <section id="home">
        <HeroSection />
      </section>
      <About />
      <SkillsSection />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;