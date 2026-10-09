const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");

const { ImageKit, toFile } = require("@imagekit/nodejs");

const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function createPostController(req, res) {
    console.log(req.body, req.file);
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts",
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id,
    });

    res.status(201).json({
        message: "Post created successfully",
        post,
    });
}

async function getPostController(req, res) {
    const userId = req.user.id;

    const posts = await postModel.find({
        user: userId,
    });

    res.status(200).json({
        message: "Posts fetched successfully",
        posts,
    });
}

async function getPostDetailsController(req, res) {
    const userid = req.user.id;
    const postid = req.params.postid;

    const post = await postModel.findById(postid);

    if (!post) {
        return res.status(404).json({
            message: "Post not found.",
        });
    }

    const isValidUser = post.user.toString() === userid;

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content",
        });
    }

    return res.status(200).json({
        message: "Post fetched successfully",
        post,
    });
}

async function likePostController(req, res) {
    const username = req.user.username;
    const postid = req.params.postid;

    const post = await postModel.findById(postid);

    if (!post) {
        return res.status(404).json({
            message: "Post not found.",
        });
    }

    const like = await likeModel.create({
        post: postid,
        user: username,
    });

    res.status(201).json({
        message: "Post liked successfully",
        like,
    });
}

async function unLikePostController(req, res){
    const {postid} = req.params
    const username = req.user.username

    const isLiked = await likeModel.findOne({
        post: postid,
        user: username
    })

    if(!isLiked){
        return res.status(400).json({
            message: "Post isn't liked"
        })
    }

    await likeModel.findOneAndDelete({_id: isLiked._id})

    return res.status(200).json({
        message: "Post unliked successfully"
    })
}

async function getFeedController(req, res) {
    const posts = await postModel.find({}).populate("user", "username profileImage").lean()

    const postIds = posts.map((p)=> p._id)

    const likes = await likeModel.find({user: req.user.username, post: {$in: postIds}}).select("post").lean()

    const likedIds = new Set(likes.map((l)=> l.post.toString()))

    const feed = posts.map((p)=>({
        ...p, 
        isLiked: likedIds.has(p._id.toString()),
    }))

    res.status(200).json({
        message: "Posts fetched successfully",
        posts: feed,
    });
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    unLikePostController,
    getFeedController,
};
