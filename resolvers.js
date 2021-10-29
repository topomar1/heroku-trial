const { ApolloServer, gql } = require('apollo-server');
const BlogDB = require('./mongooseSchema');
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');


const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const resolvers = {
    Query: {
        blogs: (parent, args, context, info) => {



            client.connect()

            const collection = client.db("test").collection("blogs");

            results = collection.find({}).toArray()


            return results


        }
    },

    Mutation: {

        createBlog(parent, args, context, info) {

            const { title, content, authorName, authorEmailAddress } = args

            uid = uuidv4()

            const blogObj = {
                blogId: uid,
                title,
                content,
                author: {
                    authorName,
                    authorEmailAddress
                },
                likes: 0,
                unlikes: 0,
                comment: []
            }

            client.connect()
            const collection = client.db("test").collection("blogs");

            collection.insertOne(blogObj)

            return blogObj


        },

        modifyBlog(parent, args, context, info) {

            const { blogId, title, content } = args

            client.connect()
            const collection = client.db("test").collection("blogs");

            filter = { blogId: blogId }

            if (title !== undefined) {

                const updateDoc = {
                    $set: {
                        title: title
                    },
                };


                results = collection.updateOne(filter, updateDoc)


            }

            if (body !== undefined) {

                const updateDoc = {
                    $set: {
                        content: content
                    },
                };


                results = collection.updateOne(filter, updateDoc)

            }

            return collection.findOne({ blogId: blogId })

        },

        deleteBlog(parents, args, context, info) {
            const { blogId } = args

            const doc = {
                blogId: blogId
            }

            client.connect()
            const collection = client.db("test").collection("blogs");
            try {
                deleteResults = collection.deleteOne(doc)
                return "Blog deleted"
            } catch (e) {
                return `Error!!!, error ${e}`
            }

        },

        likeBlog(parent, args, context, info) {
            const { blogId } = args

            client.connect()
            const collection = client.db("test").collection("blogs");

            filter = { blogId: blogId }


            const updateDoc = {
                $inc: {
                    likes: 1
                },
            };


            results = collection.updateOne(filter, updateDoc)


            return collection.findOne(filter)



        },

        unlikeBlog(parent, args, context, info) {

            const { blogId } = args

            client.connect()
            const collection = client.db("test").collection("blogs");

            filter = { blogId: blogId }

        


            const updateDoc = {
                $inc: {
                    unlikes: 1
                },
            };


            results = collection.updateOne(filter, updateDoc)


            return collection.findOne(filter)


        },

        addComment(parent, args, context, info) {

            const { blogId, comment, authorName, authorEmailAddress } = args

            client.connect()
            const collection = client.db("test").collection("blogs");

            filter = { blogId: blogId }

            uid = uuidv4();

            commentObj = {
                commentID: uid,
                comment: comment,
                author: {
                    authorName,
                    authorEmailAddress
                }
            }


            const updateDoc = {
                $push: {
                    comments: {
                        $each: [commentObj]
                    }
                },
            };


            results = collection.updateOne(filter, updateDoc)


            return collection.findOne(filter)


        },

        deleteComment(parent, args, context, info) {
            const { commentID } = args

            const doc = {
                commentID: commentID
            }

            client.connect()
            const collection = client.db("test").collection("blogs");
            try {
                deleteResults = collection.deleteOne(doc)
                return "Comment deleted successfully"
            } catch (e) {
                return `Something went wrong, error ${e}`
            }
        }



    }


}


module.exports = resolvers;