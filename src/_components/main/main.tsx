"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiCommand } from "react-icons/fi";
import axios from "axios";
import "./main.scss";

interface Produto {
  id: number;
  catalog: string;
  imgPath: string;
  desc: string;
  price: string;
  linkAfl: string;
}

export default function Main() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categorias, setCategorias] = useState<{ [key: string]: Produto[] }>(
    {}
  );

  const carouselsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [widths, setWidths] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await axios.get<Produto[]>(
          "https://fyzztech.onrender.com/produto"
        );
        const produtosPorCategoria = response.data.reduce((acc, produto) => {
          if (!acc[produto.catalog]) acc[produto.catalog] = [];
          acc[produto.catalog].push(produto);
          return acc;
        }, {} as { [key: string]: Produto[] });

        setProdutos(response.data);
        setCategorias(produtosPorCategoria);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, []);

  useEffect(() => {
    // Ajusta a largura de cada carrossel após carregar os produtos
    const newWidths: { [key: string]: number } = {};
    Object.keys(carouselsRef.current).forEach((categoria) => {
      const element = carouselsRef.current[categoria];
      if (element) {
        newWidths[categoria] = element.scrollWidth - element.offsetWidth;
      }
    });
    setWidths(newWidths);
  }, [produtos]);

  return (
    <main>
      <section>
        <img
          src="https://i.postimg.cc/ZK6trT0y/Banner-1.png"
          alt="Banner de promoção"
        />
      </section>

      {loading ? (
        <div id="LoadingCase">
          <p>aguarda um poquinho que o site é gratuito</p>
          <br />
          <p>(os produtos já vão aparecer)</p>
          <br />
          <FiCommand className="loading-icon" />
        </div>
      ) : error ? (
        <h1>Erro ao carregar produtos</h1>
      ) : produtos.length > 0 ? (
        Object.entries(categorias).map(([categoria, produtos]) => (
          <section key={categoria} id="container">
            <h2 id={categoria}>{categoria}</h2>

            <motion.div
              ref={(el) => {
                if (el) carouselsRef.current[categoria] = el;
              }}
              id="capsula"
              whileTap={{ cursor: "grabbing" }}
            >
              <motion.section
                id="cards"
                drag="x"
                dragConstraints={{ right: -1, left: -widths[categoria] || 0 }}
              >
                {produtos.map((dados) => (
                  <article key={dados.id}>
                    {dados.imgPath ? (
                      <img src={dados.imgPath} alt={dados.desc} />
                    ) : (
                      <p>Imagem indisponível</p>
                    )}
                    <div>
                      <h3>{dados.desc}</h3>
                      <p>{dados.price}</p>
                    </div>
                    <a
                      href={dados.linkAfl}
                      id="button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mais informações
                    </a>
                  </article>
                ))}
              </motion.section>
            </motion.div>
          </section>
        ))
      ) : (
        <h1>Não há produtos disponíveis</h1>
      )}
    </main>
  );
}
