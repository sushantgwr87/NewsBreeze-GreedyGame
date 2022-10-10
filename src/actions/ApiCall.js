import axios from "axios"

const domainURL = process.env.REACT_APP_BACKEND_URL;

export const getAllData = async () => {
    try {
        const response = await axios.get(`${domainURL}&q=apple&sortBy=relevancy`);
        console.log(response)
        return { data: response.data.articles, error: false };
    } catch (error) {
        console.error(error)
        return { error: true };
    }
}

export const getFilterData = async (filterData) => {
    try {
        let url = filterData === "date" ? (`${domainURL}&q=apple&sortBy=publishedAt`) : (filterData === "publication" ? (`${domainURL}&q=apple&sortBy=popularity`) : (`${domainURL}&q=apple&sortBy=relevancy`))
        const response = await axios.get(url);
        console.log(response)
        return { data: response.data.articles, error: false };
    } catch (error) {
        console.error(error)
        return { error: true };
    }
}

export const getSearchData = async (searchValue) => {
    try {
        const response = await axios.get(`${domainURL}&q=${searchValue}&searchIn=title`);
        console.log(response)
        return { data: response.data.articles, error: false };
    } catch (error) {
        console.error(error)
        return { error: true };
    }
}