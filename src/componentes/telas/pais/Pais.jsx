import { useState, useEffect } from "react";
import PaisContext from "./PaisContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import {auth} from "../../../firebaseConfig";
import {useAuthState} from "react-firebase-hooks/auth";
import { addPaisFirebase, updatePaisFirebase, getPaisUIDFirebase, deletePaisFirebase} from "../../servicos/PaisService";


function Pais() {

    const [user, loading, error] = useAuthState(auth);

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: '',
        nome: '',
        num_estados: '',
        continente: '',
        usuario: user?.displayName,
        email: user?.email,
        uid: user?.uid
    });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: '',
            nome: '',
            num_estados: '',
            continente: '',
            usuario: user?.displayName,
            email: user?.email,
            uid: user?.uid
        });
        setAbreDialogo(true)
    }

    const editarObjeto = async (objeto) => {
        setObjeto(objeto);
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {

            try {
                await updatePaisFirebase(objeto)
                setAlerta({ status: "success", message: "Post atualizado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar o POST:" + err });
            }
        } else { // novo 
            try {

                setObjeto(await addPaisFirebase(objeto))
                setEditar(true);
                setAlerta({ status: "success", message: "Post criado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar o POST:" + err });
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                deletePaisFirebase(objeto)
                setAlerta({ status: "success", message: "Post removido com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao  remover: " + err });
            }
        }
    }

    useEffect(() => {
        setCarregando(true);
        if (user?.uid != null) {
            const uid = user?.uid;
            getPaisUIDFirebase(uid, setListaObjetos);
        }
        
        setCarregando(false);
    }, [user]);

    return (
        <PaisContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            remover,
            objeto, setObjeto,
            editarObjeto, novoObjeto, acaoCadastrar,
            handleChange, abreDialogo, setAbreDialogo
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </PaisContext.Provider>
    )

}

export default Pais;