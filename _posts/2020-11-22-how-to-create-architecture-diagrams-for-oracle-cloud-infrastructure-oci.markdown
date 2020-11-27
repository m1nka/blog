---
layout: post
title: How to create architecture diagrams for Oracle Cloud infrastructure (OCI)
tags:
  - cloud
  - oci
image: /images/posts/visualize-oci-diagrams.jpg
date: 2020-11-22T16:00:05.625Z
---
Sometimes, we need to visualize cloud architectures. Usually we do this to share, document and discuss architectural decisions with colleagues, partners or clients. This article will introduce and compare multiple options on how to visualize cloud architectures for Oracle Cloud Infrastructure. The following tools are available:

* Powerpoint
* Diagrams.net (also known as draw.io)
* OCI Designer ToolKit (OKIT)
* visual-paradigm.com
* Cacoo

## Powerpoint

Powerpoint is the easiest and quickest way to create beautiful architectural diagrams for OCI. It's the recommended 'go-to' option visualizing simple deployments. It also supports diagrams in 'light mode' and 'dark mode'. The downside of designing architectures with Powerpoint is that it is not suited for complex architectures. Managing lot's of objects without a proper layering system is annoying to work with. Also Powerpoint is limited when exporting diagrams (PPTX, PDF, PNG, JPEG). 

Download the [OCI Powerpoint Icon Set](https://docs.cloud.oracle.com/en-us/iaas/Content/Resources/Assets/OCI_Icons.pptx) to get started, it includes a sample architecture.

![](/images/posts/oci-powerpoint.png)

## Diagrams.net (also known as draw.io)

This tool currently seems like the best option to visualize architectures for OCI. Diagrams.net is available as a browser-based tool at [diagrams.net](https://diagrams.net), but also offers a [free desktop client](https://github.com/jgraph/drawio-desktop/releases/) for a number of platforms. It's easy to use, yet quite powerful. The tool supports many file storage and synchronization tools and diagrams can be exported in many formats, such as PNG, SVG, JPEG and HTML. It supports a layering system to group resources. The only downside is that the OCI icon library is somewhat limited. 

To get started designing architectures for Oracle Cloud Infrastructure you need to download and import the OCI architecture icon library. Head over to [draw.io](https://draw.io) (or download the desktop application) and select **File** → **Open Library from** → **URL** and enter `https://objectstorage.eu-frankfurt-1.oraclecloud.com/p/McExqfcEsJm8aHPUhenguP34LS9oAI0Qzzbm5sTXplQ-ySee8W_688WZPF-nhZMe/n/franqguxqsfs/b/public-resources/o/OCI_Icons_Drawio_Bark.drawio`. Alternatively, you can use [these legacy icons](https://objectstorage.eu-frankfurt-1.oraclecloud.com/p/mRHFjVorUCYMI5L8lSp-_Hc2F4Y7_9gnMOWvox0bNdpsqLE-x0VKjH17UDWk8P-3/n/franqguxqsfs/b/public-resources/o/oracle-cloud-architecture-icons-01-2019.xml). Also, make sure to enable [layers](https://desk.draw.io/support/solutions/articles/16000067815-how-to-use-layers-).

![Working with diagrams.net to design OCI architectures](/images/posts/diagrams-net-oci.png "Working with diagrams.net to design OCI architectures")

## OCI Designer ToolKit (OKIT)

OKIT is a tool designed specifically to design, deploy and visualize Oracle Cloud Infrastructure environments. It's open source and available on [Github](https://github.com/oracle/oci-designer-toolkit). It's a great tool with a lot of potential, however it's currently only available by running or self-hosting a Docker container (or Vagrant image). Also, it [currently does not support](https://github.com/oracle/oci-designer-toolkit/blob/master/documentation/Usage.md#currently-implemented-artifacts) all Oracle Cloud resources. On the contrary, it is much more powerful than other visualization tools, since it can automatically create Terraform and Ansible configurations.

![Working with OKIT to design OCI architectures](/images/posts/okit.png "Working with OKIT to design OCI architectures")

## Visual-paradigm.com

There is also visual-paradigm.com, which offers some out-of-the-box OCI visualizations. I've personally never tried it, since it's not open source and only offers a limited free version. It does however provide multiple sample diagrams and overall seems like a well designed tool. 

You can get started designing OCI architectures with visual-paradigm-com [here](https://online.visual-paradigm.com/diagrams/features/oracle-cloud-infrastructure-diagram-software/).

![Working with Powerpoint to design OCI architectures](/images/posts/visual-paradigm-oci.png "Working with Powerpoint to design OCI architectures")

## Cacoo

Finally there is Cacoo, which also offers out-of-the-box OCI visualizations. Like visual-paradigm I've not personally tried it, since it's neither open source nor completely free. You can get started with Cacoo modeling for [here](https://cacoo.com/templates/oracle-cloud-infrastructure-template).

![Working with Cacoo to design OCI architectures](/images/posts/oci-cacoo.png "Working with Cacoo to design OCI architectures")

## Even more options

Check out the official site for Oracle Cloud Infrastructure icons and graphics [here](https://docs.cloud.oracle.com/en-us/iaas/Content/General/Reference/graphicsfordiagrams.htm).

That's it. If you have found a better way to design and visualize OCI architectures, feel free drop me an email or comment below.