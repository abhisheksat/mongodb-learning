Advanced Topics in MongoDB

1. Unique Indexes
- While working with databases, you may want to have a field(other than ID) to be unique
- To impose this constraint, we can use Unique Indexes
- You can create a _id by yourself or add unique constraint to a field
- To have a custom _id and obtain uniqueness through it
	* Have a field in you data as _id
	* This way that field will be added as id to your overall data
	* If there is any duplicate data for this field you will get duplicate error and that data will not be included while importing

- To add a uniqe constraint for any other field use below code
- createIndex method with the required field and set unique as true for that field
- This constraint will check for that field duplicate entries. When a duplicate entry is encountered it will be skipped an error will be displayed

> db.tours.createIndex({"tourName":1},{unique:true})


2. Tune Mongo Queries
- We can customize the output of the query
- We can write queries to get specific fields, limit them, skip a few, sort them, make it pretty to read and much more

Queries and Working

1.
> db.tours.find()
- Returns all the records in tours collection

2. Projections : Which specific fields would you like to retrieve from the documents
> db.tours.find({}, {tourName:1})
- It will return all records and have _id and tourName fields only

3. Now, we want to exclude the _id field. We need explicitly specify that
> db.tours.find({}, {tourName:1, _id:0})
- Data returned with only tourName

4. We need multiple fields now
> db.tours.find({}, {tourName:1,tourPrice:1,tourLength:1,_id:0})
- We get all records with tourName, tourPrice and tourLength fields being returned only

5. The output look a bit messy, lets make it readable
> db.tours.find({}, {tourName:1,tourPrice:1,tourLength:1,_id:0}).pretty()
- Output visible in readable form

6. Now lets sort the records by price. Descending order of price. Highest first
   tourPrice:-1 | -1 for descending order
> db.tours.find({}, {tourName:1,tourPrice:1,tourLength:1,_id:0}).pretty().sort({tourPrice:-1})

7. We can limit the number of documents that are being returned by the query
> db.tours.find({}, {tourName:1,tourPrice:1,tourLength:1,_id:0}).pretty().sort({tourPrice:-1}).limit(1)
- Only one of the available record(s) according to the given query criteria will be returned

8. If you wish to implement paging, we have skip available for us
> db.tours.find({}, {tourName:1,tourPrice:1,tourLength:1,_id:0}).pretty().sort({tourPrice:-1}).limit(1).skip(20)
- Only one of the available record(s) will be returned after skipping first 20 available after applying given conditions

9. If you have an array as a property in the document, and you want to match with on of entries of the array, MongoDB supports it and carries the operation gracefully for us
> db.tours.find({"tourTags":"boating"})
- All records that have boating in the tourTags array of the data in the tours collection will be returned

10. We can get data that is between a range of values for a specific parameter
> db.tours.find({tourPrice:{$lte:1000,$gte:800}}).pretty()
- Records with tourPrice less than equal to 1000 and greater than equal to 800 will be returned and displayed in pretty/readable format



3. Text Indexes
- When we need to search the available text in a field, Text Indexes come in handy
- These are pretty expensive operations on they system but they come in handy for use cases
- We can then search strings in the document and use regular expressions
- A collection can have only one text index. It can contain multiple fields but can only be one textIndex
- Choose this combination wisely to enable optimal searching experience for the users

> db.tours.createIndex({tourDescription:"text",tourBlurb:"text"})
- This creates a textIndex using the given two fields tourDescription,tourBlurb
- If we search for a string, it will be searched for in the above two fields

> db.tours.find({$text:{$search:"wine"}}).pretty()
- It will search for the text wine in tourDescription and tourBlurb fields of available documents and return them in pretty format when found

*** BONUS ***
In MongoDB, every search has a relevance score. We can leverage the relevance score and sort the text search result with the available score
We can then sort the records with most relevant record first
The Mongo engine performs this complex/powerful operation for us

> db.tours.find({$text:{$search:"wine"}}, {score:{$meta:"textScore"}}).pretty()
- This will give the relevance score for the search 'wine' in textIndex tourDescription and tourBlurb

