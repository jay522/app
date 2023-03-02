import { Stack, IconButton, Button } from "@mui/material";
import React, { useEffect } from "react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import axios from 'axios'
// const BASE_URL=process.env.BASE_URL
import { BASE_URL } from "@/components/helper";
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
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
    if (JSON.parse(localStorage.getItem('fav')) == null) {
      localStorage.setItem('fav', JSON.stringify([]))
    }
  }, [])
  return <>
    <Navbar />
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
    <Footer />
  </>
}
