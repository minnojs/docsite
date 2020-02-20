---
title: Easy Installation With Docker
weight: 10
---

This page will cover the general way to get the MinnoSuite Dashboard installed using Docker, a tool designed to make it easier to create, deploy, and run applications.

1.  Check our [requirements](./requirements) page and make sure that the machine that you want to use meets the requirements.  

2.  Install Docker on your machine, using the Docker CE download link on the right of the page [here for windows 8+](https://docs.docker.com/docker-for-windows/install/), [here for MacOs](https://docs.docker.com/docker-for-mac/install/), or [here for Ubuntu Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/),and following the instructions that they give you.  Make sure to continue to the [post installaion steps page](https://docs.docker.com/install/linux/linux-postinstall/) and follow the instructions there too.

2.  Install Docker-compose on your machine, using the guide [here](https://docs.docker.com/compose/install/).

3.  create a new folder in your file system to hold your minnoSuite server, and download [this](./docker-compose.yml) docker-compose file into it.

4.  You can update the configuration for your server by editing the docker-compose file with a text editor.  Read about the docker-compose file [here](/minnosuitedashboard/useage/configfile).

5.  Open the command prompt (windows) or terminal (Linux/Mac) for your machine, and navigate to the folder that you downloaded the docker-compose file to, and type: 
	`docker-compose up -d`

	To stop the server you can type `docker-compose down`

	If you are using a Mac or Linux machine and binding to port 80 or 443, you may get an error unless you start the server as an administrator by typing:
	`sudo docker-compose up`

6.  You should see a message about the server being up, and be given a port and URL to use.  Enter that URL in your browser and you will be connected.  The default user is username : admin and password: admin123

7.  To get HTTPS working, first follow the guide to [setting up your domain](./domain).  Then while logged to the open dashboard as an admin go to the admin-> edit configation page.  Change the server type to "greenlock" and enter in your domain, without the http:// part.  Press the update button and the server should switch to using https.

		* Or to set it up from the file system open up the docker-compose file and edit the OWNER_EMAIL and DOMAINS fields.  
		Enter your email, and the domain you registered.  Change the SERVER_TYPE field to "greenlock".  Change the ports to "80:8000" and "443:8443".  
		"Now when you run docker-compose up it should automatically run with https.  
		Now connect to the site using the domain you registered and you should have https working.