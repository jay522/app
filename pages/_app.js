import { Stack, IconButton, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import axios from 'axios'
// const BASE_URL=process.env.BASE_URL
import { BASE_URL } from "@/components/helper";
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import Router from "next/router";
import Loader from "@/components/Loader";


export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)
  Router.events.on("routeChangeStart", (url) => {
    console.log("route change start")
    setLoading(true)
  })
  Router.events.on("routeChangeComplete", (url) => {
    console.log("route change complete")
    setLoading(false)
  })
  Router.events.on("routeChangeError", (err,url) => {
    console.log("route change error")
    setLoading(true)
  })
  // Router.reload();
  const fnInfo = async (msg) => {
    var cp = 0; var cw = 0;
    axios({
      method: 'GET', url: `${BASE_URL}/getinfo`, headers: {
        'Access-Control-Allow-Origin': '*', "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
      .then(async (res) => {
        if (msg === "p") { cp = res.data[0].cp + 1; cw = res.data[0].cw }
        else if (msg === "w") { cp = res.data[0].cp; cw = res.data[0].cw + 1 }
        console.log(cp, " & ", cw)
        const resp = await fetch(`${BASE_URL}/info`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cp, cw
          })
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
  useEffect(() => {
    // console.log("true")
    // Router.reload()
    if (JSON.parse(localStorage.getItem('fav')) == null) {
      localStorage.setItem('fav', JSON.stringify([]))
    }
  }, [])
  return <>
    <Navbar />
    {loading ? <Loader /> :
      <>
        <Component {...pageProps} />
        <Stack direction="row" sx={{
          position: "sticky",
          bottom: 52
        }}
          spacing={2} mb={1} mt={1}>

          <Button size='large' variant="contained" color="primary" href="tel:910000000000" onClick={() => fnInfo("p")}>  <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <PhoneIcon />
          </IconButton> Call Now</Button>
          <Button size='large' variant="contained" color="success" href="https://wa.me/910000000000" target={'_blank'} onClick={() => fnInfo("w")}> <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <WhatsAppIcon />
          </IconButton>WhatsApp</Button>
        </Stack>
      </>
    }
    <Footer />
  </>
}
