import React  from "react";
import MUIDataTable from "mui-datatables";
import Grid from "@mui/material/Grid";
export default function GatewayInfo({GatewayDataInfo}) {





  var date = new Date(GatewayDataInfo.lastSeenAt);
  var formattted_last_seen = date.toLocaleString()
  const datatableData = [
    ["Gateway Name", `${GatewayDataInfo.name}`],
    ["Gateway ID", `${GatewayDataInfo.id}`],
    ["Last Seen", `${formattted_last_seen}`],
    ["Gateway Description", `${GatewayDataInfo.description}`],
    ["Discovery Enabled", `${GatewayDataInfo.discoveryEnabled}`],
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
          title={GatewayDataInfo.name}
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

