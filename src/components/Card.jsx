import { useState, useEffect } from 'react'
import "../styles/Card.css"
import { Link, useLocation } from 'react-router-dom'
import { BsBookmark, BsBookmarkFill } from "react-icons/bs"
import useLocalStorage from '../customHooks/useLocalStorage'

const Card = ({ post }) => {

    const [bookmark, setBookmark] = useState(false);
    const [save, setSave] = useState(false);
    const { location } = useLocation();

    const [bookmarkData, setBookmarkData] = useLocalStorage("bookmarkedArticles", [])
    const [saveCardData, setSaveCardData] = useLocalStorage("savedArticles", [])

    const dateVal = new Date(post.publishedAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const articleDate = dateVal.toLocaleDateString('en-GB', options);

    useEffect(() => {
        setBookmarkData(JSON.parse(localStorage.getItem("bookmarkedArticles")));
        setSaveCardData(JSON.parse(localStorage.getItem("savedArticles")));
    }, [location]);

    useEffect(() => {
        if (bookmarkData && saveCardData) {
            setBookmark(bookmarkData.some(val => val.title === post.title))
            setSave(saveCardData.some(val => val.title === post.title))
        }
        
    }, [bookmarkData, saveCardData])

    const addBookmark = () => {
        const tempData = bookmarkData || [];
        tempData.push(post);
        setBookmarkData(tempData);
    }

    const addSave = () => {
        const tempData = saveCardData || [];
        tempData.push(post);
        setSaveCardData(tempData);
    }

    const handleSaveChange = () => {
        setSave(!save);
        if (save) {
            setSaveCardData(saveCardData.filter(val => val.title !== post.title))
        }
        else
            addSave();
    }
    const handleBookmarkChange = () => {
        setBookmark(!bookmark);
        if (bookmark) {
            setBookmarkData(bookmarkData.filter(val => val.title !== post.title))
        }
        else
            addBookmark();
    }

    return (
        <div className='card'>
            <div className='card-image'>
                <Link to="/read-article" state={post}>
                    <img src={post.urlToImage} alt="Card_Image" />
                </Link>
                <button type='button' className={bookmark ? "bookmarked" : "default"} onClick={handleBookmarkChange}>
                    {bookmark ? <BsBookmarkFill className='bookmark-icon' /> : <BsBookmark className='bookmark-icon--fill' />}
                </button>
            </div>
            <div className='card-content'>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <h6>{articleDate}</h6>
            </div>
            <div className='card-footer--btn'>
                <Link to="/read-article" state={post} className='hover-btn'>Read</Link>
                <button type='button' onClick={handleSaveChange} className='hover-btn'>{save ? "Saved" : "Save"}</button>
            </div>
        </div>
    )
}

export default Card