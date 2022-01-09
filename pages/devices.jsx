import React,{useContext,useEffect} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// components
import Devices from "../components/Data/Devices";
import Layout from "../Layout/Layout"
import { DataStore } from '../utils/DataStore';
export default function DevicePage() {
  const { state, dispatch } = useContext(DataStore);
  const { userInfo } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  }, [userInfo]);
  return (
    <Layout>
     <Typography sx={{ mb: 3 }} variant="h4"  >Devices</Typography>
      <Grid  container spacing={4}>
        <Grid item xs={12}>
          <Devices/>
        </Grid>
      </Grid>
      </Layout>
  );
}
