import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaWandMagicSparkles, FaCookieBite, FaWrench } from "react-icons/fa6";
import "./layout.css";
import {
  Home,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import profilePic from "./assets/profile-pic.jpg"

export default function LayoutPage({ user, children, onLogout }) {
  const [isOpen, setIsOpen] = useState(false); 
  const [homeOpen, setHomeOpen] = useState(true);
  const [networksOpen, setNetworksOpen] = useState(true); 
  const sidebarRef = useRef(null);
  // const [openDropdown, setOpenDropdown] = useState(null);
//   const toggleDropdown = (name) => {
//   setOpenDropdown(openDropdown === name ? null : name);
// };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

   if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // const navigate = useNavigate();

  const handleGoBack = () => {
    onLogout();
  };
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`} ref={sidebarRef}>
        <nav>
          <div className="logo">Trimzales</div>
            {/* HOME DROPDOWN */}
            <div className="dropdown">
              <div
                className="dropdown-header"
                onClick={() => setHomeOpen(!homeOpen)}
              >
                <span className="dropdown-title">
                  <Home size={18} /> Home
                </span>
                {homeOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              {homeOpen && (
                <ul className="dropdown-list">
                  <li><span>📊</span> Dashboard</li>
                  <li>
                    <span>🔖</span> Bookmarks
                    <span className="badge">8</span>
                  </li>
                  <li><span>👥</span> Team</li>
                  <li>
                    <span>💬</span> Messages
                    <span className="badge gray">2</span>
                  </li>
                  <li><span>📅</span> Calendar</li>
                </ul>
              )}
            </div>
            {/* NETWORKS DROPDOWN */}
            <div className="dropdown">
              <div
                className="dropdown-header"
                onClick={() => setNetworksOpen(!networksOpen)}>
                <span className="dropdown-title">Your Networks</span>
                {networksOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              {networksOpen && (
                <ul className="dropdown-list">
                  <li className="purple"> <FaWandMagicSparkles /> Front-End Developers</li>
                  <li className="yellow"> <FaWrench /> Back-End Developers</li>
                  <li className="green"> <FaCookieBite /> UI/UX Designers</li>
                </ul>
              )}
            </div>
          </nav>
          <div className="sidebar-footer">
            <ul className="dropdown-list">
              <li>❓Help</li>
              <li>⚙️Settings</li>
            </ul>
          </div>
          </aside>
        {/* Main Content */}
        <div className="main-content">
          <div className="notif">
          <span className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </span>
          <div className="search-bar">
          <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              id="search-input"
            />
          </div>
          <div className="right">
          <p className="welcome-message">Welcome back, {user?.username}</p>
          <img
            src={profilePic}
            alt="profile"
            className="profile-pic"
            />
          </div>
          </div>
         <div className="content-box">
          {children || (
            <div className="dashboard-content">
              <h2>Dashboard</h2>
              <div className="user-info">
                <p><strong>Username:</strong> {user?.username}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>ID:</strong> {user?.id}</p>
              </div>
            </div>
          )}
          <button className="back" onClick={handleGoBack}>Logout</button>
         </div>
        </div>
    </div>
  );
}
