'use client'
import Link from 'next/link'
import Header from '../../components/Header/Header';
import { SingleChat } from './SingleChat';
import styles from './chat.module.css';




export default function ChatInterface({params}) {
  const owner_id = params['ownerid']
  console.log(owner_id)
    return (
        <div className='chat-interface'>
          <Header /> 
            <div className={styles.chat_body}>
                <SingleChat owner_id={owner_id}/>
           </div>
           </div>);
}