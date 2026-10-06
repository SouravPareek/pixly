import React, { useEffect } from "react";
import "../styles/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import Nav from "../../shared/components/Nav";
import { useNavigate } from "react-router-dom";
import FeedInfoCard from "../components/FeedInfoCard";
import "../styles/feed-info-card.scss";


const Feed = () => {
    const navigate = useNavigate();
    const { feed, handleGetFeed, loading, handleLike, handleUnLike } =
        usePost();

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                await handleGetFeed();
            } catch {
                navigate("/login");
            }
        };

        fetchFeed();
    }, [handleGetFeed, navigate]);

    if (loading) {
        return (
            <main>
                <h1>Feed is loading...</h1>
            </main>
        );
    }

    if (!feed) {
        return (
            <main>
                <h1>Please login to see feed</h1>
            </main>
        );
    }

    return (
        <main className="feed-page">
            <Nav />
            <section className="feed-header">
                <p className="eyebrow">Feed</p>
                <h1>Your latest posts</h1>
                <p className="subtext">A quiet stream of new posts, likes, and updates.</p>
            </section>
            <div className="feed-content">
                <FeedInfoCard />
                <div className="feed">
                    <div className="posts">
                        {feed.map((post) => {
                            return (
                                <Post
                                    key={post._id}
                                    user={post.user}
                                    post={post}
                                    handleLike={handleLike}
                                    handleUnlike={handleUnLike}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Feed;
