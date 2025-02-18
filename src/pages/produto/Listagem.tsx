import React from "react";

interface Produto {
  catalog: string;
  imgPath: string;
  desc: string;
  price: string;
  linkAfl: string;
}

interface ListaProdutosProps {
  produtos: Produto[];
}

const ListaProdutos: React.FC<ListaProdutosProps> = ({ produtos }) => {
  return (
    <div className="lista-produtos">
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        produtos.map((produto, index) => (
          <div key={index} className="produto-card">
            <img src={produto.imgPath} alt={produto.catalog} />
            <h3>{produto.catalog}</h3>
            <p>{produto.desc}</p>
            <span>R$ {produto.price}</span>
            <a href={produto.linkAfl} target="_blank" rel="noopener noreferrer">
              Ver produto
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default ListaProdutos;
