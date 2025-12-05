---
layout: post
title: Oracle Dynamic Scaling for Exadata Database Service on Oracle Database@Azure
tags:
  - cloud
  - automation
  - tutorial
  - azure
image: /images/posts/odaa-odys.webp
date: 2025-05-23T11:27:34.588Z
---
One of the main advantages of migrating databases to the cloud is the ease of scaling workloads compared to traditional on-premises environments. Oracle’s Exadata Database Service (ExaDB), available through Oracle Database@Azure, provides a managed database consolidation platform that enables online scaling of compute resources without downtime. While ExaDB supports online scaling without downtime, the process is generally manual and requires user intervention.

For automated scaling, Oracle provides the **Dynamic Scaling Engine (ODyS)** to optimize database workload costs and ensure the database has the right amount of compute resources to handle variable workloads.

ODyS scales workloads by monitoring CPU load metrics on the Exadata system or by using a weekly schedule to automatically adjust compute resources. ODyS supports ExaDB running on both Dedicated Infrastructure (ExaDB-D) and Exascale Infrastructure (ExaDB-XS). 

This document provides an overview on how to configure ODyS for ExaDB on Oracle DB@Azure. Documentation for ODyS and how to install it can be found here: [(ODyS) Oracle Dynamic Scaling Suite Main Index Page (Doc ID 2774779.1](https://support.oracle.com/epmos/faces/DocumentDisplay?id=2774779.1&parent=WIDGET_REFERENCES&sourceId=2770544.1)

## Architecture: ODyS for ExaDB on Oracle DB@Azure

When deploying the Dynamic Scaling Engine with Oracle Database@Azure, customers have two main options: running ODyS directly on the Exadata system itself or on a separate virtual machine.

In a direct deployment, ODyS is typically installed across all the virtual machine nodes within your Exadata VM Cluster. In this case, ODyS monitors and manages resource scaling directly from the Exadata environment. Alternatively, ODyS along with the Remote Dynamic Scaling plugin can be installed on an Azure VM or an OCI VM. In this setup, the Remote Dynamic Scaling plugin is required to connect to the Exadata system and track CPU usage remotely.

Using an **OCI VM is the recommended approach for organizations with an OCI Universal Credits Model (UCM) subscription**, customers without a UCM subscription should opt for an Azure VM. In this article, we'll focus on deploying ODyS on an Azure virtual machine to scale an ExaDB VM cluster with Oracle Database@Azure.

![Dynamic Scaling for Oracle DB@Azure architecture](/images/posts/webppro_out_4e9e00bf2fa9befe575c6bdf5a0f9882.webp "Dynamic Scaling for Oracle DB@Azure architecture")

### Installation: ODyS on an Azure virtual machine

Oracle Dynamic Scaling Engine and the Remote Dynamic Scaling plugin, along with OCI CLI, can be installed directly on an Azure VM or using tools like Docker, Podman and Kubernetes. Though the overall setup is comparable, deploying in Azure requires some adjustments, particularly for networking and authentication, that differ from OCI.

From a networking perspective, the Azure VM must be able to access the Exadata nodes via Secure Shell (SSH) for CPU utilization monitoring. Ensure that both OCI and Azure network security groups allow SSH traffic from your Azure VM's private IP address to the Exadata nodes. Since ODyS requires SSH access to the Exadata nodes, the SSH key must be present on the Azure VM. The Remote Dynamic Scaling-plugin can be configured with `--target-ips`​ to connect to the nodes and extract CPU usage. Exadata connectivity can be easily tested using `/opt/dynamicscaling-plugin/dynamicscaling-plugin.bin --target-ips 10.91.1.199,10.91.1.141  --opcsshkey /home/azureuser/.ssh/mysshkey.key --nosilent`​.

ODyS is using `ocicli`​ to collect information on the Exadata VM Cluster and to perform scaling operations. On OCI, the recommended approach is to use [instance/resource principals](https://docs.oracle.com/en-us/iaas/mysql-database/doc/resource-principals.html) for authentication. Since this is not possible with an Azure VM, customers need to create a service user in OCI (Identity & Security → Domains → Users → Create User) to authenticate `ocicli`​. The required IAM policies are listed in the[ ODyS documentation](https://support.oracle.com/epmos/faces/DocumentDisplay?parent=DOCUMENT&sourceId=2774779.1&id=2719916.1). OCI connectivity of ODyS can be tested using the following command  `/opt/dynamicscaling/dynamicscaling.bin check --ocicli --cloud-vm-cluster-id ocid1.cloudvmcluster.oc1.xxxx..`​.

Finally, since the Oracle Cloud APIs are not privately accessible within Azure, API requests need to be routed externally. By using [Network Sources](https://docs.oracle.com/en-us/iaas/Content/Identity/networksources/Introduction_to_Network_Sources.htm), customers can restrict API requests to specific network sources, ensuring that [only requests from approved IP addresses are allowed](https://docs.oracle.com/en-us/iaas/Content/Identity/networksources/Restricting_Access_to_Specific_IP_Addresses.htm). This enhances security by limiting access to trusted networks.

## Takeaway: Improving resource efficiency with automated scaling

Oracle Dynamic Scaling Engine provides a practical solution for organizations running Oracle databases on Exadata Database Service within Oracle Database@Azure. Automating the scaling process allows for better resource utilization, reduced operational costs, and consistent performance during varying workloads, eliminating the need for manual adjustments. With deployment options across Azure VMs, OCI VMs, and Exadata itself, ODyS offers a flexible approach to optimizing database management in a multi-cloud environment.For more details, refer to the Oracle Help Center or ODyS documentation:

* [Oracle Database@Azure](https://www.oracle.com/cloud/azure/oracle-database-at-azure/)
* [Configure Dynamic Scaling in Oracle Exadata Cloud Infrastructure](https://docs.oracle.com/en/learn/dynamic_scaling_oeci/index.html)
* [Oracle Dynamic Scaling Suite Main Index Page (Doc ID 2774779.1)](https://support.oracle.com/epmos/faces/DocumentDisplay?id=2774779.1)