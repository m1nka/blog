---
layout: page
title: About
image: '/images/pages/me.jpeg'
---

Hi 👋 I'm Max. You have stumbled across my blog where I write about cloud computing, tech, travel and more. Currently, I work in the Multicloud Blackbelt team at Oracle. I graduated from University of Vienna with a degree in Business Informatics. I founded a startup in Vienna and have since worked as full stack developer and cloud engineer and architect. I've decided to share some of my learnings in this blog. I hope you find something entertaining or insightful ✌️

For any inquiries you can reach out to me [by mail](mailto:blog@maximilian.tech). 

## About this blog <a name="blog-architecture"></a>

This blog is hosted completely for free on [Oracle Cloud free tier](https://www.oracle.com/cloud/free/) (in combination with [Cloudflare](https://www.cloudflare.com/) DNS and CDN). See an overview of the architecture below. 

![](/images/pages/personal-blog-architecture.png)

The blog is based on the static-site generator Jekyll. [Netlify CMS](https://www.netlifycms.org/) is used to manage the blog content. Netlify CMS commits all changes to a Git repository hosted by Github. There are Github action pipelines in place, which build the page using Jekyll and use `scp` to copy the static files to the webserver.

Also checkout [this article](https://maximilian.tech/2021/01/29/free-blog-hosting-getting-the-perfect-lighthouse-score-100-100-100-100/) where I go into more details on how I built this blog.

> **Update 2025**: I decided to move the blog to a new platform. The combination of Github Actions and GitHub Pages is just too perfect for Jekyll.