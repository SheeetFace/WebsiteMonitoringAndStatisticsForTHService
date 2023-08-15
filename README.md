![banner](https://github.com/SheeetFace/backendForTH/assets/93317676/40143f89-cfa5-43b7-b9b4-c1ef18e39ce8)


Website Monitoring and Statistics - This repository contains code for monitoring website availability and collecting statistics on their performance, as well as notifying owners about site availability. It is developed using NestJS, a framework for building scalable and efficient web applications on Node.js.

![banner](https://github.com/SheeetFace/WebsiteMonitoringAndStatisticsForTH/assets/93317676/9950b67e-ff9d-4123-9971-0aeff3e86e34)

👀 Database Access Routes: API routes have been implemented to interact with the database and add/modify data for websites. This allows for collecting and storing statistics on website availability.

🕵️‍♂️ Website Performance Monitoring: A core function has been developed to periodically check the availability of websites. If a site is unavailable, the time and status (error) are recorded in the database.

🔔 Owner Notification: When a website is found to be unavailable, the system sends a notification to the owner via a Discord webhook. The owner receives a notification that their site is down, enabling them to take appropriate action.


![banner (1)](https://github.com/SheeetFace/WebsiteMonitoringAndStatisticsForTH/assets/93317676/7aa9ff8d-1940-42bf-a3a9-aadbdd52db24)

😺 NestJS: A framework for developing server-side applications on Node.js, providing a modular architecture, database integration, and API route creation.

☁️ Database: Aiven's cloud-based PostgreSQL 15.3 is used to store data about websites, availability statistics, and downtime information.

🌐 Discord Webhooks: Discord webhooks are used to notify website owners, sending notifications with information about site unavailability.

Additionally, the server-side of this repository is designed to display statistics on the twitchHub website. This allows website owners to use twitchHub as a central hub for monitoring the availability and performance of their websites. When collecting statistics and detecting website unavailability, data can be transmitted and displayed on the twitchHub website for convenient monitoring and analysis.

