import { useEffect, useState } from "react";

import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [deuErro, setDeuErro] = useState(false);

    useEffect(() => {
        setEstaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Usuário não encontrado");
            }
            return res.json();
        })
        .then(resJson => {
            setTimeout(() => {
                setEstaCarregando(false);
                setRepos(resJson);
            }, 3000);
        })
        .catch(() =>{
            setEstaCarregando(false);
            setDeuErro(true);
        });
    }, [nomeUsuario]);

    return (
        <div className="container">
            {estaCarregando ? (
                <h1>Carregando...</h1>
            ) : deuErro ? (
                <p className={styles.msgText}>Erro ao carregar Usuário. Verifique novamente.</p>
            ) : (
                <ul className={styles.list}>
                    {repos.map(({ id, name, language, html_url }) => (
                        <li className={styles.listItem} key={id}>
                            <div className={styles.itemName}>
                                <b>Nome:</b> {name}
                            </div>
                            <div className={styles.itemLanguage}>
                                <b>Linguagem:</b> {language}
                            </div>
                            <a className={styles.itemLink} href={html_url} target="_blank" rel="noopener noreferrer">Visitar no Github</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ReposList;
