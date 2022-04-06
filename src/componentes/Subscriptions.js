import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import React from 'react'

import plano from "./../assets/imgs/Plano.png";

export default function Subscriptions() {
    return(
        <Fullscreen>
            <h1>Escolha seu Plano</h1>

            <Plano>
                <img src={plano} />
            </Plano>
            <Plano>
                <img src={plano} />
            </Plano>
            <Plano>
                <img src={plano} />
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