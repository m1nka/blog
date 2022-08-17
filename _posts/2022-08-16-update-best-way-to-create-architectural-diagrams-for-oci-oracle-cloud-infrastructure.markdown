---
layout: post
title: "[Updated] Best way to create architectural diagrams for OCI (Oracle
  Cloud Infrastructure)"
tags:
  - cloud
  - oci
image: /images/posts/oci-diagrams-min.jpg
date: 2022-08-16T13:03:49.769Z
---
My [original article about creating architectural diagrams with draw.io](https://maximilian.tech/2020/11/27/draw-io-starter-template-for-oci-oracle-cloud-infrastructure/) for Oracle Cloud is (according to Google Search Console) the most popular article on this blog. 

However, I felt the need to provide an update to this article, since there is a new (and in most cases better) way to get started creating diagrams and architectures for Oracle Cloud.

> **Note**: Alternatively, you can also check out the [draw.io starter template for Oracle Cloud that I have created](https://maximilian.tech/2020/11/27/draw-io-starter-template-for-oci-oracle-cloud-infrastructure/).

## Get started with Oracle Architecture Center

In case you didn't know, [Oracle Architecture Center](https://docs.oracle.com/solutions/) is a site where Oracle publishes reference architectures, solution playbooks (customer best practices) and Terraform automation scripts. The architectures published there are made using [draw.io](https://www.diagrams.net/) and recently Oracle has started to publish the draw.io source files for download. 

![Microservices Kubernetes Architectural Diagram for Oracle Cloud Infrastructure (OCI)](/images/posts/microservices-oci.png "Oracle Cloud Architectural Diagram for Oracle Container Engine (OKE) for Kubernetes")

For example: This is the reference architecture for [deploying microservices to a Kubernetes cluster](https://docs.oracle.com/en/solutions/deploy-microservices/index.html#GUID-3BB86E87-11C6-4DF1-8CA9-1FD385A9B9E9). 

## Use reference architectures as a starting point for creating new diagrams with draw.io

To create an architectural diagram for Oracle Cloud Infrastructure, head to Oracle Architecture Center and find a reference architecture similar to what you want to design. Here are a few examples:

* [Deploy a PostgreSQL database](<* https://docs.oracle.com/en/solutions/deploy-postgresql-db/index.html#GUID-BF3D244B-C261-41DD-A2CF-6FCC2D698A9D>): Good starting point for any architecture using multiple availability domains.
* [Deploy microservices to a Kubernetes cluster](https://docs.oracle.com/en/solutions/deploy-microservices/index.html#GUID-3BB86E87-11C6-4DF1-8CA9-1FD385A9B9E9): Use this diagram for small and simple deployments.
* [Build a geospatial platform on Oracle Autonomous Database](https://docs.oracle.com/en/solutions/geospatial-platform-adw/index.html#GUID-6BA1059C-9771-4E1F-A265-3E0FE9F2B103): Use this diagram as a starting point to model data movement in cloud environments, data warehousing and integration use cases. 

Download the draw.io source files using the download button below the diagram.

![Download diagram source files from Oracle Architecture Center](/images/posts/download-architectural-diagram.png "Download diagram source files from Oracle Architecture Center")

> **Note:** Not all reference architectures have a download button. However, newly published reference architectures do have a download option.  

## Adapting the reference architecture to your needs with draw.io

After downloading the ZIP file, unzip the folder and you will find a `.drawio` file. You can use this `.drawio` file as a starting point to create you diagram. You will need to [download the draw.io app](https://www.diagrams.net/) or alternatively [head over to draw.io](https://app.diagrams.net/) to edit in your web browser.

I have also created [a detailed article on how to use draw.io to create diagrams for Oracle Cloud Infrastructure](https://maximilian.tech/2020/11/27/draw-io-starter-template-for-oci-oracle-cloud-infrastructure/). That article outlines how to import an icon library into draw.io and how to use some advanced draw.io features [such as layers](https://www.diagrams.net/doc/layers).