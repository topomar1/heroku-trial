const { gql } = require('apollo-server');


const typeDefs = gql`
scalar Date

type Blog{
        blogId: ID!
        title: String!
        content: String!
        author: Author!
        comments: [Comment]
        likes: Int
        unlikes: Int


    }

    type Author{
        authorName: String!
        authorEmailAddress: String!
    }

    type Comment{
        commentID: ID!,
        comment: String
    }

    type ReplyComment{
        id: ID!,
        reply: String!
    }

    type Query{
        blogs: [Blog!]!,
        blog(title:String!): Blog

    }

    type Mutation{
        createBlog(title: String!, content: String!, authorName:String!, authorEmailAddress:String!):Blog,
        deleteBlog(blogId:ID!):String,
        modifyBlog(blogId:ID!, title: String, content: String):Blog,
        likeBlog(blogId:ID!):Blog,
        unlikeBlog(blogId:ID!):Blog,
        addComment(blogId:ID!, comment:String):Blog,
        deleteComment(commentID:ID!):String, 
    }

`


createBlog: (parent,args) => {
    const{id, title,content,author,comment} = args;
    const blog = {id, title, content, author, comment};
    blogs.push(blog)
    return blog;
},

module.exports = typeDefs;