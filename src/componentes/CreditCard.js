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

export default function CreditCard(props) {
    const [securityNumber, setSecurityNumber] = useState("");
	const [expirationDate, setExpirationDate] = useState("");
    const [nome, setNome] = useState("");
    const [digits, setDigits] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);
    const { userSubscription, setUserSubscription } = useContext(UserContext);
    const [state, setState] = useState(""); //estado auxiliar para forçar re-render. por algum motivo, não estava atualizando sem isso :|

    const config = {
        headers: {
            "Authorization": `Bearer ${userData}`
        }
    }

	function comprar(event) {
		event.preventDefault();
        setUserSubscription("confirmation");
        setState("confirmation");
	}

    function confirmarCompra(event) {
        event.preventDefault();

        const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", {
            membershipId: props.membershipId,
            cardName: nome,
            cardNumber: digits,
            securityNumber: securityNumber,
            expirationDate: expirationDate
        }, config);

        requisicao.then((response) => {
            console.log(response.data);
            setUserSubscription(response.data);
            navigate("/home");
        });

        requisicao.catch((err) => {
            console.log(err);
            alert(err);
        });
    }

    return (userSubscription == "confirmation") ? (
        <>
        <ConfirmationContainer>
            <Confirmation />
        </ConfirmationContainer>

        <Form>
        <form>
            <input type="text" placeholder="Nome impresso no cartão" disabled={true}/>
            <input type="number" placeholder="Dígitos do cartão" value={digits} onChange={e => setDigits(e.target.value)} required disabled={loading}/>
            <input type="number" placeholder="Código de segurança" disabled={true}/>
            <input type="number" placeholder="Validade" disabled={true}/>
            <button disabled><ThreeDots color="#fff" height={'1.8rem'} width={'100%'} /></button>
        </form>
        </Form>
        </>
    ) : (
        <>
        <Form>
        <form onSubmit={comprar}>
            <input type="text" placeholder="Nome impresso no cartão" value={nome} onChange={e => setNome(e.target.value)} required disabled={loading}/>
            <input type="number" placeholder="Dígitos do cartão" value={digits} onChange={e => setDigits(e.target.value)} required disabled={loading}/>
            <input type="number" placeholder="Código de segurança" value={securityNumber} onChange={e => setSecurityNumber(e.target.value)} required disabled={loading}/>
            <input type="number" placeholder="Validade" value={expirationDate} onChange={e => setExpirationDate(e.target.value)} required disabled={loading}/>
            {loading ? <button disabled><ThreeDots color="#fff" height={'1.8rem'} width={'100%'} /></button> : <button type="submit">Cadastrar</button>}
        </form>
        </Form>
        </>
    );

    function Confirmation() {
        return(
            <Form>
            <form onSubmit={confirmarCompra}>
                <button type="submit">Confirmar compra</button>
            </form>
            </Form>
        );
    }
}

const ConfirmationContainer = styled.div`
    position: fixed;
    width: 150px;
    height: 150px;
    background-color: white;
    color: black;
`;

const Form = styled.div`
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input {
        border-width: 1px;
        border-color: #D4D4D4;
        background-color: white;
        border-radius: 5px;
        border: 1px solid #D5D5D5;
        width: 80vw;
        height: 52px;
        margin-bottom: 10px;
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
        margin-bottom: 20px;
        width: 80vw;
        height: 45px;
        background-color: #FF4791;
        color: white;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 21px;
    }
`;