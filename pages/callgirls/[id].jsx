import { Box, Grid, Container, Card, CardHeader, CardActionArea, CardMedia, CardContent, Typography, Avatar, IconButton } from "@mui/material";
import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { grey } from "@mui/material/colors";
import { BASE_URL } from "@/components/helper";
// const BASE_URL = process.env.BASE_URL
const style = {
  root: {
    // width: "100vw", height: "100vh",
  },
  hl: {
    backgroundColor: grey[300],
    borderRadius: "10px",
    paddingLeft: "14px",
    paddingRight: "14px",
    fontSize: "16px",
    float: "left",
    margin: "4px"
  },
  btn: {
    margin: "5px",
  },
  Media: {
    height: 400,
    width: '100%',
  },
  Card: {
    float: "center"
  }
}
export const getServerSidePaths = async () => {
  const res = await fetch( `${BASE_URL}/callgirls`);
  const data = await res.json();
  const paths = data.map(curElem => ({
      params: {id: curElem._id}
    }))
  return {
    paths,
    fallback: false,
  };
};
export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`${BASE_URL}/callgirls/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
const Post = ({ data }) => {
  // console.log(data)
  const { img, age, type, date, loc, _id, head, desc, name } = data
  
  return (
    <Container className={style.root} maxWidth>
      <Grid container mt={0.1} spacing={1}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader avatar={<Avatar alt="U" src={`/${img}`}></Avatar>}
              title={name} subheader={_id}
              action={<IconButton>
                <FavoriteIcon />
              </IconButton>}
            />
            <CardActionArea>
              <Grid container>
                <Grid>
                  <CardContent>
                    <Typography variant="h5">{head}</Typography>
                    <Typography variant="subtitle1">{desc}</Typography>
                    <Box mb={2}>
                      <Typography sx={style.hl} variant="h6">{loc}</Typography>
                      <Typography sx={style.hl} variant="h6">Age: {age}</Typography>
                      <Typography sx={style.hl} variant="h6">1 Hour 15000</Typography>
                      <Typography sx={style.hl} variant="h6">2 Hours 20000</Typography>
                      <Typography sx={style.hl} variant="h6">3 Hours 30000</Typography>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardActionArea>
              <Grid>
                <Grid container spacing={2}>
                  <Grid>
                    <Card sx={style.Card} >
                      <CardMedia sx={style.Media} component="img" image={`/${img}`} />
                    </Card >
                  </Grid>
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
export default Post;
