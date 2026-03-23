import {createRouter, createWebHistory} from "vue-router"

import Home from "../pages/Home.vue"
import LoginUser from "../pages/LoginUser.vue"
import RegisterUser from "../pages/RegisterUser.vue"
import MyUserProfile from "../pages/MyUserProfile.vue"
import Logout from "../pages/Logout.vue"
import LoginProf from "../pages/LoginProf.vue"
import ProfessionalPage from "../pages/ProfessionalPage.vue"
import MyProfessionalProfile from "../pages/MyProfessionalProfile.vue"
import UploadImage from "../pages/UploadImage.vue"
import RegisterProfessional from "../pages/RegisterProfessional.vue"
import Blogs from "../pages/Blogs.vue";


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [

		{
			path : "/",
			name: "home",
			component: Home
		},
		{
			path : "/register-user",
			name: "RegisterUser",
			component: RegisterUser
		},
		{
			path: "/my-userprofile",
			name: "MyUserProfile",
			component: MyUserProfile
		},
		{
			path : "/login-user",
			name: "LoginUser",
			component: LoginUser
		},
		{
			path : "/logout",
			name: "logout",
			component: Logout
		},
		{
			path : "/login-prof",
			name: "LoginProf",
			component: LoginProf
		},

		{
			path : "/professionals",
			name: "ProfessionalPage",
			component: ProfessionalPage
		},
		{
			path : "/myprofessionalprofile/:profileId",
			name: "MyProfessionalProfile",
			component: MyProfessionalProfile
		},
	
		{
			path : "/upload-image/:profileId",
			name: "uploadImage",
			component: UploadImage
		},
		{
			path : "/register-professional",
			name: "registerProfessional",
			component: RegisterProfessional
		},
		{
			path : "/blogs",
			name: "Blogs",
			component: Blogs
		},
		
		
		
		
	

	]
})

export default router