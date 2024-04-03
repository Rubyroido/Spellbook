import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <Link to='/' className='link'>Все заклинания</Link>
      <Link to='/saved' className='link'>Мои заклинания</Link>
    </header>
  );
}

export default Header;