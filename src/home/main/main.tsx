"use client";
import { useEffect } from "react";
import "./main.scss";
import products from "./produtos.json";

export default function Main() {
  const Produtos = products;

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
            <section id="cards">
              {Array.from({ length: 3 }).map((_, index) => (
                <article key={index}>
                  <img src={dados.imgProduct} alt="imagem do produto" />
                  <div>
                    <h3>{dados.productName}</h3>
                    <p>{dados.priceProduct}</p>
                  </div>
                </article>
              ))}
            </section>
          </section>
        );
      })}
    </main>
  );
}
