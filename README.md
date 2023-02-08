#  WebServer to BigQuery


How to connect from Node.js to BigQuery and return the results back to an HTTP request

## Overall description
This example implements a dockerized node.js application that serve a single HTML page. This page is composed of a table built from retrieving the results of a query done on GCP BigQuery.
This is to showcase how to use BigQuery in the context of a webApplication, using a Service Account to connect


# Service Account:
A service account needs to be created in the project where the query will be executed and billed. 
If you are using slots make sure that those slots are in the same region as the dataset(s) used in the query.
To create the account, From the GCP console, go to burger menu > IAM & Admin > Service Accounts, add a new one and generate a key and add it to node-app after cloning this repo.
Please rename the key file to service_account.json or update accordingly in server.js. 
Necessary access permission to be set is: 
From the GCP console, go to burger menu > IAM & Admin > IAM, select your service account


## File structure:
| filename / folder | Description |
|----------|-------------|
| package.json | Configuration file used by node.js |
| server.js | Main node.js application file that connect to BigQuery and format the results in html |
| Dockerfile | File to package into a docker container |
| package.json| Configuration file used by node.js |
| service_account.json | your GCP service account credentials |
| node_modules | used by node.js and automatically generated |
| package-lock.json | used by node.js and automatically generated |

## Library used: 

|Type | name | Description | link| 
| ----|------|-------------| ----|
| node.js | express |Lib to easily implement a webserver|https://expressjs.com/ | 
| node.js | google-cloud/bigquery | BigQuery library for node.js|https://cloud.google.com/nodejs/docs/reference/bigquery/latest#using-the-client-library |
| Javascript | bootstrap-table | html table formatting library| |


## How to package and run:

### Using docker desktop

after cloning the current repo, opening a new command line and go to this repo s folder and in node-app, run to build:

docker build . -t nodejs-bigquery-webserver

then to run the container locally:

docker run -p 49160:8080 -d nodejs-bigquery-webserver

you should now be able to connect with your browser to: 

http://localhost:49160


## Reference:
https://github.com/googleapis/nodejs-bigquery/blob/main/samples/
