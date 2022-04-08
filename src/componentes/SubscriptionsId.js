import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import React from 'react'

import vector from "./../assets/imgs/Vector.png";
import listvector from "./../assets/imgs/listvector.png";
import moneyvector from "./../assets/imgs/moneyvector.png";
import CreditCard from "./CreditCard";
import UserContext from "./UserContext";

export default function SubscriptionsId() {
    const params = useParams();
    const navigate = useNavigate();
    const [subscriptionsData, setSubscriptionsData] = useState(false);
    const [perks, setPerks] = useState(false);
    const { userData, setUserData } = useContext(UserContext);
    const { userSubscription, setUserSubscription } = useContext(UserContext);
    const [state, setState] = useState(""); //estado auxiliar para forçar re-render. por algum motivo, não estava atualizando sem isso :|
    const config = {
        headers: {
            "Authorization": `Bearer ${userData}`
        }
    }

    useEffect(() => {
        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${params.idPlano}`, config);
        requisicao.then((response) => {
            console.log(response.data);
            setSubscriptionsData(response.data);
            setPerks(subscriptionsData.perks);
            setState("refresh!");
        });
    
        requisicao.catch((err) => {
            console.log(err);
            alert(err);
        });
    }, [state]);

    return (subscriptionsData && perks) ? (
        <Fullscreen>
            <Top>
                <Link to="/subscriptions">
                    <img src={vector} />
                </Link>

                <img src={subscriptionsData.image} />
                <h1>{subscriptionsData.name}</h1>
            </Top>

            <Info>
                <Container>
                <img src={listvector} /> <h3>Benefícios:</h3>
                </Container>
                {perks.map(perk => <li key={perk.id}>{perk.id}. {perk.title} </li>)}

                <Space></Space>

                <Container>
                <img src={moneyvector} /> <h3>Preço:</h3>
                </Container>
                <p>R$ {subscriptionsData.price} cobrados mensalmente</p>
            </Info>

            <CreditCard membershipId={perks[0].membershipId}></CreditCard>
        </Fullscreen>
    ) : "Carregando...";
}

const Container = styled.div`
    display: flex;
    margin-bottom: 12px;
    img {
        margin-right: 10px;
    }
`;

const Space = styled.div`
    margin-bottom: 12px;
`;

const Info = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    color: white;
    font-weight: 400;
    margin-left: -65px;

    li {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
`;

const Top = styled.div`
    h1 {
        color: white;
        font-size: 32px;
        font-weight: 700;
        font-style: bold;
        margin-bottom: 10px;
    }
    
    img:nth-child(1) {
        position: fixed;
        top: 22px;
        left: 22px;
    }
    
    img:nth-child(2) {
        margin-top: 86px;
        margin-bottom: 12px;
    }
`;

const Fullscreen = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
`;