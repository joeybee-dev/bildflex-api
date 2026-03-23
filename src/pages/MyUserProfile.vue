<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useUserStore } from "@/stores/user";
import defaultMale from "@/assets/images/default-male.jpg";
import defaultFemale from "@/assets/images/default-female.jpg";

const router = useRouter();
const userStore = useUserStore();
const notyf = new Notyf();

const user = ref(null);
const loading = ref(true);
const actionLoading = ref(false);
const error = ref("");
const isEditing = ref(false);
const currentYear = new Date().getFullYear();
const fileInput = ref(null);
const selectedPhotoFile = ref(null);

const defaultNotificationSettings = {
  emailNotifications: true,
  smsNotifications: false,
  inquiryNotifications: true,
  marketingNotifications: false
};

const form = ref({
  profilePhoto: "",
  firstName: "",
  lastName: "",
  gender: "",
  birthYear: null,
  email: "",
  mobileNo: "",
  city: "",
  province: "",
  country: "Philippines",
  bio: "",
  notificationSettings: { ...defaultNotificationSettings }
});

const displayFullName = computed(() => {
  if (!user.value) return "";
  return (
    user.value.fullName ||
    `${user.value.firstName || ""} ${user.value.lastName || ""}`
      .replace(/\s+/g, " ")
      .trim()
  );
});

const profileImage = computed(() => {
  if (form.value.profilePhoto) return form.value.profilePhoto;
  if (user.value?.profilePhoto) return user.value.profilePhoto;
  return user.value?.gender === "Female" ? defaultFemale : defaultMale;
});

const openFilePicker = () => {
  if (!isEditing.value) return;
  fileInput.value?.click();
};

const handlePhotoChange = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  selectedPhotoFile.value = file;
  form.value.profilePhoto = URL.createObjectURL(file);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

const fillForm = () => {
  form.value = {
    profilePhoto: user.value?.profilePhoto || "",
    firstName: user.value?.firstName || "",
    lastName: user.value?.lastName || "",
    gender: user.value?.gender || "",
    birthYear: user.value?.birthYear || null,
    email: user.value?.email || "",
    mobileNo: user.value?.mobileNo || "",
    city: user.value?.city || "",
    province: user.value?.province || "",
    country: user.value?.country || "Philippines",
    bio: user.value?.bio || "",
    notificationSettings: {
      ...defaultNotificationSettings,
      ...(user.value?.notificationSettings || {})
    }
  };
};

const fetchUserProfile = async () => {
  try {
    loading.value = true;
    error.value = "";

    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (!token || userType !== "user") {
      router.push("/login-user");
      return;
    }

    const response = await axios.get(
      "http://localhost:4000/users/getSpecificUser",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    user.value = response.data.user;
    fillForm();
  } catch (err) {
    console.error("Error fetching user profile:", err);
    error.value = err.response?.data?.error || "Failed to load user profile.";

    if (err.response?.status === 401 || err.response?.status === 403) {
      userStore.unsetUser();
      router.push("/login-user");
    }
  } finally {
    loading.value = false;
  }
};

const startEditing = () => {
  fillForm();
  isEditing.value = true;
};

const cancelEditing = () => {
  fillForm();
  selectedPhotoFile.value = null;
  isEditing.value = false;
};

const saveProfile = async () => {
  try {
    actionLoading.value = true;

    const token = localStorage.getItem("token");

    const payload = {
      profilePhoto: form.value.profilePhoto,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      gender: form.value.gender,
      birthYear: form.value.birthYear,
      email: form.value.email,
      mobileNo: form.value.mobileNo,
      city: form.value.city,
      province: form.value.province,
      country: form.value.country,
      bio: form.value.bio,
      notificationSettings: form.value.notificationSettings
    };

    const response = await axios.put(
      "http://localhost:4000/users/updateSpecificUser",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    user.value = response.data.user;
    fillForm();
    selectedPhotoFile.value = null;
    isEditing.value = false;
    notyf.success(response.data.message || "Profile updated successfully.");
  } catch (err) {
    console.error("Save profile error:", err);
    console.error("Save profile response:", err.response?.data);
    notyf.error(err.response?.data?.error || "Failed to save profile.");
  } finally {
    actionLoading.value = false;
  }
};

onMounted(() => {
  fetchUserProfile();
});
</script>