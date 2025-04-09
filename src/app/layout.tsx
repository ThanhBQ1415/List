'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Appheader from '@/components/app.header';
import Appfooter from '@/components/app.footer';
import { Bounce, ToastContainer } from 'react-toastify';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
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
          transition={Bounce} />
      </body>
    </html>
  )
}
