import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

import Home from "../pages/Home.vue";

// Users
import RegisterUser from "../pages/users/RegisterUser.vue";
import LoginUser from "../pages/users/LoginUser.vue";
import DetailsUser from "../pages/users/DetailsUser.vue";
import SpecificUser from "../pages/users/SpecificUser.vue";
import EditUser from "../pages/users/EditUser.vue";
import AllUsers from "../pages/users/AllUsers.vue";
import ArchivedUser from "../pages/users/ArchivedUser.vue";
import ActivateUser from "../pages/users/ActivateUser.vue";
import DeleteUser from "../pages/users/DeleteUser.vue";
import LogoutUser from "../pages/users/LogoutUser.vue";
import ForgotPasswordUser from "../pages/users/ForgotPasswordUser.vue";
import ResetPasswordUser from "../pages/users/ResetPasswordUser.vue";

// Designers
  /*
    import LoginProf from "../pages/LoginProf.vue";
    import ProfessionalPage from "../pages/ProfessionalPage.vue";
    import MyProfessionalProfile from "../pages/MyProfessionalProfile.vue";
    import RegisterProfessional from "../pages/RegisterProfessional.vue";
  */

  import UploadImage from "../pages/UploadImage.vue";
  import Blogs from "../pages/Blogs.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },

// Users
    {
      path: "/register-user",
      name: "register-user",
      component: RegisterUser
    },
    {
      path: "/login-user",
      name: "login-user",
      component: LoginUser
    },
    {
      path: "/details-user",
      name: "details-user",
      component: DetailsUser,
      meta: { requiresAuth: true, userType: "user" }
    },
    {
      path: "/specific-user/:userId",
      name: "specific-user",
      component: SpecificUser
    },
    {
      path: "/edit-user",
      name: "edit-user",
      component: EditUser,
      meta: { requiresAuth: true, userType: "user" }
    },
    {
      path: "/all-users",
      name: "all-users",
      component: AllUsers,
      meta: { requiresAuth: true, userType: "user", adminOnly: true }
    },
    {
      path: "/archived-user/:userId",
      name: "archived-user",
      component: ArchivedUser,
      meta: { requiresAuth: true, userType: "user", adminOnly: true }
    },
    {
      path: "/activate-user/:userId",
      name: "activate-user",
      component: ActivateUser,
      meta: { requiresAuth: true, userType: "user", adminOnly: true }
    },
    {
      path: "/delete-user/:userId",
      name: "delete-user",
      component: DeleteUser,
      meta: { requiresAuth: true, userType: "user", adminOnly: true }
    },
    {
      path: "/logout-user",
      name: "logout-user",
      component: LogoutUser
    },

    {
      path: "/forgot-password-user",
      name: "forgot-password-user",
      component: ForgotPasswordUser
    },
    {
      path: "/reset-password-user/:token",
      name: "reset-password-user",
      component: ResetPasswordUser
    },

// Designers
  /*
    {
      path: "/login-prof",
      name: "LoginProf",
      component: LoginProf
    },
    {
      path: "/register-professional",
      name: "registerProfessional",
      component: RegisterProfessional
    },
    {
      path: "/professionals",
      name: "ProfessionalPage",
      component: ProfessionalPage
    },
    {
      path: "/myprofessionalprofile/:profileId",
      name: "MyProfessionalProfile",
      component: MyProfessionalProfile,
      meta: { requiresAuth: true, userType: "professional" }
    },
  */

// Images
    {
      path: "/upload-image/:profileId",
      name: "uploadImage",
      component: UploadImage,
      meta: { requiresAuth: true, userType: "professional" }
    },

// Blogs  
    {
      path: "/blogs",
      name: "Blogs",
      component: Blogs
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.bootstrapped) {
    await userStore.bootstrapAuth();
  }

  const requiresAuth = to.meta.requiresAuth;
  const requiredUserType = to.meta.userType;
  const adminOnly = to.meta.adminOnly;

  if (!requiresAuth) {
    return next();
  }

  if (!userStore.isLoggedIn) {
    if (requiredUserType === "professional") {
      return next("/login-prof");
    }
    return next("/login-user");
  }

  if (requiredUserType && userStore.user.userType !== requiredUserType) {
    return next("/");
  }

  if (adminOnly && !userStore.user.isAdmin) {
    return next("/");
  }

  next();
});

export default router;