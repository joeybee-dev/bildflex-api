<template>
  <div class="terms-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <div class="card terms-card border-0 shadow-sm">
            <div class="terms-header text-center">
              <h1 class="terms-title mb-2">Terms of Service</h1>
              <p class="terms-subtitle mb-0">
                Please read these terms carefully before using Bildflex.
              </p>
            </div>

            <div class="card-body p-4 p-md-5">
              <p class="intro-text">
                Welcome to Bildflex. By accessing or using this platform, you agree to comply with and be bound by these Terms of Service. These terms govern your use of the website, features, services, and any related tools provided through Bildflex. If you do not agree with any part of these terms, you should not use the platform.
              </p>

              <section class="terms-section">
                <h2 class="section-title">1. Use of the Platform</h2>
                <p>
                  Bildflex provides a digital platform where users may connect with handymen, designers, contractors, suppliers, and other construction-related service providers. You agree to use the platform only for lawful purposes and in a manner that does not violate applicable laws, regulations, or the rights of others.
                </p>
              </section>

              <section class="terms-section">
                <h2 class="section-title">2. User Accounts</h2>
                <p>
                  To access certain features, you may be required to register an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, complete, and updated information at all times.
                </p>
              </section>

              <section class="terms-section">
                <h2 class="section-title">3. Service Provider Listings</h2>
                <p>
                  Service providers who create profiles on Bildflex are responsible for the accuracy of their information, qualifications, services, pricing, and availability. Bildflex does not guarantee the quality, legality, safety, or performance of any provider listed on the platform. Users are encouraged to conduct their own due diligence before engaging any provider.
                </p>
              </section>

              <section class="terms-section">
                <h2 class="section-title">4. Bookings, Inquiries, and Messages</h2>
                <p>
                  The platform may allow users to send inquiries, messages, and booking requests. Bildflex is not a direct party to agreements between users and providers unless otherwise expressly stated. Any transaction, service arrangement, or dispute arising between parties is their sole responsibility.
                </p>
              </section>

              <section class="terms-section">
                <h2 class="section-title">5. Prohibited Conduct</h2>
                <p>
                  You agree not to misuse the platform, including but not limited to submitting false information, impersonating another person, uploading harmful content, interfering with platform security, sending spam, or engaging in fraudulent, abusive, or unlawful conduct. Bildflex reserves the right to suspend or terminate accounts that violate these terms.
                </p>
              </section>

              <section class="terms-section">
                <h2 class="section-title">6. Intellectual Property</h2>
                <p>
                  All content, branding, design elements, text, graphics, logos, and software on Bildflex are owned by or licensed to Bildflex unless otherwise stated. You may not copy, modify, distribute, reproduce, or exploit any part of the platform without prior written permission.
                </p>
              </section>

              <section class="terms-section">
                <h2 class="section-title">7. Privacy</h2>
                <p>
                  Your use of the platform is also subject to our Privacy Policy. By using Bildflex, you consent to the collection, storage, and use of your information in accordance with our privacy practices.
                </p>
              </section>

              <section class="terms-section">
                <h2 class="section-title">8. Disclaimer of Warranties</h2>
                <p>
                  Bildflex is provided on an “as is” and “as available” basis. We make no warranties or representations regarding the availability, reliability, accuracy, or suitability of the platform or any listed services. Use of the platform is at your own risk.
                </p>
              </section>

              <section class="terms-section">
                <h2 class="section-title">9. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Bildflex shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of or related to your use of the platform, your reliance on any content, or your interaction with other users or providers.
                </p>
              </section>

              <section class="terms-section">
                <h2 class="section-title">10. Account Suspension or Termination</h2>
                <p>
                  We reserve the right to suspend, restrict, or terminate access to the platform at our discretion, with or without notice, if we believe a user has violated these Terms of Service or engaged in conduct that may harm the platform, its users, or its reputation.
                </p>
              </section>

              <section class="terms-section">
                <h2 class="section-title">11. Changes to the Terms</h2>
                <p>
                  Bildflex may update or modify these Terms of Service from time to time. Any changes will become effective once posted on the platform. Continued use of the platform after changes are posted constitutes acceptance of the revised terms.
                </p>
              </section>

              <section class="terms-section mb-0">
                <h2 class="section-title">12. Contact Information</h2>
                <p class="mb-0">
                  If you have questions regarding these Terms of Service, you may contact Bildflex through the contact channels provided on the platform.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.terms-page {
  min-height: 100vh;
  background-color: #f4f6f8;
}

.terms-card {
  border-radius: 20px;
  overflow: hidden;
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
}

.terms-header {
  border-bottom: 3px solid #ffc107;
  padding: 2rem 1.5rem 1.75rem;
}

.terms-title {
  color: #003e86;
  font-weight: 800;
  letter-spacing: 0.3px;
}

.terms-subtitle {
  color: #003e86;
  font-size: 0.95rem;
}

.intro-text {
  color: #4f5b67;
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.terms-section {
  margin-bottom: 2rem;
}

.section-title {
  color: #003e86;
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.terms-section p {
  color: #4f5b67;
  font-size: 0.98rem;
  line-height: 1.8;
  margin-bottom: 0;
}

@media (max-width: 767.98px) {
  .terms-page {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .terms-header {
    padding: 1.75rem 1rem 1.5rem;
  }

  .terms-title {
    font-size: 1.7rem;
  }

  .section-title {
    font-size: 1.08rem;
  }
}
</style>