import "./HeaderBar.scss";
import { categorias } from "@/_Catalog/categorias";

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
          <li className="NavItens" id="start">
              Início
          </li>
          <li className="NavItens" id="catalog">
            Catálogo
            <div className="submenu">
              <ul>
                {categorias.map((catalog)=>{
                  return(
                    <li><a href={`#${catalog}`}>{catalog}</a></li>
                  )
                })}
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
