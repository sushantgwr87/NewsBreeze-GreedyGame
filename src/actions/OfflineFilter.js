
export const sortDate = (cardData) => {
    return cardData.sort((a, b) => {
        return new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
    }).reverse();
}

export const sortPublication = (cardData) => {
    return cardData.sort((a, b) => b.source.name - a.source.name);
}

export const searchTitle = (cardData, searchValue) => {
    return cardData.filter(val => val.title.includes(searchValue));
}