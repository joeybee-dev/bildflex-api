<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="container py-4">
      <div class="row g-4">
        <div href="/" class="brand-block col-12 col-md-6 col-lg-4 me-3">
          <div class="footer-brand d-flex align-items-center mb-2">
            <img
              src="/favicon.ico"
              alt="bildflex logo"
              width="32"
              height="32"
              class="me-2"
            />
            <h5 class="mb-0 brand-text">bildflex</h5>
          </div>

          <p class="footer-description mb-2">
            Trusted construction network connecting clients with reliable
            handymen, designers, contractors, and suppliers for residential,
            commercial, and industrial projects.
          </p>

          <p class="footer-tagline mb-0">
            Build better with trusted local experts.
          </p>
        </div>

        <div class="d-none d-md-block col-md-3 col-lg-2 ms-3">
          <h6 class="footer-heading">Quick Links</h6>
          <ul class="footer-links list-unstyled mb-0">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <router-link to="/blogs">Blogs</router-link>
            </li>
            <li>
              <router-link to="/login">Login Guest</router-link>
            </li>
          </ul>
        </div>

        <div class="d-none d-md-block col-md-3 col-lg-2 ms-3">
          <h6 class="footer-heading">Providers</h6>
          <ul class="footer-links list-unstyled mb-0">
            <li>
              <router-link to="/join-bildflex">Join as Provider</router-link>
            </li>
            <li>
              <router-link to="/join-bildflex">Provider Login</router-link>
            </li>
          </ul>
        </div>

        <div class="col-12 col-lg-3 text-center text-lg-start">
          <h6 class="footer-heading">Contact Us</h6>
          <ul class="footer-contact list-unstyled mb-0">
            <li>
              <router-link to="/feedback" class="contact-link">
                Email: support@bildflex.com
              </router-link>
            </li>
          </ul>
        </div>

        
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 py-3">
        <p class="mb-0 copyright">
          © {{ year }} bildflex. All rights reserved.
        </p>

        <div class="footer-bottom-links d-flex flex-wrap gap-3">
          <router-link to="/privacy-policy">Privacy Policy</router-link>
          <router-link to="/terms-of-service">Terms Of Service</router-link>
          <router-link to="/feedback">Support</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #003e86;
  color: #ffffff;
  border-top: 1px solid #ffc107;
}

.brand-text {
  color: #ffc107;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.footer-description {
  color: #f4f6f8;
  line-height: 1.7;
  font-size: 0.96rem;
}

.footer-tagline {
  color: #ffc107;
  font-weight: 600;
}

.footer-heading {
  color: #ffc107;
  font-weight: 700;
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.4rem;
}

.footer-heading::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 42px;
  height: 2px;
  /*background-color: #ffc107;*/
  border-radius: 3px;
}

.footer-links li,
.footer-contact li {
  margin-bottom: 0.5rem;
}

.footer-links a,
.footer-bottom-links a {
  color: #ffffff;
  text-decoration: none;
  transition: all 0.25s ease;
}

.footer-links a:hover,
.footer-bottom-links a:hover {
  color: #ffc107;
}

.footer-contact {
  color: red;
}

.contact-link {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.2s ease, text-decoration 0.2s ease;
}

.contact-link:hover {
  color: #ffc107;
  text-decoration: none;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  background-color: rgba(0, 0, 0, 0.08);
}

.copyright {
  color: #f4f6f8;
  font-size: 0.92rem;
}

@media (max-width: 767.98px) {
  .site-footer {
    text-align: center;
  }

  .footer-heading::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .footer-bottom-links {
    justify-content: center;
  }

  .footer-brand {
    justify-content: center;

  }

}
</style>
