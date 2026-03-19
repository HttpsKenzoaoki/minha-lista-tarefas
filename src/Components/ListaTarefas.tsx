import { useState, useEffect } from "react";
import "../Screens/Styles/ListaTarefas.css"; 
import iconeVazio from "../assets/check-circle.svg";
import iconecheio from "../assets/check-circle-fill.svg";

interface Tarefa {
    id: number;
    nome: string;
    descricao: string;
    concluida: boolean;
}

type TipoOrdenação = "alfabetica" | "tempo";

export function ListaTarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>(() => {
        const dadosSalvos = localStorage.getItem("@MinhasTarefas:Lista");
        return dadosSalvos ? JSON.parse(dadosSalvos) : [];
    });

    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');

    const [ordenarPor, setOrdenarPor] = useState<TipoOrdenação>("tempo");

    useEffect(() => {
        localStorage.setItem("@MinhasTarefas:Lista", JSON.stringify(tarefas));
    }, [tarefas]);

    const tarefasOrdenadas = [...tarefas].sort((a, b) => {
        if (ordenarPor === 'alfabetica') {
            return a.nome.localeCompare(b.nome);
        } else {
            return b.id - a.id; 
        }
    });

    const adicionarTarefa = () => {
        if (nome.trim() !== '') {
            const novaTarefa: Tarefa = {
                id: Date.now(),
                nome: nome,
                descricao: descricao,
                concluida: false
            };
            setTarefas([...tarefas, novaTarefa]);
            setNome("");
            setDescricao("");
        }
    };

    const removerTarefa = (id: number) => {
        setTarefas(tarefas.filter((t) => t.id !== id));
    };

    const alterarConcluida = (id: number) => {
        setTarefas(tarefas.map(tarefa =>
            tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
        ));
    };

    return (
        <div className="container"> 
            <h2>Lista de Tarefas</h2>

            <div className="input-group"> 
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome da tarefa"
                    className="main-input"
                />
                <input
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descrição (Opcional)"
                    className="main-input"
                />
                <button className="add-btn" onClick={adicionarTarefa}>Adicionar</button>
            </div>

                <div className="sorting-controls">
                    <span>Ordenar por:</span>
                    <button className={ordenarPor === "tempo" ? "active" : ''}
                    onClick={() => setOrdenarPor('tempo')}>
                        Mais Recentes
                    </button>
                    <button className={ordenarPor === "alfabetica" ? "active" : ''} 
                    onClick={() => setOrdenarPor('alfabetica')}>
                        A-Z
                    </button>
                </div>
            <ul>
                {tarefasOrdenadas.map((tarefa) => (
                    <li key={tarefa.id} className="tarefa-item">
                        <input
                            type="checkbox"
                            id={`ConcluirTarefa-${tarefa.id}`}
                            checked={tarefa.concluida}
                            onChange={() => alterarConcluida(tarefa.id)}
                            className="checkbox-custom"
                        />

                    <label htmlFor={`ConcluirTarefa-${tarefa.id}`} className="checkbox-icon">
                            <img 
                            src={tarefa.concluida ? iconecheio : iconeVazio} 
                        alt="status" 
                            />
                        </label>

            
                        <div className={`tarefa-info ${tarefa.concluida ? 'concluida' : ''}`}>
                            <strong>{tarefa.nome}</strong>
                            {tarefa.descricao && <p>{tarefa.descricao}</p>}
                        </div>

                        <button className="remove-btn" onClick={() => removerTarefa(tarefa.id)}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaTarefas;