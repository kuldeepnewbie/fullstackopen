const _ = require("lodash")
const dummy = (blogs)=>{
    return 1
}

const totalLikes = (blogs) =>{
    const reducer = (sum, item) => {
        return sum + item
    }
    const blogsLikes = blogs.map(blogs=>blogs.likes)
    return blogsLikes.reduce(reducer,0)
}

const favouriteBlogs = (blogs) =>{
    const blogsLikes = blogs.map(blog=>blog.likes)
    const largestIndex = blogsLikes.indexOf(Math.max(...blogsLikes))
    const largestInfo = blogs[largestIndex];
    return {
        title:largestInfo.title,
        author:largestInfo.author,
        likes:largestInfo.likes
    }
}

const mostBlogs = (blogs) => {
    const blogsAuthor = blogs.map(blogs => blogs.author)
    let mode =
        _.chain(blogsAuthor)
            .countBy()
            .entries()
            .maxBy(_.last)
            .thru(_.head)
            .value();

    let count = 0;

    blogsAuthor.forEach(element => {
        if (element === mode) {
            count += 1;
        }
    })
    return {
		author: mode,
		blogs: count,
	}
}

const mostLikes = (blogs) => {
    const likesByAuthor = {};
    for (let blog of blogs) {
        if (likesByAuthor[blog.author]) {
            likesByAuthor[blog.author] += blog.likes;
        } else {
            likesByAuthor[blog.author] = blog.likes;
        }
    }
    let mostLikes = 0;
    for (let item in likesByAuthor) {
        if (likesByAuthor[item] > mostLikes) {
            mostLikes = likesByAuthor[item];
        }
    }
    return mostLikes
}
module.exports = {dummy, totalLikes, favouriteBlogs, mostBlogs, mostLikes}