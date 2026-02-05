import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Dark Bird Films',
  description: 'Privacy Policy for Dark Bird Films - Cinematic Storytelling Studio. Learn how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-ink">
        <div className="container-content">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-accent mb-4 block">
              Legal
            </span>
            <h1 className="font-display text-3xl md:text-5xl text-cream mb-4">
              Privacy Policy
            </h1>
            <p className="text-silver text-sm md:text-base">
              Effective Date: February 6, 2026 &bull; Last Updated: February 6, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20">
        <div className="container-content">
          <div className="max-w-3xl mx-auto prose prose-lg prose-stone">

            {/* Section 1 */}
            <div className="mb-10">
              <h2 className="font-display text-xl md:text-2xl text-ink mb-4">1. Introduction</h2>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                Dark Bird Films (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is a cinematic storytelling studio committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, engage our production services, or interact with us through any other channel. By accessing our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-10">
              <h2 className="font-display text-xl md:text-2xl text-ink mb-4">2. Information We Collect</h2>

              <h3 className="font-medium text-lg text-ink mt-6 mb-3">2.1 Personal Information</h3>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                We may collect personally identifiable information that you voluntarily provide to us when you inquire about our services, submit a project brief, sign a production agreement, or otherwise contact us. This includes your full name, email address, phone number, mailing address, company or organization name, job title, and payment or billing information.
              </p>

              <h3 className="font-medium text-lg text-ink mt-6 mb-3">2.2 Project-Related Information</h3>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                In the course of providing our cinematic production and storytelling services, we may collect project-specific information including creative briefs, scripts, storyboards, location details, talent information, brand guidelines, media assets, and any other materials you provide for the purpose of completing your project.
              </p>

              <h3 className="font-medium text-lg text-ink mt-6 mb-3">2.3 Automatically Collected Information</h3>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                When you visit our website, we may automatically collect certain information about your device and browsing activity, including your IP address, browser type and version, operating system, referring URLs, pages viewed, time spent on pages, and other diagnostic data. We may use cookies, web beacons, and similar tracking technologies to collect this information.
              </p>

              <h3 className="font-medium text-lg text-ink mt-6 mb-3">2.4 Portfolio and Testimonial Content</h3>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                With your consent, we may collect and use images, video clips, project descriptions, and testimonials related to completed work for inclusion in our portfolio, showreel, website, and marketing materials.
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-10">
              <h2 className="font-display text-xl md:text-2xl text-ink mb-4">3. How We Use Your Information</h2>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                We use the information we collect for the following purposes: to provide, operate, and maintain our cinematic production services; to communicate with you about projects, inquiries, and service updates; to process transactions and send related billing information; to develop creative concepts, treatments, and deliverables as part of our production workflow; to improve and personalize your experience with our services; to showcase completed work in our portfolio and marketing materials (with your consent); to comply with legal obligations and enforce our agreements; and to detect, prevent, and address technical issues or fraudulent activity.
              </p>
            </div>

            {/* Section 4 */}
            <div className="mb-10">
              <h2 className="font-display text-xl md:text-2xl text-ink mb-4">4. Sharing of Information</h2>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed mb-4">
                We do not sell your personal information. We may share your information in the following limited circumstances:
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-ink">Production Partners and Crew</h4>
                  <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                    We may share relevant project information with trusted freelance crew members, cinematographers, editors, sound designers, and other creative professionals who are directly involved in delivering your project. These partners are bound by confidentiality agreements.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-ink">Service Providers</h4>
                  <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                    We may share information with third-party vendors who provide services on our behalf, such as hosting providers, payment processors, email delivery platforms, and cloud storage services. These providers are contractually obligated to protect your information.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-ink">Legal Requirements</h4>
                  <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                    We may disclose your information if required to do so by law, in response to valid legal processes, or to protect the rights, property, or safety of Dark Bird Films, our clients, or others.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-ink">Business Transfers</h4>
                  <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change in ownership or control.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-10">
              <h2 className="font-display text-xl md:text-2xl text-ink mb-4">5. Data Security</h2>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                We implement industry-standard security measures to protect your personal information and project assets. This includes encrypted data transmission (SSL/TLS), secure cloud storage with access controls, password-protected file sharing for production deliverables, and regular security assessments. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* Section 6 */}
            <div className="mb-10">
              <h2 className="font-display text-xl md:text-2xl text-ink mb-4">6. Data Retention</h2>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                We retain your personal information and project data for as long as necessary to fulfill the purposes outlined in this policy, comply with our legal obligations, resolve disputes, and enforce our agreements. Project files and production assets are typically retained for a period of two (2) years following project completion, unless otherwise agreed upon in your production contract. You may request earlier deletion of your data by contacting us directly.
              </p>
            </div>

            {/* Section 7 */}
            <div className="mb-10">
              <h2 className="font-display text-xl md:text-2xl text-ink mb-4">7. Your Rights and Choices</h2>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed mb-4">
                Depending on your jurisdiction, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-warm-gray text-sm md:text-base leading-relaxed space-y-2">
                <li><strong className="text-ink">Access and Portability:</strong> You may request a copy of the personal information we hold about you in a structured, commonly used format.</li>
                <li><strong className="text-ink">Correction:</strong> You may request that we correct any inaccurate or incomplete personal information.</li>
                <li><strong className="text-ink">Deletion:</strong> You may request the deletion of your personal information, subject to certain legal exceptions.</li>
                <li><strong className="text-ink">Opt-Out:</strong> You may opt out of receiving marketing communications from us at any time by clicking the unsubscribe link in our emails or by contacting us directly.</li>
                <li><strong className="text-ink">Withdraw Consent:</strong> Where we rely on your consent to process your information, you have the right to withdraw that consent at any time.</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div className="mb-10">
              <h2 className="font-display text-xl md:text-2xl text-ink mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                Our website may use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings. Please note that disabling cookies may affect the functionality of certain features on our website. We may also use analytics tools such as Google Analytics to collect anonymized usage data.
              </p>
            </div>

            {/* Section 9 */}
            <div className="mb-10">
              <h2 className="font-display text-xl md:text-2xl text-ink mb-4">9. Third-Party Links</h2>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                Our website and communications may contain links to third-party websites, including social media platforms such as Vimeo, YouTube, Instagram, and LinkedIn, where our cinematic work may be showcased. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any external sites you visit.
              </p>
            </div>

            {/* Section 10 */}
            <div className="mb-10">
              <h2 className="font-display text-xl md:text-2xl text-ink mb-4">10. Children&apos;s Privacy</h2>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                Our services are not directed to individuals under the age of 16, and we do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a child, we will take steps to delete that information promptly.
              </p>
            </div>

            {/* Section 11 */}
            <div className="mb-10">
              <h2 className="font-display text-xl md:text-2xl text-ink mb-4">11. International Data Transfers</h2>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                If you are accessing our services from outside the country where our servers are located, please be aware that your information may be transferred to, stored, and processed in a different jurisdiction. By using our services, you consent to the transfer of your information to countries that may have different data protection laws than your country of residence.
              </p>
            </div>

            {/* Section 12 */}
            <div className="mb-10">
              <h2 className="font-display text-xl md:text-2xl text-ink mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements. When we make material changes, we will update the &ldquo;Last Updated&rdquo; date at the top of this policy and, where appropriate, notify you via email or a prominent notice on our website. We encourage you to review this policy periodically.
              </p>
            </div>

            {/* Section 13 */}
            <div className="mb-10">
              <h2 className="font-display text-xl md:text-2xl text-ink mb-4">13. Contact Us</h2>
              <p className="text-warm-gray text-sm md:text-base leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-ink/5 rounded-xl p-6">
                <p className="font-display text-lg text-ink mb-2">Dark Bird Films</p>
                <p className="text-warm-gray text-sm">Cinematic Storytelling Studio</p>
                <div className="mt-4 space-y-1 text-sm text-warm-gray">
                  <p><strong className="text-ink">Email:</strong> management@darkbirdfilms.com</p>
                  <p><strong className="text-ink">Location:</strong> HSR Layout, Bengaluru, Karnataka</p>
                  <p><strong className="text-ink">Website:</strong> darkbirdfilms.com</p>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="border-t border-stone/20 pt-8 mt-12">
              <p className="text-center text-warm-gray text-sm italic">
                Thank you for trusting Dark Bird Films with your story.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
