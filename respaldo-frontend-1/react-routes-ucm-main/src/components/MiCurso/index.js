import { useNavigate, useParams } from "react-router-dom"
import { cursos } from "../../data/cursos"
import '../../pages/style.css';

function MiCurso(){
    const {url} = useParams()

    const curso = cursos.find(item => item.url === url);
    const navigate = useNavigate();
    
    return <>
        <h3>{curso.name}</h3>
        <p>{curso.description}</p>
        <button onClick={()=>  navigate("/cursos") } >
            volver
        </button>
    </>
}

export {MiCurso}