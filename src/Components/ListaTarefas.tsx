import { useState, useEffect } from "react";
import "../Screens/Styles/ListaTarefas.css"; 
import iconeVazio from "../assets/check-circle.svg";
import iconecheio from "../assets/check-circle-fill.svg";
import { createTarefa, deleteTarefa, getTarefas, type Tarefa, updateTarefa } from "../server/peopleCrud";

type TipoOrdenação = "alfabetica" | "tempo";

export function ListaTarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [carregando, setCarregando] = useState<boolean>(true);
    const [erro, setErro] = useState<string>('');

    const [ordenarPor, setOrdenarPor] = useState<TipoOrdenação>("tempo");

    useEffect(() => {
        const carregarTarefas = async () => {
            try {
                setErro('');
                const lista = await getTarefas();
                setTarefas(lista);
            } catch {
                setErro('Não foi possível carregar as tarefas.');
            } finally {
                setCarregando(false);
            }
        };

        carregarTarefas();
    }, []);

    const tarefasOrdenadas = [...tarefas].sort((a, b) => {
        if (ordenarPor === 'alfabetica') {
            return a.nome.localeCompare(b.nome);
        } else {
            return b.id - a.id; 
        }
    });

    const adicionarTarefa = async () => {
        if (nome.trim() !== '') {
            try {
                setErro('');
                const proximoId = tarefas.length > 0
                    ? Math.max(...tarefas.map((tarefa) => Number(tarefa.id))) + 1
                    : 1;

                const novaTarefa = await createTarefa({
                    id: proximoId,
                    nome: nome,
                    descricao: descricao,
                    concluida: false
                });

                setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
                setNome("");
                setDescricao("");
            } catch {
                setErro('Não foi possível adicionar a tarefa.');
            }
        }
    };

    const removerTarefa = async (id: number) => {
        try {
            setErro('');
            await deleteTarefa(id);
            setTarefas((tarefasAtuais) => tarefasAtuais.filter((t) => t.id !== id));
        } catch {
            setErro('Não foi possível remover a tarefa.');
        }
    };

    const alterarConcluida = async (id: number) => {
        const tarefaAtual = tarefas.find((tarefa) => tarefa.id === id);

        if (!tarefaAtual) {
            return;
        }

        try {
            setErro('');
            const tarefaAtualizada = await updateTarefa(id, {
                ...tarefaAtual,
                concluida: !tarefaAtual.concluida
            });

            setTarefas((tarefasAtuais) => tarefasAtuais.map((tarefa) =>
                tarefa.id === id ? tarefaAtualizada : tarefa
            ));
        } catch {
            setErro('Não foi possível atualizar a tarefa.');
        }
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

            {erro && <p>{erro}</p>}

            {carregando && <p>Carregando tarefas...</p>}

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