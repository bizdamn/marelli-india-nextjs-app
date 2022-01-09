import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@mui/material/Grid";
export default function DeviceInfo(props) {
  const [DeviceInfo, setDeviceInfo] = useState({
    devEUI: null,
    applicationID: null,
    variables: null,
    tags: null,
    description: null,
    deviceProfileID: null,
    isDisabled: null,
    referenceAltitude: null,
    name: null,
    skipFCntCheck: null,
    lastSeenAt: null,
    location: null,
    deviceStatusMargin: null,
    deviceStatusBattery: null,
  });
  useEffect(() => {

    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Grpc-Metadata-Authorization":
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4",
      },
    };
    fetch(
      `https://chirpstack.igscsi4server.com/api/devices/${props.deviceEUI}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) =>
        setDeviceInfo({
          devEUI: data.device.devEUI,
          tags: data.device.tags,
          variables: data.device.variables,
          skipFCntCheck: data.device.skipFCntCheck,
          referenceAltitude: data.device.referenceAltitude,
          name: data.device.name,
          deviceProfileID: data.device.deviceProfileID,
          description: data.device.description,
          applicationID: data.device.applicationID,
          deviceStatusMargin: data.deviceStatusMargin,
          deviceStatusBattery: data.deviceStatusBattery,
          location: data.location,
          lastSeenAt: data.lastSeenAt,
        }),
      ).catch(function (error) {
        alert('Please Check your internet connection. Either their is no internet connection or the signals are weak');
      });
  }, [props.deviceEUI]);


  var date = new Date(DeviceInfo.lastSeenAt);
  var formattted_last_seen = date.toLocaleString()
  const datatableData = [
    ["Device EUI", `${DeviceInfo.devEUI}`],
    ["Device Name", `${DeviceInfo.name}`],
    ["Last Seen", `${formattted_last_seen}`],
    ["Device Description", `${DeviceInfo.description}`],
    ["Device Status Margin", `${DeviceInfo.deviceStatusMargin}`],
    ["Device Status Battery", `${DeviceInfo.deviceStatusBattery}`],
    ["Device SkipFCntCheck", `${DeviceInfo.skipFCntCheck}`],
    ["Device Refrence Altitude", `${DeviceInfo.referenceAltitude}`],
    ["Device Location", `${DeviceInfo.location}`],
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
          title={DeviceInfo.name}
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
