import { useEffect, useState, useRef } from 'react' // React Hooks
import './style.css'
import Trash from '../../assets/trash.png'
import api from '../../services/api'

function Home() {

  const [users, setUsers] = useState([])

  const inputNomeUsu = useRef()
  const inputSenhaUsu = useRef()
  
  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }
  
  async function deleteUsers(id){
    await api.delete(`/usuario/${id}`)

    getUsers()
  }

  async function createUsers(){
    await api.post('/usuario', {
      nome_usuario: inputNomeUsu.current.value,
      senha_usuario: inputSenhaUsu.current.value,
      id_grupo_usuario: 1
    }
    )

    getUsers()
  }

  useEffect(() => {
    getUsers()  
  }, [])

  return (
      <div className='container'>
        <form>
          <h1>Cadastro de usuários</h1>
          <input placeholder="nome" name="nome" type="text" ref={inputNomeUsu}/>
          <input placeholder="senha" name="senha" type="text"  ref={inputSenhaUsu}/>
          <button type="button" onClick={createUsers} >Cadastrar</button>
        </form>

        { users.map( user => (
          <div key={user.id} className='card'>
            <div>
            <p>Id: <span>{user.id_usuario}</span></p>
            <p>Nome: <span>{user.nome_usuario}</span></p>
            <p>Grupo: <span>{user.id_grupo_usuario}</span></p>
            </div>
            <button onClick={() => deleteUsers(user.id_usuario)}>
              <img src={Trash} width={14} />
            </button>
          </div>
        ))}
        
      </div>
  )
}

export default Home
