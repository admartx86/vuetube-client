import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import SignInPage from './components/SignInPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import UploadPage from './components/UploadPage.vue';
import VideoPage from './components/VideoPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/sign-in',
            name: 'Sign In',
            component: SignInPage
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage
        },
        {
            path: '/upload',
            name: 'Upload',
            component: UploadPage
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
