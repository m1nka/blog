---
layout: post
title: Easiest way to connect to Autonomous Database using Docker
tags:
  - cloud
  - oci
  - tutorial
image: /images/posts/docker-autonomous.jpg
date: 2021-01-29T12:28:04.654Z
---
## Prerequisites

* [Docker Client](https://www.docker.com/products/docker-desktop) installed
* An [Autonomous Database instance](https://www.oracle.com/goto/adbs/quickstart) which is up and running (either ATP or ADW)

## Build the Docker container

We will build a Docker container that contains the Oracle Instant Client to connect to the database. In order to do that, we can download the official Oracle Instant Client Dockerfile. Oracle offers a [direct download on their Github repository](https://raw.githubusercontent.com/oracle/docker-images/main/OracleInstantClient/oraclelinux7/19/Dockerfile). All versions are available [here](https://github.com/oracle/docker-images/tree/main/OracleInstantClient). 

Make sure Docker is running, then download and build the Docker image.

```bash
# Download the Dockerfile
curl https://raw.githubusercontent.com/oracle/docker-images/main/OracleInstantClient/oraclelinux7/19/Dockerfile --output Dockerfile

# Build the Docker image
docker build --pull -t oracle/instantclient:19 .

# Verify image is there
docker images | grep oracle
```

## Download Client Credentials (Wallet)

Head to the [Oracle Cloud console](https://console.eu-frankfurt-1.oraclecloud.com/db/adb/) and select your autonomous database. Click `DB Connection` and download the instance wallet. 

![](/images/posts/download-wallet.png)

After unzipping the wallet, there is one file that we need to edit. In `sqlnet.ora` we need to  replace "`?/network/admin`" with the name of the folder containing the client credentials (within the Docker container). In our case, we are not going to hardcode this path, but instead we will pass an environment variable called `TNS_ADMIN` to the Docker container. Thus, we must change the `sqlnet.ora` file from

```
WALLET_LOCATION = (SOURCE = (METHOD = file) (METHOD_DATA = (DIRECTORY="?/network/admin")))
SSL_SERVER_DN_MATCH=yes
```

to 

```
WALLET_LOCATION = (SOURCE = (METHOD = file) (METHOD_DATA = (DIRECTORY=${TNS_ADMIN})))
SSL_SERVER_DN_MATCH=yes
```

### Connect to the database

We can now establish a database connection using a single Docker command: 

```
docker run -it --rm -e TNS_ADMIN=/usr/lib/oracle/19.5/client64/lib/network/admin -v /local/path/to/your/unzipped/wallet:/usr/lib/oracle/19.5/client64/lib/network/admin oracle/instantclient:19 sqlplus admin@mydb_medium
```

You **will need to adapt two things**: Change `/local/path/to/your/unzipped/wallet` to the location, where the unzipped wallet is located on your computer. Also `mydb_medium` needs to be changed to a valid databases address (you can find these within `tnsnames.ora` in your unzipped wallet). If you are asked for a password **use the Autonomous Database admin password** (and not the wallet password!).

Let's deconstruct this command:

* `docker run -it`: We are running the Docker container as an interactive terminal.
* `--rm`: The `--rm` flag causes Docker to automatically remove the container after we are done.
* `-e TNS_ADMIN=/usr/lib/oracle/19.5/client64/lib/network/admin`: We define an environment variable within the container the specifies the location of the credential wallet.
* `-v /local/path/to/your/unzipped/wallet:/usr/lib/oracle/19.5/client64/lib/network/admin oracle/instantclient:19`: We mount the unzipped wallet folder from our local computer to right location within the Docker container (as noted [here](https://github.com/oracle/docker-images/blob/main/OracleInstantClient/README.md#using-wallets-with-instant-client)).
* `oracle/instantclient:19`: Name of our Docker image that we previously built. 
* `sqlplus admin@mydb_medium`: Command to launch sqlplus CLI tool. Replace `mydb` with the name of your autonomous database. 

### Debugging

If things go wrong, you can try to run the Docker container using bash and debug the issue manually. Use this command:

```
docker run -it --rm -e TNS_ADMIN=/usr/lib/oracle/19.5/client64/lib/network/admin -v /local/path/to/your/unzipped/wallet:/usr/lib/oracle/19.5/client64/lib/network/admin oracle/instantclient:19 bash
```

Then try the following steps:

* Check if environment variable has been set correctly `echo $TNS_ADMIN`
* Change directory `/usr/lib/oracle/19.5/client64/lib/network/admin` and check if the wallet contents are present. Make sure you changed the `sqlnet.ora` file correctly.
* Run `sqlplus admin@mydb_medium`, make sure to replace `mydb_medium` with a string from `tnsnames.ora` file. 
* Make sure you are using the Autonomous database admin password and not the wallet password.

Find the full console output below:

```bash
➜  oracle-instantclient curl https://raw.githubusercontent.com/oracle/docker-images/main/OracleInstantClient/oraclelinux7/19/Dockerfile --output Dockerfile

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3486  100  3486    0     0   2829      0  0:00:01  0:00:01 --:--:--  2827
➜  oracle-instantclient docker build --pull -t oracle/instantclient:19 .

[+] Building 3.1s (7/7) FINISHED                                                          
 => [internal] load build definition from Dockerfile                                 0.0s
 => => transferring dockerfile: 3.53kB                                               0.0s
 => [internal] load .dockerignore                                                    0.0s
 => => transferring context: 2B                                                      0.0s
 => [internal] load metadata for docker.io/library/oraclelinux:7-slim                3.0s
 => [auth] library/oraclelinux:pull token for registry-1.docker.io                   0.0s
 => [1/2] FROM docker.io/library/oraclelinux:7-slim@sha256:4d9168e6703a121761f2fce0  0.0s
 => CACHED [2/2] RUN  yum -y install oracle-release-el7 &&      yum -y install orac  0.0s
 => exporting to image                                                               0.0s
 => => exporting layers                                                              0.0s
 => => writing image sha256:7912f4ea71a23f84150a37de9cf55167d60b74f20247656cbacb68c  0.0s
 => => naming to docker.io/oracle/instantclient:19                                   0.0s
➜  oracle-instantclient docker images | grep oracle                     

oracle/instantclient   19        7912f4ea71a2   31 minutes ago   383MB
➜  oracle-instantclient ls                         
Dockerfile  Wallet_mydb
➜  oracle-instantclient vim Wallet_mydb/sqlnet.ora
➜  oracle-instantclient docker run -it --rm -e TNS_ADMIN=/usr/lib/oracle/19.5/client64/lib/network/admin -v /Users/nova/dev/oracle-instantclient/Wallet_mydb:/usr/lib/oracle/19.5/client64/lib/network/admin oracle/instantclient:19 sqlplus admin@mydb_medium

SQL*Plus: Release 19.0.0.0.0 - Production on Fri Jan 29 12:17:15 2021
Version 19.9.0.0.0

Copyright (c) 1982, 2020, Oracle.  All rights reserved.

Enter password: 
Last Successful login time: Fri Jan 29 2021 12:10:29 +00:00

Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.5.0.0.0

SQL> exit
Disconnected from Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.5.0.0.0
```
Done, if there are any question feel free to reach out through the comment section.