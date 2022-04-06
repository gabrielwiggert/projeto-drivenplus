import styled from "styled-components";
import { useContext } from "react";

import TrackIt from "./../assets/imgs/TrackIt.png";
import UserContext from "./UserContext";

export default function Header() {
    const { userData, setUserData } = useContext(UserContext);

    return(
        <HeaderElements>
            <img src={TrackIt} />
            <img src={userData[1]} />
        </HeaderElements>
    );
}

const HeaderElements = styled.div`
    display: flex;
    justify-content: space-between;
    height: 70px;
    padding: 15px;
    align-items: center;
    background-color: #126BA5;

    img:last-child {
        height: 50px;
        border-radius: 100px;
    }
`;