import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import VideoPage from './components/VideoPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/video/:videoId',
            name: 'video',
            component: VideoPage,
            props: true
        }
    ]
});

export default router;
