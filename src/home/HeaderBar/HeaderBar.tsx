import { style } from "framer-motion/client";
import "./HeaderBar.scss";

export default function Header() {
  return (
    <header>
      <nav>
        <img
          src="https://i.postimg.cc/J4NWC1N5/LOGO.png"
          alt="Logo"
          id="Logo"
        />
        <ul>
          <li id="start">
            <a href="" className="NavItens">
              Início
            </a>
          </li>
          <li className="NavItens" id="catalog">
            Catálogo
            <div className="submenu">
              <ul>
                <li><a href="#NOTEBOOKS - LAPTOPS">NOTEBOOKS</a></li>
                <li><a href="#FONES DE OUVIDO">FONES DE OUVIDO</a></li>
                <li><a href="">PEÇAS PARA PC</a></li>
                <li><a href="#TECLADOS">TECLADOS</a></li>
                <li><a href="">MOUSES</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
      {/* <nav>
        <a href="">
          <img
            src="https://i.postimg.cc/BQjftTfN/LUPA.png"
            alt="pesquisar produto"
            id="Search"
          />
        </a>
      </nav> */}
    </header>
  );
}
