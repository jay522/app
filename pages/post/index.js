import { Stack,Box, Grid, Container, Card, CardHeader, CardActionArea, CardMedia, CardContent, Typography, Avatar, IconButton, Button, Checkbox } from "@mui/material";
import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
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

const Post = ({data}) => {
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
                    <Link href={`post/${_id}`}>
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
      <Details />
    </Container >
  )

}
export default Post;

export const getServerSideProps = async () => {
  const res = await fetch(`${BASE_URL}/post`);
  // const res = await fetch(`https://server-uyli.onrender.com/post`);
  const data = await res.json();
  // console.log(data)
  return {
    props: {
      data,
    },
  };
};