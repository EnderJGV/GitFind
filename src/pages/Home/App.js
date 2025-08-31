import { useState } from "react";

import { Header } from "../../components/Header";
import background from "../../assets/background.png";
import ItemList from "../../components/ItemList";
import "./styles.css";

function App() {
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const {
        avatar_url,
        name,
        bio,
        login,
        html_url,
        location
      } = newUser;
      setCurrentUser({
        avatar_url,
        name,
        bio,
        login,
        html_url,
        location
      });

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} alt="background app" className="background" />
        <div className="info">
          <div className="search">
            <input
              name="usuario"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              placeholder="@Username"
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>

          {currentUser?.name ? (
            <>
              <div className="perfil">
                <img
                  src={currentUser.avatar_url}
                  className="profile"
                  alt="Imagem de perfil"
                ></img>
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <span className="location">{currentUser.location}</span>
                  <a
                    href={currentUser.html_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visualizar perfil
                  </a>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
            </>
          ) : null}

          {repos?.length ? (
            <div>
              <h4 className="repositorio">Repositórios</h4>
              {repos.map((repo) => (
                <ItemList
                  clas
                  title={repo.name}
                  description={repo.description}
                  link={`https://github.com/${repo.full_name}`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
