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
import closeicon from "./../assets/imgs/closeicon.png";

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
            <Flex>
                <input type="number" placeholder="Código de segurança" disabled={true}/>
                <SpaceBetween />
                <input type="number" placeholder="Validade" disabled={true}/>
            </Flex>
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
            <Flex>
                <input type="number" placeholder="Código de segurança" value={securityNumber} onChange={e => setSecurityNumber(e.target.value)} required disabled={loading}/>
                <SpaceBetween />
                <input type="number" placeholder="Validade" value={expirationDate} onChange={e => setExpirationDate(e.target.value)} required disabled={loading}/>
            </Flex>
            {loading ? <button disabled><ThreeDots color="#fff" height={'1.8rem'} width={'100%'} /></button> : <button type="submit">Cadastrar</button>}
        </form>
        </Form>
        </>
    );

    function Confirmation() {
        return(
            <>
                <img src={closeicon} onClick={closePop}/>
                <FormPop>
                    <h1>Tem certeza que deseja assinar o plano Driven Plus (R$ 39,99)?</h1>

                    <form onSubmit={confirmarCompra}>
                        <button type="reset" onClick={closePop}>Não</button>
                        <button type="submit">SIM</button>
                    </form>
                </FormPop>
            </>
        );
    }

    function closePop() {
        setUserSubscription("");
    }
}

const SpaceBetween = styled.div`
    width: 8px;
`;

const Flex = styled.div`
    box-sizing: border-box !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;

    input {
        width: 145px !important;
    }

    input::placeholder {
        padding-left: 5px !important;
    }
`;

const FormPop = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 12px;
    color: black;

    h1 {
        color: black;
        font-size: 18px;
        font-weight: 700;
        padding-top: 30px;
        text-align: center;
        margin-bottom: 47px;
    }

    button {
        border-style: none;
        border-radius: 5px;
        margin-bottom: 20px;
        width: 95px;
        height: 52px;
        background-color: #FF4791;
        color: white;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 21px;
    }

    button:first-child {
        background-color: #CECECE;
        margin-right: 14px;
    }
`;

const ConfirmationContainer = styled.div`
    z-index: 1;
    background-color: white;
    color: black;
    text-decoration: black;

    position: fixed;
    width: 248px;
    height: 210px;
    left: 64px;
    top: 229px;

    background: #FFFFFF;
    border-radius: 12px;
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