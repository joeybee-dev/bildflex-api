<template>
  <div class="container py-4">
    <!-- TOP HEADER -->
    <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
      <h2 class="m-0">Users Orders</h2>

      <div class="d-flex gap-2">
        <button class="btn btn-secondary" @click="goToDashboard">
          Dashboard
        </button>

        <button class="btn btn-outline-secondary" @click="fetchOrders" :disabled="loading">
          <span v-if="loading">Refreshing...</span>
          <span v-else>Refresh</span>
        </button>
      </div>
    </div>

    <div v-if="loading" class="alert alert-info">
      Loading orders...
    </div>

    <div v-else-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <div v-else>
      <div v-if="orders.length === 0" class="alert alert-warning">
        No orders found.
      </div>

      <div v-else class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th style="min-width: 220px;">Order ID</th>
              <th style="min-width: 220px;">User</th>
              <th style="min-width: 140px;">Total</th>
              <th style="min-width: 220px;">Created</th>
              <th style="min-width: 120px;">Items</th>
              <th style="min-width: 220px;">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="order in orders"
              :key="order._id"
              class="order-row"
              @click="toggleRow(order)"
            >
              <td class="text-break">{{ order._id }}</td>

              <td class="text-break">
                <div v-if="order.userId && typeof order.userId === 'object'">
                  <div><strong>{{ order.userId.email || order.userId.username || order.userId._id }}</strong></div>
                  <small class="text-muted">{{ order.userId._id }}</small>
                </div>
                <div v-else>
                  {{ order.userId || order.user || order.userEmail || "—" }}
                </div>
              </td>

              <td>{{ formatCurrency(order.totalPrice ?? order.total ?? order.amount) }}</td>

              <td>{{ formatDate(order.createdAt || order.orderedOn || order.purchaseDate) }}</td>

              <td>{{ getItemsCount(order) }}</td>

              <!-- STATUS -->
              <td @click.stop>
                <!-- If this row is selected, show options -->
                <div v-if="selectedOrderId === order._id" class="d-flex align-items-center gap-2 flex-wrap">
                  <span :class="getStatusBadge(order.status)">
                    {{ normalizeStatus(order.status) }}
                  </span>

                  <div class="btn-group btn-group-sm" role="group" aria-label="Status options">
                    <button
                      class="btn btn-outline-warning"
                      :disabled="updatingId === order._id"
                      @click="updateStatus(order, 'in-process')"
                    >
                      In-Process
                    </button>
                    <button
                      class="btn btn-outline-success"
                      :disabled="updatingId === order._id"
                      @click="updateStatus(order, 'delivered')"
                    >
                      Delivered
                    </button>
                  </div>

                  <button class="btn btn-sm btn-outline-secondary" @click="selectedOrderId = null">
                    Cancel
                  </button>

                  <span v-if="updatingId === order._id" class="small text-muted">
                    Updating...
                  </span>
                </div>

                <!-- Default view -->
                <div v-else class="d-flex align-items-center gap-2">
                  <span :class="getStatusBadge(order.status)">
                    {{ normalizeStatus(order.status) }}
                  </span>
          
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <details class="mt-3">
          <pre class="mt-2 mb-0 p-3 bg-light border rounded" style="max-height: 420px; overflow:auto;">
{{ orders }}
          </pre>
        </details>
      </div>
    </div>

    <!-- BACK TO TOP -->
    <button
      v-show="showBackToTop"
      class="btn btn-primary back-to-top"
      @click="scrollToTop"
    >
      ↑ Back to Top
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import api from "../api";
import { useGlobalStore } from "../stores/global";

const router = useRouter();
const global = useGlobalStore();

const notyf = new Notyf({
  duration: 2500,
  position: { x: "right", y: "top" }
});

const orders = ref([]);
const loading = ref(false);
const errorMessage = ref("");

const selectedOrderId = ref(null);
const updatingId = ref(null);

const showBackToTop = ref(false);

function goToDashboard() {
  router.push("/admin"); // change if your actual route differs
}

function authHeader() {
  const token = global?.user?.token || localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function formatDate(val) {
  if (!val) return "—";
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return String(val);
  return d.toLocaleString();
}

function formatCurrency(val) {
  const n = Number(val);
  if (Number.isNaN(n)) return val ?? "—";
  return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(n);
}

function getItemsCount(order) {
  // Matches your backend: productsOrdered: cart.cartItems
  const items =
    order?.productsOrdered ||
    order?.cartItems ||
    order?.items ||
    order?.orderItems ||
    order?.products;

  return Array.isArray(items) ? items.length : "—";
}

function normalizeStatus(status) {
  return (status || "pending").toString().toLowerCase();
}

function getStatusBadge(status) {
  const s = normalizeStatus(status);
  if (s === "delivered") return "badge bg-success";
  if (s === "in-process" || s === "in_process" || s === "processing") return "badge bg-warning text-dark";
  return "badge bg-secondary";
}

function toggleRow(order) {
  selectedOrderId.value = selectedOrderId.value === order._id ? null : order._id;
}

async function fetchOrders() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const res = await api.get("/orders/all-orders", {
      headers: { ...authHeader() }
    });

    orders.value = Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    const status = err?.response?.status;
    const msg = err?.response?.data?.message || err?.message || "Request failed";

    if (status === 404) {
      orders.value = [];
      notyf.error(msg);
      return;
    }

    if (status === 401) {
      notyf.error("Unauthorized. Please login again.");
      router.push("/login");
      return;
    }

    if (status === 403) {
      notyf.error("Forbidden. Admin access required.");
      router.push("/");
      return;
    }

    errorMessage.value = msg;
    notyf.error(msg);
  } finally {
    loading.value = false;
  }
}

/**
 * IMPORTANT:
 * Set this to match your backend route.
 * Example options you might implement on backend:
 * 1) PATCH /orders/:id/status
 * 2) PATCH /orders/:id/update-status
 * 3) PATCH /orders/update-status/:id
 */
async function updateStatus(order, newStatus) {
  const id = order?._id;
  if (!id) return;

  updatingId.value = id;

  // ✅ Change this to match your backend
  const UPDATE_STATUS_ENDPOINT = `/orders/${id}/update-status`;

  try {
    await api.patch(
      UPDATE_STATUS_ENDPOINT,
      { status: newStatus },
      { headers: { ...authHeader() } }
    );

    // optimistic UI update
    order.status = newStatus;
    selectedOrderId.value = null;

    notyf.success(`Status updated to "${newStatus}"`);
  } catch (err) {
    const msg = err?.response?.data?.message || "Failed to update status";
    notyf.error(msg);
  } finally {
    updatingId.value = null;
  }
}

/* Back to Top */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function handleScroll() {
  showBackToTop.value = window.scrollY > 300;
}

onMounted(() => {
  fetchOrders();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.order-row {
  cursor: pointer;
  transition: background 0.15s ease;
}

.order-row:hover {
  background-color: #f8f9fa;
}

.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
</style>