Now, lets sort the data with respect to this score
> db.tours.find({$text:{$search:"wine"}}, {score:{$meta:"textScore"}}).pretty().sort({score: {$meta: "textScore"}})
- Now this will present the data in descending order of the relevance score

Let us fetch only the required fields from the document data
> db.tours.find({$text:{$search:"wine"}}, {score:{$meta:"textScore"}, tourName:1,_id:0}).pretty().sort({score: {$meta: "textScore"}})
- This will only gives us the data with corresponding tourName field

*** ***

Using Regular Expression

- Using RegEx to find a particular string in the available textIndex is another resource intensive way
- You can use the $regex on the fields that are part of the textIndex

> db.tours.find({tourDescription:{$regex:/backpack/}}, {tourName:1,_id:0})
- The above will search for case-sensitive 'backpack' in tourDescription

Lets add a case-insensitive flag, if there are entries with Backpack
> db.tours.find({tourDescription:{$regex:/backpack/i}}, {tourName:1,_id:0})

An equivalent statement is
> db.tours.find({tourDescription:/backpack/i}, {tourName:1,_id:0})

Though the textIndex operations are resoucrce intensive, we can use them to search through text fields


4. Model Your Schema
- Modeling can help the code understand the models that stored in the database
- The library Mongoose, interacts with a model-drive interface
- It required effort to bring modeling in Mongo
- It helps to make the queries as efficient as possible
- Modeling is also important to be in sync with client requirements

- Example, there are two collections. Movies and People
- Movies have people worked in it and people have list of movies they have worked in
- In RDBMS, to get the movies with the corresponding actors calls for a Join operation

- Here, we shall achieve it programatically by processing the movies and people collections, building that object using required queries and code

The _id in people is actor/people full name
The _id in movies in Movie name

> db.people.findOne({_id:"Brad Pitt"})
- This would return the details for Brad Pitt

> db.movies.findOne({_id:"Fight Club"})
- This would return the details for movie Fight Club
- The movie data does not have the people who acted in it
- We need to built it ourselves, lets say as a client requirement

As we know, we can query an array element of a document
Let us query by a movie name on people to get a list of people who have that movie as acted in

> db.people.find({movies:"The Avengers"})

> var moviename="The Avengers"
> var movieObj=db.movies.findOne({_id:moviename})
> movieObj.cast=[]
> var personArray = db.people.find({movies:moviename})
> personArray.forEach(function(person) {
... movieObj.cast.push(person)
... })

> movieObj


5. Aggregation
- We retrieved the data and returned it, whether be an entire record document or with limited fields
- Lets try aggregate functions now

> db.tours.count({tourPackage:"Cycle California"})
- Gives count of tours in package with name Cycle California

Now, lets find number of tours in each package using aggregation

> db.tours.aggregate([{$group: {_id: '$tourPackage', count:{$sum:1}}}]) 

Now, we shall find how many tours every organizer is having
> db.tours.aggregate([{$group: {_id: '$tourOrganizer.organizerName', count:{$sum:1}}}]) 


We are using average function to get average price of tours under a package, for all packages at once
> db.tours.aggregate([{$group: {_id: '$tourPackage', average: {$avg: '$tourPrice'}, count:{$sum:1}}}])

We can put output of a query into a new category
> db.tours.aggregate([{$group: {_id: '$tourPackage', average: {$avg: '$tourPrice'}, count:{$sum:1}}}, {$out:'prices'}])

and to retrieve using the newly created category
> db.prices.find()


6. Replication and Sharding
- To improve scalability of the MongoDB, we have these two strategies

1. REPLICATION
* These are full copies of the dataset
* They have primary and secondary servers with automatic failover capabilities
* This is useful to achieve maximum uptime and tolerate outages

2. SHARDING
* The dataset is split up and hosted on multiple smaller servers
* You can then use smaller systems and collaborate to host an extensive database
* This is server farm friendly approach
* This achieves scalability and performance
