import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

// Main
import Home from "../pages/main/Home.vue";
import About from "../pages/main/About.vue";
import Feedback from "../pages/main/Feedback.vue";
import UploadImage from "../pages/main/UploadImage.vue";
import LogoutPage from "../pages/main/LogoutPage.vue";

// Blog
import Blogs from "../pages/blog/Blogs.vue";

// Users - Public
import RegisterUser from "../pages/users/RegisterUser.vue";
import LoginUser from "../pages/users/LoginUser.vue";
import ForgotPasswordUser from "../pages/users/ForgotPasswordUser.vue";
import ResetPasswordUser from "../pages/users/ResetPasswordUser.vue";

// Users - Logged-in
import MyProfileUser from "../pages/users/MyProfileUser.vue";
import EditProfileUser from "../pages/users/EditProfileUser.vue";
import ProfilePhotoUser from "../pages/users/ProfilePhotoUser.vue";
import ChangePasswordUser from "../pages/users/ChangePasswordUser.vue";
import DeactivateAccountUser from "../pages/users/DeactivateAccountUser.vue";
import FavoritesPage from "../pages/users/FavoritesPage.vue";

import MyInquiriesPage from "@/pages/users/MyInquiriesPage.vue";
import InquiryDetailsPage from "@/pages/users/InquiryDetailsPage.vue";
import MyBookingsPage from "@/pages/users/MyBookingsPage.vue";
import BookingDetailsPage from "@/pages/users/BookingDetailsPage.vue";
import MessagesPage from "@/pages/users/MessagesPage.vue";
import MessageDetailsPage from "@/pages/users/MessageDetailsPage.vue";
import SearchHistoryPage from "@/pages/users/SearchHistoryPage.vue";
import AdminUsersPage from "@/pages/users/AdminUsersPage.vue";
import AdminUserDetailsPage from "@/pages/users/AdminUserDetailsPage.vue";

// Suppliers
import RegisterSupplier from "@/pages/suppliers/RegisterSupplier.vue";
import LoginSupplier from "@/pages/suppliers/LoginSupplier.vue";
import ForgotPasswordSupplier from "@/pages/suppliers/ForgotPasswordSupplier.vue";
import ResetPasswordSupplier from "@/pages/suppliers/ResetPasswordSupplier.vue";
import ActiveSuppliers from "@/pages/suppliers/ActiveSuppliers.vue";
import FeaturedSuppliers from "@/pages/suppliers/FeaturedSuppliers.vue";
import DetailsSupplier from "@/pages/suppliers/DetailsSupplier.vue";
import MyProfileSupplier from "@/pages/suppliers/MyProfileSupplier.vue";
import EditProfileSupplier from "@/pages/suppliers/EditProfileSupplier.vue";
import UpdatePhotoSupplier from "@/pages/suppliers/UpdatePhotoSupplier.vue";
import ChangePasswordSupplier from "@/pages/suppliers/ChangePasswordSupplier.vue";
import DeactivateAccountSupplier from "@/pages/suppliers/DeactivateAccountSupplier.vue";
import MyInquiriesSupplier from "@/pages/suppliers/MyInquiriesSupplier.vue";
import InquiryDetailsSupplier from "@/pages/suppliers/InquiryDetailsSupplier.vue";
import MyBookingsSupplier from "@/pages/suppliers/MyBookingsSupplier.vue";
import BookingDetailsSupplier from "@/pages/suppliers/BookingDetailsSupplier.vue";
import MessagesSupplier from "@/pages/suppliers/MessagesSupplier.vue";
import MessageDetailsSupplier from "@/pages/suppliers/MessageDetailsSupplier.vue";
import FavoritesSupplier from "@/pages/suppliers/FavoritesSupplier.vue";
import AdminSuppliers from "@/pages/suppliers/AdminSuppliers.vue";
import AdminSupplierDetails from "@/pages/suppliers/AdminSupplierDetails.vue";


// Handymen
import RegisterHandyman from "../pages/handymen/RegisterHandyman.vue";
import LoginHandyman from "../pages/handymen/LoginHandyman.vue";
import DetailsHandyman from "../pages/handymen/DetailsHandyman.vue";
import MyProfileHandyman from "../pages/handymen/MyProfileHandyman.vue";
import AllHandymen from "../pages/handymen/AllHandymen.vue";
import ActiveHandymen from "../pages/handymen/ActiveHandymen.vue";
import SpecificHandyman from "../pages/handymen/SpecificHandyman.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ 

// Main
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/feedback",
      name: "feedback",
      component: Feedback
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutPage
    },

// Blogs  
    {
      path: "/blogs",
      name: "Blogs",
      component: Blogs
    },

