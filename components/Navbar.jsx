import React from 'react'
import { AppBar, CssBaseline, List, Button, SwipeableDrawer, IconButton, ListItem, Toolbar, Typography,Checkbox } from "@mui/material";
import Link from 'next/link';
import ListIcon from '@mui/icons-material/List';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

const styles = {
    menuButton: {
        marginRight: "1rem",
    },
    title: {
        marginRight: "auto",textDecoration:"none"
    },
    content: {
        padding: "3px"
    },
    drawer: {
        width: 200,
    },
    col: { color: "white" },
    navCol: {
        background:'#C0C0C0'
    }
}
const Navbar = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <CssBaseline />
            <SwipeableDrawer open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} >
                <List disablePadding sx={styles.drawer}>
                    <Typography variant='h5' ml={2}  sx={{ flexGrow: 1,textDecoration:"none" }}><Link href="/callgirls">PriyaEscorts</Link></Typography>
                    <ListItem divider onClick={() => setOpen(false)}><Link href="/callgirls">Home</Link></ListItem>
                    <ListItem divider onClick={() => setOpen(false)}><Link href="/callgirls">CallGirls</Link></ListItem>
                    <ListItem divider onClick={() => setOpen(false)}><Link href="/cityguide">City Guide</Link></ListItem>
                    <ListItem divider onClick={() => setOpen(false)}><Link href="/contacts">Contacts</Link></ListItem>
                    <ListItem divider onClick={() => setOpen(false)}><Link href="/post">Post</Link></ListItem>
                </List>
            </SwipeableDrawer>
            <AppBar sx={styles.navCol} position='static' >
                <Toolbar sx={styles.col}>
                    <IconButton color='inherit'
                        edge="start" sx={styles.menuButton}
                        onClick={() => setOpen(true)}>
                        <ListIcon />
                    </IconButton>
                    <Typography variant='h6' sx={styles.title} ><Link href="/callgirls">PriyaEscorts</Link></Typography>
                    <Button  sx={styles.col} ><Link href="/myfav"><Checkbox checkedIcon={<FavoriteIcon sx={{color:"red"}} />} checked={true}  /></Link></Button>
                    <Button  sx={styles.col} ><Link href="/callgirls">CallGirls</Link></Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;
