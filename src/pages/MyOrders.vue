<template>
  <div class="container py-4">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
      <div>
        <h2 class="mb-0">My Orders</h2>
        <div class="text-muted small">View your recent orders and their status.</div>
      </div>

      <div class="d-flex align-items-center gap-2">
        <select class="form-select form-select-sm" style="width: 150px" v-model.number="pageSize">
          <option :value="5">5 / page</option>
          <option :value="10">10 / page</option>
          <option :value="15">15 / page</option>
        </select>

        <button class="btn btn-outline-secondary btn-sm" @click="fetchOrders" :disabled="loading || !token">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Refresh
        </button>
      </div>
    </div>

    <!-- Not logged in -->
    <div v-if="!token" class="alert alert-warning d-flex align-items-start justify-content-between gap-3">
      <div>
        <div class="fw-semibold">You’re not logged in.</div>
        <div class="small">Please login to view your orders.</div>
      </div>
      <button class="btn btn-primary btn-sm" @click="goLogin">Login</button>
    </div>

    <!-- Loading -->
    <div v-else-if="loading" class="card shadow-sm">
      <div class="card-body d-flex align-items-center gap-3">
        <div class="spinner-border" role="status" aria-hidden="true"></div>
        <div>
          <div class="fw-semibold">Loading your orders…</div>
          <div class="text-muted small">Please wait.</div>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <!-- Empty -->
    <div v-else-if="orders.length === 0" class="card shadow-sm">
      <div class="card-body">
        <div class="fw-semibold">No orders found</div>
        <div class="text-muted small">When you place an order, it will show up here.</div>
      </div>
    </div>

    <!-- Orders -->
    <div v-else class="card shadow-sm">
      <div class="card-body">
        <!-- Summary row -->
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <div class="text-muted small">
            Showing <span class="fw-semibold">{{ pageStart + 1 }}</span>–<span class="fw-semibold">{{ pageEnd }}</span>
            of <span class="fw-semibold">{{ orders.length }}</span> orders
          </div>

          <nav aria-label="Orders pagination" class="d-flex align-items-center gap-2">
            <button class="btn btn-outline-secondary btn-sm" :disabled="page === 1" @click="page = 1">« First</button>
            <button class="btn btn-outline-secondary btn-sm" :disabled="page === 1" @click="page--">‹ Prev</button>

            <span class="small text-muted">
              Page <span class="fw-semibold">{{ page }}</span> / <span class="fw-semibold">{{ totalPages }}</span>
            </span>

            <button class="btn btn-outline-secondary btn-sm" :disabled="page === totalPages" @click="page++">Next ›</button>
            <button class="btn btn-outline-secondary btn-sm" :disabled="page === totalPages" @click="page = totalPages">Last »</button>
          </nav>
        </div>

        <!-- Accordion -->
        <div class="accordion" id="ordersAccordion">
          <div v-for="order in paginatedOrders" :key="order._id" class="accordion-item">
            <h2 class="accordion-header" :id="`heading-${order._id}`">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#collapse-${order._id}`"
                aria-expanded="false"
                :aria-controls="`collapse-${order._id}`"
              >
                <div class="w-100 d-flex flex-wrap align-items-center justify-content-between gap-2">
                  <div class="d-flex flex-column">
                    <span class="fw-semibold">Order {{ shortId(order._id) }}</span>
                    <span class="text-muted small">Ordered on {{ formatDate(order.orderedOn) }}</span>
                  </div>

                  <div class="d-flex flex-wrap align-items-center gap-2">
                    <span class="badge" :class="statusBadgeClass(order.status)">
                      {{ order.status }}
                    </span>
                    <span class="fw-bold">₱ {{ formatMoney(order.totalPrice) }}</span>
                  </div>
                </div>
              </button>
            </h2>

            <div
              :id="`collapse-${order._id}`"
              class="accordion-collapse collapse"
              :aria-labelledby="`heading-${order._id}`"
              data-bs-parent="#ordersAccordion"
            >
              <div class="accordion-body">
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                  <div class="text-muted small">
                    <div><span class="fw-semibold">Order ID:</span> {{ order._id }}</div>
                    <div><span class="fw-semibold">Status:</span> {{ order.status }}</div>
                  </div>

                  <button
                    v-if="canCancel(order)"
                    class="btn btn-danger btn-sm"
                    :disabled="cancellingId === order._id"
                    @click="cancelOrder(order)"
                  >
                    <span
                      v-if="cancellingId === order._id"
                      class="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                    Cancel Order
                  </button>
                </div>

                <div class="table-responsive">
                  <table class="table table-sm align-middle mb-0">
                    <thead>
                      <tr>
                        <th style="width: 55%">Product</th>
                        <th class="text-end" style="width: 15%">Qty</th>
                        <th class="text-end" style="width: 15%">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, idx) in order.productsOrdered" :key="idx">
                        <td>
                          <div class="fw-semibold">{{ productLabel(item) }}</div>
                          <div class="text-muted small">Product ID: {{ productIdValue(item) }}</div>
                        </td>
                        <td class="text-end">{{ item.quantity }}</td>
                        <td class="text-end">₱ {{ formatMoney(item.subtotal) }}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="2" class="text-end fw-semibold">Total</td>
                        <td class="text-end fw-bold">₱ {{ formatMoney(order.totalPrice) }}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom pagination -->
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-3 pt-3 border-top">
          <div class="text-muted small">
            Page <span class="fw-semibold">{{ page }}</span> of <span class="fw-semibold">{{ totalPages }}</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-outline-secondary btn-sm" :disabled="page === 1" @click="page--">Prev</button>
            <button class="btn btn-outline-secondary btn-sm" :disabled="page === totalPages" @click="page++">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/api"; // ✅ use your api.js instance (baseURL + interceptor)
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useGlobalStore } from "@/stores/global";

