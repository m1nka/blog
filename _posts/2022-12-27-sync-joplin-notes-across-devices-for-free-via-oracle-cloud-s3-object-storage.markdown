---
layout: post
title: Sync Joplin notes across devices for free via Oracle Cloud S3 Object Storage
tags:
  - oci
  - tutorial
  - cloud
image: /images/posts/oracle-cloud-oci-object-storage-s3-for-joplin.png
date: 2022-12-27T15:25:27.092Z
---
Joplin is a fantastic open source note-taking app. You can automatically sync your notes between devices using various tools and protocols, such as Dropbox, Nextcloud, WebDAV and others.

My preferred way to sync my notes is using S3 object storage, since it's fast and easy to use, supports versioning and is fully encrypted (even supports customer-managed keys).

Oracle Cloud [offers 10 Gb of free Object Storage](https://www.oracle.com/cloud/free/) and also provides an [S3 compatibility API](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/s3compatibleapi.htm). 

![joplin-s3-config-oracle](/images/posts/joplin-s3-config-oracle.png "joplin-s3-config-oracle")

To setup Joplin synchronization with Oracle Cloud you need to perform the following steps:

1. Register a free Oracle Cloud account at <https://www.oracle.com/cloud/free/> and sign in. You then need to find the following information to fill in within Joplin settings under synchronization:
   * S3 access key and S3 secret key
   * S3 URL
   * S3 region
   * S3 bucket
2. **Create an S3 access key and S3 secret key**
   * Open the Profile menu (User menu icon) and click User Settings, or your account name.
   * On the left side of the page, click Customer Secret Keys.
   * Click Generate Secret Key.
   * Note down the `Access Key` and `Secret Key` . You can't retrieve the Secret Key again after closing the dialog box for security reasons.
   * If you need additional info [check the documentation](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managingcredentials.htm#create-secret-key).
3. **Find the S3 URL** for Joplin. The URL has the following format: `{bucketnamespace}.compat.objectstorage.{region}.oraclecloud.com`.
   * To find your `bucketnamespace` name, open the Profile menu (User menu icon) and click Tenancy: &lt;your_tenancy_name&gt;. Your namespace string is listed under Object Storage Settings. If you need additional info [check the documentation](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/understandingnamespaces.htm#usingconsole).
   * Your `region` identifier is the id of your 'home region' that you chose when creating your Oracle Cloud account. You can find the full list of region identifiers [here](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm#About). In my case, my home region is Frankfurt and therefore my region identifier is `eu-frankfurt-1`.
   * Now you have your full **S3 URL** that you can use with Joplin and it might look something like this: `https://abcdefg.compat.objectstorage.eu-frankfurt-1.oraclecloud.com`. If you need additional info [check the docs](https://docs.oracle.com/en-us/iaas/Content/Object/Tasks/s3compatibleapi.htm#usingAPI).
4. **Joplin also requires an S3 region**. This is the same region identifier that we have looked up before. In my case its `eu-frankfurt-1`.
5. **Finally, we need to create an S3 bucket.**
   * Go to https://cloud.oracle.com/object-storage/buckets
   * On the left choose a compartment. You can use the root compartment or alternatively create a new compartment [here](https://cloud.oracle.com/identity/compartments)). Learn more about compartments [here](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managingcompartments.htm#Working).
   * Choose a bucket name (like `joplin-notes`), choose `Default storage tier` and create the bucket.
   * Note down the bucket name.
6. It's important to choose **Force path style** within Joplin settings when configuring S3 Object Storage with Oracle Cloud.

That's it. Your final configuration within Joplin should look something like in the screenshot above. ✌