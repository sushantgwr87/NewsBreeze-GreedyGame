import { useState, useEffect } from 'react'
import { BsChevronLeft, BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
import "../styles/ReadArticle.css"
import { Link, useLocation } from 'react-router-dom'
import useLocalStorage from '../customHooks/useLocalStorage'

const ReadArticle = () => {

    const { state } = useLocation();

    const [bookmarkData, setBookmarkData] = useLocalStorage("bookmarkedArticles", [])
    const [saveCardData, setSaveCardData] = useLocalStorage("savedArticles", [])

    useEffect(() => {
        setBookmarkData(JSON.parse(localStorage.getItem("bookmarkedArticles")));
        setSaveCardData(JSON.parse(localStorage.getItem("savedArticles")));
    }, []);

    const [bookmark, setBookmark] = useState(false);
    const [saved, setSaved] = useState(false);

    console.log(bookmarkData)

    useEffect(() => {
        if (bookmarkData && saveCardData) {
            setBookmark(bookmarkData.some(val => val.title === state.title))
            setSaved(saveCardData.some(val => val.title === state.title))
        }
    }, [bookmarkData, saveCardData])

    const addBookmark = () => {
        const tempData = bookmarkData || [];
        tempData.push(state);
        setBookmarkData(tempData);
    }

    const addSave = () => {
        const tempData = saveCardData || [];
        tempData.push(state);
        setSaveCardData(tempData);
    }

    const handleSaveChange = () => {
        setSaved(!saved);
        if (saved) {
            setSaveCardData(saveCardData.filter(val => val.title !== state.title))
        }
        else
            addSave();
    }
    const handleBookmarkChange = () => {
        setBookmark(!bookmark);
        if (bookmark) {
            setBookmarkData(bookmarkData.filter(val => val.title !== state.title))
        }
        else
            addBookmark();
    }

    return (
        <div className='read-page'>
            <div className='read-header--wrap'>
                <img src={state.urlToImage} alt="read_image" />
                <div className='read-header--content--wrap'>
                    <div className="read-header--btn">
                        <Link to="/">
                            <BsChevronLeft />
                        </Link>
                        <button type='button' onClick={handleBookmarkChange}>
                            {bookmark ? <BsBookmarkFill className='read-icon--fill' /> : <BsBookmark className='read-icon' />}
                        </button>
                    </div>
                    <div className='read-header--content'>
                        <h4>{state.publishedAt}</h4>
                        <h1>{state.title}</h1>
                    </div>
                </div>
            </div>
            <div className="read-body">
                <div className='read-body--head'>
                    <div className='read-body--author'>
                        <MdAccountCircle />
                        <h3>{state.author}</h3>
                    </div>
                    <button onClick={handleSaveChange}>{saved ? "Saved" : "Save"}</button>
                </div>
                <p>{state.content}</p>
            </div>
        </div>
    )
}

export default ReadArticle