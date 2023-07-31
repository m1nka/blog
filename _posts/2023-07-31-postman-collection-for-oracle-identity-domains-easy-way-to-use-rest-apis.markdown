---
layout: post
title: "Postman collection for Oracle Identity Domains: Easy way to use REST APIs"
tags:
  - oci
  - cloud
  - tutorial
  - automation
image: /images/posts/scim-identity-domains.jpg
date: 2023-07-31T09:15:39.884Z
---
I recently had to find a way to automate the management of users and groups in Oracle Cloud Infrastructure (OCI) programatically.

After dealing with the API documentation for a while, I came to the realization that Oracle Identity Domains is fully SCIM 2.0-compliant and therefore it should be very easy to interact with that API. I forked the official Postman SCIM 2.0 collection and adapted it to work with Oracle Identity Domains.

This tutorial can be used to manage almost any component of Oracle Identity Domains via REST API. If you want to skip the tutorial and just use the Postman collection directly you can find it [here](https://raw.githubusercontent.com/m1nka/oracle-identity-domains-postman-collection/main/Oracle%20Identity%20Domains%20-%20REST%20API.postman_collection.json).

## Step 1: Create a confidential application within your Oracle Identity Domain

> **Note:** These steps will work for Oracle's legacy IDCS service as well as for the newer Oracle Identity Domains in Oracle Cloud. Just be sure to open the IDCS console instead.

Within the Oracle Cloud console, [head to Identity Domains](https://cloud.oracle.com/identity/domains/), choose your root compartment and select your Identity Domain.

- Once your Identity Domain is selected, choose **Applications** and **Add application**.
- Choose **Confidential Application** and enter a name for the application, for example `identiy-domains-api-access` and click next.
- Choose **Configure this application as a client now**
- Under **Authorization**, check **Client credentials**
- Under **Client type** select **Confidential**
- Scroll down and in the **Token issuance policy** section, set **Authorized resources** to **Specific**.
- Select **Add app roles** and choose the roles that you need. All roles [are documented here](https://docs.oracle.com/en/cloud/paas/identity-cloud/uaids/understand-administrator-roles.html#GUID-9B488723-43A1-47B1-ACB0-41FFD780FD5D). In my case I choose **User administrator**.
- Choose **Next** and then **Finish** to complete the setup.
- On the application overview page, click Activate and confirm that you want to activate the application.

## Step 2: Get the client ID, client secret and endpoint URL

- Within in the confidential application that we just created, select **OAuth configuration** (bottom left under resources) and find the **client ID** and **client secret**.
- Next, go back to your identity domain (under overview) and **copy** the **Domain URL** (exclude the port `:443` and backslash `/` at the end).

We are going to need these three values for the next step.

## Step 3: Access the REST API

- Import the [Oracle Identity Domains Postman collection](https://raw.githubusercontent.com/m1nka/oracle-identity-domains-postman-collection/main/Oracle%20Identity%20Domains%20-%20REST%20API.postman_collection.json) in your Postman client.
- Open the collection variables and enter **url**, **client_id** and **client_secret**.
- Go to **Authorization** and at the bottom click **Get new access token** and then **Use token**.

That's it, all requests should work now. I hope this was helpful to you and do let me know your feedback in the comments below.

Cheers ✌️.