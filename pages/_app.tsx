import "../styles/globals.css";
import 'tailwindcss/tailwind.css';

import type { AppProps } from "next/app";
import Layout from "../layout/Layout";
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const themeMode = localStorage.getItem('notetal_theme__mode')
    if(themeMode){
      if(themeMode==='dark'){
        document.body.classList.add('dark')
      }else{
        document.body.classList.remove('dark')
      }
    }
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
