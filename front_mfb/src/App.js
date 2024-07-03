import React, { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {
  const servico = {
    _id: '',
    nomeServico: '',
    descricao: '',
    fotos: [],
    videos: [],
    depoimentos: ''
  };

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [servicos, setServicos] = useState([]);
  const [objServico, setObjServico] = useState(servico);

  useEffect(() => {
    fetch("http://localhost:8080/service/listar")
      .then(retorno => retorno.json())
      .then(retorno_convert => setServicos(retorno_convert));
  }, []);

  const digitar = (e) => {
    setObjServico({ ...objServico, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const fileNames = Array.from(files).map(file => file.name);
    setObjServico({ ...objServico, [name]: fileNames });
  };

  const cadastrar = () => {
    if (objServico.nomeServico) {
      fetch('http://localhost:8080/service', {
        method: 'post',
        body: JSON.stringify(objServico),
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(retorno => retorno.json())
      .then(retorno_convert => {
        setServicos([...servicos, retorno_convert]);
        alert("Serviço cadastrado com sucesso!");
        limparFormulario();
      })
      .catch(error => console.error("Error:", error));
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const remover = (id) => {
    console.log("Remover ID:", id);
    fetch(`http://localhost:8080/service/${id}`, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(() => {
      alert("Serviço removido com sucesso!");
      setServicos(servicos.filter(servico => servico._id !== id));
      limparFormulario();
    })
    .catch(error => console.error("Error:", error));
  };

  const limparFormulario = () => {
    setObjServico(servico);
    setBtnCadastrar(true);
  };

  const selecionar = (indice) => {
    setObjServico(servicos[indice]);
    setBtnCadastrar(false);
  };

  return (
    <div>
      <Formulario
        botao={btnCadastrar}
        setBotao={setBtnCadastrar}
        eventoTeclado={digitar}
        handleFileChange={handleFileChange}
        cadastrar={cadastrar}
        obj={objServico}
        cancelar={limparFormulario}
        remover={remover}
      />
      <Tabela 
        vetor={servicos}
        selecionar={selecionar}
      />
    </div>
  );
}

export default App;
