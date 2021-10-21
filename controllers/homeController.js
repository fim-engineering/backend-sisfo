exports.homeRoute = async (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                title: 'FIM RESTFul API',
                content: 'Koding untuk bangsaku!',
                by: 'FIM Engineering',
            }
        ]
    });
}


