import type { MouseEvent } from "react";
import { useMemo } from "react";
import { useLocation } from "react-router";
import { useActiveSection } from "../hooks/useActiveSection";

interface NavbarProps {
  onNavClick?: (e: MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const NAV_ITEMS = [
  {
    label: "About",
    id: "#about",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
  },
  {
    label: "Stack",
    id: "#skills",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
  },
  {
    label: "Journey",
    id: "#experience",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
  },
  {
    label: "Impact",
    id: "#projects",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
  },
  {
    label: "Log",
    id: "/blog",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
  },
];

export function Navbar({ onNavClick }: NavbarProps) {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  
  const sectionIds = useMemo(() => 
    NAV_ITEMS.filter(item => item.id.startsWith('#')).map(item => item.id),
    []
  );
  
  const activeSection = useActiveSection(sectionIds);

  const isActive = (itemId: string) => {
    if (itemId.startsWith('#')) {
      return activeSection === itemId;
    }
    return pathname === itemId || pathname.startsWith(itemId + '/');
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (isHomePage) {
      if (onNavClick) {
        onNavClick(e, targetId);
      } else if (targetId.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav>
        <div className="nav-logo">
          <a href="/">
            <img
              src="/images/SumitKar.in.png"
              alt="Sumit Kar"
              className="site-logo"
              width={200}
              height={75}
              decoding="async"
              fetchPriority="high"
            />
          </a>
        </div>

        <div className="hud-nav-center md:hidden">
          <div className="hud-line-glow"></div>
        </div>

        <ul className="nav-links hidden md:flex">
          <li>
            <a href="/" className={isHomePage ? "active" : ""}>Home</a>
          </li>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              {item.id.startsWith('#') ? (
                isHomePage ? (
                  <a 
                    href={item.id} 
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={isActive(item.id) ? "active" : ""}
                  >
                    {item.label}
                  </a>
                ) : (
                  <a href={`/${item.id}`}>{item.label}</a>
                )
              ) : (
                <a
                  href={item.id}
                  className={isActive(item.id) ? "active" : ""}
                >
                  {item.label === "Log" ? "Transmission Log" : item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <form action="/blog" method="get" className="nav-search hidden lg:flex" role="search">
          <label htmlFor="nav-search-input" className="sr-only">
            Search blog posts
          </label>
          <input
            id="nav-search-input"
            name="q"
            type="search"
            placeholder="Search blog logs..."
            className="nav-search-input"
          />
          <button type="submit" className="nav-search-button">
            Search
          </button>
        </form>

        <div className="nav-status">
          <div className="status-dot"></div>
          <span className="md:inline hidden">available</span>
          <span className="md:hidden inline">active</span>
        </div>
      </nav>

      <div className="hud-dock-wrapper md:hidden">
        <div className="hud-dock">
          <a href="/" className={`dock-item ${isHomePage ? 'active' : ''}`} aria-label="Home">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span className="dock-label">Home</span>
          </a>
          {NAV_ITEMS.map((item) => (
            <div key={item.id} className="dock-item-wrap">
              {item.id.startsWith('#') ? (
                isHomePage ? (
                  <a 
                    href={item.id} 
                    className={`dock-item ${isActive(item.id) ? 'active' : ''}`} 
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    {item.icon}
                    <span className="dock-label">{item.label}</span>
                  </a>
                ) : (
                  <a href={`/${item.id}`} className="dock-item">
                    {item.icon}
                    <span className="dock-label">{item.label}</span>
                  </a>
                )
              ) : (
                <a
                  href={item.id}
                  className={`dock-item ${isActive(item.id) ? 'active' : ''}`}
                >
                  {item.icon}
                  <span className="dock-label">{item.label}</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
