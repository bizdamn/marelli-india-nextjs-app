import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@mui/material/Grid";
export default function GatewayInfo(props) {
  const [GatewayInfo, setGatewayInfo] = useState({
    name: null,
    description: null,
    id: null,
    discoveryEnabled: null,
    createdAt: null,
    updatedAt: null,
    lastSeenAt: null,
    firstSeenAt: null,
    location: null,
  });
  useEffect(() => {
    console.log(props.gatewayID)
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Grpc-Metadata-Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4'
      },
    };
    fetch(`https://chirpstack.igscsi4server.com/api/gateways/${props.gatewayID}`, requestOptions)
      .then(response => response.json())
      .then(data => setGatewayInfo({
        name: data.gateway.name,
        id: data.gateway.id,
        location: data.gateway.location,
        discoveryEnabled: data.gateway.discoveryEnabled,
        description: data.gateway.description,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        firstSeenAt: data.firstSeenAt,
        lastSeenAt: data.lastSeenAt,
      })).catch(function (error) {
        alert('Please Check your internet connection. Either their is no internet connection or the signals are weak');
      });
  }, [props.gatewayID])

  var date = new Date(GatewayInfo.lastSeenAt);
  var formattted_last_seen = date.toLocaleString()
  const datatableData = [
    ["Gateway Name", `${GatewayInfo.name}`],
    ["Gateway ID", `${GatewayInfo.id}`],
    ["Last Seen", `${formattted_last_seen}`],
    ["Gateway Description", `${GatewayInfo.description}`],
    ["Discovery Enabled", `${GatewayInfo.discoveryEnabled}`],
  ];
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <MUIDataTable
          title={GatewayInfo.name}
          data={datatableData}
          columns={["Parameters", "Value"]}
          options={{
            filterType: "checkbox",
          }}
        />
      </Grid>
    </>
  );
}

