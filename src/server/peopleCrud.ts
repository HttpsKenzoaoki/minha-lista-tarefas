import { API_URL } from "./configApi";

export interface Tarefa {
    id: number;
    nome: string;
    descricao: string;
    concluida: boolean;
}

export async function getTarefas(): Promise<Tarefa[]> {
    const response = await fetch(`${API_URL}/tarefas`);

    if (!response.ok) {
        throw new Error('Erro ao buscar tarefas');
    }

    const data = await response.json();
    return data;
}

export async function createTarefa(tarefa: Tarefa): Promise<Tarefa> {
    const response = await fetch(`${API_URL}/tarefas`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    });

    if (!response.ok) {
        throw new Error('Erro ao criar tarefa');
    }

    return response.json();
}

export async function updateTarefa(id: number, tarefa: Tarefa): Promise<Tarefa> {
    const response = await fetch(`${API_URL}/tarefas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    });

    if (!response.ok) {
        throw new Error('Erro ao atualizar tarefa');
    }

    return response.json();
}

export async function deleteTarefa(id:number): Promise<void> {
    const response = await fetch(`${API_URL}/tarefas/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Erro ao remover tarefa');
    }
}