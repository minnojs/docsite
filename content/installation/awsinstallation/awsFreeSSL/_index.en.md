---
title: AWS Free SSL
weight: 20
disableToc: true
---

This guide will cover how to enable SSL on your running AWS server, set up from our guide [here](../).

1.  Go to http://www.freenom.com/ 
2.  Go to Services -> Register a new domain.
3.  Pick the domain you want and register it (You will register to freenom in the process of obtaining the domain).
4.  Go to services->my domains
5.  Click "manage domain" on the domain you registered
6.  Click "manage freenom DNS"
7  Add a record with type "A" and IP Address that you copied down earlier for your AWS server, and then click "save changes"
8.  Wait ~1 hour for the DNS changes to propogate
9.  You should now be able to go to the domain name you registered and be sent to your docker server, such as "http://mydomain.com/dashboard"
10.  Log in to the dashboard with an admin account
11.  From the dropdown menu's at the top of the screen, select Admin -> edit configuration
12.  Enter your email in the box provided, and the domain you registered in the next box, i.e. mydomain.com
13.  Click save, and now it should work.  You'll have to connect using https, such as https://mydomain.com/dashboard from here on out.
