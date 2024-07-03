function Tabela({ vetor, selecionar }) {
    const formatarData = (data) => {
      if (!data) return '';
      const { year, monthValue, dayOfMonth, hour, minute, second } = data;
      return `${dayOfMonth}/${monthValue}/${year} ${hour}:${minute}:${second}`;
    };
  
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome do Serviço</th>
            <th>Descrição</th>
            <th>Fotos</th>
            <th>Videos</th>
            <th>Depoimentos</th>
            <th>Data de Inclusao</th>
            <th>Data de Alteracao</th>
          </tr>
        </thead>
        <tbody>
          {vetor.map((obj, indice) => (
            <tr key={obj._id}>
              <td>{indice + 1}</td>
              <td>{obj.nomeServico}</td>
              <td>{obj.descricao}</td>
              <td>{obj.fotos}</td>
              <td>{obj.videos}</td>
              <td>{obj.depoimentos}</td>
              <td>{formatarData(obj.dataInclusao)}</td>
              <td>{formatarData(obj.dataAlteracao)}</td>
              <td>
                <button onClick={() => selecionar(indice)} className="btn btn-success">
                  Selecionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default Tabela;
  