const router = useRouter();
const notyf = new Notyf({ duration: 2500, dismissible: true });

const globalStore = useGlobalStore();
const token = computed(() => globalStore.user?.token);

const orders = ref([]);
const loading = ref(false);
const errorMessage = ref("");
const cancellingId = ref(null);

// Pagination
const page = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => {
  const total = Math.ceil(orders.value.length / pageSize.value);
  return total === 0 ? 1 : total;
});

const pageStart = computed(() => (page.value - 1) * pageSize.value);
const pageEnd = computed(() => Math.min(pageStart.value + pageSize.value, orders.value.length));

const paginatedOrders = computed(() => {
  return orders.value.slice(pageStart.value, pageStart.value + pageSize.value);
});

watch([orders, pageSize], () => {
  if (page.value > totalPages.value) page.value = totalPages.value;
  if (page.value < 1) page.value = 1;
});

function goLogin() {
  router.push("/login");
}

function formatDate(date) {
  try {
    return new Date(date).toLocaleString();
  } catch {
    return String(date);
  }
}

function formatMoney(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return n.toFixed(2);
}

function shortId(id) {
  if (!id) return "";
  return String(id).slice(-6).toUpperCase();
}

function statusBadgeClass(status) {
  const s = String(status || "").toLowerCase();
  if (s === "pending") return "text-bg-warning";
  if (s === "completed") return "text-bg-success";
  if (s === "cancelled" || s === "canceled") return "text-bg-danger";
  return "text-bg-secondary";
}

function canCancel(order) {
  // backend: only "Pending" can be cancelled
  return String(order?.status || "").toLowerCase() === "pending";
}

function productIdValue(item) {
  const pid = item?.productId;
  if (!pid) return "—";
  if (typeof pid === "object" && pid._id) return pid._id;
  return String(pid);
}

function productLabel(item) {
  // backend: populate("productsOrdered.productId") so productId is an object
  const pid = item?.productId;
  if (pid && typeof pid === "object") {
    return pid.name || pid.title || pid.productName || "Product";
  }
  return "Product";
}

async function fetchOrders() {
  if (!token.value) return;

  loading.value = true;
  errorMessage.value = "";

  try {
    // ✅ backend route: GET /orders/my-orders (verify)
    const res = await api.get("/orders/my-orders");

    const data = Array.isArray(res.data) ? res.data : [];
    orders.value = data.sort((a, b) => new Date(b.orderedOn) - new Date(a.orderedOn));
    page.value = 1;
  } catch (err) {
    const status = err?.response?.status;

    if (status === 404) {
      // backend: { message: "No order found" }
      orders.value = [];
      notyf.success("No orders found.");
    } else if (status === 401 || status === 403) {
      notyf.error("Unauthorized. Please login again.");
      router.push("/login");
    } else {
      errorMessage.value =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to load orders.";
      notyf.error(errorMessage.value);
    }
  } finally {
    loading.value = false;
  }
}

async function cancelOrder(order) {
  if (!order?._id) return;

  const ok = window.confirm("Cancel this order? This action may be irreversible.");
  if (!ok) return;

  cancellingId.value = order._id;

  try {
    // ✅ backend route: PATCH /orders/:orderId/cancel (verify)
    const res = await api.patch(`/orders/${order._id}/cancel`, {});

    // backend returns updated order doc
    const updated = res?.data;

    const idx = orders.value.findIndex((o) => o._id === order._id);
    if (idx !== -1 && updated && updated._id) {
      orders.value[idx] = updated;
    }

    notyf.success("Order cancelled.");
  } catch (err) {
    const status = err?.response?.status;
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Failed to cancel order.";

    if (status === 401 || status === 403) {
      notyf.error("Unauthorized. Please login again.");
      router.push("/login");
    } else {
      notyf.error(msg);
    }
  } finally {
    cancellingId.value = null;
  }
}

onMounted(fetchOrders);
</script>