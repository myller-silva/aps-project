// components/Navbar.js
import Link from 'next/link';
import styles from '../styles/Navbar.module.css'; // Altere o caminho conforme necessário

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><Link href="/home">Home</Link></li>
        <li><Link href="/produtos">Produtos</Link></li>
        <li><Link href="/estoques">Estoques</Link></li>
        <li><Link href="/lojas">Lojas</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