// Users
    {
      path: "/register",
      name: "register-user",
      component: RegisterUser
    },
    {
      path: "/login",
      name: "login-user",
      component: LoginUser
    },
    {
      path: "/forgot-password",
      name: "forgot-password-user",
      component: ForgotPasswordUser
    },
    {
      path: "/reset-password-user/:token",
      name: "reset-password-user",
      component: ResetPasswordUser
    },

  // Users - Loggedin
    {
      path: "/profile",
      name: "my-profile-user",
      component: MyProfileUser
    },
    {
      path: "/profile/edit",
      name: "edit-profile-user",
      component: EditProfileUser
    },
    {
      path: "/profile/photo",
      name: "profile-photo-user",
      component: ProfilePhotoUser
    },
    {
      path: "/change-password",
      name: "change-password-user",
      component: ChangePasswordUser
    },
    {
      path: "/deactivate-account",
      name: "deactivate-account-user",
      component: DeactivateAccountUser
    },
    {
      path: "/favorites",
      name: "favorites-page",
      component: FavoritesPage
    },
    {
      path: "/my-inquiries",
      name: "my-inquiries",
      component: MyInquiriesPage
    },
    {
      path: "/inquiries/:id",
      name: "inquiry-details",
      component: InquiryDetailsPage
    },
    {
      path: "/my-bookings",
      name: "my-bookings",
      component: MyBookingsPage
    },
    {
      path: "/my-bookings/:id",
      name: "booking-details",
      component: BookingDetailsPage
    },
    {
      path: "/messages",
      name: "messages",
      component: MessagesPage
    },
    {
      path: "/messages/:id",
      name: "message-details",
      component: MessageDetailsPage
    },
    {
      path: "/search-history",
      name: "search-history",
      component: SearchHistoryPage
    },
    {
      path: "/admin/users",
      name: "admin-users",
      component: AdminUsersPage
    },
    {
      path: "/admin/users/:id",
      name: "admin-user-details",
      component: AdminUserDetailsPage
    },
 
 
// Suppliers
    {
      path: "/supplier/register",
      name: "register-supplier",
      component: RegisterSupplier
    },
    {
      path: "/supplier/login",
      name: "login-supplier",
      component: LoginSupplier
    },
    {
      path: "/supplier/forgot-password",
      name: "forgot-password-supplier",
      component: ForgotPasswordSupplier
    },
    {
      path: "/supplier/reset-password/:token",
      name: "reset-password-supplier",
      component: ResetPasswordSupplier
    },
    {
      path: "/suppliers",
      name: "active-suppliers",
      component: ActiveSuppliers
    },
    {
      path: "/suppliers/featured",
      name: "featured-suppliers",
      component: FeaturedSuppliers
    },
    {
      path: "/suppliers/:id",
      name: "details-supplier",
      component: DetailsSupplier
    },
    {
      path: "/supplier/profile",
      name: "my-profile-supplier",
      component: MyProfileSupplier,
      meta: { requiresAuth: true, userType: "supplier" }
    },
    {
      path: "/supplier/profile/edit",
      name: "edit-profile-supplier",
      component: EditProfileSupplier,
      meta: { requiresAuth: true, userType: "supplier" }
    },
    {
      path: "/supplier/profile/photo",
      name: "update-photo-supplier",
      component: UpdatePhotoSupplier,
      meta: { requiresAuth: true, userType: "supplier" }
    },
    {
      path: "/supplier/change-password",
      name: "change-password-supplier",
      component: ChangePasswordSupplier,
      meta: { requiresAuth: true, userType: "supplier" }
    },
    {
      path: "/supplier/deactivate-account",
      name: "deactivate-account-supplier",
      component: DeactivateAccountSupplier,
      meta: { requiresAuth: true, userType: "supplier" }
    },
    {
      path: "/supplier/inquiries",
      name: "supplier-inquiries",
      component: MyInquiriesSupplier,
      meta: { requiresAuth: true, userType: "supplier" }
    },
    {
      path: "/supplier/inquiries/:id",
      name: "supplier-inquiry-details",
      component: InquiryDetailsSupplier,
      meta: { requiresAuth: true, userType: "supplier" }
    },
    {
      path: "/supplier/bookings",
      name: "supplier-bookings",
      component: MyBookingsSupplier,
      meta: { requiresAuth: true, userType: "supplier" }
    },
    {
      path: "/supplier/bookings/:id",
      name: "supplier-booking-details",
      component: BookingDetailsSupplier,
      meta: { requiresAuth: true, userType: "supplier" }
    },
    {
      path: "/supplier/messages",
      name: "supplier-messages",
      component: MessagesSupplier,
      meta: { requiresAuth: true, userType: "supplier" }
    },
    {
      path: "/supplier/messages/:id",
      name: "supplier-message-details",
      component: MessageDetailsSupplier,
      meta: { requiresAuth: true, userType: "supplier" }
    },
    {
      path: "/supplier/favorites",
      name: "supplier-favorites",
      component: FavoritesSupplier,
      meta: { requiresAuth: true, userType: "supplier" }
    },
    {
      path: "/admin/suppliers",
      name: "admin-suppliers",
      component: AdminSuppliers,
      meta: { requiresAuth: true, adminOnly: true }
    },
    {
      path: "/admin/suppliers/:id",
      name: "admin-supplier-details",
      component: AdminSupplierDetails,
      meta: { requiresAuth: true, adminOnly: true }
    },


// Handymen
    {
      path: "/register-handyman",
      name: "register-handyman",
      component: RegisterHandyman
    },
    {
      path: "/login-handyman",
      name: "login-handyman",
      component:LoginHandyman
    },
    {
      path: "/details-handyman",
      name: "details-handyman",
      component: DetailsHandyman
    },
    {
      path: "/details-handyman/:handymanId",
      name: "myprofile-handyman",
      component: MyProfileHandyman
    },
    {
      path: "/all-handymen",
      name: "all-handymen",
      component: AllHandymen
    },
    {
      path: "/active-handymen",
      name: "active-handymen",
      component: ActiveHandymen
    },
    {
      path: "/handymen/:handymanId",
      name: "specific-handyman",
      component: SpecificHandyman
    },




// Images
    {
      path: "/upload-image/:profileId",
      name: "uploadImage",
      component: UploadImage,
      meta: { requiresAuth: true, userType: "professional" }
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