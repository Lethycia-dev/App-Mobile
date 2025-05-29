//Listar,Inserir e excluir tarefas

// Importa o React e useState para gerenciar estado
import React, { useEffect, useState } from 'react';
// Importa o axios para fazer requisições HTTP
import axios from 'axios';
//Importa o usernavegation para redirecionamento
import { useNavigation } from 'react-router-dom';

//definir componentes tarfas
const Tarefas = () => {
    //estado para listar as tarfas
    const [tarefas, SetTarefas] = useState({});
    //estado para titulo as tarfas
    const [titulo, SetTitulo] = useState('');

    // Estado para a mensagem de resposta
    const [message, setMessage] = useState('');
    //hook para navegação
    const navigate = useNavigate();

    //função para carregar tarfas de usuários
    const fetchTarefas = async () => {
        try {
            //obter token do localstorage
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('erro: você precisa estar logado para vê as tarefas');
                navigate('/login');
                return;
            }
            //faz um get pra listar as tarfas
            const response = await axios.get('https://localhost:3001/api/tarefas', {
                headers: {
                    Authorization:' Bearer $(token)'

                }
            });

            //atualiza os estados das tarfas
            SetTarefas(response.data.tarefas);
        } catch (error) {
            // Define a mensagem de erro
            setMessage(`Erro: ${error.response?.data?.message || 'Falha ao listar tarefas'}`);
            if (error.response?.data?.status === 401 || error.response?.status === 403){
                navigate ('/login');
            }
        }

    };

    //carrega as tarefas quando o componnete é montado
    useEffect(
        () => {
            fetchTarefas();
        }, []
    );

    //funçao para incluir tarefas
    const handleTarefas = async () => {

         const handleTarefas = async (e) => {
        // Impede o comportamento padrão do formulário
        e.preventDefault();
        try {  
            //obter token do localstorage
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('erro: você precisa estar logado para vê as tarefas');
                navigate('/login');
                return;
            }
            // Faz uma requisição POST para a rota de registro
            const response = await axios.post('http://localhost:3001/api/auth/registro', { email, password });
            // Define a mensagem de sucesso
            setMessage(`Sucesso: ${response.data.message} (ID: ${response.data.userId})`);
            // Limpa os campos
            setEmail('');
            setPassword('');
        } catch (error) {
            // Define a mensagem de erro
            setMessage(`Erro: ${error.response?.data?.message || 'Falha ao registrar'}`);
        }
    };

}}; 