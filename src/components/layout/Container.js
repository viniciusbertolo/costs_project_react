import styles from './Container.module.css'

function Container(props){
    //TUDO QUE FOR FILHO SERA ALTERADO
    return(
        <div className={`${styles.container} ${styles[props.customClass]}`}>
            {props.children}
        </div>
    )
}

export default Container