import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import "./Listagem.scss";

interface Produto {
  id: number;
  catalog: string;
  imgPath: string;
  desc: string;
  price: string;
  linkAfl: string;
}

const ListaProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await axios.get("https://fyzztech.onrender.com/produto");
        setProdutos(response.data); 
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://fyzztech.onrender.com/produto`, {
        params: { id } // Agora enviando o ID corretamente na query string
      });
      setProdutos((prevProdutos) => prevProdutos.filter((produto) => produto.id !== id));
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };
  

  return (
    <div className="lista-produtos-container">
      <h2>Dados dos produtos cadastrados</h2>
      {loading ? (
        <p>Carregando produtos...</p>
      ) : produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <div className="lista-produtos">
          {produtos.map((produto) => (
            <div key={produto.id} className="produto-card">
              <p>
                <strong>Título:</strong> {produto.desc} - <span className="enviado-por">preço: {produto.price}</span>
              </p>
              <button className="delete-btn" onClick={() => handleDelete(produto.id)}>
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaProdutos;