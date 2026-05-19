import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-950/90 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
      <div className="flex items-center gap-2.5">
  <img
    src="https://drive.google.com/file/d/1oWzcmycLJKfdKGuR-39pBdPFYMo6J92M/view?usp=sharing"
    alt="Aditya Deshmukh"
    className="w-8 h-8 rounded-full object-cover border border-cyan-400/40"
  />
  <span className="text-lg font-semibold text-white">
    Aditya Deshmukh
  </span>
</div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-1 list-none">
          {navLinks.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-200 block ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-400/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-cyan-400 rounded-full"></span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1.5 border-none bg-transparent cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-[22px] h-[1.5px] bg-white/70 rounded transition-transform duration-200 ${
              menuOpen ? 'translate-y-[6.5px] rotate-45' : ''
            }`}
          ></span>
          <span
            className={`block w-[22px] h-[1.5px] bg-white/70 rounded transition-opacity duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`block w-[22px] h-[1.5px] bg-white/70 rounded transition-transform duration-200 ${
              menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950/95 border-t border-white/5 px-6 py-3 flex flex-col gap-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                activeSection === href.slice(1)
                  ? 'text-cyan-400 bg-cyan-400/10'
                  : 'text-white/60 hover:text-cyan-400 hover:bg-cyan-400/5'
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;