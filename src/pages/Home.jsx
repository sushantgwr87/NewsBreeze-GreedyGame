import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../assets/logo.svg"
import { BsBookmark, BsSaveFill } from "react-icons/bs"
import Card from '../components/Card'
import { getAllData, getSearchData, getFilterData } from "../actions/ApiCall"
import "../styles/Home.css"
import { MdSearch } from 'react-icons/md';
import { IoOptionsOutline } from 'react-icons/io5'
import useLocalStorage from '../customHooks/useLocalStorage'

const Home = () => {

	const [cardData, setCardData] = useLocalStorage("cardData", []);
	const [error, setError] = useState(false);

	const [showFilter, setShowFilter] = useState(false)

	const [filterData, setFilterData] = useState("all")

	const [searchValue, setSearchValue] = useState("")

	const handleChange = (e) => {
		setFilterData(e.target.value);
	}

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value)
	}

	useEffect(() => {
		const getSearch = async () => {
			const data = await getSearchData(searchValue);
			console.log(data)
			setError(data.error)
			if (!data.error)
				setCardData(data.data);
		}
		const getFilter = async () => {
			const data = await getFilterData(filterData);
			setError(data.error)
			if (!data.error)
				setCardData(data.data);
		}
		const getData = async () => {
			const data = await getAllData();
			setError(data.error)
			if (!data.error)
				setCardData(data.data);
		}

		if (searchValue !== "")
			getSearch();
		else if (filterData !== "all")
			getFilter()
		else {
			getData()
		}

	}, [filterData, searchValue])

	return (
		<div className='padded-page'>
			<div className="home-section-1">
				<div className="logo-image">
					<img src={Logo} alt="Logo" />
					<div className='page-btn'>
						<Link to="/saved-articles" className='hover-btn'>
							<BsSaveFill />
						</Link>
						<Link to="/bookmarked-articles" className='hover-btn'>
							<BsBookmark />
						</Link>
					</div>
				</div>
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
			<hr />
			{error ?
				<h2 className='error-text'>
					Fetch Error, Please Check Network
				</h2>
				:
				<div className='card-container'>
					{cardData && cardData.map((val, index) => (
						<Card post={val} key={index} />
					))}
				</div>
			}
		</div>
	)
}

export default Home