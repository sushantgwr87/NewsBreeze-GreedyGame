
# Greedy Games Assignment

A web app to fetch and display news from a [News API](https://newsapi.org/) with search and sort features. It is made using React.js and CSS.

#### **Note:** This API does not work on hosted urls for free that's why I couldn't provide any Heroku or Netlify hosted link. For Details check [Netlify FAQ](https://answers.netlify.com/t/getting-error-426-from-newsapi-org/16101/8).

## Development

Design Details and instruction were shared before which I followed to the most. This website is designed specifically for mobile devices only.

### Project File Details

#### Home page
Design for Home Page of website. It fetches an array of data from given api and renders them using map and card component.

#### Card Component
This component is card design for Home page of web app. It takes one parameter which is card data from home page.

#### Bookmark and Saved Page
Both page have same design and render only bookmarked as well as saved articles respectively on their page. They both have offline search and sort filters.

#### Read Article Page
This Page shows complete article content of an specific article. **Note** Due to only limited free-access to local, only base content is fetched. 
## Features

- Search option
- Sorting Data by date and publication source
- Cross platform
- Caching Data for offline using Local Storage.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_BACKEND_URL` = https://newsapi.org/v2/everything?apiKey=(Your-API-Key)

You can get your own free/only local running API key from Joining [News API](https://newsapi.org/).


## Run Locally

Clone the project

```bash
  git clone https://github.com/sushantgwr87/NewsBreeze-GreedyGame
```

Go to the project directory

```bash
  cd NewsBreeze-GreedyGame
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Screenshots

![App Screenshot](https://github.com/sushantgwr87/NewsBreeze-GreedyGame/blob/main/public/screenshots/home.png)
![App Screenshot](https://github.com/sushantgwr87/NewsBreeze-GreedyGame/blob/main/public/screenshots/bookmark.png)
![App Screenshot](https://github.com/sushantgwr87/NewsBreeze-GreedyGame/blob/main/public/screenshots/home-filter.png)
![App Screenshot](https://github.com/sushantgwr87/NewsBreeze-GreedyGame/blob/main/public/screenshots/saved.png)
![App Screenshot](https://github.com/sushantgwr87/NewsBreeze-GreedyGame/blob/main/public/screenshots/read-page.png)
