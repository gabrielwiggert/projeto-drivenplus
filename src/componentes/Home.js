import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "./UserContext";
import usericon from "./../assets/imgs/usericon.png";

export default function Home(props) {
    const { userSubscription, setUserSubscription } = useContext(UserContext);
    const { userData, setUserData } = useContext(UserContext);
    const { userName, setUserName } = useContext(UserContext);
    const membershipInfo = userSubscription.membership;
    const perks = membershipInfo.perks;
    const navigate = useNavigate();
    const config = {
        headers: {
            "Authorization": `Bearer ${userData}`
        }
    }

    return(
        <Fullscreen>
            <Header>
                <img src={membershipInfo.image}/>
                <img src={usericon}/>
            </Header>

            <Greetings><h1>Olá, {userName}</h1></Greetings>

            <Features>
                {perks.map((perk) => <a href={perk.link} key={perk.id}><button>{perk.title}</button></a>)}
            </Features>
            
            <Footer>
                <Link to="/subscriptions">
                    <button>Mudar plano</button>
                </Link>

                <button onClick={cancelarPlano}>Cancelar plano</button>
            </Footer>
        </Fullscreen>
    );

    function cancelarPlano() {
        const requisicao = axios.delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", config);

        requisicao.then(() => {
            navigate("/subscriptions");
        });

        requisicao.catch((err) => {
            console.log(err);
            alert(err);
        });
    }
}

const Footer = styled.div`
    position: fixed;
    bottom: 12px;
    left: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
        border-style: none;
        border-radius: 8px;
        margin-bottom: 8px;
        width: 80vw;
        height: 52px;
        background-color: #FF4791;
        color: white;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 14px;
    }

    button:nth-child(2) {
        background-color: #FF4747;
    }
`;

const Features = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
        border-style: none;
        border-radius: 8px;
        margin-bottom: 8px;
        width: 80vw;
        height: 52px;
        background-color: #FF4791;
        color: white;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 14px;
    }
`;

const Fullscreen = styled.div`
    color: white;

    img {
        width: 75px;
    }

    h1 {
        font-size: 32px;
        font-weight: 700;
        font-style: bold;
        margin-bottom: 53px;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 22px;

    img:nth-child(2) {
        width: 34px;
        height: 34px;
    }
`;

const Greetings = styled.div`
    display: flex;
    justify-content: center;
    margin: 22px;
`;