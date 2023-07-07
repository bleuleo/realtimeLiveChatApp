//import {MultiChatSocket,MultiChatWindow, useMultiChatLogic} from 'react-chat-engine-advanced'
import {PrettyChatWindow} from 'react-chat-engine-pretty'

const ChatsPage = (props)=> {
    // const chatProps = useMultiChatLogic('83d6d4f9-9c61-4507-9b6d-9b63ea3d1cc9',
    // props.user.username,
    // props.user.secret);
    return (
        <div style={{height:'100vh'}}>
            {/* <MultiChatSocket {...chatProps} />
            <MultiChatWindow {...chatProps} style={{height: '100%'}}/>         */}
            <PrettyChatWindow
                projectId='83d6d4f9-9c61-4507-9b6d-9b63ea3d1cc9'
                username={props.user.username}
                secret={props.user.secret}
                style={{height : '100%'}}
            />

        </div>
    )
}

export default ChatsPage