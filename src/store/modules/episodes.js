const getDefaultState = () => {
    return {
        loading: false,
        filtered: false,
        post: {},
        image: {},
        category: {
            name: null
        },
        color: null,
        posts: [],
        categories: [],
        colors: [
            {4: '#899499'}, // episodes
            {10: '#008BE2'}, // artistes
            {26: '#2ca88b'}, // cinéma
            {15: '#846700'}, // courant musical
            {9: '#E09900'}, // Découvertes
            {7: '#0C71C3'}, // Instruments
            {17: '#8300E9'}, // Labels
            {8: '#FFE121'}, // Live
            {12: '#1d8920'}, // Thème
            {11: '#af3832'}, // Vintage
            {16: '#d650d0'} // Voyages
        ],
        lastPostByCategories: [],
        postsByCategories: []
    };
};
export default {
    namespaced: true,
    state: getDefaultState(),
    mutations: {},
    actions: {
        async getRss() {
            // const urlRegex = /(http|ftp|https)://[\w-]+(.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/;
            // if (!urlRegex.test(this.rssUrl)) {
            //     return;
            // }
            const res = await fetch(`https://anchor.fm/s/c1f8cfc/podcast/rss`)
                .then(response => response.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                .then(data => {
                    // console.log(data)
                    const items = data.querySelectorAll("item");
                    console.log(items)

                    let episodes = [...items].map((el) => {
                        return {
                            title: el.querySelector("title").innerHTML,
                            description: el.querySelector("description").innerHTML,
                            link: el.querySelector("link").innerHTML,
                            pubDate: el.querySelector("pubDate").innerHTML,
                            enclosure: el.querySelector("enclosure").innerHTML,
                        }
                    });
                    console.log(episodes);
                })
            console.log(res);
            // const { contents } = await res.json();
            // const feed = new window.DOMParser().parseFromString(contents, "text/xml");
            // const items = feed.querySelectorAll("item");
            // let episodes = [...items].map((el) => ({
            //     link: el.querySelector("link").innerHTML,
            //     title: el.querySelector("title").innerHTML,
            //     author: el.querySelector("author").innerHTML,
            // }));
            // console.log(episodes);
        },
    },
}