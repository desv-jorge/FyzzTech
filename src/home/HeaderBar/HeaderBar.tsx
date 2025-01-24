import "./HeaderBar.scss"

export default function Header(){

    return(
        <header>
            <nav>
                <img src="https://i.postimg.cc/J4NWC1N5/LOGO.png" alt="Logo" id="Logo"/>
                <ul>
                    <li><a href="" className="NavItens">Início</a></li>
                    <li><a href="" className="NavItens">Catálogo</a></li>
                </ul>
            </nav>
            <nav>
                <a href=""><img src="https://i.postimg.cc/BQjftTfN/LUPA.png" alt="pesquisar produto" id="Search"/></a>
            </nav>

        </header>
    )
}