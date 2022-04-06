import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import React from 'react'
import { render } from 'react-dom'
import { ThreeDots } from 'react-loader-spinner'

import UserContext from "./UserContext";
import logotipo from "./../assets/imgs/logotipo.png";

export default function Login () {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

	function fazerLogin (event) {
		event.preventDefault();

        setLoading(true);

        const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", {
            email: email,
            password: senha
        });


        requisicao.then((response) => {
            setUserData([response.data.token, response.data.image]);
            console.log(response.data);
            navigate("/subscriptions");
        });

        requisicao.catch((err) => {
            console.log(err);
            alert(err);
        });
	}

    return (
        <>
            <Logo>
            <img src={logotipo} />
            </Logo>

            <Form>
                <form onSubmit={fazerLogin}>
                    <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading}/>
                    <br/>
                    <input type="password" placeholder="senha" value={senha} onChange={e => setSenha(e.target.value)} required disabled={loading}/>
                    <br/>
                    {loading ? <button disabled><ThreeDots color="#fff" height={'1.8rem'} width={'100%'} /></button> : <button type="submit">Entrar</button>}
                </form>
            </Form>

            <Cadastro>
                <Link to="/cadastro">
                    <h1>Não tem uma conta? Cadastre-se!</h1>
                </Link>
            </Cadastro>
        </>
    );
}

const Logo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 68px;
    margin-bottom: 30px;
`;

const Cadastro = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a:link {
        text-decoration: none;
        text-decoration: black;
    }

    h1 {
        color: #52B6FF;
        text-decoration: underline;
    }
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input {
        border-width: 1px;
        border-color: #D4D4D4;
        background-color: white;
        border-radius: 5px;
        border: 1px solid #D5D5D5;
        width: 80vw;
        height: 45px;
        margin-bottom: 6px;
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
        font-size: 20px;
        color: #DBDBDB;
    }

    button {
        border-style: none;
        border-radius: 5px;
        margin-bottom: 15px;
        width: 80vw;
        height: 45px;
        background-color: #52B6FF;
        color: white;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 21px;
    }
`;