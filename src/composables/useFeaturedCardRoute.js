import { computed } from "vue";
import { useUserStore } from "@/stores/user";

export default function useFeaturedCardRoute() {
  const userStore = useUserStore();

  const isLoggedIn = computed(() => {
    return !!userStore.user?._id || !!userStore.user?.id || !!userStore.token;
  });

  const getProtectedRoute = (detailsRouteName, id) => {
    return isLoggedIn.value
      ? { name: detailsRouteName, params: { id } }
      : { name: "login-user" };
  };

  return {
    isLoggedIn,
    getProtectedRoute
  };
}