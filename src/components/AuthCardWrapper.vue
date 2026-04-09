<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div :class="columnClass">
          <div class="card auth-card border-0 shadow-sm">
            <div :class="['auth-header', headerAlignClass]">
              <h2 class="auth-title mb-2">{{ title }}</h2>
              <p v-if="subtitle" class="auth-subtitle mb-0">
                {{ subtitle }}
              </p>
            </div>

            <div :class="bodyClass">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/auth-shared.css";
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ""
  },
  textAlign: {
    type: String,
    default: "start" // start, center
  },
  colClass: {
    type: String,
    default: "col-12 col-md-9 col-lg-6"
  },
  bodyPaddingClass: {
    type: String,
    default: "card-body p-4 p-md-5"
  }
});

const headerAlignClass = computed(() =>
  props.textAlign === "center" ? "text-center" : "text-start"
);

const columnClass = computed(() => props.colClass);
const bodyClass = computed(() => props.bodyPaddingClass);
</script>