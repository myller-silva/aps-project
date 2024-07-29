// pages/_app.js
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../styles/globals.css'; // Certifique-se de importar estilos globais aqui

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Páginas que não devem usar o layout (ex: login)
  const noLayoutRequired = ['/login', '/signup'];

  // Verifique se a página atual é uma das páginas sem layout
  const shouldUseLayout = !noLayoutRequired.includes(router.pathname);

  return shouldUseLayout ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  );
}

export default MyApp;
