<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Notyf } from 'notyf';
import api from '../api';

const router = useRouter();
const notyf = new Notyf();

// --- form state ---
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const mobileNo = ref('');
const password = ref('');
const confirmPassword = ref('');
const isEnabled = ref(false);

// --- error messages ---
const firstNameError = ref('');
const lastNameError = ref('');
const emailError = ref('');
const mobileNoError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const authError = ref('');

// --- validation ---
function isValidEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

function isValidMobile(value) {
  return /^\d{11,}$/.test(value); // 11 digits minimum
}

function validateFields() {
  let valid = true;
  // Reset errors
  firstNameError.value = '';
  lastNameError.value = '';
  emailError.value = '';
  mobileNoError.value = '';
  passwordError.value = '';
  confirmPasswordError.value = '';
  authError.value = '';

  if (!firstName.value) {
    firstNameError.value = 'First name is required.';
    valid = false;
  }
  if (!lastName.value) {
    lastNameError.value = 'Last name is required.';
    valid = false;
  }
  if (!email.value) {
    emailError.value = 'Email is required.';
    valid = false;
  } else if (!isValidEmail(email.value)) {
    emailError.value = 'Please enter a valid email address.';
    valid = false;
  }
  if (!mobileNo.value) {
    mobileNoError.value = 'Mobile number is required.';
    valid = false;
  } else if (!isValidMobile(mobileNo.value)) {
    mobileNoError.value = 'Mobile number must be at least 11 digits.';
    valid = false;
  }
  if (!password.value) {
    passwordError.value = 'Password is required.';
    valid = false;
  } else if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters.';
    valid = false;
  }
  if (!confirmPassword.value) {
    confirmPasswordError.value = 'Please confirm your password.';
    valid = false;
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match.';
    valid = false;
  }

  return valid;
}

// --- enable submit button ---
watch([firstName, lastName, email, mobileNo, password, confirmPassword], 
  ([f, l, e, m, p, c]) => {
    isEnabled.value = f && l && e && m && p && c;
  }
);

// --- handle submit ---
async function handleSubmit(e) {
  e.preventDefault();
  if (!validateFields()) return;

  try {
    const res = await api.post('/users/register', {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      mobileNo: mobileNo.value,
      password: password.value
    });

    if (res.data.message) {
      notyf.success(res.data.message);
      // clear form
      firstName.value = '';
      lastName.value = '';
      email.value = '';
      mobileNo.value = '';
      password.value = '';
      confirmPassword.value = '';
      // redirect to login
      router.push({ name: 'Login' });
    }
  } catch (err) {
    console.error(err);
    if (err.response && err.response.data && err.response.data.error) {
      authError.value = err.response.data.error;
      notyf.error(authError.value);
    } else {
      authError.value = 'Registration failed. Please try again later.';
      notyf.error(authError.value);
    }
  }
}
</script>

<template>
  <div class="container-fluid">
    <h1 class="my-5 pt-3 text-primary text-center">Register</h1>
    <div class="row d-flex justify-content-center">
      <div class="col-md-6 border border rounded-3 mx-auto p-5">
        <form @submit="handleSubmit">
          
          <!-- First Name -->
          <div class="mb-3">
            <label for="firstNameInput" class="form-label">First Name</label>
            <input type="text" class="form-control" id="firstNameInput" v-model="firstName" placeholder="Enter your first name">
            <div v-if="firstNameError" class="text-danger small mt-1">{{ firstNameError }}</div>
          </div>

          <!-- Last Name -->
          <div class="mb-3">
            <label for="lastNameInput" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="lastNameInput" v-model="lastName" placeholder="Enter your last name">
            <div v-if="lastNameError" class="text-danger small mt-1">{{ lastNameError }}</div>
          </div>

          <!-- Email -->
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email Address</label>
            <input type="email" class="form-control" id="emailInput" v-model="email" placeholder="Enter your Email">
            <div v-if="emailError" class="text-danger small mt-1">{{ emailError }}</div>
          </div>

          <!-- Mobile Number -->
          <div class="mb-3">
            <label for="mobileInput" class="form-label">Mobile Number</label>
            <input type="text" class="form-control" id="mobileInput" v-model="mobileNo" placeholder="Enter your mobile number">
            <div v-if="mobileNoError" class="text-danger small mt-1">{{ mobileNoError }}</div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Password</label>
            <input type="password" class="form-control" id="passwordInput" v-model="password" placeholder="Enter your password">
            <div v-if="passwordError" class="text-danger small mt-1">{{ passwordError }}</div>
          </div>

          <!-- Confirm Password -->
          <div class="mb-3">
            <label for="confirmPasswordInput" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" id="confirmPasswordInput" v-model="confirmPassword" placeholder="Confirm your password">
            <div v-if="confirmPasswordError" class="text-danger small mt-1">{{ confirmPasswordError }}</div>
          </div>

          <!-- Auth Error -->
          <div v-if="authError" class="alert alert-danger py-2" role="alert">
            {{ authError }}
          </div>

          <!-- Submit Button -->
          <div class="d-grid mt-4">
            <button type="submit" class="btn btn-primary btn-block" :disabled="!isEnabled">
              Register
            </button>
          </div>

          <!-- Login Link -->
          <p class="text-center mt-3" style="font-size: 0.85rem; color: #718096;">
            Already have an account? 
            <router-link to="/login">Click here</router-link> to login.
          </p>
        </form>
      </div>
    </div>
  </div>
</template>