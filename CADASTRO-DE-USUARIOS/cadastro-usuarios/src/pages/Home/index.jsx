// React Hooks
import { useEffect, useState, useRef } from "react";
import "./style.css";
/* import Trash from "../../assets/trash.svg"; */
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");

    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);

    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input
          name="name"
          type="text"
          placeholder="Digite seu nome"
          ref={inputName}
        />
        <input
          name="age"
          type="number"
          placeholder="Digite sua idade"
          ref={inputAge}
        />
        <input
          name="email"
          type="email"
          placeholder="Digite seu email"
          ref={inputEmail}
        />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <button type="button" onClick={() => deleteUsers(user.id)}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
