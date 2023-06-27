const refs = {
    MAIN_URL: 'https://pixabay.com/api/',
    API_KEY: '37838198-1a117cc0732e6b102a4c5cb6d',
    IMAGE_TYPE: 'photo',
    ORIENTATION: 'horizontal',
    SAFESEARCH: 'true',
};

//const PAGINATION_CONFIG = {
    //page: 1,
    //per_page: 40,
//};

export default class ImageApiService { 
    constructor() { 
        this.queryValue = '';
        this.page = 1;
        this.per_page = 40;
        this.total_hits = 0;
    }

    fetchArticles() { 
        return fetch(`${refs.MAIN_URL}?key=${refs.API_KEY}&q=${this.queryValue}&image_type=${refs.IMAGE_TYPE}&orientation=${refs.ORIENTATION}&safesearch=${refs.SAFESEARCH}&page=${this.page}&per_page=${this.per_page}`)
        .then(response => { 
        if (!response.ok) { 
            throw new Error(response.status);
        }
        return response.json();
        })
            .then(data => {
                this.total_hits = data.totalHits;
                this.page += 1;
                return data.hits;
            }
                )
        .catch(console.warn);
    }

    resetPage() {
        this.total_hits = 0;
        this.page = 1;
    }
    get query() { 
    return this.queryValue;
    }

    set query(newQuery) { 
    this.queryValue = newQuery;
    }
}

