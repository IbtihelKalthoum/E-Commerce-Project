/* http://localhost:5000/apiur

apiurl = parentroite(server.js) + childroute(router.js) */

export const apis = {
    users: {
        register: '/users',
        activate: '/users/activate/',
        login: '/users/login',
        forget: '/users/forgetpassword',
        reset: '/users/resetpassword/',
        logout: '/users/logout',
        uploadavatar: '/users/uploadavatar',
        getusers: '/users',
    }
    , categories: {
        create: '/categories',
        deletecat: '/categories/',
        all: '/categories',
    },
    products: {
        create: '/products',
        all: '/products',
        getone: '/products/',
        deleteone: '/products/',
        min: '/products/min',
        max: '/products/max',
        search: '/products/search'
    },
    orders: {
        create: '/orders',
        all: "/orders"
    }
}