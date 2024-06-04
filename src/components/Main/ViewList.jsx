import { ChatListContainer } from "./Chat/ChatListContainer";
import { ChatAndPeopleListContainer } from "../../css/styled/Main/main.styled";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IconsState } from "../../hooks/iconsState";
import { PeopleListContainer } from "./People/PeopleListContainer";
import { getUserInfo } from "../../function/user.js";
// import { UserProfileContainer } from "./common/UserProfileContainer";
import { RoomsState } from "../../hooks/roomsState";
import { MyProfileContainer } from './People/MyProfileContainer';

{/* index 값은 map함수의 파라미터, 사용할 데이터와 분리해서 적을것 */}
export const ViewList = ({ setChoosedUser }) => {
    const iconsState = useRecoilValue(IconsState);
    // 서버로부터 받아온 데이터라고 가정 : dummy data
    const USERS = useRecoilValue(RoomsState);
    const MyInfo = getUserInfo();

    return (
        <ChatAndPeopleListContainer>
                {/* 토큰이 있으면 실행 */}
                { MyInfo && <MyProfileContainer myinfo={MyInfo}/> }
                {/* <MyProfileContainer/>  */}
            {
                iconsState["chatList"] ? (
                    USERS.length > 0 && USERS.map((user,idx) => <ChatListContainer user={user} setChoosedUser={setChoosedUser} key={idx} />)
                ) : (
                    USERS.length > 0 && USERS.map((user,idx) => <PeopleListContainer user={user} setChoosedUser={setChoosedUser} key={idx}/>)
                )
            }
        </ChatAndPeopleListContainer>
    )
}