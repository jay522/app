import { Container, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
const style = {
  root: {
    backgroundColor:grey[900],color:'white',
    padding:"9px",textAlign:"center",position:"fixed",bottom:0
  },
  btn: {
    margin: "5px",
  }
}
const Footer = () => {
  return (
    <Container sx={style.root} maxWidth>
      <Typography sx={{fontWeight:"bold",fontSize:"15px",color:"red"}}>PriyaEscorts &copy; 2021 All Right Reserved</Typography>
    </Container>
  )
}

export default Footer