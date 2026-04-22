import { TextColor } from "ui";

export default function PrivacyPolicy() {
  return (
    <article className="flex flex-col min-h-[calc(100vh-189px)] bg-gray-900 text-white p-8 mx-auto lg:w-5/8">
      <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
      <em className="text-sm text-gray-400 text-center">Effective Date: July 20, 2025</em>

      {/* Section 1 */}
      <section className="my-6 text-left">
        <h2 className="text-2xl font-semibold pb-4">1. Information We Collect</h2>
        <div className="pl-6 space-y-4">
          <p>We collect the following types of personal information from users of ArckyTech:</p>
          <ul className="list-disc pl-6">
            <li><strong>Discord Login Data:</strong> Discord ID, username, and avatar</li>
            <li><strong>Contact Form Submissions:</strong> Name and email address</li>
            <li><strong>Cookies:</strong> Session information and anonymous analytics</li>
          </ul>
          <p>This data helps us personalize your experience and improve our platform.</p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 2 */}
      <section className="my-6 text-left">
        <h2 className="text-2xl font-semibold pb-4">2. How We Use Your Information</h2>
        <div className="pl-6 space-y-4">
          <p>Your information is used solely to provide and enhance our services:</p>
          <ul className="list-disc pl-6">
            <li>Authenticate your identity via Discord</li>
            <li>Respond to your messages and inquiries</li>
            <li>Analyze anonymous usage trends to improve site performance</li>
          </ul>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 3 */}
      <section className="my-6 text-left">
        <h2 className="text-2xl font-semibold pb-4">3. Sharing of Information</h2>
        <div className="pl-6 space-y-4">
          <p>We do not sell or trade your data. We may share information only when necessary:</p>
          <ul className="list-disc pl-6">
            <li>With trusted third-party providers (e.g., Discord, analytics tools)</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 4 */}
      <section className="my-6 text-left">
        <h2 className="text-2xl font-semibold pb-4">4. Cookies</h2>
        <div className="pl-6 space-y-4">
          <p>We use cookies to:</p>
          <ul className="list-disc pl-6">
            <li>Maintain session state for logged-in users</li>
            <li>Store anonymous user preferences</li>
            <li>Measure traffic and usage via analytics</li>
          </ul>
          <p>You can control or delete cookies via your browser settings at any time.</p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 5 */}
      <section className="my-6 text-left">
        <h2 className="text-2xl font-semibold pb-4">5. Your Rights</h2>
        <div className="pl-6 space-y-4">
          <p>You may have the right to access, correct, or delete your personal data. This depends on the data protection laws in your region (e.g., GDPR, CCPA).</p>
          <TextColor color="green-400">
            <strong>To request data access or deletion, contact us at: contact@arcky-tech.be</strong>
          </TextColor>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 6 */}
      <section className="my-6 text-left">
        <h2 className="text-2xl font-semibold pb-4">6. Data Security</h2>
        <div className="pl-6 space-y-4">
          <p>We implement technical and organizational safeguards to protect your data. However, no system is completely secure.</p>
          <p>We are not responsible for breaches caused by third-party services or platforms beyond our control (e.g., Discord).</p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 7 */}
      <section className="my-6 text-left">
        <h2 className="text-2xl font-semibold pb-4">7. Third-Party Links</h2>
        <div className="pl-6 space-y-4">
          <p>We may link to third-party platforms for donations, downloadable files, or developer tools. We do not control or endorse these sites.</p>
          <p>We are not responsible for their content, practices, or policies. You use them at your own risk.</p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 8 */}
      <section className="my-6 text-left">
        <h2 className="text-2xl font-semibold pb-4">8. Changes to This Policy</h2>
        <div className="pl-6 space-y-4">
          <p>This Privacy Policy may be updated periodically. We will update the effective date above and notify users when appropriate.</p>
          <TextColor color="red-500">
            <strong>By continuing to use the site, you agree to the latest version of this policy.</strong>
          </TextColor>
        </div>
      </section>
    </article>
  );
}
