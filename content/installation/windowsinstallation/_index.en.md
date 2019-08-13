---
title: Windows Installation
weight: 18
---



1.  Install Docker on your machine, using the guide  [here](https://docs.docker.com/docker-for-windows/install/) .

2.  create a new folder in your file system to hold your minnoSuite server, and download [this](./docker-compose.yml) docker-compose file into it.

3.  You can update the configuration for your server by editing the config file with a text editor.  Read about the config file [here](/minnosuitedashboard/useage/configfile).

4.  Open the [command prompt](https://www.makeuseof.com/tag/a-beginners-guide-to-the-windows-command-line/), and navigate to the folder that you downloaded the docker-compose file to, and type: 
docker-compose up

5.  You should see a message about the server being up, and be given a port and URL to use.  Enter that URL in your browser and you will be connected.  The default user is username : admin and password: admin123

6.  To get HTTPS working, first follow the guide to [setting up your domain](./domain).  Then open up the docker-compose file and edit the OWNER_EMAIL and DOMAINS fields.  Enter your email, and the domain you registered.  Change the SERVER_TYPE field to "greenlock".  Change the ports to "80:8000" and "443:8443".  "Now when you run docker-compose up it should automatically run with https.  Now connect to the site using the domain you registered and you should have https working.
