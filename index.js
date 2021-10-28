
const {ApolloServer, gql} = require("apollo-server");

const blogs = [
    {
        id:32,
        title: "new blog",
        content: "adaCreate a Blog post server using graphql and nodejs",
        author:{id:12,name:"dave",email:"dave12@gmail.com"},
        comment:[{id:300, comment:"adasdasdasd"}]

    },
    {
        id:01,
        title: "new blog1",
        content: "adaCreate ost server using graphql and nodejs",
        author:{id:12,name:"chris",email:"crhsda@gmail.com"},
        comment:[{id:300, comment:"123123das"}]

    },
    {
        id:32,
        title: "new blog",
        content: "adaCreate a Blog post server using graphql and nodejs",
        author:{id:12,name:"dave",email:"dave12@gmail.com"},
        comment:[{id:300, comment:"adasdasdasd"}]

    },
]


const schemas = gql `
    type Blog{
        id: ID!
        title: String!
        content: String!
        author: Author!
        comment: [Comment]


    }

    type Author{
        id: ID!,
        name: String!
        emailAddress: String!
    }

    type Comment{
        id: ID!,
        comment: String
    }

    type ReplyComment{
        id: ID!,
        reply: String!
    }

    type Query{
        blogs: [Blog],
        blog(title:String!): Blog

    }

    type Mutation{
        createBlog(title: String!, content: String!):Blog,
        deleteBlog(id: ID!):String,
        deleteComment(id: ID!):String, 
        modifyBlog(id: ID!):Blog,

    }

`


const blogResolvers = {
    Query: {

        blogs: () => {
            return blogs;
        }
    },
    Mutation: {
        createBlog: (parent,args) => {
            const{id, title,content,author,comment} = args;
            const blog = {id, title, content, author, comment};
            blogs.push(blog)
            return blog;
        },
        deleteBlog: () => {},
        modifyBlog: () => {},
        deleteComment: () => {},
    }
}

const server = new ApolloServer({typeDefs: schemas, resolvers: blogResolvers})

server.listen().then(({url}) => {console.log(`Server running on ${url}`)})