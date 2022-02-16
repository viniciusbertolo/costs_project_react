import {useEffect, useState} from 'react'

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm({handleSubmit, btnText, projectData}) {

    const[categories, setCategories] = useState([])

    const [project, setProject] = useState(projectData || {})

    //DIZ PARA SER CHAMADO 1 VEZ SÓ, NÃO FAZENDO LOOP INFINITO
    useEffect(()=>{
        //O METODO ABAIXO FICA MAPEANDO PARA VER SE O METODO NÃO MUDA
        // PEGA AS INFORMAÇÕES DO JSON VIA API FETCH
        fetch("http://localhost:5000/categories",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // ENCADEAR OUTROS PROCESSOS PARA FAZER COM A RESPOSTA DA API
        .then((resp)=>resp.json()) //TUDO QUE RECEBER DE DADOS VAI VIRAR JSON
        .then((data)=>{
            setCategories(data) //JOGA AS INFORMAÇÕES DO JSON PRO SETCATEGORIES
        })
        // DISPARAR ERRO
        .catch(
            err => console.log(err)
        )
    }, []) //PASSA INICIALMENTE UM ARRAY VAZIO

    const submit = (e) => {
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e){
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
           <Input 
            handleOnChange={handleChange} type="text" text="Nome Projeto" 
            name="name" placeholder="insira o nome do Projeto"
            value={project.name ? project.name : '' } />
            <Input 
            handleOnChange={handleChange}  type="number" text="Orçamento do Projeto"
             name="budget" placeholder="insira o orçamento total"
             value={project.budget ? project.budget : ''} />
            <Select handleOnChange={handleCategory} name="category_id" text="Selecione a Categoria" options={categories} 
            value={project.category ? project.category.id : ''} />
            <SubmitButton text={btnText}   />
        </form>
    )
}

export default ProjectForm