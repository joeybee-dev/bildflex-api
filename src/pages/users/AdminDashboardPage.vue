<template>
  <div class="admin-dashboard-page py-5">
    <div class="container">
      <div v-if="loadingPage" class="text-center py-5">
        <div class="spinner-border text-primary mb-3" role="status"></div>
        <p class="text-muted mb-0">Checking admin access...</p>
      </div>

      <div v-else>
        <div class="dashboard-header d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <p class="dashboard-label mb-1">ADMIN PANEL</p>
            <h1 class="dashboard-title mb-1">Admin Dashboard</h1>
            <p class="dashboard-subtitle mb-0">
              Manage all users, professional accounts, and platform activities.
            </p>
          </div>

          <router-link to="/" class="btn btn-outline-secondary">
            Back to Home
          </router-link>
        </div>

        <div class="row g-4 mb-4">
          <div class="col-12 col-md-6 col-xl-3">
            <div class="summary-card shadow-sm h-100">
              <p class="summary-label mb-2">Users</p>
              <h2 class="summary-value mb-1">{{ stats.users }}</h2>
              <p class="summary-note mb-0">Registered client accounts</p>
            </div>
          </div>

          <div class="col-12 col-md-6 col-xl-3">
            <div class="summary-card shadow-sm h-100">
              <p class="summary-label mb-2">Professionals</p>
              <h2 class="summary-value mb-1">{{ totalProfessionals }}</h2>
              <p class="summary-note mb-0">All service provider accounts</p>
            </div>
          </div>

          <div class="col-12 col-md-6 col-xl-3">
            <div class="summary-card shadow-sm h-100">
              <p class="summary-label mb-2">Bookings</p>
              <h2 class="summary-value mb-1">{{ stats.bookings }}</h2>
              <p class="summary-note mb-0">Booking records</p>
            </div>
          </div>

          <div class="col-12 col-md-6 col-xl-3">
            <div class="summary-card shadow-sm h-100">
              <p class="summary-label mb-2">Messages</p>
              <h2 class="summary-value mb-1">{{ stats.messages }}</h2>
              <p class="summary-note mb-0">Communication records</p>
            </div>
          </div>
        </div>

        <div class="section-block mb-4">
          <div class="section-header mb-3">
            <h2 class="section-title mb-1">Account Management</h2>
            <p class="section-subtitle mb-0">
              Manage all account types across the platform.
            </p>
          </div>

          <div class="row g-4">
            <div
              v-for="item in managementCards"
              :key="item.title"
              class="col-12 col-sm-6 col-xl-3"
            >
              <router-link :to="item.route" class="text-decoration-none">
                <div class="card dashboard-card border-0 shadow-sm h-100">
                  <div class="card-body p-4">
                    <div class="icon-circle mb-3">
                      <span class="material-symbols-outlined">{{ item.icon }}</span>
                    </div>

                    <h5 class="card-title fw-bold mb-2">{{ item.title }}</h5>
                    <p class="card-text mb-3">{{ item.description }}</p>

                    <div class="d-flex justify-content-between align-items-center">
                      <span class="record-count">{{ item.count }} records</span>
                      <span class="manage-link">Manage</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <div class="section-block">
          <div class="section-header mb-3">
            <h2 class="section-title mb-1">Operations</h2>
            <p class="section-subtitle mb-0">
              Review inquiries, bookings, and messages.
            </p>
          </div>

          <div class="row g-4">
            <div
              v-for="item in operationCards"
              :key="item.title"
              class="col-12 col-md-6 col-xl-4"
            >
              <router-link :to="item.route" class="text-decoration-none">
                <div class="card dashboard-card border-0 shadow-sm h-100">
                  <div class="card-body p-4">
                    <div class="icon-circle mb-3">
                      <span class="material-symbols-outlined">{{ item.icon }}</span>
                    </div>

                    <h5 class="card-title fw-bold mb-2">{{ item.title }}</h5>
                    <p class="card-text mb-3">{{ item.description }}</p>

                    <div class="d-flex justify-content-between align-items-center">
                      <span class="record-count">{{ item.count }} items</span>
                      <span class="manage-link">Open</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

const loadingPage = ref(true);

const stats = reactive({
  users: 0,
  handymen: 0,
  designers: 0,
  contractors: 0,
  suppliers: 0,
  inquiries: 0,
  bookings: 0,
  messages: 0
});

const totalProfessionals = computed(() => {
  return (
    stats.handymen +
    stats.designers +
    stats.contractors +
    stats.suppliers 
  );
});

