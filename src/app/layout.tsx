'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import Appheader from '@/components/app.header';
import Appfooter from '@/components/app.footer';
import { Bounce, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { ModalContext } from '@/components/app.body'; 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [showModalCreate, setShowModalCreate] = useState(false);

  return (
    <html lang="en">
      <body>
        {/* <ModalContext.Provider value={{ showModalCreate, setShowModalCreate }}> */}
          <Appheader />
          {children}
          <Appfooter />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
        {/* </ModalContext.Provider> */}
      </body>
    </html>
  );
}
