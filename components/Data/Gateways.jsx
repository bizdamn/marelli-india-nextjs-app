import React, { useState, useEffect } from "react";
import Link from "next/link";

import Grid from "@mui/material/Grid";
var _ = require("lodash");
export default function Gateways() {
  const [Gateways, setGateways] = useState({
    totalCount: null,
    result: null
  });
  useEffect(() => {

    // POST request using fetch with set headers
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Grpc-Metadata-Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4'
      },
    };
    fetch(`https://chirpstack.igscsi4server.com/api/gateways?limit=111&organizationID=${5}`, requestOptions)
      .then(response => response.json())
      .then(data => setGateways({ result: data.result, totalCount: data.totalCount })).catch(function (error) {
        alert('Please Check your internet connection. Either their is no internet connection or the signals are weak');
      });
  }, [])

  var array = _.toArray(Gateways.result);
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ overflowX: 'scroll' }}
      >

        <table className="table">
          <thead>
            <tr>
              <th>Gateway ID</th>
              <th>Gateway Name</th>
              <th>Last Seen At</th>
            </tr>
          </thead>
          <tbody>
            {array.map((element) => {
              if (element.lastSeenAt !== null) {
                var date = new Date(element.lastSeenAt);
                var formattted_last_seen = date.toLocaleString()
              }
              else if (element.lastSeenAt === null) {
                formattted_last_seen = 'Never Seen';
              }

              return (

                <tr key={element.id}>
                     <td> 
                  <Link href={`/gateway-info/${element.id}`} style={{ color: 'black' }}><a>
                   {element.id}
                  </a></Link>
                  </td>
                  <td>
                  <Link href={`/gateway-info/${element.id}`} style={{ color: 'black' }}><a>
                       {element.name} 
                  </a></Link>
                  </td>
                  <td>
                  <Link href={`/gateway-info/${element.id}`} style={{ color: 'black' }}><a>
                     {formattted_last_seen}
                  </a></Link>
                  </td>
                </tr>

              );
            })}
          </tbody>
        </table>
      </Grid>

    </>
  );
}

