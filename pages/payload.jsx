import React,{useContext,useEffect} from "react";
import Box from '@mui/material/Box';
import Layout from "../Layout/Layout"
import Entries from '../models/Entries';
import db from '../utils/db';
import { DataStore } from '../utils/DataStore';
export default function Payload({entries}) {
  const { state} = useContext(DataStore);
  const { userInfo } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  }, [userInfo]);
  return (
    <Layout>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <table style={{overflow: 'scroll'}} className="table table-hover">
        <thead>
          <tr>
            <th>Device Name</th> 
            <th>Device EUI Number</th> 
            <th>Humidity % RH</th> 
            <th>Temperature °C</th>  
            <th>Date-Time</th>  
          </tr>
        </thead>
        <tbody>
          {entries.map((element) => {
              var date = new Date(element.timestamp);
              var formattted_time= date.toLocaleString()
            return (
              <tr key={element.deviceName} >
                <td>{element.deviceName}</td>
                <td>{element.devEUI}</td>
                <td>{element.humidity}</td>
                <td>{element.temprature}</td>
                <td>{formattted_time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
        
      </Box>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const entries = await Entries.find({}).limit(300).lean()
  await db.disconnect();
  return {
    props: {
      entries: entries.map(db.convertDocToObj),
    },
  };
}
