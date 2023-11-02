import { ChatListBox } from "../components/Main/ChatListBox";
import { useState } from "react";
import { ChatListContainer, ChatListLiContainer, Container, IconsModalWrapper, IconsWrapper, StyledIcon } from "../css/styled/main.styled";
import { ChatMainContainer } from "../components/Main/ChatMainContainer";

export const Main = () => {
    const [isChatListActive, setIsChatListActive] = useState(false);
    const users = ['시영', '민정', '동원', '재현', '민주', '세윤', '준호', '현기', '지은', '은지'];

    return (
        <>
            <Container>
                {/* 채팅 목록: 왼쪽 영역 */}
                <ChatListContainer className="left-pane">
                    <IconsModalWrapper>
                        {/* 처음 진입하거나 왼쪽부분 사이즈를 줄이고 싶을때 */}
                        <IconsWrapper>
                                <StyledIcon className="fas fa-user" size='30px' marginright="20px" onClick={()=> {
                                    setIsChatListActive(false);
                                }} />
                                <StyledIcon className="fas fa-comment" size="30px" onClick={()=> {
                                    setIsChatListActive(true);
                                }} />
                        </IconsWrapper>
                    </IconsModalWrapper>

                    {/* 채팅 목록 리스트 */}
                    <ChatListLiContainer>
                        {/* components/ChatListBox.jsx */}
                        {
                            isChatListActive ? (
                                users.map((user,idx) => <ChatListBox username={user} key={idx}/>)
                            ) : (
                                null
                            )
                        }
                    </ChatListLiContainer>
                </ChatListContainer>

                {/* 채팅 치는 영역 */}
                <ChatMainContainer className="right-pane"/>
            </Container>
        </>
    )
}

