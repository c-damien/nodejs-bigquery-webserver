/*Copyright 2023 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
#author: cdamien 2023
*/
'use strict';

const express = require('express');
const {BigQuery} = require('@google-cloud/bigquery'); // adding necessary lib to connect on BigQuery

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


//BigQuery connection
function connect2bq(res){
  //const {BigQuery} = require('@google-cloud/bigquery');

  const options = {
    keyFilename: 'service_account.json',
    projectId: 'dataplatformdaydemo',
  };

  const bigquery = new BigQuery(options);
  
  // [END bigquery_client_json_credentials]
  async function query() {
    // Queries the U.S. given names dataset for the state of Texas.

    const query = `SELECT *
      FROM \`bigquery-public-data.usa_names.usa_1910_2013\`
      WHERE state = 'CA'
      LIMIT 100`;

    // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
    const options = {
      query: query,
      location: 'US',
    };

    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    
    var output = `<html lang="en">
    <head><meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Job ${job.id} started.</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    </head><body><h2>Job ${job.id} results.</h2>`
    //res.send(`Job ${job.id} started.`);
    console.log(`Job ${job.id} started.`);

    // Wait for the query to finish
    const [rows] = await job.getQueryResults();

    // Print the results
    console.log('Rows:');
    rows.forEach(row => console.log(row));
    
    //html formatting
    var n = 0
    output += `<table data-toggle="table" class="table"><thead>
    <tr><th scope="col">Name</th><th scope="col">gender</th><th scope="col">year</th><th scope="col">number</th></tr></thead><tbody>`

    rows.forEach(row => output += "<tr><td>"+ row.name + "</td><td>"+ row.gender + "</td><td>"+ row.year + "</td><td>"+ row.number + "</td></tr>");
    
    output += `<tbody></table>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </body></html>`
    
    // return html output
    res.send(output)

  }
  query();
}

// App
const app = express();
app.get('/', (req, res) => {
 
  //connect to BigQuery
  connect2bq(res);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});