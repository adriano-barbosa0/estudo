import React from 'react';

function Formulario({ 
  botao, 
  setBotao, 
  eventoTeclado, 
  handleFileChange, 
  cadastrar, 
  obj,
  cancelar,
  remover    
}) {
  return (
    <form>
      <input type='text' value={obj.nomeServico} onChange={eventoTeclado} name='nomeServico' placeholder='Nome do Serviço' className='form-control' />
      <input type='text' value={obj.descricao} onChange={eventoTeclado} name='descricao' placeholder='Descrição' className='form-control' />
      <div>
        <label htmlFor='uploadImagem'>Imagem do Serviço:
          <input type='file' id='uploadImagem' name='fotos' multiple accept='image/*' onChange={handleFileChange} />
        </label>
      </div>
      <div className='form-group'>
        <label htmlFor='uploadVideo'>Vídeo do Serviço:
          <input type='file' id='uploadVideo' name='videos' multiple accept='video/*' onChange={handleFileChange} />
        </label>
      </div>
      <textarea name='depoimentos' value={obj.depoimentos} onChange={eventoTeclado} placeholder="Insira o depoimento do Cliente aqui" rows="10" cols="65"></textarea>
      <div></div>
      {
        botao
          ? <input type='button' value='Cadastrar' onClick={() => { cadastrar(); setBotao(); }} className='btn btn-primary' />
          : <div>
              <input type='button' value='Alterar' className='btn btn-warning' />
              <input type='button' value='Remover' onClick={() => {
                console.log("Remover chamado com ID:", obj._id);  // Verificar se o ID está correto
                remover(obj._id);
              }} className='btn btn-danger' />
              <input type='button' value='Cancelar' className='btn btn-secondary' onClick={cancelar} />
            </div>
      }
    </form>
  );
}

export default Formulario;
