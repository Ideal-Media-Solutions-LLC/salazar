import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Layout, Menu, Breadcrumb } from 'antd';
import Transcribe from '../components/videochat/transcribe';

const { Header, Content, Footer } = Layout;

export default function VideoChat() {
  return (
    <div>
      <Head>
        <title>Salazar Video Chat</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Video Chat
        </h1>
        
        <Transcribe/>


      </main>

      <footer className={styles.footer}>
        FOOTER
      </footer>
    </div>
  )
}