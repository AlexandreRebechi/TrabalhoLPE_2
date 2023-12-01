import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import PaisContext from "./PaisContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import CampoSelect from "../../comuns/CampoSelect";
import CampoEntradaTexto from "../../comuns/CampoEntradaTexto";
import Dialogo from "../../comuns/Dialogo";
import { MenuItem } from "@mui/material";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, abreDialogo, setAbreDialogo } =
        useContext(PaisContext);

    return (
        <>
            <Dialogo id="modalEdicao" titulo="Organização"
                open={abreDialogo} setOpen={setAbreDialogo}
                acaoCadastrar={acaoCadastrar} idform="formulario"
                maxWidth="sm">
                <Alerta alerta={alerta} />
                <CampoEntrada id="txtID" label="ID"
                    tipo="text" name="id" value={objeto.id}
                    onchange={handleChange} requerido={false}
                    readonly={true} />
                <CampoEntrada id="txtNome" label="Nome"
                    tipo="text" name="nome" value={objeto.nome}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Nome OK"
                    msginvalido="Informe o nome" />

                 <CampoEntrada id="txtNumEstados" label="numero Estados"
                    tipo="text" name="num_estados" value={objeto.num_estados}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Numero Estados OK"
                    msginvalido="Informe o Numero de Estados" />
                <CampoEntrada id="txtContinente" label="Continente"
                    tipo="text" name="continente" value={objeto.continente}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Continente OK"
                    msginvalido="Informe o Continente" />
                <CampoSelect
                    id="selectTipo" label="Tipo"
                    idLabel="labelTipo"
                    tipo="text" name="tipo" value={objeto.tipo}
                    onchange={handleChange} requerido={false}
                    msgvalido="Tipo OK"
                    msginvalido="Informe o Tipo">
                    <MenuItem value='Artigo'>Mapa_mundi</MenuItem>
                    <MenuItem value='Documentação'>Documentação</MenuItem>
                </CampoSelect>
            </Dialogo>
        </>
    )

}

export default Form;