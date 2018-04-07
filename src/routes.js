import Authorization from './components/Authorization.vue';
import List from './components/List.vue';

export default [
    {
        path: '/',
        component: Authorization
    },
    {
        path: '/list',
        component: List
    }
];