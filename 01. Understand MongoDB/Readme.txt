Understand MongoDB

1. Why MongoDB ?

* The RDBMS has been the industry standard for decades
* Enterprises have been using SQL based DBMS and organizing data into tables
* The relationship between tables was based upon keys to establish data models
* RDBMS can be very complex for relatively simple schemas
* When using RDBMS, the schema / table design becomes very complex
* It requires trained DB Admins to design / maintain them
* A small change to DB schema is an expensive update operation
* It requires skillful query designing, table joining even to get a fairly related data object

RELATIONAL DATABASES
-> They are powerful, flexible and constrained
-> They were designed for DB Admins

NoSQL DATABASES
-> The Document Model in DB more closely matches with Program / Code objects
-> These are designed for Developers


Querying a relational database involves complex, time consuming operations
to fetch a reasonable amount of related information


In MongoDB, the document is created dynamically
When making a request for document in Mongo, a document is included in the request
The passed document descibes the characteristics of the document that you want from the DB

No Join operations required

MongoDB is designed for Developers

It returns JSON : Easy for developers to parse
JavaScript Shell Commands
Excellent drivers and connectivity
Used by companies with extensive data challenges and needs



2. Document-oriented Data

MongoDB Document Structure

In a document database, objects are stored with all their related information included

- Documents are stored as JSON objects, they have all the related information within them
- Internally, it is stored as BSON (Binary JSON). We get JSON.
- It is easy to access all the related information when stored like this
- Searching and Sorting data using a particular value is easier
- Indexes can be created over different attributes in a collection object. Flexible indexing
- Working with JSON makes development easier

Example of Document Data

1. 
{
    "first_name" : "Jane",
    "last_name" : "Doe",
    "address" : "123 ABC Lane",
    "phone" : "001-002-0003"
}

2. Id in document returned by Mongo
{
    "_id" : ObjectId("234234gd234ewf234wef234"),
    "first_name" : "Jane",
    "last_name" : "Doe",
    "address" : "123 ABC Lane",
    "phone" : "001-002-0003"
}

If not specifiec, Mongo creates an Id for you



Querying in MongoDB

As objects are documents, the query parameters are documents as well

* Documents specify query parameters
* Queries match against the documents

> db.users.find( {first_name: "Jane"})
{
    "_id" : ObjectId("234234gd234ewf234wef234"),
    "first_name" : "Jane",
    "last_name" : "Doe",
    "address" : "123 ABC Lane",
    "phone" : "001-002-0003"
}

> db.users.remove( {first_name: "Jane"} )
WriteResult( { "nRemoved" : 1 } )
>

> db.users.find( {first_name: "Jane"})
>

It also supports update operations
update set operations

Embedded objects, i.e. nested values for a document
The query can be invoked on the nested values as well
What attributes are expected in return can also be specified in the query



3. Embed or Reference ?

MongoDB supports upto 100 levels of embedding
Rarely a scenario would require that many levels

Embedded Data
- They are easier to work with
- It minimizes coding operations
- It is easier to query and index

Include Reference
- It requires more work
- Requires careful insertion and access in appropriate collection
- Makes use of Reference Ids to access required items
- Aggregating data requires multiple operations and can be complex
 

4. Performance (Index, Sharding, Replication)

Indexing:
- Indexing provides performance improvements
- Ad hoc queries are expensive
  You can query MongoDB about anything withour prior setup of query structure
- Once the datasets grow, the adhoc queries suffer in performance
- For even simple data, indexing is a great help to boost performance
  To return one object, it has to through all available objects.
  Indexing cuts this down with help of lookups

- Indexing increases time for insert operation
- Indexes should be assigned as per need
- MongoDB supports 64 indices per collection
- Easiest index is to setup index on a single field
- Compound Index : is an index created using multiple fields to create the lookup table
- Compound index enables wider set of queries
- Unique is supported


Sharding:
- It is partitioning data onto different systems
- A subset of data is available on each of the systems
- Application software scalability can be achieved by running the app on multiple smaller machines rather than investing on larger ones
- MongoDB supports Autosharding
- It is challenging to setup Sharding
- Large scale databases can be sharded without large investments

Replication:
- The target is to have maximum uptime and tolerate outages
- It ensures the factor of reliability
- A primary server data is incharge backed by several backup servers which are exact copy of primary servers
- If a primary server fails, one of the secondary servers will be elevated as primary server
- Once the original primary is up and running, it will be added back as a secondary server
- Automatic failover