"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [produtos]);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await axios.get<Produto[]>("https://fyzztech.onrender.com/produto");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, []);

  return (
    <main>
      <section>
        <img src="https://i.postimg.cc/ZK6trT0y/Banner-1.png" alt="Banner de promoção" />
      </section>

      {loading ? (
        <h1>Carregando produtos...</h1>
      ) : error ? (
        <h1>Erro ao carregar produtos</h1>
      ) : produtos.length > 0 ? (
        produtos.map((dados) => (
          <section key={dados.id} id="container">
            <h2 id={dados.catalog}>{dados.catalog}</h2>

            <motion.div ref={carouselRef} id="capsula" whileTap={{ cursor: "grabbing" }}>
              <motion.section id="cards" drag="x" dragConstraints={{ right: -1, left: -width }}>
                <article>
                  {dados.imgPath ? (
                    <img src={dados.imgPath} alt={dados.desc} />
                  ) : (
                    <p>Imagem indisponível</p>
                  )}
                  <div>
                    <h3>{dados.desc}</h3>
                    <p>{dados.price}</p>
                  </div>
                  <a href={dados.linkAfl} id="button" target="_blank" rel="noopener noreferrer">
                    Mais informações
                  </a>
                </article>
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
