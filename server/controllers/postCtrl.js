module.exports = {
    getPosts: async(req, res) => {
        const {userPosts, search} = req.query
        const { userId } = req.params
        const db = req.app.get('db')
        const posts = await db.get_posts()
        const allUserPosts = await db.userPosts(userId)

        if (userPosts === 'false' && !search) {
            console.log('hit')
            return res.status(200).send(posts)
        }

        else if (userPosts === 'false' && search) {
        console.log('hit')
        const results = await db.contains_search_and_not_author(search)
        return res.status(200).send(results)

        }
        else if (userPosts && search) {
        console.log('hit')
        const results = await db.title_contains_search(search, userId)
        return res.status(200).send(results)
        }

        else {
        return res.status(200).send(allUserPosts)
        }
    },
    getAllPosts: async (req, res) => {
        const db = req.app.get('db')
        const allPosts = await db.get_posts()
            return res.status(200).send(allPosts)
    },
    selectPost: async (req, res) => {
      // console.log('hit')
        const { post_id } = req.params
      // console.log(post_id, 'post_id from params')
        const db = req.app.get('db')
        const singlePost = await db.get_single_post(post_id)
            return res.status(200).send(singlePost)
    },
    createPost: async (req, res) => {
        const { userId } = req.params
        const { title, image, content } = req.body
        const db = req.app.get('db')
        const newPost = await db.create_post(userId, title, content, image)
            return res.status(200).send(newPost)
    },
    deletePost: async (req, res) => {
        const { post_id } = req.params
        const db = req.app.get('db')
        const updatedPost = await db.delete_post(post_id)
            return res.status(200).send(updatedPost)
    }
}