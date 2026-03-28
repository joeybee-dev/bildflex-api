<template>
  <section class="about-page py-4 py-md-5">
    <div class="container">
      <div class="page-header mb-4">
        <h2 class="page-title mb-1">About Us</h2>
        <p class="page-subtitle mb-0">
          Learn more about bildflex and our mission to connect people with trusted construction professionals.
        </p>
      </div>

      <div class="about-card shadow-sm">
        <div class="about-card-header"></div>

        <div class="about-card-body p-4 p-md-5">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10">
              <p class="about-text">
                Bildflex is a trusted construction network built to connect clients with reliable handymen, designers, contractors, and suppliers in one convenient platform. Our goal is to make it easier for homeowners, businesses, and project owners to find the right professionals for residential, commercial, and industrial needs. We believe that every project deserves skilled people, dependable service, and strong collaboration from start to finish.
              </p>

              <p class="about-text">
                Our platform brings together a growing community of service providers who are ready to help with repairs, design work, construction services, materials, and project support. By creating a space where users can discover experts near them, compare options, and connect with confidence, Bildflex helps turn ideas into completed projects. We aim to support both clients looking for quality service and professionals seeking more opportunities to grow their network.
              </p>

              <p class="about-text mb-0">
                At Bildflex, we are committed to promoting trust, accessibility, and local industry growth. We want to empower service providers by giving them greater visibility while helping clients make informed choices for their construction and improvement needs. As we continue to grow, our mission remains simple: to build stronger connections between people and the construction services that help shape better homes, businesses, and communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background-color: #f4f6f8;
}

.page-header {
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
  border-left: 4px solid #ffc107;
  border-radius: 18px;
  padding: 1.25rem;
}

.page-title {
  color: #003e86;
  font-weight: 800;
  margin: 0;
}

.page-subtitle {
  color: #6c757d;
  font-size: 0.96rem;
}

.about-card {
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
  border-radius: 22px;
  overflow: hidden;
}

.about-card-header {
  height: 14px;
  background-color: #003e86;
  border-bottom: 3px solid #ffc107;
}

.about-card-body {
  background-color: #ffffff;
}

.about-text {
  color: #003e86;
  font-size: 1rem;
  line-height: 1.9;
  text-align: justify;
  margin-bottom: 1.5rem;
}

@media (max-width: 767.98px) {
  .page-header {
    padding: 1rem;
  }

  .about-text {
    font-size: 0.97rem;
    line-height: 1.8;
    text-align: left;
  }
}
</style>