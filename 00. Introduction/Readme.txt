Learning MongoDB

Introduction

* Download MongoDB from MongoDB Download Center
* Install on your machine
* It will be installed in Program files
* Copy the path upto bin and add it to path in system environment variables

Then open command prompt / terminal

First thing we need to do is create a data directory
Then, create a file called db, which mongo will look for data

> md \data
> md \data\db

Start the daemon
> mongod

Open another command prompt / terminal

> mongo

This will login to the MongoDB shell

> db.users.insert({"name":"Test User"})


Environment setup

Install Node.js and Python 3

Node has npm as its package manager
For python, we have pip

So using pip, install httpie
> pip install httpie

Test the installation

> http http://www.google.com
