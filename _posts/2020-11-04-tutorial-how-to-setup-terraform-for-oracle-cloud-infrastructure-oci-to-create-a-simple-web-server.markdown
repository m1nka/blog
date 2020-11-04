---
layout: post
title: "Tutorial: How to setup Terraform for Oracle Cloud Infrastructure (OCI)
  to create a simple web server"
image: /images/posts/terraform-alpaca.jpg
date: 2020-11-04T15:22:52.080Z
---
In this article we will cover how to get started with a basic Terraform setup in Oracle Cloud Infrastructure (OCI) to create a simple web server. This tutorial can be done using the Always Free Tier.

> This tutorial has been tested with Terraform v0.13.4 and will be updated for future releases. 

## 1) Installing Terraform CLI

The first step is to install Terraform CLI. If you are using MacOS you can simply run `brew install terraform`. For other platforms follow the official instructions [here](https://learn.hashicorp.com/tutorials/terraform/install-cli). You can verify your installation by running `terraform version`.

## 2) Preparing for our first Terraform script

Before we can get started we need the following information and [OCIDs](https://docs.cloud.oracle.com/en-us/iaas/Content/General/Concepts/identifiers.htm):

- Tenancy OCID: Open the top right profile menu and click **Tenancy**. Copy the OCID as described [here](https://docs.cloud.oracle.com/en-us/iaas/Content/General/Concepts/identifiers.htm#tenancy_ocid).
- User OCID: Open the top right profile menu and click on **User settings**. Copy the OCID as described [here](https://docs.cloud.oracle.com/en-us/iaas/Content/API/Concepts/apisigningkey.htm#five).
- Region identifier: Next we need the region where we want to deploy resources. E.g. `eu-frankfurt-1`, all region identifiers can be found [here](https://docs.cloud.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm#About).

> If you have already configured the OCI CLI you can skip the next step. Your private key has already been setup and is located at `~/.oci/oci_api_key.pem`. You can find your fingerprint by opening the top right profile menu, clicking **User settings** and then choosing **API Keys** in the bottom left corner.

Finally, we need a private key path and fingerprint. Make sure that you have already uploaded an API signing key to the Oracle Cloud dashboard. You can check this by opening the top right profile menu, clicking **User settings** and then choosing **API Keys** in the bottom left corner. If you have not yet added a public key, follow the instructions [here](https://docs.cloud.oracle.com/en-us/iaas/Content/Functions/Tasks/functionssetupapikey.htm) to add a public/private key pair. 

## 3) Testing your setup with a basic Terraform script

To test that all credentials are correct, we will run a [minimal Terraform configuration](https://objectstorage.eu-frankfurt-1.oraclecloud.com/p/YW3pknrFQlw37eknN1toi6YezuH8WLqjXBO69kTKnxsbgNJGuasyokZWKGDcfW5W/n/franqguxqsfs/b/public-resources/o/minimal-oci.tf). This Terraform script will not create or modify any cloud resources.

```
# Create a new folder
mkdir minimal-terraform-config
cd minimal-terraform-config

# Download the minimal Terraform configuration
curl https://objectstorage.eu-frankfurt-1.oraclecloud.com/p/YW3pknrFQlw37eknN1toi6YezuH8WLqjXBO69kTKnxsbgNJGuasyokZWKGDcfW5W/n/franqguxqsfs/b/public-resources/o/minimal-oci.tf --output minimal-oci.tf

# Initialize the Terraform provider 
terraform init
```

You should see a message `Terraform has been successfully initialized!`. Now, we must set the environment variables to authenticate our local Terraform installation with our Oracle Cloud account. Set your environment variables by running the following command (you need to fill in your values):

```
export TF_VAR_tenancy_ocid=ocid1.tenancy.oc1..aaaaaaaabu74o24dtegtq53thm2oxsx5mr6wbhtwefaos2rfwmzbtrujb3ya
export TF_VAR_user_ocid=ocid1.user.oc1..aaaaaaaax5isirkhfebc5bbijbrkdh2acm4tbmhatkc2ijmiftizzjh2tgcq
export TF_VAR_fingerprint=10:b9:c2:2a:09:93:42:1f:a2:2d:2e:d0:3b:04:29:79
export TF_VAR_private_key_path=/Users/me/.oci/oci_api_key.pem
export TF_VAR_region=eu-frankfurt-1
```

If your private key is encrypted with a password, you must create another variable `export TF_VAR_private_key_path=mypassword` and reference it in your configuration.

Finally, run a `terraform apply` to validate that everything has been setup correctly. If you get a message `Apply complete! Resources: 0 added, 0 changed, 0 destroyed.` then you have successfully installed and configured Terraform!

> If you get an error message such as `provider.oci: can not create client, bad configuration: did not find a proper configuration for private key`, you might have missed one of these things:
>
> - Not specifying either a private_key or private_key_path in the config
> - Specifying a private_key_path that's not a valid path to a private key file
> - Not specifying a private_key_password for a private key that's encrypted
> - Specifying an incorrect private_key_password for an encrypted private key
> - Set up your API key incorrectly
>
> For more info check [docs](https://registry.terraform.io/providers/hashicorp/oci/latest/docs) or the [Github repository](https://github.com/terraform-providers/terraform-provider-oci).

## 4) Deploying a simple web server with Terraform

Now that we have validated our Terraform setup, we can move on to deploy our first application with Terraform. This Terraform script will deploy a set of networking resources and a virtual machine with a simple webserver installed.

```
git clone git@github.com:m1nka/oci-terraform-simple-web-server.git
cd oci-terraform-simple-web-server
terraform plan
terraform apply
```

You might get a message asking you to provide a value for `var.compartment_ocid`. In this case, we not to find a [compartment](https://docs.cloud.oracle.com/en-us/iaas/Content/Identity/Tasks/managingcompartments.htm) where we can deploy our resources. Go to the Oracle Cloud console and open the main menu (top left corner). Scroll down and choose "Identity" -> "Compartments". Choose the compartment you would like to use and copy the compartment OCID. You can set the environment variable by running:

```
export TF_VAR_compartment_ocid=ocid1.compartment.oc1..aaaaaaaac6uytbhiw5lsnx6lbdlw7bajgf7uhoitnn7ryknuhyi5fdw537sa
```

