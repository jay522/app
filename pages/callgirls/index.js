import { Stack,Box, Grid, Container, Card, CardHeader, CardActionArea, CardMedia, CardContent, Typography, Avatar, IconButton, Button, Checkbox } from "@mui/material";
import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import axios from 'axios'
import Link from 'next/link';
import { grey } from "@mui/material/colors";
// const BASE_URL=process.env.BASE_URL
import { BASE_URL } from "@/components/helper";
import Details from "@/components/Details";
const style = {
  root: {
    width: "100vw", height: "100vh",
    // paddingTop:theme.spacing(5),
    // backgroundColor:(theme:Theme)=> theme.palette.red[200]
  },
  hl: {
    backgroundColor: grey[300],
    borderRadius: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    fontSize: "13px",
    float: "left",
    margin: "1px"
  },
  Media: {
    height: 270,
    width: '100%'
  }

}

const CallGirls = ({data}) => {
  // console.log(data)
  // let data = []
  const [fav, setFav] = useState([""])

  const handleFav = (e, id) => {
    const favData = JSON.parse(localStorage.getItem('fav'));
    if (e.target.checked) {
      if (favData == null || !favData.includes(id)) {
        favData.push(id)
      }
      localStorage.setItem('fav', JSON.stringify(favData))
    } else {
      // console.log(e.target.checked)
      if (favData.includes(id)) {
        favData.splice(favData.indexOf(id), 1);
        localStorage.setItem('fav', JSON.stringify(favData))
      }
    }
    setFav(JSON.parse(localStorage.getItem('fav')))
  }
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      setFav(JSON.parse(localStorage.getItem('fav')))
    }
  }, []);
  // console.log(fav)
  const fnInfo = async (msg) => {
    var cp = 0;var cw = 0;
    axios({
      method: 'GET', url: `${BASE_URL}/onInfo`, headers: {
        'Access-Control-Allow-Origin': '*', "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
      .then(async(res)=> {
        if(msg==="p"){cp = res.data[0].cp + 1; cw = res.data[0].cw}
        else if(msg==="w"){cp = res.data[0].cp; cw = res.data[0].cw + 1}
        console.log(cp, " & ",cw)
        const resp = await fetch(`${BASE_URL}/onInfo`, {
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
  return (
    <Container className={style.root} maxWidth>
      <Grid container mt={0.1} spacing={3}>
        {
          data.map((obj, ind) => {
            const { img, age, type, date, loc, _id, head, desc, name } = obj
            return (
              <Grid item xs={12} sm={6} lg={4} key={ind}>
                <Card>
                  <CardHeader avatar={<Avatar alt="U" src={img}></Avatar>}
                    title={name} subheader={_id}
                    action={<Checkbox icon={<FavoriteBorderIcon sx={{ color: "red" }} />} checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
                      onChange={(e) => handleFav(e, _id)} checked={fav.includes(_id)} />}
                  />
                  <CardActionArea>
                    <Link href={`callgirls/${_id}`}>
                      <Grid container>
                        <Grid xs={6}>
                          <CardMedia component="img" sx={style.Media}
                            image={img} />
                        </Grid>
                        <Grid xs={6}>
                          <CardContent>
                            <Typography variant="subtitle2">{head}</Typography>
                            <Box mb={2}>
                              <Typography sx={style.hl} variant="h6">{loc}</Typography>
                              <Typography sx={style.hl} variant="h6">1 Hour 15000</Typography>
                              <Typography sx={style.hl} variant="h6">2 Hours 20000</Typography>
                            </Box>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })
        }
      </Grid>
      <Stack direction="row" sx={{
        position: "sticky",
        bottom: 52
      }}
        spacing={2} mb={1} mt={1}>

        <Button size='large' variant="contained" color="primary" href="tel:910000000000" onClick={()=>fnInfo("p")}>  <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <PhoneIcon />
        </IconButton> Call Now</Button>
        <Button size='large' variant="contained" color="success" href="https://wa.me/910000000000" target={'_blank'} onClick={()=>fnInfo("w")}> <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <WhatsAppIcon />
        </IconButton>WhatsApp</Button>
      </Stack>
      <Details />
    </Container >
  )

}
export default CallGirls;

export const getServerSideProps = async () => {
  const res = await fetch(`${BASE_URL}/callgirls`);
  const data = await res.json();
  // console.log(data)
  return {
    props: {
      data,
    },
  };
};