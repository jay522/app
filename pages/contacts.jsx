import { Paper, Typography, Box, TextField, InputAdornment, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import { useState } from "react";
import { BASE_URL } from "@/components/helper";
// const BASE_URL=process.env.BASE_URL


const style = {
    root: {
        paddingTop: "1rem",marginBottom:"7px"
    },
    head: {
        textAlign: "center",
        color: "blue"
    },
    mid:{
        fontSize:"0.7rem"
    }
}
const Contacts = () => {
    const [data, setData] = useState({
        name: "", email: "", phone: "", subject: "", message: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        // console.log(e.target.value)
    }
    const fnSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(data))
        const { name, email, phone, subject, message } = data
        const res = await fetch(`${BASE_URL}/contactus`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, subject, message
            })
        })
        const data1 = await res.json();
        // console.log(data1)
        if (!data1) {
            console.log("message not send");
        } else {
            alert("Message sent");
            setData({ ...data, message: "" });
        }
    }
    return (
        <>
        <Container sx={style.root} maxWidth>
            <Paper component={Box} width="90%" mx="auto" p={2}>
                <Typography sx={style.head} variant="h5">CONTACT US NOW!</Typography>
                <Typography sx={style.head} variant="subtitle2">How Can We Serve You? Let&#39;s Start A Conversation</Typography>
                <Typography mt={1} sx={style.mid}>In The Event That You Have Any Inquiries Regarding Our Beautiful Ladies Or On The Off Chance That You Might Want To Book Any Of Our Escorts, Don&#39;t Mind Don&#39;t Hesitate To Call Us Or To Message Us Consistently Somewhere In The Range Of 10am And 3am On This Number.</Typography>
                <Typography mt={1} sx={style.mid}>You Can Likewise Email Us At Whenever And You Will Get Our Answer Inside 24 Hours. Our Email Address Is <b style={{ color: "blue" }}>xxxxxxxxxxxxxes.com@gmail.com</b></Typography>
                <Box component="form" mt={2}>
                    <TextField
                        name="name"
                        value={data.name}
                        onChange={handleInput}
                        fullWidth margin="normal"
                        placeholder="Enter Your Name"
                        variant="outlined" color="secondary"
                        label="Name"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon color="secondary" />
                                </InputAdornment>
                            )
                        }}
                    ></TextField>
                    <TextField
                        name="email"
                        value={data.email}
                        onChange={handleInput}
                        fullWidth margin="normal"
                        placeholder="Enter Your Email ID"
                        variant="outlined" color="secondary"
                        label="Email ID"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon color="secondary" />
                                </InputAdornment>
                            )
                        }}
                    ></TextField>
                    <TextField
                        name="phone"
                        value={data.phone}
                        onChange={handleInput}
                        fullWidth margin="normal"
                        placeholder="Enter Your Phone Number"
                        variant="outlined" color="secondary"
                        label="Number"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocalPhoneIcon color="secondary" />
                                </InputAdornment>
                            )
                        }}
                    ></TextField>
                    <TextField
                        name="subject"
                        value={data.subject}
                        onChange={handleInput}
                        fullWidth margin="normal"
                        placeholder="Subject"
                        variant="outlined" color="secondary"
                        label="Subject"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SubjectIcon color="secondary" />
                                </InputAdornment>
                            )
                        }}
                    ></TextField>
                    <TextField
                        name="message"
                        value={data.message}
                        onChange={handleInput}
                        fullWidth margin="normal"
                        placeholder="Write Your Message"
                        variant="outlined" color="secondary"
                        label="Message"
                        multiline rows={4}
                    ></TextField>
                </Box>
                <Box textAlign="center" mb={2}>
                    <Button variant="contained" color="secondary" onClick={fnSubmit}>
                        Send Now
                    </Button>
                </Box>
            </Paper>
        </Container>
        </>
    )
}

export default Contacts;