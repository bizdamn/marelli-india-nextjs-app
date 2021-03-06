import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { ResponsiveContainer } from "recharts";
import { Doughnut } from "react-chartjs-2";
import Layout from "../../Layout/Layout"
import { useRouter } from 'next/router'
import axios from 'axios'
import GatewayInfo from "../../components/Data/GatewayInfo";
export default function GatewayPage({name,description,gatewayId,discoveryEnabled,createdAt,updatedAt,lastSeenAt,firstSeenAt,location}){
  const router = useRouter()
  const { id } = router.query
  const [GatewayDataInfo, setGatewayDataInfo] = useState({
    name: name,
    description: description,
    gatewayId: gatewayId,
    discoveryEnabled: discoveryEnabled,
    createdAt: createdAt,
    updatedAt: updatedAt,
    lastSeenAt: lastSeenAt,
    firstSeenAt: firstSeenAt,
    location: location,
  });

  const Gatewaysdata = {
    labels: ["Off", "Active", "Never Seen"],
    datasets: [
      {
        label: "Frequency",
        data: [0, 1, 0],
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


  useEffect(() => {

  }, [id])

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <GatewayInfo  GatewayDataInfo={GatewayDataInfo} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ResponsiveContainer className="p-0" >
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
                <h5>Gateway Status</h5>
              </div>
              <Doughnut width={70} data={Gatewaysdata} />
            </>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Layout>
  );
}




export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const { data } = await axios.get(`https://chirpstack.igscsi4server.com/api/gateways/${id}`,
    {
      headers: {
        'Accept': 'application/json',
        'Grpc-Metadata-Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4'
      },
    }
  )

  return {
    props: {
      name: data.gateway.name,
      gatewayId: data.gateway.id,
      location: data.gateway.location,
      discoveryEnabled: data.gateway.discoveryEnabled,
      description: data.gateway.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      firstSeenAt: data.firstSeenAt,
      lastSeenAt: data.lastSeenAt,
    },
  };
}
