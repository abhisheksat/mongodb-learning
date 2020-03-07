Explore the MongoDB System

1. Explore the Mongo shell

> mongod
To start the mongo server if its not running
Default MongoDB port, it listens on 27017

> mongo
This logs into the server and a prompt is available for furthe use

> db
which database is being used

> use learning_mongo
It uses that database now. Even if that database does not exists, it will be created once a document is inserted

> show dbs
Shows all available databases

> db.cars.insert( {"make":"Audi"} )
MongoDB stores documents in collections
Once we insert a document, the underlying collection will be created as a side effect
In the above insert, cars is the name of the required collection

> show collections
Shows the available collections

--- As you now know, we did not setup any schema. We directly started working with data and it was easy to insert data

The Mongo shell is friendly and used JavaScript interpreter

You can type

> print("test")
test

Declare variables to use later
> var arr=["one","two","three"]
> arr
[ "one", "two", "three" ]

We can run JavaScript code on Mongo shell
Try inserting a sample of 10000 records / number data

> for (i=0;i<10000;i++){
... db.numbers.insert(
... {"number":i}
... )
... }

Count the number of records on a collection

> db.numbers.count()

Run query to find a record
> db.numbers.find({"number":1})

To know how Mongo plans a query
> db.numbers.find({"number":1}).explain()

To know how Mongo query execution stats
> db.numbers.find({"number":1}).explain("executionStats")

Observe the number of totalDocsExamined without indexes, we'll apply index and check again

Creating an index
> db.numbers.createIndex({number:1})



2. Importing data into the database

With mongoimport we can import data from readily available .xls, .csv files

> mongoimport --help

It is important to specify where to put the new data
We need to specify the database and the collection to be used for the import purposes

We also need to specify the data input options.
By default, it is JSON and the flag used is --jsonArray

When importing data from json, it might be the case that a certain record(s) may/may not have some attribute/element
But as MongoDB does not enforce any schema, we can add it. If a query is fired for that attribute, the data/record not having that attribute will not be returned

Make sure the data you are trying to ingest/import into the database is accurate

Be in the directory where your .json file (to be imported) is present

> mongoimport --db learning_mongo --collection tours --jsonArray --file tours.json

Once imported, start the mongo shell
> mongo

Use the learning_mongo

> use learning_mongo
> show collections

> db.tours.count()

Now run a query

> db.tours.find({"tourTags":"hiking"})


3. Mongo Shell Operations

CRUD Operations

Start the Mongo shell

> mongo
> use learning_mongo

> db.tours.find( {"tourTags":"wine"} )

Now add a complex object into db.tours collection

> db.tours.insert({
... "tourName":"The Wines of Santa Cruz",
... "tourLength":3,
... "tourDescription":"Discover Santa Cruz's wineries",
... "tourPrice":500,
... "tourTags":["Wine","Santa Cruz"]
... }
... )

Now lets modify the above object and add tourRegion to it
Use update with $set

> db.tours.update({"tourName":"The Wines of Santa Cruz"},
... {$set: {"tourRegion":"Central Coast"}})

> db.tours.find( {"tourTags":"Wine"} )

Now add data to the tourTags, which is an array

> db.tours.update({"tourName":"The Wines of Santa Cruz"},
... {$addToSet: {"tourTags":"boardwalk"}})

Removing a document
> db.tours.remove( {"tourName":"The Wines of Santa Cruz"} )

Dropping a collection
> db.tours.drop()



4. Simple Indexing

import the data again into the db

> mongo
> use learning_mongo

> db.tours.find({"tourPackage":"Taste of California"}).explain("executionStats")

Now lets create an index on tourPackage

> db.tours.createIndex({tourPackage:1})

Find query with multiple parameters

> db.tours.find( {"tourPrice":{$lte:500}, "tourLength":{$lte:3}} )

> db.tours.find( {"tourPrice":{$lte:500}, "tourLength":{$lte:3}} ).explain("executionStats")


Create a compound index with tourPrice, tourLength
> db.tours.createIndex({tourPrice:1, tourLength:1})

MongoDB supports upto 64 indexes per collection
You won't need all of them
Design indexes as per your use case and requirement

There are advanced Indexes as well but a single and compound index are sufficient for most of th cases

