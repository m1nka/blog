---
layout: post
title: "Modernizing Legacy Oracle Forms Applications: A Complete Overview"
tags:
  - cloud
image: /images/posts/forms-eol.jpeg
date: 2023-04-20T10:39:06.819Z
---
Many large companies are still using Oracle Forms & Reports. If you're part of that group, you might find that it's becoming outdated and no longer meets your needs. However, migrating to a more modern technology can be quite difficult and usually requires significant time and resources. This article will go over the main points to consider, when modernizing Oracle Forms.

### Table of contents

1. [Is Oracle Forms still supported](#is-forms-still-supported)
2. [Reasons to move away from Oracle Forms](#reasons-to-move-away-from-forms)
3. [Points to consider before getting started](#before-getting-started)
4. [Modernization paths](#modernization-paths)

   * [Oracle APEX](#apex)
   * [Auraplayer](#auraplayer)
   * [ORDS](#ords)
   * [Custom implementation](#custom-implementation)

## Is Oracle Forms still supported? <a name="is-forms-still-supported"></a>

A common question that often arises is: Does Oracle still support Oracle Forms? Are users forced to transition to another technology? For now, Oracle remains committed to providing support for Oracle Forms, so users are not forced to migrate to an alternative technology.

The current Forms 12.2.x version is supported until December 2025 (as [documented in the Oracle Lifetime Support Policy for Fusion Middleware](https://www.oracle.com/us/assets/lifetime-support-middleware-069163.pdf)) and extended support ends December 2027. However, Oracle has already announced the next version of Fusion Middleware 14.1.2 (including a new version for Oracle Forms) in [this statement of direction](https://www.oracle.com/a/ocom/docs/middleware/fusion-middleware-statement-of-direction.pdf). It is currently not known how long the next Oracle Forms version will be supported, but if we assume that it has a similar EOL policy as previous versions it should be supported well beyond 2030.

## Reasons to move away from Oracle Forms <a name="reasons-to-move-away-from-forms"></a>

Even though Oracle will continue to support Oracle Forms, there are many reasons to move away from Forms. Here are some of the key reasons to consider upgrading:

* **Java Client limitations**: Switching from Java Client to web-based applications allows for easier access, improved scalability, and better compatibility with modern devices.
* **Lack of PL/SQL skills**: With PL/SQL expertise becoming less common, organizations may struggle to find and retain skilled developers to maintain and develop Oracle Forms applications, making it more practical to adopt modern technologies with a wider talent pool available.
* **Modern paradigms and cloud integration**: Legacy Oracle Forms may not align with contemporary architectural paradigms and the growing trend of cloud-based services, limiting scalability and flexibility. It also does not separate the application layer from the data layer, which might be undesirable.
* **Outdated UI and UX**: Modernizing the user interface and simplifying user experience are important. Oracle Forms UI feels outdated and may lead to poor user satisfaction.
* **Maintenance challenges**: Maintaining and enhancing existing Forms can be difficult and time-consuming, hindering innovation and progress.
* **External use requirements**: Organizations increasingly need solutions that can be easily accessed and used by external stakeholders, such as customers and partners, for better collaboration and engagement.

In the end, it's essential for companies to think about their unique pain points and whether the issues they're facing with Oracle Forms are worth the effort of a redesign.

## Points to consider before getting started <a name="before-getting-started"></a>

In this chapter, we will discuss the main points to consider before modernizing an Oracle Forms installation.

**Non-trivial Modernization Process**: Oracle Forms modernization is not a trivial process; it requires a significant investment in time and resources. This is primarily due to the complexity of the legacy applications and the intricate dependencies between various components. Additionally, the modernization process involves not only updating the technology stack but also rethinking the architecture and design to meet modern standards and expectations.

**Availability of Forms Developers**: A major challenge in Oracle Forms modernization projects is the availability of (your) Forms developers, who are familiar with the functionality of the existing system. As the pool of experienced Forms developers continues to shrink, organizations must act proactively to avoid a scenario where all the knowledgeable developers have retired or left the company. For a modernization you will need to understand the existing code and these developers are essential for ensuring a smooth transition and mitigating risks during the modernization process.

**Business Processes and Scope Management**: Since modernizing Oracle Forms is not a simple software upgrade, you should not only look at updating the screens, but also about consider the underlying business processes. This will be the right moment to examine and optimize the business logic, workflows, and data structures to ensure that the modernized application remains efficient and maintainable. Because business processes are usually updated as part of Forms modernization projects, scope creep can become a problem, which will have an impact on the project's timeline and budget. Be sure not to get sidetracked by unnecessary changes and establish clear goals at the beginning of your project.

## How to modernize Oracle Forms: Four different migration paths <a name="modernization-paths"></a>

In this article, we'll go over four potential upgrade paths for Oracle Forms. We will consider the pros and cons of each technology:

* Oracle APEX
* Auraplayer
* ORDS
* Custom implementation

### Oracle APEX (Application Express) <a name="apex"></a>

Oracle APEX (Application Express) can be seen as a modern successor to Oracle Forms, offering a low-code development platform that simplifies the process of building and deploying web applications. APEX has a very pleasant look and feel, is based on state-of-the-art web standards and enables users to easily build modern web applications. Both APEX and Forms share similarities in their foundation, as they are based on PL/SQL and provide low-code environments for developers. This makes APEX a natural choice for organizations looking to upgrade their Oracle Forms installations.

![APEX screenshot](/images/posts/apex-screenshot.png)

Oracle APEX is an included feature of the Oracle Database and does not incur any additional cost.

### Oracle APEX architecture

Oracle APEX follows a three-tier architecture, comprising the database, mid-tier that handles web requests, and a web-based client. 

![APEX architecture](/images/posts/apex-archictecture.png)

Let's take a closer look at each component:

* **Database Level:** APEX is installed directly within an Oracle Database, utilizing the full potential of the database's security, scalability, and performance features. All application metadata, definitions, and PL/SQL code reside within the database.
* **Mid-Tier webserver:** ORDS (Oracle RESTful data services) typically serves as the middle layer, acting as a bridge between the database and the web-based client. ORDS is a stand-alone Java application that can be run in Tomcat, Weblogic or self-contained. It facilitates data and service requests from the client tier, translating them into database queries, and then sending the results back to the client. ORDS can be scaled horizontally (even in a Kubernetes cluster).
* **Web-Based Client:** APEX applications are accessed through a web browser, making them platform-independent and easily accessible on various devices. The client-side user interface is rendered using HTML, CSS, and JavaScript, ensuring a modern and responsive user experience.

Here's what you need to know about using APEX as an upgrade path. The advantages include:

* **Low-Code Development Platform**: Oracle APEX continues to provide all advantages of a low-code environment and offers rapid and easy application creation.
* **High re-usability of components**: Re-use existing PL/SQL code that resides in the database and automatically create the basic design from Forms (migration wizard).
* **PL/SQL**: Very much suited for companies that have developers with PL/SQL knowledge (I would argue that in this case APEX is the best upgrade path)
* **Better user experience and speedy development**: APEX makes it easy to design modern, visually appealing web apps that are mobile-responsive per default.

The disadvantages of migrating to APEX include:

* **APEX is not the direct successor of Forms**: Even though Oracle APEX might be the easiest upgrade path from Oracle Forms, it's still not a trivial migration. You do not simply load the Forms source files into and magically generate a completed APEX application. It is a re-write, where a large part of the code base (PL/SQL in the database) may be re-used. The difficulty of the migration strongly depends on how customized and complex the individual Forms masks are and how big the Forms installation is in total.
* **Architectural concerns**: Does not introduce a clear separation between application- and database layer (which might be desirable for some people).
* **Learning curve**: Your team may need to learn new skills when transitioning from Oracle Forms to APEX. APEX is very easy to use and to get started with, however at some point you will require some APEX expertise (including strong PL/SQL skills).

Migrating Oracle Forms to Oracle APEX is not a straightforward process, even though there is a migration wizard that helps simplify the conversion of Forms applications to APEX. For organizations with a small number of Forms masks and minimal customization, the migration process might be less complex. In contrast, companies with numerous highly customized Forms that contain intricate business logic may face a more challenging and time-consuming migration process.

However, this should still provide the easiest migration path compared to any other technology. And if you have access to PL/SQL developers, APEX will most likely be the best option. Ultimately, the decision to modernize Oracle Forms using Oracle APEX should take into consideration the specific needs and resources of the organization.

### Modernizing with Auraplayer <a name="auraplayer"></a>

> I'd like to add a disclaimer that I have no affiliation with AuraPlayer and am not promoting their product in any way. In additional, it's essential to evaluate whether the company is trustworthy and has long-term financial stability to ensure uninterrupted long-term support and maintenance. I have not tried this product myself.

AuraPlayer is a unique solution that helps organizations modernize their existing Oracle Forms installations without the need for extensive re-development or migration. It works as a middleware service that wraps existing Oracle Forms applications and exposes them as web services (e.g. RESTful), making them accessible through modern interfaces such as mobile apps, web browsers, or chatbots.

Modernizing Oracle Forms with AuraPlayer has the following advantages:

* Can directly expose the functionality of existing Forms, as is. No other migration path offers this functionality.
* Integration with modern platforms: By transforming Oracle Forms functionality into web services, AuraPlayer allows you to integrate your legacy applications with modern platforms and devices such as smartphones, tablets, and web browsers.
* Leverage existing business logic: AuraPlayer enables you to reuse your existing Oracle Forms business logic without the need to rewrite or redevelop the underlying code. This approach not only saves time and effort but also minimizes the risk of introducing errors in the process.
* Simplify user experience: With AuraPlayer, you can create user-friendly interfaces for your Oracle Forms applications, enhancing user experience and satisfaction while maintaining the existing backend processes.

While AuraPlayer offers a practical approach to modernize Oracle Forms installations, there are potential drawbacks that organizations should consider before opting for this solution. Here are some reasons why AuraPlayer is probably not the best option:

* **Dependency on the company**: Relying on AuraPlayer means that your modernization strategy is dependent on the company behind the product. AuraPlayer is (to my knowledge) not directly affiliated with Oracle. It's essential to evaluate whether the company is trustworthy and has long-term financial stability to ensure uninterrupted support and maintenance.
* **Additional costs**: Using AuraPlayer requires maintaining Oracle Forms licenses and support costs in addition to the fees associated with AuraPlayer itself. This could result in higher overall expenses compared to other modernization options.
* **Retaining legacy clutter**: AuraPlayer may serve as a temporary solution, but it doesn't fully address the underlying legacy issues. Instead, it puts a new face on existing Oracle Forms applications, which might not be sufficient for organizations looking to eliminate the old clutter and start fresh with a modern technology stack.
* **Limited long-term benefits**: While AuraPlayer can help improve user experience and accessibility in the short term, it may not provide the long-term benefits that other modernization options offer, such as full integration with modern paradigms, cloud services, and a more extensive pool of developers with relevant skill sets.

On paper, modernizing Oracle Forms with AuraPlayer presents a viable option for organizations looking to integrate their legacy applications with modern platforms, reuse existing business logic, simplify user experience, and achieve incremental modernization. However, personally I am sceptical about this migration path.

For small Oracle Forms installation it seems to make more sense to modernize using APEX or ORDS. The project scope should be manageable (since it's a small installation) and it provides a clean approach that will work long-term. For large installations, the risk of going with Auraplayer seems big: It does not fix any underlying architectural problems and it's unclear how stable the company is in the long-term. The dependency on a separate company, additional costs, retention of legacy clutter, and limited long-term benefits don't outweigh the potential benefits.

If you are to integrate your legacy application via RESTful APIs check out the next migration path: ORDS.

## Modernizing with ORDS (Oracle RESTful Data Services) <a name="ords"></a>

Oracle REST Data Services (ORDS) ORDS is a solution for creating RESTful web services for Oracle databases. By using ORDS, you can turn your PL/SQL code into web services that can be easily integrated with other applications.

Oracle REST Data Services (ORDS) is a standalone Java application that enables the development and deployment of RESTful APIs for Oracle databases. ORDS acts as a middleware that translates RESTful HTTP(S) calls into database interactions, providing a modern and scalable way to access and manipulate data stored in Oracle databases. ORDS features include:

* Exposes database objects such as tables, views, and stored procedures through RESTful APIs, making it easy for developers to work with data using modern web-based technologies.
* Provides built-in support for JSON, XML, and other data formats, simplifying data exchange between the client and the database.
* Offers robust security features, including OAuth 2.0 and HTTP/S.
* Enables easy integration with other Oracle tools and technologies, such as Oracle APEX and SQL Developer.

One of the reasons to use Oracle REST Data Services (ORDS) for modernizing Oracle Forms applications is its ability to leverage existing PL/SQL code. This enables organizations to preserve business logic while transitioning to a modern web-based architecture. By exposing PL/SQL procedures and functions as RESTful APIs, ORDS allows developers to efficiently integrate with modern front-end technologies and create responsive, user-friendly interfaces. This approach can reduce the complexity and cost of the modernization process, as it minimizes the need for extensive code rewriting. You might consider to push PL/SQL logic, which is encapsulated in Oracle Forms down to the database in order to re-use that code as well.

Here are the advantages of modernizing Forms with ORDS:

* **Modern API-based architecture**: RESTful APIs make integration with other apps and services easier.
* **PL/SQL compatibility**: Keep using your existing PL/SQL code with minimal changes.
* **Robust security**: ORDS offers security features like OAuth and HTTP/S to protect your data.

The disadvantages of using ORDS:

* **UI development**: ORDS doesn't help with creating user interfaces, it really only provides REST interfaces. You'll still need to develop a front-end application.
* **Complexity for large installation**: When managing a large installation of ORDS APIs, you will need to come up with a robust operating model (monitoring, error handling, change management, integration with version control like Git) for ORDS.

A valid alternative to using ORDS might be to create RESTful APIs via frameworks like Springboot. Springboot offers a lot of tooling to create RESTful APIs and (contrary to ORDS) is open source software. Check out the next chapter for more information.

## Modernizing with a custom implementation <a name="custom-implementation"></a>

Modernizing Oracle Forms applications using a custom implementation approach offers organizations the most flexibility. Almost any technology can be used to re-create the functionality previously offered by Oracle Forms. While it offers the most flexibility and enables specific technology preferences, it also requires the most time and resources.

Using this approach, organizations can still choose to reuse some of the existing PL/SQL code by directly calling PL/SQL functions from their application code, such as Java. This allows businesses to preserve valuable business logic while adopting modern architectures. For example, using a framework like Spring Boot, developers can rapidly create RESTful APIs that integrate with the existing PL/SQL functions, providing a seamless bridge between the new application frontend and the legacy backend. Alternatively, the functionality can be re-written in the application layer.

A custom implementation means:  

* Full control: You can design the application to meet your unique requirements.
* Modern technology stack: Choose the best technology for your app to ensure optimal performance and integration.
* Separation of business logic from the database layer
* Most time-consuming and resource-intensive modernization path: Developing a custom application takes longer than other options.

## Conclusion

In conclusion, modernizing legacy Oracle Forms applications is a difficult undertaking. As we've discussed, Oracle Forms is still supported, but there are compelling reasons to move away from it and embrace more modern technologies. There are several modernization paths to choose from, including Oracle APEX, AuraPlayer, ORDS, and custom implementations. The decision-making process for modernizing Oracle Forms applications should primarily revolve around the following key questions:

* Is it really worth upgrading? Assess the benefits and trade-offs of modernization against the risks and costs involved. 
* Which skills does my organization have? Evaluate the availability of Forms and PL/SQL developers and the implications on the modernization process.
* How does the modernization fit into the overall IT strategy of my organization? Moreover, the shift towards cloud computing presents additional opportunities and considerations for modernizing Oracle Forms applications. 

Don't hesitate to leave your thoughts and feedback in the comment section below.  Cheers!