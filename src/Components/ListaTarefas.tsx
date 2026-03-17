import { useState } from "react";


export function ListaTarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([])
 
    const adicionarTarefa = () => {
        const novaTarefa: Tarefa = {
            id: Date.now(),
            nome: String,
            descricao: String,
            concluida: Boolean
        }
    };

    const removerTarefa = (indice:number) => {
        setTarefas(tarefas.filter((_, i) => i !== indice));
    };

return (

    <div className="ListaTarefas">
        <h2>Lista de Tarefas</h2>

        <input type="text"
        value={Tarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        placeholder="Digite uma nova tarefa"
        />

        <button onClick={adicionarTarefa}> Adicionar</button>
        <ul>
            {tarefas.map((tarefa, indice) => (
                <li key={indice}>
                    {tarefa} <button onClick={() =>
                        removerTarefa(indice)}> Remover</button>
                </li>
            ))}
        </ul>
    </div>
)
};

export default ListaTarefas;