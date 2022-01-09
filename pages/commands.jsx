import React, { useState, useEffect,useContext } from "react";
import { styled } from '@mui/material/styles';
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Layout from "../Layout/Layout"
import { DataStore } from '../utils/DataStore';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
var _ = require("lodash");
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export default function Commands() {
  const { state, dispatch } = useContext(DataStore);
  const { userInfo } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  }, [userInfo]);
  const [Devices, setDevices] = useState({
    totalCount: null,
    result: null,
  });
 
  useEffect(() => {
    // POST request using fetch with set headers
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Grpc-Metadata-Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4",
      },
    };
    fetch(
      `https://chirpstack.igscsi4server.com/api/devices?limit=100000&applicationID=${4}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) =>
        setDevices({ result: data.result, totalCount: data.totalCount }),
      ).catch(function (error) {
        alert('Please Check your internet connection. Either their is no internet connection or the signals are weak');
      });
  }, []);

  var array = _.toArray(Devices.result);
  const [successfullyCommandDialogOpen, setSuccessfullyCommandDialogOpen] = React.useState(false);

  

  const SuccessfullyCommandhandleClose = () => {
    setSuccessfullyCommandDialogOpen(false);
  };


  return (
    <Layout>
          
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"> <Typography variant="h6" >Devices Name</Typography></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody >

              {array.map((element, i) => {
                return (
                  <tr key={i}>
                    <td> {element.name}</td>
                    <td>
                      <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <FormControlLabel
                         
                          control={<IOSSwitch disabled={true} sx={{ m: 1 }} />}
                          onChange={()=>setSuccessfullyCommandDialogOpen(true)}
                          label="On" />
                        <FormControlLabel
                        onChange={()=>setSuccessfullyCommandDialogOpen(true)}
                         
                          control={<IOSSwitch disabled={true} sx={{ m: 1 }} />}
                          label="Off" />
                      </Box>
                    </td>
                    
                    <Dialog
                      open={successfullyCommandDialogOpen}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={SuccessfullyCommandhandleClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{"Contact For Configurations"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Commands Uplink is not configured
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={SuccessfullyCommandhandleClose}>Ok</Button>
                      </DialogActions>
                    </Dialog>
                  </tr>

                );
              })}

            </tbody>
          </table>
        </Grid>
      </Grid>


      </Layout>
  );
}