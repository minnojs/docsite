---
title: The Docker Configuration File
weight: 10
---

## The Docker Configuration File


This page will describe the parts of the docker-compose configuration file that you might want to edit.

    ports:
      - "8000:8000" #specify ports forwarding
      - "8443:8443" #specify ports forwarding 
By default the server will run on port 8000 for http requests and 8443 for https requests.  If you want to change it then you'd do something like "80:8000" to make it run on port 80 for http requests.


 SERVER_TYPE: "http" "http", "https", or "greenlock"
 
 "http" will make it only run with a http service.  "https" will make it run on https also using a certificate and key file that you provide.  "greenlock" will make it automatically aquire certificates for you using Greenlock.  When using https, update the part of the config file under "volumes" with "./localhost.crt" and "/localhost.key" to point to the file path of the crt and key files for your domain.  It is up to you to aquire them.  When using greenlock, update the OWNER_EMAIL and DOMAINS field with your email and domain, and also make sure that the DNS for your domain points to the machine you are running this on.
 	  