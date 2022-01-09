import React, { useState, useEffect } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
var _ = require("lodash");
export default function Devices() {
  const [Devices, setDevices] = useState({
    totalCount: null,
    result: null,
  });

  useEffect(() => {
    // POST request using fetch with set headers
    const requestOptions = {
      method: "GET",
      headers: {
        "Grpc-Metadata-Authorization":
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4",
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
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Device EUI Number</th>
              <th>Device Name</th>
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
                // <Link href={`/device-info/${element.devEUI}`} style={{ color: 'black' }}><a>
                <tr key={element.devEUI}>
                  <td>
                  <Link href={`/device-info/${element.devEUI}`} style={{ color: 'black' }}><a>
                  {element.devEUI}
                  </a></Link>
                    </td>
                  <td>
                  <Link href={`/device-info/${element.devEUI}`} style={{ color: 'black' }}><a>
                  {element.name}
                  </a></Link>
                    </td>
                  <td>
                  <Link href={`/device-info/${element.devEUI}`} style={{ color: 'black' }}><a>
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
