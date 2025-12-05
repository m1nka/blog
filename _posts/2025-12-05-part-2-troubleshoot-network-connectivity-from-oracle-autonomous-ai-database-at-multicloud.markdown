---
layout: post
title: "Part 2: Troubleshoot network connectivity from Oracle Autonomous AI
  Database at Multicloud"
tags:
  - cloud
  - troubleshooting
image: /images/posts/adb-connectivity-p1.webp
date: 2025-12-05T13:40:51.549Z
---
This article provides some tips on how to troubleshoot outbound network connectivity from an Oracle Autonomous AI Database (ADB-S) instance with Oracle Database@Azure and Oracle Database@Google Cloud. You might **need an outbound private connection** from ADB-S to mount an NFS share or you might want to integrate ADB-S with Azure Key Vault. Troubleshooting can sometimes be difficult, because ADB-S does not expose the operating system, limiting the diagnostic tools and methods available to verify connectivity to external endpoints.

> [Part 1 of this article](https://maximilian.tech/2025/12/02/troubleshoot-network-connectivity-to-oracle-autonomous-ai-database-at-multicloud/) series covers the connectivity in the opposite direction, e.g. from a VM or an on-premise client to ADB-S.

## Architecture overview

For this article, we assume you are using the networking option `Private endpoint access only` with the ADB-S instance. This means the Autonomous AI Database is only reachable on a private endpoint (PE) within your Vnet (Azure) or VPC  (Google). Please see the archicture overview below.

![adb-s-at-x-architecture-to-pe](/images/posts/adb-s-at-x-architecture-to-pe.webp)

> **Tip for Azure:**  It is highly recommended to [activate Advanced Networking](https://learn.microsoft.com/en-us/azure/oracle/oracle-db/oracle-database-network-plan#advanced-network-features) on your Azure subscription before adding the Oracle.Database subnet delegation. Also check the[ supported network topologies](https://learn.microsoft.com/en-us/azure/oracle/oracle-db/oracle-database-network-plan#supported-topologies) and limitations without Advanced Networking.

> **Tip for Azure:**  If you **don't** have Advanced Networking enabled, I recommend to checkout [this blog article](https://sites.oracle.com/site/maa/post/nfs-options-zdm-migration-oracle-database-azure) when choosing NFS share and network topology.

## Debugging connections from Autonomous DB

**Use case:**  You need an outgoing connection from ADB-S to Azure Blob, mounting an NFS share or you want to integrate ADB-S with Azure Key Vault.

1. **DNS:**  ADB-S uses the FQDN to connect to a target, make sure DNS is configured.
2. **Route outbound connections:**  Make sure to force outbound connections from the ADB-S Private Endpoint through the Multicloud link to Azure/Google Cloud.
3. **Open ACLs:**  Create ACL on ADB-S instance.
4. **Check firewall settings:**  Make sure traffic is allowed to your target.
5. **Testing:**  Test the connection

## 1. Configure DNS for your Autonomous DB

Make sure the ADB-S instance can resolve the FQDN of your target. Typically, you need to configure DNS on the OCI private resolver.

Go to your ADB-S instance in Azure/Google and click `Go to OCI`​ (Azure) or `Manage in OCI`:

![manage-in-oci](/images/posts/manage-in-oci.webp)

In the networking section, select your Virtual Cloud Network: 

![click-networking](/images/posts/click-networking.webp)

On the VCN details page, select your DNS resolver: 

![click-private-dns-resolver](/images/posts/click-private-dns-resolver.webp)

Select the default private view:

![Screenshot 2025-12-05 at 10.02.31](/images/posts/select-default-private-view.webp)

Go to the tab `Private Zones` and create a new private zone. For example, if you want to connect to `maxfielduseastnfssa.blob.core.windows.net`​ you should create the zone for `blob.core.windows.net`.

![create-private-zone](/images/posts/create-private-zone.webp)

Select the newly created zone, go to tab `Records`​ and `Manage records`​. Then, `Add record`​ with type: `A - IPv4 address`.

> Tip: I recommend setting the TTL (Time to Live) very low, e.g. 60 or 120. It makes debugging much easier, also if you ever quickly need a configuration change, you will be able to execute it much faster.

![add-record](/images/posts/add-record.webp)

Click `Save changes`​, `Review changes`​ and `Publish changes`.

> Optional: If you are working in a VCN in your [Oracle Cloud home region](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managingregions.htm#The), you can use [OCI Cloud Shell](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/cloudshellintro.htm) with [an ephemeral endpoint](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/cloudshellintro_topic-Cloud_Shell_Networking.htm#Cloud_Shell_Private_Access) to execute an `nslookup`​ to verify DNS resolution. It's currently not possible to verify DNS outside of your home region using ADB-S. Note that **private connectivity from the Cloud Shell to Azure VNets is always blocked**.

## 2. Set outbound connections to private endpoint

ADB-S is a shared service and we need to make sure that all outgoing connectivity from the ADB-S instance is exiting privately from the Private Endpoint inside the VCN.

Connect to your Autonomous AI DB instance and set the following parameter ([documented here](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/private-endpoints-autonomous.html#GUID-8FCA06C0-E1C1-49F6-82C2-6B7B3787CF3B)):

```sql
ALTER DATABASE PROPERTY SET ROUTE_OUTBOUND_CONNECTIONS = 'ENFORCE_PRIVATE_ENDPOINT';
```

If you just want to check how the parameter is configured you can run this command:

```sql
SELECT PROPERTY_VALUE FROM DATABASE_PROPERTIES WHERE PROPERTY_NAME = 'ROUTE_OUTBOUND_CONNECTIONS';
```

Finally, if you would ever need to reset this parameter you could run `ALTER DATABASE PROPERTY SET ROUTE_OUTBOUND_CONNECTIONS = '';`.

## 3. Open ADB-S network ACLs

Connect to your Autonomous DB instance and open the networking ACLs from ADB-S (find the [API reference here](https://docs.oracle.com/en/database/oracle/oracle-database/26/arpls/DBMS_NETWORK_ACL_ADMIN.html#GUID-2512526D-0B2A-44BF-890D-03B5BBCB8442)). You can use wildcards such as `*.blob.core.windows.net`​ too. For connecting to NFS Share you would need `resolve`​ and `connect`​, for integrating with an external key vault you would also need `http`:

```sql
BEGIN
    DBMS_NETWORK_ACL_ADMIN.APPEND_HOST_ACE(
        host => '*.blob.core.windows.net',
        lower_port => null,
        upper_port => null,
        ace => XS$ACE_TYPE(
            privilege_list => XS$NAME_LIST('resolve','http','connect'),
            principal_name => 'ADMIN',
            principal_type => XS_ACL.PTYPE_DB
        )
    );
END;
/
```

You can use this command to check the ACLs that are currently active on the ADB-S instance:

```sql
SET LINESIZE 200
SET PAGESIZE 100
SET WRAP OFF

COLUMN HOST FORMAT A40
COLUMN ACE_ORDER FORMAT 9999
COLUMN PRINCIPAL FORMAT A20
COLUMN GRANT_TYPE FORMAT A10
COLUMN PRIVILEGE FORMAT A12

SELECT HOST, 
       ACE_ORDER, 
       PRINCIPAL, 
       GRANT_TYPE, 
       PRIVILEGE
  FROM DBA_HOST_ACES
 ORDER BY HOST,
          ACE_ORDER;
```

## 4. Check Firewall Settings (NSGs)

Make sure your Network Security Groups allow outgoing traffic from the ADB-S instance to your Azure private endpoint. You need to check in both places:

* **OCI NSG attached to your ADB-S instance:**  Per default there should be an `Egress rule`​ for destination `0.0.0.0/0` for all protocols. So unless this rule was changed or deleted you don't have to configure anything.
* **Azure NSGs and firewalls:**  Also make sure to allow traffic on the Azure VNets.

## 5. Testing the outbound connection

You can test the private DNS resolution by running the following command: 

```sql
select utl_inaddr.get_host_address('maxfielduseastnfssa.blob.core.windows.net') from dual;
```

Note that the address that gets returned is **not the address that was resolved via DNS**. Instead, if it returns an address it means that it was able to resolve the host address, if it doesn't return an address it was not able to resolve DNS. It is just a *yes-or-no-check*. 

Now it's time to test your connection directly.

### Testing NFS mount

To test an NFS mount, create a directory:

```sql
CREATE OR REPLACE DIRECTORY MYNFS_DIR AS 'MYNFS';
```

Attach the file system using `DBMS_CLOUD_ADMIN`:

```sql
exec DBMS_CLOUD_ADMIN.ATTACH_FILE_SYSTEM(file_system_name => 'MAXFIELDUSEASTNFSSA', file_system_location => 'maxfielduseastnfssa.blob.core.windows.net:/maxfielduseastnfssa/maxcontainer', directory_name => 'MYNFS_DIR', description => 'Azure blob as nfs', params => JSON_OBJECT('nfs_version' value 3));
```

If the mount was successful, you should see `PL/SQL procedure successfully completed.`​ You can list the contents using `SELECT * FROM TABLE(DBMS_CLOUD.LIST_FILES('MYNFS_DIR'));`.

If the mount is unsuccessful, it would like something like this:

```bash
ERROR at line 1:
ORA-20000: Mounting NFS failed
ORA-06512: at "C##CLOUD$SERVICE.DBMS_CLOUD$PDBCS_251109_0", line 2251
ORA-06512: at "C##CLOUD$SERVICE.DBMS_CLOUD_ADMIN", line 5704
ORA-06512: at line 2
```

It will likely be related to network connectivity or NFS compatibility, also see the common issues section at the bottom.

### Testing HTTP request

If you are testing an outgoing HTTP request (e.g. to use an external key vault) instead of NFS, you can use the following command.

```sql
SET SERVEROUTPUT ON;
BEGIN
	DECLARE
	    req   UTL_HTTP.REQ;
        resp  UTL_HTTP.RESP;
		name  VARCHAR2(256);
        value VARCHAR2(10024);
	BEGIN
        req := UTL_HTTP.BEGIN_REQUEST('https://emea-maxakv.vault.azure.net/healthstatus');
        UTL_HTTP.SET_HEADER(req, 'User-Agent', 'Mozilla/4.0');
        resp := UTL_HTTP.GET_RESPONSE(req);

        FOR i IN 1..UTL_HTTP.GET_HEADER_COUNT(resp) LOOP
            UTL_HTTP.GET_HEADER(resp, i, name, value);
            DBMS_OUTPUT.PUT_LINE(name || ': ' || value);
        END LOOP;

        LOOP
            UTL_HTTP.READ_LINE(resp, value, TRUE);
            DBMS_OUTPUT.PUT_LINE(value);
        END LOOP;

        UTL_HTTP.END_RESPONSE(resp);

    EXCEPTION
        WHEN UTL_HTTP.END_OF_BODY THEN
            UTL_HTTP.END_RESPONSE(resp);
        WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE('SQLERRM: ' || SQLERRM);
            DBMS_OUTPUT.PUT_LINE('SQLCODE: ' || SQLCODE);
            DBMS_OUTPUT.PUT_LINE('DETAILS: ' || UTL_HTTP.get_detailed_sqlerrm);
            RAISE;
    END;
END;
/
```

## Common issues

### Advanced Networking (Oracle DB@Azure only)

If [Advanced Networking](https://learn.microsoft.com/en-us/azure/oracle/oracle-db/oracle-database-network-plan#advanced-network-features) is not active on your Oracle.Database delegated subnet, it can [cause complications](https://learn.microsoft.com/en-us/azure/oracle/oracle-db/oracle-database-network-plan#constraints). The only way to find out is via Microsoft SR.

### NFS version

Be sure to choose the right NFS version when using the `DBMS_CLOUD_ADMIN` command for `ATTACH_FILE_SYSTEM`.

### DNS caching

Because ADB-S is a shared service, it's not completely clear how the DNS caching works in the background. In addition, beware that Azure private endpoint addresses are often publicly resolvable with public IP addresses. For example when I create an Azure Key Vault with a private endpoint using `emea-maxakv.vault.azure.net`​, which resolves to `10.0.0.11` it will also publicly resolve to a different address:

```bash
[azureuser@maxeastusvm ~]$ nslookup emea-maxakv.vault.azure.net
Server:		168.63.129.16
Address:	168.63.129.16#53

Non-authoritative answer:
emea-maxakv.vault.azure.net	canonical name = emea-maxakv.privatelink.vaultcore.azure.net.
Name:	emea-maxakv.privatelink.vaultcore.azure.net
Address: 10.0.0.11

[azureuser@maxeastusvm ~]$ exit
logout
Connection to 52.186.170.169 closed.
~ ❯ nslookup emea-maxakv.vault.azure.net
Server:		62.240.133.99
Address:	62.240.133.99#53

Non-authoritative answer:
emea-maxakv.vault.azure.net	canonical name = emea-maxakv.privatelink.vaultcore.azure.net.
emea-maxakv.privatelink.vaultcore.azure.net	canonical name = data-prod-eus.vaultcore.azure.net.
data-prod-eus.vaultcore.azure.net	canonical name = data-prod-eus-region.vaultcore.azure.net.
data-prod-eus-region.vaultcore.azure.net	canonical name = est.prd.r.kv.aadg.msidentity.com.
est.prd.r.kv.aadg.msidentity.com	canonical name = est.tm.prd.r.kv.aadg.trafficmanager.net.
Name:	est.tm.prd.r.kv.aadg.trafficmanager.net
Address: 20.42.64.44
Name:	est.tm.prd.r.kv.aadg.trafficmanager.net
Address: 20.42.73.8
Name:	est.tm.prd.r.kv.aadg.trafficmanager.net
Address: 40.71.10.202
```

This can cause situations, where the ADB-S instance has cached a wrong entry. In these cases, unfortunately the only solution seems to be to ... wait it out... and try again the next day. I would recommend following this tutorial in the right order, don't execute any tests before configuring the private DNS and setting outbound connectivity to private. 

## Conclusion

Hopefully this helped you to enable outbound connectivity from ADB-S with Oracle's Multicloud offering. Let me know in the comments if you have any questions. Cheers!