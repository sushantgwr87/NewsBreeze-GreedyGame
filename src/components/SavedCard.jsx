import "../styles/Card.css"

const SavedCard = ({ post }) => {

    const dateVal = new Date(post.publishedAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const articleDate = dateVal.toLocaleDateString('en-GB', options);

    return (
        <div className='card--saved'>
            <div className='card-image'>
                <img src={post.urlToImage} alt="" />
            </div>
            <div className='card-content'>
                <h4>{post.source.name}</h4>
                <h3>{post.title}</h3>
                <div className='saved--footer'>
                    <h6>{articleDate}</h6>
                    <p>{post.author}</p>
                </div>
            </div>
        </div>
    )
}

export default SavedCard