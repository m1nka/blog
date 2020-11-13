---
layout: post
title: How to delete subnets and virtual cloud networks (when deletion fails) in
  Oracle Cloud Infrastructure
tags:
  - oci
image: /images/posts/just-some-errors.jpg
date: 2020-11-13T12:59:02.035Z
---
Terminating virtual cloud networks and subnets in Oracle Cloud Infrastructure (OCI) is usually pretty straight forward. However, you might encounter this error.

![OCI error deleting virtual cloud network](/images/posts/error-vnic-ocid.png "OCI error deleting virtual cloud network")

> The VCN cannot be terminated because there are associated resources in one or more compartments that you do not have access to.
>
> (Conflict - **The Subnet ocid1.subnet... references the VNIC  coid1.vniic... You must remove the reference to proceed with this operation.)**
>
> The process has been stopped. Resources terminated up to this point cannot be restored. 

This error signals that there is a VNIC (virtual network interface card) that exists in your subnet. And because there is still a VNIC in your subnet, the subnet (and the virtual cloud network) cannot be deleted.

VNICs are automatically created with the following cloud resources:

* Compute instances
* Load balancers
* Database systems
* API gateways
* Mount targets (for file storage)
* And basically everything else that exists in a subnet and has an IPv4 address

## How to find the VNIC and associated cloud resouce

Let's find the VNIC and the associated cloud resource. Copy the VNIC OCID (Oracle Cloud Identifier) from the error message and paste it into the search bar in the top navigation bar. 

![OCI search for VNIC](/images/posts/search-vnic.png "How to search for a VNIC in OCI")

In our case the search reveals that the VNIC is associated to a load balancer, because the name of the VNIC is `VNIC for LB`. Should your VNIC be associated with a compute instance, then you can directly click on the VNIC to find the compute instance.

In case you are still having troube finding out, which resource the VNIC is attached to try to click 'View all' within the search results. Within the resource search results you can see the details of the VNIC and associated resouces (see screenshot below).

![resource search results](/images/posts/search-results.png "OCI resource search results")

## How to destroy the associated cloud resource

There is no need to destroy the VNIC itself, it's better to destroy the associated cloud resource. In our case, we head over to the load balancer section (Menu -> Networking -> Load Balancers) and delete the "problematic" load balancer. Alternatively, you can copy and paste the loadbalancer OCID into the search bar to find it more quickly.

Done! Now, we can delete our virtual cloud network or subnet without problem.