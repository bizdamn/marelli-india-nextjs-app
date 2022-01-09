import React,{useContext,useEffect} from "react";
import Entries from '../models/Entries';
import db from '../utils/db';
import { useRouter } from 'next/router';
import { ResponsiveContainer } from "recharts";
import TempGauge from "../components/ui/LiveData/TempGauge";
import HumidityGauge from "../components/ui/LiveData/HumidityGauge";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Layout from "../Layout/Layout"
import { DataStore } from '../utils/DataStore';
export default function LiveData({ lastEntry117a, lastEntry79fd,lastEntry7a4e,lastEntry7a01,lastEntry79fe,lastEntry7a0a }) {
  const router = useRouter();
  const { state, dispatch } = useContext(DataStore);
  const { userInfo } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  }, [userInfo, router]);


  const tempratureAlarmOff = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Grpc-Metadata-Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4'
      },
      body: JSON.stringify({
        deviceQueueItem: {
          confirmed: true,
          data: '+gcMRE0xPTNF',
          devEUI: `ff0006f201000001`,
          fCnt: 0,
          fPort: 7
        }
      }),
    };
    fetch(`https://chirpstack.igscsi4server.com/api/devices/ff0006f201000001/queue`, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }
  
    const tempratureAlarmOn = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Grpc-Metadata-Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4'
      },
      body: JSON.stringify({
        deviceQueueItem: {
          confirmed: true,
          data: '+gcMRE0xPTRG',
          devEUI: `ff0006f201000001`,
          fCnt: 0,
          fPort: 7
        }
      }),
    };
    fetch(`https://chirpstack.igscsi4server.com/api/devices/ff0006f201000001/queue`, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }




  const humidityAlarmOff= () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Grpc-Metadata-Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4'
      },
      body: JSON.stringify({
        deviceQueueItem: {
          confirmed: true,
          data: '+gcMRE01PTNJ',
          devEUI: `ff0006f201000001`,
          fCnt: 0,
          fPort: 7
        }
      }),
    };
    fetch(`https://chirpstack.igscsi4server.com/api/devices/ff0006f201000001/queue`, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }
  
    const humidityAlarmOn = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Grpc-Metadata-Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4'
      },
      body: JSON.stringify({
        deviceQueueItem: {
          confirmed: true,
          data: '+gcMRE01PTRK',
          devEUI: `ff0006f201000001`,
          fCnt: 0,
          fPort: 7
        }
      }),
    };
    fetch(`https://chirpstack.igscsi4server.com/api/devices/ff0006f201000001/queue`, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }




  if(lastEntry117a.length>0){
    if(lastEntry117a[0].temprature<20||lastEntry117a[0].temprature>26){
      tempratureAlarmOn()
    }
  }
  if(lastEntry79fd.length>0){
    if(lastEntry79fd[0].temprature<20||lastEntry79fd[0].temprature>26){
      tempratureAlarmOff()
    }
  }
  

  


  
  if(lastEntry117a.length>0){
    if(lastEntry117a[0].humidity<40||lastEntry117a[0].humidity>60){
      humidityAlarmOn()
    }
  }
  if(lastEntry79fd.length>0){
    if(lastEntry79fd[0].humidity<40||lastEntry79fd[0].humidity>60){
      humidityAlarmOff()
    }
  }

  
  return (
    <Layout>
      <Grid container>
        {/* 117a */}
        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
          className="p-0"
          item
          lg={4}
          md={4}
          sm={6}
          xs={12}
        >
          <ResponsiveContainer className="p-0" width="100%">
            <>
              <div
                className="p-1"
                style={{
                  backgroundColor: "#9013FE",
                  borderRadius: "1rem",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <h5>Zone 1</h5>
              </div>
              <Grid sx={{ p: 2 }} container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Temprature:</Typography>
                  {lastEntry117a.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={lastEntry117a[0].temprature} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{lastEntry117a[0].temprature} °C</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={15} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`--`} °C</Typography>
                    </>)}


                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Humidity:</Typography>
                  {lastEntry117a.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={lastEntry117a[0].humidity} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{lastEntry117a[0].humidity} %</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={0} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`0`} %</Typography>
                    </>)}



                </Grid>

              </Grid>
            </>
          </ResponsiveContainer>
        </Grid>

        {/* 79fd */}
        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
          className="p-0"
          item
          lg={4}
          md={4}
          sm={6}
          xs={12}
        >
          <ResponsiveContainer className="p-0" width="100%">
            <>
              <div
                className="p-1"
                style={{
                  backgroundColor: "#9013FE",
                  borderRadius: "1rem",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <h5>Zone 2</h5>
              </div>
              <Grid sx={{ p: 2 }} container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Temprature:</Typography>

                  {lastEntry79fd.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={lastEntry79fd[0].temprature} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{lastEntry79fd[0].temprature} °C</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={15} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`--`} °C</Typography>
                    </>)}


                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Humidity:</Typography>
                  {lastEntry79fd.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={lastEntry79fd[0].humidity} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{lastEntry79fd[0].humidity} %</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={0} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`0`} %</Typography>
                    </>)}


                </Grid>

              </Grid>

            </>
          </ResponsiveContainer>
        </Grid>

        {/* 117a */}
        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
          className="p-0"
          item
          lg={4}
          md={4}
          sm={6}
          xs={12}
        >
          <ResponsiveContainer className="p-0" width="100%">
            <>
              <div
                className="p-1"
                style={{
                  backgroundColor: "#9013FE",
                  borderRadius: "1rem",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <h5>Zone 2</h5>
              </div>
              <Grid sx={{ p: 2 }} container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Temprature:</Typography>
                
                  {lastEntry7a4e.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={lastEntry7a4e[0].temprature} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{lastEntry7a4e[0].temprature} °C</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={15} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`--`} °C</Typography>
                    </>)}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Humidity:</Typography>

                  {lastEntry7a4e.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={lastEntry7a4e[0].humidity} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{lastEntry7a4e[0].humidity} %</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={0} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`0`} %</Typography>
                    </>)}

                </Grid>

              </Grid>

            </>
          </ResponsiveContainer>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
          className="p-0"
          item
          lg={4}
          md={4}
          sm={6}
          xs={12}
        >
          <ResponsiveContainer className="p-0" width="100%">
            <>
              <div
                className="p-1"
                style={{
                  backgroundColor: "#9013FE",
                  borderRadius: "1rem",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <h5>Zone 4</h5>
              </div>
              <Grid sx={{ p: 2 }} container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Temprature:</Typography>
                
                  {lastEntry7a0a.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={lastEntry7a0a[0].temprature} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{lastEntry7a0a[0].temprature} °C</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={15} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`--`} °C</Typography>
                    </>)}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Humidity:</Typography>
                  {lastEntry7a0a.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={lastEntry7a0a[0].humidity} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{lastEntry7a0a[0].humidity} %</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={0} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`0`} %</Typography>
                    </>)}
                </Grid>

              </Grid>

            </>
          </ResponsiveContainer>
        </Grid>

        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
          className="p-0"
          item
          lg={4}
          md={4}
          sm={6}
          xs={12}
        >
          <ResponsiveContainer className="p-0" width="100%">
            <>
              <div
                className="p-1"
                style={{
                  backgroundColor: "#9013FE",
                  borderRadius: "1rem",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <h5>Zone 5</h5>
              </div>
              <Grid sx={{ p: 2 }} container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Temprature:</Typography>
                 
                  {lastEntry79fe.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={lastEntry79fe[0].temprature} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{lastEntry79fe[0].temprature} °C</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={15} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`--`} °C</Typography>
                    </>)}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Humidity:</Typography>

                  {lastEntry79fe.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={lastEntry79fe[0].humidity} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{lastEntry79fe[0].humidity} %</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={0} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`0`} %</Typography>
                    </>)}

                </Grid>

              </Grid>

            </>
          </ResponsiveContainer>
        </Grid>


        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
          className="p-0"
          item
          lg={4}
          md={4}
          sm={6}
          xs={12}
        >
          <ResponsiveContainer className="p-0" width="100%">
            <>
              <div
                className="p-1"
                style={{
                  backgroundColor: "#9013FE",
                  borderRadius: "1rem",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <h5>Zone 2</h5>
              </div>
              <Grid sx={{ p: 2 }} container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Temprature:</Typography>
                 
                  {lastEntry7a01.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={lastEntry7a01[0].temprature} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{lastEntry7a01[0].temprature} °C</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={15} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`--`} °C</Typography>
                    </>)}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Humidity:</Typography>

                  {lastEntry7a01.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={lastEntry7a01[0].humidity} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{lastEntry7a01[0].humidity} %</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={0} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`0`} %</Typography>
                    </>)}
                </Grid>

              </Grid>

            </>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Layout>
  );
}