const managementCards = computed(() => [
  {
    title: "Users",
    icon: "groups",
    description: "Manage all registered client user accounts.",
    count: stats.users,
    route: "/admin/users"
  },
  {
    title: "Handymen",
    icon: "construction",
    description: "Manage handyman accounts and profile visibility.",
    count: stats.handymen,
    route: "/admin/handymen"
  },
  {
    title: "Designers",
    icon: "draw",
    description: "Manage designer accounts and listed profiles.",
    count: stats.designers,
    route: "/admin/designers"
  },
  {
    title: "Contractors",
    icon: "engineering",
    description: "Manage contractor accounts and platform access.",
    count: stats.contractors,
    route: "/admin/contractors"
  },
  {
    title: "Suppliers",
    icon: "inventory_2",
    description: "Manage supplier accounts and public listings.",
    count: stats.suppliers,
    route: "/admin/suppliers"
  }
]);

const operationCards = computed(() => [
  {
    title: "Inquiries",
    icon: "contact_support",
    description: "Review all inquiries sent by clients.",
    count: stats.inquiries,
    route: "/admin/inquiries"
  },
  {
    title: "Bookings",
    icon: "calendar_month",
    description: "Monitor platform booking activity and records.",
    count: stats.bookings,
    route: "/admin/bookings"
  },
  {
    title: "Messages",
    icon: "mail",
    description: "Review direct messages and communication logs.",
    count: stats.messages,
    route: "/admin/messages"
  }
]);


const checkAdminAccess = async () => {
  if (!userStore.bootstrapped) {
    await userStore.bootstrapAuth();
  }

  if (!userStore.user?.id || !userStore.user?.isAdmin) {
    router.replace("/login");
    return false;
  }

  return true;
};

const fetchDashboardStats = async () => {
  try {
    const response = await api.get("/admin/dashboard-counts");
    const counts = response.data?.counts || {};

    stats.users = counts.users || 0;
    stats.handymen = counts.handymen || 0;
    stats.designers = counts.designers || 0;
    stats.contractors = counts.contractors || 0;
    stats.suppliers = counts.suppliers || 0;
    stats.inquiries = counts.inquiries || 0;
    stats.bookings = counts.bookings || 0;
    stats.messages = counts.messages || 0;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
  }
};


onMounted(async () => {
  const allowed = await checkAdminAccess();

  if (allowed) {
    await fetchDashboardStats();
  }

  loadingPage.value = false;
});
</script>

<style scoped>
.admin-dashboard-page {
  min-height: 100vh;
  background: #f4f6f8;
}

.dashboard-header {
  background: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.08);
  border-radius: 20px;
  padding: 1.5rem;
}

.dashboard-label {
  color: #ffc107;
  font-weight: 800;
  letter-spacing: 1.4px;
  font-size: 0.85rem;
  text-transform: uppercase;
}

.dashboard-title {
  color: #003e86;
  font-size: 2rem;
  font-weight: 800;
}

.dashboard-subtitle {
  color: #6c757d;
  font-size: 1rem;
}

.summary-card {
  background: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.08);
  border-radius: 18px;
  padding: 1.35rem;
}

.summary-label {
  color: #6c757d;
  font-weight: 600;
  font-size: 0.95rem;
}

.summary-value {
  color: #003e86;
  font-size: 2rem;
  font-weight: 800;
}

.summary-note {
  color: #8a8f98;
  font-size: 0.92rem;
}

.section-block {
  background: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.08);
  border-radius: 20px;
  padding: 1.5rem;
}

.section-title {
  color: #003e86;
  font-size: 1.5rem;
  font-weight: 800;
}

.section-subtitle {
  color: #6c757d;
  font-size: 0.97rem;
}

.dashboard-card {
  border-radius: 18px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 1rem 2rem rgba(0, 62, 134, 0.08);
}

.icon-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #003e86;
  color: #ffc107;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffc107;
}

.icon-circle .material-symbols-outlined {
  font-size: 30px;
}

.card-title {
  color: #003e86;
}

.card-text {
  color: #6c757d;
  min-height: 72px;
}

.record-count {
  color: #6c757d;
  font-size: 0.92rem;
  font-weight: 600;
}

.manage-link {
  color: #003e86;
  font-weight: 700;
}

@media (max-width: 767.98px) {
  .dashboard-title {
    font-size: 1.6rem;
  }

  .dashboard-header,
  .section-block {
    padding: 1.2rem;
  }

  .card-text {
    min-height: auto;
  }
}
</style>