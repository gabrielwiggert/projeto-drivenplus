import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from 'react'
import { render } from 'react-dom'
import { ThreeDots } from 'react-loader-spinner'

export default function Cadastro () {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

	function fazerCadastro (event) {
		event.preventDefault();

        setLoading(true);

            const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", {
                email: email,
                name: nome,
                cpf: cpf,
                password: senha
            });

        requisicao.then((response) => {
            console.log(response.data);
            navigate("/");
        });

        requisicao.catch((err) => {
            console.log(err);
            alert(err);
        });
	}

    return (
        <>
            <Form>
                <form onSubmit={fazerCadastro}>
                    <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required disabled={loading}/>
                    <input type="number" placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} required disabled={loading}/>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading}/>
                    <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required disabled={loading}/>
                    {loading ? <button disabled><ThreeDots color="#fff" height={'1.8rem'} width={'100%'} /></button> : <button type="submit">Cadastrar</button>}
                </form>
            </Form>

            <RedirectLogin>
                <Link to="/">
                    <h1>Já possui uma conta? Entre</h1>
                </Link>
            </RedirectLogin>
        </>
    );
}

const RedirectLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a:link {
        text-decoration: none;
        text-decoration: black;
    }

    h1 {
        color: white;
        text-decoration: underline;
    }
`;

const Form = styled.div`
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
    }

    input {
        border-width: 1px;
        border-color: #D4D4D4;
        background-color: white;
        border-radius: 5px;
        border: 1px solid #D5D5D5;
        width: 80vw;
        height: 52px;
        margin-bottom: 24px;
        font-family: 'Lexend Deca', sans-serif;
    }

    input:disabled{
        background: grey;
        color: darkgray;
        opacity: 0.2;
        cursor: progress;
    }

    button:disabled{
        background: grey;
        color: darkgray;
        opacity: 0.2;
        cursor: progress;
    }

    input::placeholder {
        padding-left: 11px;
        font-size: 14px;
        color: #7E7E7E;
    }

    button {
        border-style: none;
        border-radius: 5px;
        margin-bottom: 20px;
        width: 80vw;
        height: 45px;
        background-color: #FF4791;
        color: white;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 21px;
    }
`;