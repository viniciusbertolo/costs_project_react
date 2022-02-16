import {useState, useEffect} from 'react'

import styles from './Message.module.css'


function Message({ type, msg }){


    const[visible, setVisible] = useState(false)


    // mudar a exibição dependendo da condição
    useEffect(()=>{
        if(!msg){
            setVisible(false)
            return
        }
        setVisible(true)

        //inicio
        const timer = setTimeout(()=>{
            setVisible(false) //apaga depois de 3 segundos
        }, 3000)

        //finalizar
        return () => clearTimeout(timer)

        // condicionado a alguma coisa, a msg
    }, [msg])


    return(
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
        
        
        </>
    )
}
export default Message