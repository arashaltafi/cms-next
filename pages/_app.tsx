import "../styles/globals.css";
import Navbar from "../components/modules/navbar/Navbar";
import Sidebar from "../components/modules/sidebar/Sidebar";

export default function App({ Component, pageProps }: any) {
  return (
    <div className="container">
      <Sidebar />

      <main className="main">
        <Navbar />
        <Component {...pageProps} />
      </main>
    </div>
  )
}