export async function getServerSideProps() {
  await db.connect();
  const lastEntry117a = await Entries.find({ devEUI: 'a84041c98183117a' }).sort({ _id: -1 }).limit(1).lean()
  const lastEntry79fd = await Entries.find({ devEUI: 'a8404181e18379fd' }).sort({ _id: -1 }).limit(1).lean()
  const lastEntry7a4e = await Entries.find({ devEUI: 'a840416521837a4e' }).sort({ _id: -1 }).limit(1).lean()
  const lastEntry7a01 = await Entries.find({ devEUI: 'a840417eb1837a01' }).sort({ _id: -1 }).limit(1).lean()
  const lastEntry79fe = await Entries.find({ devEUI: 'a84041c2718379fe' }).sort({ _id: -1 }).limit(1).lean()
  const lastEntry7a0a = await Entries.find({ devEUI: 'a84041b931837a0a' }).sort({ _id: -1 }).limit(1).lean()
  await db.disconnect();


  return {
    props: {
      lastEntry117a: lastEntry117a.map(db.convertDocToObj),
      lastEntry79fd: lastEntry79fd.map(db.convertDocToObj),
      lastEntry7a4e: lastEntry7a4e.map(db.convertDocToObj),
      lastEntry7a01: lastEntry7a01.map(db.convertDocToObj),
      lastEntry79fe: lastEntry79fe.map(db.convertDocToObj),
      lastEntry7a0a: lastEntry7a0a.map(db.convertDocToObj),
    },
  };
}
