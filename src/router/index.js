import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

// Main
import Home from "../pages/main/Home.vue";
import About from "../pages/main/About.vue";
import Feedback from "../pages/main/Feedback.vue";
import UploadImage from "../pages/main/UploadImage.vue";
import LogoutPage from "../pages/main/LogoutPage.vue";
import JoinBildflexPage from "../pages/main/JoinBildflexPage.vue";

// Blog
import Blogs from "../pages/blog/Blogs.vue";

// Users - Public
import RegisterUser from "../pages/users/RegisterUser.vue";
import LoginUser from "../pages/users/LoginUser.vue";
import ForgotPasswordUser from "../pages/users/ForgotPasswordUser.vue";
import ResetPasswordUser from "../pages/users/ResetPasswordUser.vue";
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

// Handymen
import RegisterHandyman from "@/pages/handymen/RegisterHandyman.vue";
import LoginHandyman from "@/pages/handymen/LoginHandyman.vue";
import ForgotPasswordHandyman from "@/pages/handymen/ForgotPasswordHandyman.vue";
import ResetPasswordHandyman from "@/pages/handymen/ResetPasswordHandyman.vue";
import ActiveHandymen from "@/pages/handymen/ActiveHandymen.vue";
import FeaturedHandymen from "@/pages/handymen/FeaturedHandymen.vue";
import DetailsHandyman from "@/pages/handymen/DetailsHandyman.vue";
import MyProfileHandyman from "@/pages/handymen/MyProfileHandyman.vue";
import EditProfileHandyman from "@/pages/handymen/EditProfileHandyman.vue";
import UpdatePhotoHandyman from "@/pages/handymen/UpdatePhotoHandyman.vue";
import ChangePasswordHandyman from "@/pages/handymen/ChangePasswordHandyman.vue";
import DeactivateAccountHandyman from "@/pages/handymen/DeactivateAccountHandyman.vue";
import MyInquiriesHandyman from "@/pages/handymen/MyInquiriesHandyman.vue";
import InquiryDetailsHandyman from "@/pages/handymen/InquiryDetailsHandyman.vue";
import MyBookingsHandyman from "@/pages/handymen/MyBookingsHandyman.vue";
import BookingDetailsHandyman from "@/pages/handymen/BookingDetailsHandyman.vue";
import MessagesHandyman from "@/pages/handymen/MessagesHandyman.vue";
import MessageDetailsHandyman from "@/pages/handymen/MessageDetailsHandyman.vue";
import FavoritesHandyman from "@/pages/handymen/FavoritesHandyman.vue";
import AdminHandymen from "@/pages/handymen/AdminHandymen.vue";
import AdminHandymanDetails from "@/pages/handymen/AdminHandymanDetails.vue";

// Designers
import RegisterDesigner from "@/pages/designers/RegisterDesigner.vue";
import LoginDesigner from "@/pages/designers/LoginDesigner.vue";
import ForgotPasswordDesigner from "@/pages/designers/ForgotPasswordDesigner.vue";
import ResetPasswordDesigner from "@/pages/designers/ResetPasswordDesigner.vue";
import ActiveDesigners from "@/pages/designers/ActiveDesigners.vue";
import FeaturedDesigners from "@/pages/designers/FeaturedDesigners.vue";
import DetailsDesigner from "@/pages/designers/DetailsDesigner.vue";
import MyProfileDesigner from "@/pages/designers/MyProfileDesigner.vue";
import EditProfileDesigner from "@/pages/designers/EditProfileDesigner.vue";
import UpdatePhotoDesigner from "@/pages/designers/UpdatePhotoDesigner.vue";
import ChangePasswordDesigner from "@/pages/designers/ChangePasswordDesigner.vue";
import DeactivateAccountDesigner from "@/pages/designers/DeactivateAccountDesigner.vue";
import MyInquiriesDesigner from "@/pages/designers/MyInquiriesDesigner.vue";
import InquiryDetailsDesigner from "@/pages/designers/InquiryDetailsDesigner.vue";
import MyBookingsDesigner from "@/pages/designers/MyBookingsDesigner.vue";
import BookingDetailsDesigner from "@/pages/designers/BookingDetailsDesigner.vue";
import MessagesDesigner from "@/pages/designers/MessagesDesigner.vue";
import MessageDetailsDesigner from "@/pages/designers/MessageDetailsDesigner.vue";
import FavoritesDesigner from "@/pages/designers/FavoritesDesigner.vue";
import AdminDesigners from "@/pages/designers/AdminDesigners.vue";
import AdminDesignerDetails from "@/pages/designers/AdminDesignerDetails.vue";

