import { Box, Grid, Container, Card, CardHeader, CardActionArea, CardMedia, CardContent, Typography, Avatar, Checkbox } from "@mui/material";
import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import { grey } from "@mui/material/colors";
import Image from 'next/image'

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
    height: 200,
    width: '100%'
  }

}
const Horizontal = () => {
  const [favPost, setFavPost] = useState([])
  const [fav, setFav] = useState([])
  const [data, setData] = useState(false)

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
    const favList = JSON.parse(localStorage.getItem('fav'));
    const favPost = data.filter(obj => favList.includes(obj._id))
    console.log("fav",favList)
    if (favPost.length != 0) {
      setFavPost(favPost)
      setData(true)
      setFav(favList)
    } else {
      setData(false)
    }
  }, []);
  // console.log("fav",data)
  return (
    <Container className={style.root} maxWidth>
      <Grid container mt={0.1} spacing={3}>
        {
          data ? favPost.map((obj, ind) => {
            const { img, age, type, date, loc, _id, head, desc, name } = obj
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={ind}>
                <Card>
                  <CardHeader avatar={<Avatar alt="U" src={img}></Avatar>}
                    title={name} subheader={age}
                    action={<Checkbox icon={<FavoriteBorderIcon sx={{ color: "red" }} />} checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
                      onChange={(e) => handleFav(e, _id)} checked={fav.includes(_id)} />}
                  />
                  <CardActionArea>
                    <Link href={`/post/${_id}`}>
                    <Grid container>
                      <Grid xs={6}>
                        {/* <CardMedia component={Image} sx={style.Media}image={img} /> */}
                        <CardMedia ><Image src={`/${img}`} alt="me" width={150} height="200" /></CardMedia>

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
            : <Typography variant="h5" m={5}>You have not liked any profies.</Typography>
        }
      </Grid>
    </Container >
  )
}
const MyFav = () => {
  return (
    <>
      <Horizontal />
    </>
  )
}
export default MyFav;

