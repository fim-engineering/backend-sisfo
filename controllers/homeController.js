exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{title:'IPB Book Store', content: 'This is my javascript response'}]
    });
};

