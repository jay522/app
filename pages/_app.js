import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('fav'))==null){
      localStorage.setItem('fav',JSON.stringify([]))}
  },[])
  return <>
  <Navbar />
  <Component {...pageProps} />
  <Footer />
  </>
}
