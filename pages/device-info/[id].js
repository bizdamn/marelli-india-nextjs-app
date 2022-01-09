import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import * as dfd from "danfojs";
import Entries from '../../models/Entries';
import DeviceCalibration from '../../models/DeviceCalibration';
import db from '../../utils/db';
import { ResponsiveContainer } from "recharts";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import axios from "axios";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import OutboundIcon from "@mui/icons-material/Outbound";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Line } from "react-chartjs-2";
import Layout from "../../Layout/Layout"
import { DataStore } from '../../utils/DataStore';
import { useSnackbar } from 'notistack';
// components
import DeviceInfo from "../../components/Data/DeviceInfo";
import DatePickerComponent from "../../components/DatePickerComponent/DatePickerComponent";
import MonthPickerComponent from "../../components/DatePickerComponent/MonthPickerComponent";
import Button from "@mui/material/Button";
import { useRouter } from 'next/router'
export default function DevicePage({ tempArray, humArray, deviceCalibration }) {
  const router = useRouter()
  const { id } = router.query
  const { state } = useContext(DataStore);
  const { userInfo } = state;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [startDate, SetStartDate] = useState(null);
  const [endDate, SetEndDate] = useState(null);
  const [temprature, setTemprature] = useState(tempArray);
  const [humidity, setHumidity] = useState(humArray);
  const [current_humidity_calibration, setCurrent_humidity_calibration] = useState(deviceCalibration[0].humidity_calibration);
  const [current_temprature_calibration, setCurrent_temprature_calibration] = useState(deviceCalibration[0].temprature_calibration);

  function tempratureFilter() {
    axios
      .post(`/api/filter`, {
        start_date: startDate,
        end_date: endDate,
        deviceEUI: id
      })
      .then((response) => {
        const df = new dfd.DataFrame(response.data)
        const tempraturedf = df.column("temprature")
        const humiditydf = df.column("humidity")
        setTemprature(tempraturedf.$data)
        setHumidity(humiditydf.$data)
      })
      .catch(function (error) {
        console.log(error);
      });



  }

  async function updateCallibration() {
    closeSnackbar();
    try {
      const { data } = await axios.post('/api/device-calibration/set-device-calibration', {
        tempratureCalibration: current_temprature_calibration,
        humidityCalibration: current_humidity_calibration,
        devEUI: id
      });
      enqueueSnackbar('Updated Successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }

  }

  // TABLE DATA
  const Humiditydata = {
    labels: ["9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 AM", "3 AM", "6 AM"],
    datasets: [
      {
        label: "Humidity",
        data: humidity,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const Humidityoptions = {
    scales: {},
  };


  const Tempraturedata = {
    labels: ["9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 AM", "3 AM", "6 AM"],
    datasets: [
      {
        label: "Temprature",
        data: temprature,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const Tempratureoptions = {
    scales: {},
  };
  const date = new Date();
  return (
    <Layout>
      <Grid style={{ backgroundColor: '#9d2eff', color: 'white' }}>
        <Typography sx={{ mb: 3 }} variant="h3" align="center" >Zone Name</Typography>
      </Grid>
      <Grid sx={{ my: 3 }} container>
        <Grid item lg={6} xs={12}>
          <DeviceInfo
            deviceEUI={id}
          />
        </Grid>
        {/* CHARTS */}
        <Grid item lg={6} xs={12}>
          <Stack direction='row'>

            <MonthPickerComponent

              startDate={startDate}
              SetStartDate={SetStartDate}
              endDate={endDate}
              SetEndDate={SetEndDate}
            />
            <DatePickerComponent
              startDate={startDate}
              SetStartDate={SetStartDate}
              endDate={endDate}
              SetEndDate={SetEndDate}
            />
            <Box >
              <Button
                onClick={() => tempratureFilter(date.toString(), date.toString())}
                variant="outlined">
                Filter
              </Button>
            </Box>
          </Stack>
          <Stack spacing={2}>
            <>
              <div
                style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
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
                      <h5>Temprature Trend</h5>
                    </div>
                    <div style={{ padding: "3px" }}>
                      <Line
                        height={150}
                        data={Tempraturedata}
                        options={Tempratureoptions}
                      />
                    </div>
                  </>
                </ResponsiveContainer>
              </div>
              <div
                style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
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
                      <h5>Humidity Trend</h5>
                    </div>
                    <div style={{ padding: "3px" }}>
                      <Line
                        height={150}
                        data={Humiditydata}
                        options={Humidityoptions}
                      />
                    </div>
                  </>
                </ResponsiveContainer>
              </div>
            </>
          </Stack>
        </Grid>
      </Grid>



      {userInfo.isAdmin == true ? (




        <Grid style={{ marginTop: "5rem" }} container spacing={4}>
          <Grid component={Paper} item sx={{ p: 3 }} lg={6} xs={12}>
            <Grid sx={{ my: 3 }} container>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="p" sx={{ fontWeight: 700 }}>
                      Temprature
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ArrowDownwardIcon />
                        </Avatar>
                      </ListItemAvatar>
                      {temprature[temprature.length - 1] ? (
                        <ListItemText
                          primary="Input"
                          secondary={(parseFloat(temprature[temprature.length - 1]) -
                            parseFloat(current_temprature_calibration)).toFixed(2)}
                        />
                      ) : (
                        <ListItemText primary="Input" secondary="--" />
                      )}
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <NetworkCheckIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <TextField
                        placeholder={current_temprature_calibration}
                        onChange={(e) => {
                          setCurrent_temprature_calibration(e.target.value);
                        }}
                        type="number"
                        fullWidth
                        id="outlined-basic"
                        label="Temprature Calibration"
                        variant="outlined"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <OutboundIcon />
                        </Avatar>
                      </ListItemAvatar>
                      {temprature[temprature.length - 1] ? (
                        <ListItemText
                          primary="Output"
                          secondary={
                            temprature[temprature.length - 1].toFixed(2)
                          }
                        />
                      ) : (
                        <ListItemText primary="Output" secondary="--" />
                      )}
                    </ListItem>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {/* Humidity */}
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="p" sx={{ fontWeight: 700 }}>
                    Humidity
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <ArrowDownwardIcon />
                      </Avatar>
                    </ListItemAvatar>
                    {humidity[humidity.length - 1] ? (
                      <ListItemText
                        primary="Input"
                        secondary={(parseFloat(humidity[humidity.length - 1]) - parseFloat(current_humidity_calibration)).toFixed(2)}
                      />
                    ) : (
                      <ListItemText primary="Input" secondary="--" />
                    )}
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <NetworkCheckIcon />
                      </Avatar>
                    </ListItemAvatar>

                    <TextField
                      placeholder={current_humidity_calibration}
                      onChange={(e) => {
                        setCurrent_humidity_calibration(e.target.value);
                      }}
                      type="number"
                      fullWidth
                      id="outlined-basic"
                      label="Humidity Calibration"
                      variant="outlined"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <OutboundIcon />
                      </Avatar>
                    </ListItemAvatar>
                    {humidity[humidity.length - 1] ? (
                      <ListItemText
                        primary="Output"
                        secondary={
                          humidity[humidity.length - 1].toFixed(2)
                        }
                      />
                    ) : (
                      <ListItemText primary="Output" secondary="--" />
                    )}
                  </ListItem>

                  <Button
                    sx={{ backgroundColor: "#38B6FF", p: 1 }}
                    onClick={() => updateCallibration()}
                    variant="contained"
                  >  Save

                  </Button>
                </Grid>

              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12}>

          </Grid>
        </Grid>

      ) : (<></>)}
    </Layout>
  );
}






export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  await db.connect();
  const result = await Entries.find({ devEUI: id }).lean()
  const deviceCalibration = await DeviceCalibration.find({ devEUI: id }).lean();
  await db.disconnect();


  if (result.length > 0) {
    const df = new dfd.DataFrame(result)
    const tempraturedf = df.column("temprature")
    const humiditydf = df.column("humidity")

    return {
      props: {
        tempArray: tempraturedf.$data,
        humArray: humiditydf.$data,
        deviceCalibration: deviceCalibration.map(db.convertDocToObj)
      },
    };

  }
  else {
    return {
      props: {
        tempArray: [],
        humArray: [],
        deviceCalibration: deviceCalibration.map(db.convertDocToObj)
      },
    };
  }







}