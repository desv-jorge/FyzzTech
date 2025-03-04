import React, { useEffect, useState } from "react";
import "./index.scss";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import ListaProdutos from "./Listagem";
import { categorias } from "@/_Catalog/categorias";

// Correção da interface Produto
interface Produto {
  catalog: string;
  imgPath: string;
  desc: string;
  price: string;
  linkAfl: string;
}

export default function AddProduto() {
  const [formData, setFormData] = useState<Produto>({
    catalog: "",
    imgPath: "",
    desc: "",
    price: "",
    linkAfl: "",
  });

  const [message, setMessage] = useState<string>("");
  const [submittedData, setSubmittedData] = useState<Produto[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Jorge" && password === "22916145") {
      setIsAuthenticated(true);
      localStorage.setItem("auth", "true");
    } else {
      setMessage("Usuário ou senha incorretos.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage("");
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!formData.catalog || !formData.linkAfl || !formData.imgPath || !formData.desc || !formData.price) {
      setMessage("Todos os campos devem ser preenchidos.");
      return;
    }

    if (formData.desc.length < 5) {
      setMessage("A descrição deve conter no mínimo 5 caracteres.");
      return;
    }

    const isDuplicate = submittedData.some(
      (data) =>
        data.catalog === formData.catalog &&
        data.desc === formData.desc &&
        data.imgPath === formData.imgPath &&
        data.linkAfl === formData.linkAfl &&
        data.price === formData.price
    );

    if (isDuplicate) {
      setMessage("Este conjunto de dados já foi enviado anteriormente.");
      return;
    }

    try {
      await axios.post("https://fyzztech.onrender.com/produto", formData);
      setSubmittedData((prev) => [...prev, formData]);
      setFormData({ catalog: "", imgPath: "", desc: "", price: "", linkAfl: "" });
      setMessage("Dados enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setMessage("Ocorreu um erro ao enviar os dados. Tente novamente.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div id="loginPage">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Usuário:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </div>
    );
  }

  return (
    <div id="pageMain">
      <nav>
        <div></div>
        <h1>Cadastrar Produtos</h1>
        <button onClick={handleLogout} className="button">Sair</button>
        <Link className="button" href="/">
          <FaHome id="icon" />
        </Link>
      </nav>

      <div id="mainSection">
        <section>
          <div className="divForm">
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="catalog">Catálogo do Produto</label>
                <select name="catalog" value={formData.catalog} onChange={handleChange}>
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="linkAfl">Link de afiliado</label>
                <input type="text" name="linkAfl" value={formData.linkAfl} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="imgPath">Imagem</label>
                <input type="text" name="imgPath" value={formData.imgPath} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="desc">Descrição (mínimo 5 caracteres)</label>
                <textarea name="desc" value={formData.desc} onChange={handleChange} rows={4}></textarea>
              </div>

              <div>
                <label htmlFor="price">Preço</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} />
              </div>

              <button type="submit" className="button">Enviar</button>
            </form>
            {message && (
              <p style={{ color: message.includes("sucesso") ? "#00ff00" : "#ff0000" }}>{message}</p>
            )}
          </div>
        </section>
        <ListaProdutos />
      </div>
    </div>
  );
}
