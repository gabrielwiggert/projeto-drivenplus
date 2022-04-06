import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import React from 'react'

import UserContext from "./UserContext";

export default function Subscriptions() {
    const [subscriptionsData, setSubscriptionsData] = useState(null);
    const { userData, setUserData } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData}`
        }
    }

    useEffect(() => {
        const requisicao = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config);
        requisicao.then((response) => {
            console.log(response.data);
            setSubscriptionsData(response.data);
        });
    
        requisicao.catch((err) => {
            console.log(err);
            alert(err);
        });
    }, []);

    return(
        <Fullscreen>
            <h1>Escolha seu Plano</h1>

            <Plano>
                <img src={subscriptionsData[0].image} />
            </Plano>
            <Plano>
                <img src={subscriptionsData[1].image} />
            </Plano>
            <Plano>
                <img src={subscriptionsData[2].image} />
            </Plano>
        </Fullscreen>
    );
}

const Plano = styled.div`
    margin-bottom: 10px;
`;

const Fullscreen = styled.div`
    margin-top: 29px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        color: white;
        font-size: 32px;
        font-weight: 700;
        font-style: bold;
        margin-bottom: 24px;
    }
`;