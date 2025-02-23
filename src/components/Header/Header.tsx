import './Header.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation()

  return (
    <header className="header">
      <Link to='/' className={`link ${location.pathname === '/'?'link_active':''}`}>Все заклинания</Link>
      <Link to='/saved' className={`link ${location.pathname === '/saved'?'link_active':''}`}>Мои заклинания</Link>
    </header>
  );
}

export default Header;