const FeedInfoCard = () => {
    return (
        <aside className="feed-info-card">
            <p className="feed-info-label">A note from Pixly</p>
            <h2>What is live right now</h2>
            <ul>
                <li>Posts are shared globally.</li>
                <li>Posts cannot be deleted yet.</li>
                <li>Login and logout controls from the feed are coming soon.</li>
                <li>Following and followers will arrive later, while posts remain global.</li>
            </ul>
            <p className="feed-info-footer">
                Coming next: comments, bookmarks, sharing, profiles, personal
                collections, and mood tags for every moment.
            </p>
        </aside>
    );
};

export default FeedInfoCard;
