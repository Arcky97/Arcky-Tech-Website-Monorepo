import { TextColor } from "ui";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <article className="flex flex-col items-center h-full text-white">
      <h1 className="head1">Terms of Service</h1>
      <em className="text-sm text-gray-400 text-center">Effective Date: July 20, 2025</em>

      {/* Section 1 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">1. Acceptance of Terms</h2>
        <div className="pl-6 space-y-4">
          <p>
            By accessing or using <Link href="https://arcky-tech.be" className="text-blue-400 hover:text-blue-200 transition">https://arcky-tech.be</Link> (referred to as &quot;ArckyTech&quot;, &quot;we&quot;, or &quot;our&quot;), you agree to be bound by these Terms of Service.
            If you do not agree to these terms, you must discontinue use of the site and its services.
          </p>
          <p>
            These terms apply to all visitors, users, and anyone who accesses the website or associated services (including dashboards or documentation).
          </p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 2 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">2. Website Usage</h2>
        <div className="pl-6 space-y-4">
          <p>You agree to use ArckyTech for lawful and legitimate purposes only. You agree not to:</p>
          <ul className="list-disc pl-6">
            <li>Use the site in any way that violates laws or regulations in your jurisdiction</li>
            <li>Attempt to disrupt, hack, or reverse-engineer the site or any of its systems</li>
            <li>Upload malicious content, including malware, exploits, or spam</li>
            <li>Abuse or misuse any features, forms, or dashboard tools</li>
          </ul>
          <p>We reserve the right to suspend or restrict access if misuse or abuse is detected.</p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 3 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">3. Discord Login & Accounts</h2>
        <div className="pl-6 space-y-4">
          <p>Our site provides login functionality via Discord OAuth for personalized services, such as accessing your bot dashboard.</p>
          <ul className="list-disc pl-6">
            <li>You consent to us storing your Discord ID, username, avatar, and necessary tokens</li>
            <li>You are responsible for your own Discord account security</li>
            <li>We may revoke access in the event of misuse or suspicious activity</li>
          </ul>
          <p>We do not collect your Discord password or private messages.</p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 4 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">4. Dashboard Services</h2>
        <div className="pl-6 space-y-4">
          <p>ArckyTech provides a web-based dashboard for managing the ArckyBot Discord bot. While we aim for stability and functionality:</p>
          <ul className="list-disc pl-6">
            <li>The dashboard is offered “as is” and “as available”</li>
            <li>Functionality depends on third-party APIs like Discord</li>
            <li>We are not responsible for data loss or external disruptions</li>
          </ul>
          <TextColor color="red-500">
            <strong>Attention:</strong> We are not liable for outages or issues caused by Discord or other third-party platforms.
          </TextColor>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 5 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">5. Intellectual Property</h2>
        <div className="pl-6 space-y-4">
          <p>
            All content on this website—including branding, designs, text, interface code, and media—is the intellectual property of ArckyTech unless explicitly noted otherwise.
          </p>
          <p>You may not:</p>
          <ul className="list-disc pl-6">
            <li>Reproduce, redistribute, or modify content without permission</li>
            <li>Claim ownership or misrepresent our content</li>
            <li>Use our brand assets without prior approval</li>
          </ul>
          <p>
            <strong>Exception:</strong> Code blocks within our documentation are intended for open-source use. You are welcome to copy, modify, or redistribute that code unless otherwise stated.
          </p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 6 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">6. Third-Party Links</h2>
        <div className="pl-6 space-y-4">
          <p>We may include links to external websites, including but not limited to:</p>
          <ul className="list-disc pl-6">
            <li>Donation platforms (e.g., Ko-fi, Buy Me a Coffee)</li>
            <li>External tools or integrations</li>
            <li>Documentation-related downloads or resources</li>
          </ul>
          <p>We are not responsible for the content, availability, or practices of these third-party websites. Use them at your own discretion.</p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 7 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">7. Limitation of Liability</h2>
        <div className="pl-6 space-y-4">
          <p>To the fullest extent permitted by law, ArckyTech is not liable for:</p>
          <ul className="list-disc pl-6">
            <li>Losses caused by service interruptions or bugs</li>
            <li>Unauthorized access resulting from third-party breaches</li>
            <li>Indirect, incidental, or consequential damages</li>
          </ul>
          <p>All services are provided “as is” without warranties of any kind.</p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 8 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">8. Termination</h2>
        <div className="pl-6 space-y-4">
          <p>We reserve the right to suspend or permanently ban access if you:</p>
          <ul className="list-disc pl-6">
            <li>Violate these Terms</li>
            <li>Exploit or abuse platform features</li>
            <li>Interfere with others’ use of the service</li>
          </ul>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 9 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">9. Changes to These Terms</h2>
        <div className="pl-6 space-y-4">
          <p>We may update these Terms of Service over time. The “Effective Date” at the top of the page will reflect the most recent version.</p>
          <TextColor color="red-500">
            <strong>Warning:</strong> Continuing to use the site after updates means you accept the revised terms. Please review them periodically.
          </TextColor>
        </div>
      </section>
    </article>
  );
}
