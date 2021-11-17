const data = [
    {
        id: 1,
        name: "[천일]바베큐볶음밥 300g",
        image: "https://source.unsplash.com/random",
    },
    {
        id: 2,
        name: "[천일]치킨커리볶음밥 300g",
        image: "https://source.unsplash.com/random",
    },
];

export default {
    list(query) {
        return new Promise((res) => {
            setTimeout(() => {
                res(data);
            }, 200);
        });
    },
};
