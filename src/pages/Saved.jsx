import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsChevronLeft } from 'react-icons/bs'
import { MdSearch } from 'react-icons/md';
import { IoOptionsOutline } from 'react-icons/io5'
import useLocalStorage from '../customHooks/useLocalStorage'
import SavedCard from '../components/SavedCard';
import "../styles/BookmarkSaved.css"
import { sortDate, sortPublication, searchTitle } from '../actions/OfflineFilter';

const Saved = () => {

    const [cardData, setCardData] = useLocalStorage("savedArticles", []);
    const [originalData, setOriginalData] = useState([]);

    useEffect(() => {
        setCardData(JSON.parse(localStorage.getItem("savedArticles")));
        setOriginalData(JSON.parse(localStorage.getItem("savedArticles")));
    },[]);

    const [showFilter, setShowFilter] = useState(false)

    const [showLength, setShowLength] = useState(7)

    const [filterData, setFilterData] = useState("all")

    const [searchValue, setSearchValue] = useState("")

    const handleChange = (e) => {
        setFilterData(e.target.value);
        if (e.target.value === "all")
            setCardData(originalData);
        else if (e.target.value === "date")
            setCardData(sortDate(cardData))
        else if (e.target.value === "publication")
            setCardData(sortPublication(cardData))
    }

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
        setCardData(searchTitle(cardData, e.target.value));
    }

    return (
        <div className='bookmark-page padded-page'>
            <div className='bookmark-header'>
                <Link to="/">
                    <BsChevronLeft />
                </Link>
                <h1>Saved</h1>
            </div>
            <div className="search-wrap">
                <div className='search'>
                    <button>
                        <MdSearch className='icon' />
                    </button>
                    <input type="text" onChange={handleSearchChange} value={searchValue} placeholder='Search Title' />
                    <button onClick={() => setShowFilter(!showFilter)}>
                        <IoOptionsOutline className='icon' />
                    </button>
                </div>
                <div className={`filter-menu ${showFilter && "show"}`}>
                    <div className='filter-input'>
                        <input onChange={handleChange} type="radio" name="all" id="filter" checked={filterData === "all"} value="all" />
                        <label htmlFor="all">All</label>
                    </div>
                    <div className='filter-input'>
                        <input onChange={handleChange} type="radio" name="publication" id="filter" checked={filterData === "publication"} value="publication" />
                        <label htmlFor="publication">Popularity(Publication)</label>
                    </div>
                    <div className='filter-input'>
                        <input onChange={handleChange} type="radio" name="date" id="filter" checked={filterData === "date"} value="date" />
                        <label htmlFor="date">Recent articles(Date)</label>
                    </div>
                </div>
            </div>
            <div className='bookmark-body--title'>
                <h2>Today</h2>
                <button onClick={() => setShowLength(showLength === 7 ? cardData.length : 7)}>{showLength === 7 ? "See all..." : "See Less..."}</button>
            </div>
            <div className='card-container link-cards'>
                {cardData && cardData.map((val, index) => (
                    <Link to="/read-article" state={val} key={index}>
                        <SavedCard post={val} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Saved