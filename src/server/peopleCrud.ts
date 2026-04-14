import { API_URL } from "./configApi";

export async function getTarefas() {
    const response = await fetch(`${API_URL}/tarefas`)

    const data = await response.json()
    return data;
}

export async function createTarefa(tarefa:[]) {
    const response = await fetch(`${API_URL}/tarefas`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    });

    return response.json();
}

export async function updateTarefa(id: number, tarefa:[]){
    const response = await fetch(`${API_URL}/tarefas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    })

    return response.json();
}

export async function deleteTarefa(id:number) {
    const response = await fetch(`${API_URL}/tarefas/${id}`, {
        method: 'DELETE'
    });
    return response.json();
}