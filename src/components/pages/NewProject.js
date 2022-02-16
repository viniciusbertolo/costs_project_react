//PERMITE REDIRECIONAR O USUARIO QUANDO EU PRECISAR DISSO
import { useNavigate } from 'react-router-dom'

import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'



function NewProject(){

    const navigate = useNavigate()

    function createPost(project){
        //initialize cost and services (diz que inicia 0)
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project) //mandando os dados como string pro body pelo post, adiconando um projeto
        }).then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            navigate('/projects', {message: 'Projeto Criado com Sucesso !'})
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.newProject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <p>formulario</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject