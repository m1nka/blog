---
layout: post
title: Stay up-to-date with Oracle Cloud Infrastructure (OCI) Telegram Bot
tags:
  - oci
  - cloud
image: /images/posts/oci-telegram-bot.jpg
date: 2022-08-17T10:58:23.925Z
---
> **Disclaimer**: I've created this bot for personal and non-commercial use. This is not an official Oracle bot, but a private project and I make no representations as to the accuracy or completeness of any information found in the bot or following any link. 

If you use Infrastructure-as-a-Service (Iaas) or Platform-as-a-Service (Paas) on a regular basis, you will know how important it is to stay up-to-date with the latest release notes and news of your platform. Oracle Cloud Infrastructure (OCI) pushes out new features almost every single day and as a cloud engineer you need to be aware of these changes. 

I've created a small Telegram bot to help me stay up-to-date with news concerning OCI. You can access and follow this bot with the button below.

<button href="" onClick="window.open('https://t.me/oci_news_bot')" style="vertical-align: middle;border-radius:5px;background-color: #27aeef;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;"><span style="top:3px;" data-icon='ei-external-link' data-size='s'></span><span style="position: relative; bottom: 5px;"><strong>Oracle Cloud Infrastructure (OCI) News Bot for Telegram</strong></span></button>

You can also scan the image below to subscribe to the bot: 

![](/images/posts/scan-telegram-bot.jpg)

## How this bot works

The way this bot works is it subscribes to two RSS feeds and automatically sends updates as Telegram messages:

* https://www.ateam-oracle.com/rss
* https://docs.cloud.oracle.com/en-us/laas/

To subscribe to the RSS feeds I used [@TheFeedReaderBot](https://telegram.me/TheFeedReaderBot).