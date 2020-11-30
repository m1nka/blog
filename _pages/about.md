---
layout: page
title: About
image: '/images/pages/me.jpg'
---


Hi 👋 I'm Max. You have stumbled across my blog where I write about cloud computing, tech, travel and more. Currently, I work as a Cloud Engineer at Oracle. Previously, I've worked as a full stack developer and got my degree in Business Informatics from University of Vienna. Since I regularly work on cloud technologies, I've decided to share some of my learnings in this blog. I hope you find something entertaining or insightful ✌️

For any inquiries you can reach out to me [by mail](mailto:blog@maximilian.tech).

## About this blog

This blog is hosted completely for free on [Oracle Cloud free tier](https://www.oracle.com/cloud/free/) (in combination with [Cloudflare](https://www.cloudflare.com/) DNS and CDN). See an overview of the architecture below. 

![](/images/pages/personal-blog-architecture.png)

The blog is based on the static-site generator Jekyll. [Netlify CMS](https://www.netlifycms.org/) is used to manage the blog content. Netlify CMS commits all changes to a Git repository hosted by Github. There are Github action pipelines in place, which build the page using Jekyll and use `scp` to copy the static files to the webserver.