// Contractors
import RegisterContractor from "@/pages/contractors/RegisterContractor.vue";
import LoginContractor from "@/pages/contractors/LoginContractor.vue";
import ForgotPasswordContractor from "@/pages/contractors/ForgotPasswordContractor.vue";
import ResetPasswordContractor from "@/pages/contractors/ResetPasswordContractor.vue";
import ActiveContractors from "@/pages/contractors/ActiveContractors.vue";
import FeaturedContractors from "@/pages/contractors/FeaturedContractors.vue";
import DetailsContractor from "@/pages/contractors/DetailsContractor.vue";
import MyProfileContractor from "@/pages/contractors/MyProfileContractor.vue";
import EditProfileContractor from "@/pages/contractors/EditProfileContractor.vue";
import UpdatePhotoContractor from "@/pages/contractors/UpdatePhotoContractor.vue";
import ChangePasswordContractor from "@/pages/contractors/ChangePasswordContractor.vue";
import DeactivateAccountContractor from "@/pages/contractors/DeactivateAccountContractor.vue";
import MyInquiriesContractor from "@/pages/contractors/MyInquiriesContractor.vue";
import InquiryDetailsContractor from "@/pages/contractors/InquiryDetailsContractor.vue";
import MyBookingsContractor from "@/pages/contractors/MyBookingsContractor.vue";
import BookingDetailsContractor from "@/pages/contractors/BookingDetailsContractor.vue";
import MessagesContractor from "@/pages/contractors/MessagesContractor.vue";
import MessageDetailsContractor from "@/pages/contractors/MessageDetailsContractor.vue";
import FavoritesContractor from "@/pages/contractors/FavoritesContractor.vue";
import AdminContractors from "@/pages/contractors/AdminContractors.vue";
import AdminContractorDetails from "@/pages/contractors/AdminContractorDetails.vue";

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
    {
      path: "/join-bildflex",
      name: "join-bildflex",
      component: JoinBildflexPage
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


// Handymen
    {
      path: "/handyman/register",
      name: "register-handyman",
      component: RegisterHandyman
    },
    {
      path: "/handyman/login",
      name: "login-handyman",
      component: LoginHandyman
    },
    {
      path: "/handyman/forgot-password",
      name: "forgot-password-handyman",
      component: ForgotPasswordHandyman
    },
    {
      path: "/handyman/reset-password/:token",
      name: "reset-password-handyman",
      component: ResetPasswordHandyman
    },
    {
      path: "/handymen",
      name: "active-handymen",
      component: ActiveHandymen
    },
    {
      path: "/handymen/featured",
      name: "featured-handymen",
      component: FeaturedHandymen
    },
    {
      path: "/handymen/:id",
      name: "details-handyman",
      component: DetailsHandyman
    },
    {
      path: "/handyman/profile",
      name: "my-profile-handyman",
      component: MyProfileHandyman,
      meta: { requiresAuth: true, userType: "handyman" }
    },
    {
      path: "/handyman/profile/edit",
      name: "edit-profile-handyman",
      component: EditProfileHandyman,
      meta: { requiresAuth: true, userType: "handyman" }
    },
    {
      path: "/handyman/profile/photo",
      name: "update-photo-handyman",
      component: UpdatePhotoHandyman,
      meta: { requiresAuth: true, userType: "handyman" }
    },
    {
      path: "/handyman/change-password",
      name: "change-password-handyman",
      component: ChangePasswordHandyman,
      meta: { requiresAuth: true, userType: "handyman" }
    },
    {
      path: "/handyman/deactivate-account",
      name: "deactivate-account-handyman",
      component: DeactivateAccountHandyman,
      meta: { requiresAuth: true, userType: "handyman" }
    },
    {
      path: "/handyman/inquiries",
      name: "handyman-inquiries",
      component: MyInquiriesHandyman,
      meta: { requiresAuth: true, userType: "handyman" }
    },
    {
      path: "/handyman/inquiries/:id",
      name: "handyman-inquiry-details",
      component: InquiryDetailsHandyman,
      meta: { requiresAuth: true, userType: "handyman" }
    },
    {
      path: "/handyman/bookings",
      name: "handyman-bookings",
      component: MyBookingsHandyman,
      meta: { requiresAuth: true, userType: "handyman" }
    },
    {
      path: "/handyman/bookings/:id",
      name: "handyman-booking-details",
      component: BookingDetailsHandyman,
      meta: { requiresAuth: true, userType: "handyman" }
    },
    {
      path: "/handyman/messages",
      name: "handyman-messages",
      component: MessagesHandyman,
      meta: { requiresAuth: true, userType: "handyman" }
    },
    {
      path: "/handyman/messages/:id",
      name: "handyman-message-details",
      component: MessageDetailsHandyman,
      meta: { requiresAuth: true, userType: "handyman" }
    },
    {
      path: "/handyman/favorites",
      name: "handyman-favorites",
      component: FavoritesHandyman,
      meta: { requiresAuth: true, userType: "handyman" }
    },
    {
      path: "/admin/handymen",
      name: "admin-handymen",
      component: AdminHandymen,
      meta: { requiresAuth: true, adminOnly: true }
    },
    {
      path: "/admin/handymen/:id",
      name: "admin-handyman-details",
      component: AdminHandymanDetails,
      meta: { requiresAuth: true, adminOnly: true }
    },


// Designers
    {
      path: "/designer/register",
      name: "register-designer",
      component: RegisterDesigner
    },
    {
      path: "/designer/login",
      name: "login-designer",
      component: LoginDesigner
    },
    {
      path: "/designer/forgot-password",
      name: "forgot-password-designer",
      component: ForgotPasswordDesigner
    },
    {
      path: "/designer/reset-password/:token",
      name: "reset-password-designer",
      component: ResetPasswordDesigner
    },
    {
      path: "/designers",
      name: "active-designers",
      component: ActiveDesigners
    },
    {
      path: "/designers/featured",
      name: "featured-designers",
      component: FeaturedDesigners
    },
    {
      path: "/designers/:id",
      name: "details-designer",
      component: DetailsDesigner
    },
    {
      path: "/designer/profile",
      name: "my-profile-designer",
      component: MyProfileDesigner,
      meta: { requiresAuth: true, userType: "designer" }
    },
    {
      path: "/designer/profile/edit",
      name: "edit-profile-designer",
      component: EditProfileDesigner,
      meta: { requiresAuth: true, userType: "designer" }
    },
    {
      path: "/designer/profile/photo",
      name: "update-photo-designer",
      component: UpdatePhotoDesigner,
      meta: { requiresAuth: true, userType: "designer" }
    },
    {
      path: "/designer/change-password",
      name: "change-password-designer",
      component: ChangePasswordDesigner,
      meta: { requiresAuth: true, userType: "designer" }
    },
    {
      path: "/designer/deactivate-account",
      name: "deactivate-account-designer",
      component: DeactivateAccountDesigner,
      meta: { requiresAuth: true, userType: "designer" }
    },
    {
      path: "/designer/inquiries",
      name: "designer-inquiries",
      component: MyInquiriesDesigner,
      meta: { requiresAuth: true, userType: "designer" }
    },
    {
      path: "/designer/inquiries/:id",
      name: "designer-inquiry-details",
      component: InquiryDetailsDesigner,
      meta: { requiresAuth: true, userType: "designer" }
    },
    {
      path: "/designer/bookings",
      name: "designer-bookings",
      component: MyBookingsDesigner,
      meta: { requiresAuth: true, userType: "designer" }
    },
    {
      path: "/designer/bookings/:id",
      name: "designer-booking-details",
      component: BookingDetailsDesigner,
      meta: { requiresAuth: true, userType: "designer" }
    },
    {
      path: "/designer/messages",
      name: "designer-messages",
      component: MessagesDesigner,
      meta: { requiresAuth: true, userType: "designer" }
    },
    {
      path: "/designer/messages/:id",
      name: "designer-message-details",
      component: MessageDetailsDesigner,
      meta: { requiresAuth: true, userType: "designer" }
    },
    {
      path: "/designer/favorites",
      name: "designer-favorites",
      component: FavoritesDesigner,
      meta: { requiresAuth: true, userType: "designer" }
    },
    {
      path: "/admin/designers",
      name: "admin-designers",
      component: AdminDesigners,
      meta: { requiresAuth: true, adminOnly: true }
    },
    {
      path: "/admin/designers/:id",
      name: "admin-designer-details",
      component: AdminDesignerDetails,
      meta: { requiresAuth: true, adminOnly: true }
    },


// Contractors    
    {
      path: "/contractor/register",
      name: "register-contractor",
      component: RegisterContractor
    },
    {
      path: "/contractor/login",
      name: "login-contractor",
      component: LoginContractor
    },
    {
      path: "/contractor/forgot-password",
      name: "forgot-password-contractor",
      component: ForgotPasswordContractor
    },
    {
      path: "/contractor/reset-password/:token",
      name: "reset-password-contractor",
      component: ResetPasswordContractor
    },
    {
      path: "/contractors",
      name: "active-contractors",
      component: ActiveContractors
    },
    {
      path: "/contractors/featured",
      name: "featured-contractors",
      component: FeaturedContractors
    },
    {
      path: "/contractors/:id",
      name: "details-contractor",
      component: DetailsContractor
    },
    {
      path: "/contractor/profile",
      name: "my-profile-contractor",
      component: MyProfileContractor,
      meta: { requiresAuth: true, userType: "contractor" }
    },
    {
      path: "/contractor/profile/edit",
      name: "edit-profile-contractor",
      component: EditProfileContractor,
      meta: { requiresAuth: true, userType: "contractor" }
    },
    {
      path: "/contractor/profile/photo",
      name: "update-photo-contractor",
      component: UpdatePhotoContractor,
      meta: { requiresAuth: true, userType: "contractor" }
    },
    {
      path: "/contractor/change-password",
      name: "change-password-contractor",
      component: ChangePasswordContractor,
      meta: { requiresAuth: true, userType: "contractor" }
    },
    {
      path: "/contractor/deactivate-account",
      name: "deactivate-account-contractor",
      component: DeactivateAccountContractor,
      meta: { requiresAuth: true, userType: "contractor" }
    },
    {
      path: "/contractor/inquiries",
      name: "contractor-inquiries",
      component: MyInquiriesContractor,
      meta: { requiresAuth: true, userType: "contractor" }
    },
    {
      path: "/contractor/inquiries/:id",
      name: "contractor-inquiry-details",
      component: InquiryDetailsContractor,
      meta: { requiresAuth: true, userType: "contractor" }
    },
    {
      path: "/contractor/bookings",
      name: "contractor-bookings",
      component: MyBookingsContractor,
      meta: { requiresAuth: true, userType: "contractor" }
    },
    {
      path: "/contractor/bookings/:id",
      name: "contractor-booking-details",
      component: BookingDetailsContractor,
      meta: { requiresAuth: true, userType: "contractor" }
    },
    {
      path: "/contractor/messages",
      name: "contractor-messages",
      component: MessagesContractor,
      meta: { requiresAuth: true, userType: "contractor" }
    },
    {
      path: "/contractor/messages/:id",
      name: "contractor-message-details",
      component: MessageDetailsContractor,
      meta: { requiresAuth: true, userType: "contractor" }
    },
    {
      path: "/contractor/favorites",
      name: "contractor-favorites",
      component: FavoritesContractor,
      meta: { requiresAuth: true, userType: "contractor" }
    },
    {
      path: "/admin/contractors",
      name: "admin-contractors",
      component: AdminContractors,
      meta: { requiresAuth: true, adminOnly: true }
    },
    {
      path: "/admin/contractors/:id",
      name: "admin-contractor-details",
      component: AdminContractorDetails,
      meta: { requiresAuth: true, adminOnly: true }
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

  if (requiredUserType && userStore.user.userType !== requiredUserType) {
    return next("/");
  }

  if (adminOnly && !userStore.user.isAdmin) {
    return next("/");
  }

  next();
});

export default router;