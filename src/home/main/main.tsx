"use client";
import {useState, useEffect, useRef} from "react"
import { motion } from "framer-motion"
import "./main.scss";
import products from "./produtos.json";

export default function Main() {
  const Produtos = products;
  const Carousel = useRef<HTMLDivElement>(null);
  const [width,setWidth] = useState(0)
  

  useEffect(()=>{
    if(Carousel.current?.scrollWidth && Carousel.current?.offsetWidth) {
      setWidth(Carousel.current?.scrollWidth - Carousel.current?.offsetWidth)
    }
  },[])

    return (
      <main>
        <section>
          <img
            src="https://i.postimg.cc/ZK6trT0y/Banner-1.png"
            alt="Banner de promoção"
          />
        </section>

        {Object.entries(Produtos).map(([produto, dados]) => {
          return (
            <section key={produto}>
              <h2>{dados.CatalogTitle}</h2>

                <motion.div ref={Carousel} id="capsula" whileTap={{cursor: "grabbing"}}>
                  <motion.section id="cards" drag="x" dragConstraints={{ right: -1 , left : -(width)}}>
                    {Array.from({ length:12 }).map((_, index) => (
                      <article key={index}>
                        <img src={dados.imgProduct} alt="imagem do produto" />
                        <div>
                          <h3>{dados.productName}</h3>
                          <p>{dados.priceProduct}</p>
                        </div>
                        <button>Mais informações</button>
                      </article>
                    ))}
                  </motion.section>
                </motion.div>

            </section>
          );
        })}
      </main>
    );
  }