import { TextColor } from "ui";

export default function PrivacyPolicy() {
  return (
    <article className="flex flex-col items-center h-full text-white">
      <h1 className="head1">Privacy Policy</h1>
      <em className="text-sm text-gray-400 text-center">
        Effective Date: September 29, 2026
      </em>

      {/* Section 1 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">
          1. Information We Collect
        </h2>

        <div className="pl-6 space-y-4">
          <p>
            ArckyTech collects and processes information necessary to
            provide its services and features. The information we collect
            may include:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Google Account Information:</strong> Information
              used to authenticate your account, such as your Google
              account identifier and basic profile information made
              available through the permissions you grant.
            </li>

            <li>
              <strong>YouTube Channel Data:</strong> Your YouTube channel
              ID, channel name, and other channel information made
              available through the permissions you grant.
            </li>

            <li>
              <strong>YouTube Video and Analytics Data:</strong> Video
              information and statistics retrieved through the YouTube
              APIs, which may include video titles, publication dates,
              views, likes, comments, watch time, and other available
              statistics, depending on the permissions granted and the
              features you use.
            </li>

            <li>
              <strong>Playlist Information:</strong> Playlist details and
              associated video information where required to provide the
              application's features and permitted by your authorization.
            </li>

            <li>
              <strong>Historical Statistics:</strong> Historical video
              statistics and snapshots, where applicable, to display
              changes in performance over time.
            </li>

            <li>
              <strong>Contact Form Submissions:</strong> Your name, email
              address, and the contents of messages you submit through
              our contact form.
            </li>

            <li>
              <strong>Cookies and Technical Data:</strong> Session
              identifiers, cookie information, preferences, and technical
              or usage information necessary to operate, secure, and
              improve the website.
            </li>
          </ul>

          <p>
            The information collected depends on the features you use
            and the permissions you grant to ArckyTech.
          </p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 2 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">
          2. How We Use Your Information
        </h2>

        <div className="pl-6 space-y-4">
          <p>
            We use the information we collect for the following purposes:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              To authenticate your identity and connect your Google
              account to ArckyTech.
            </li>

            <li>
              To retrieve and display your YouTube channel, video,
              playlist, and analytics information.
            </li>

            <li>
              To calculate and display statistics, performance metrics,
              historical changes, and other analytics features.
            </li>

            <li>
              To store information required for application functionality,
              such as historical statistics and user-configured settings,
              where applicable.
            </li>

            <li>
              To respond to contact requests, questions, and support
              inquiries.
            </li>

            <li>
              To maintain the security, reliability, and performance
              of the website.
            </li>

            <li>
              To understand general website usage and improve the
              services we provide, where applicable.
            </li>
          </ul>

          <p>
            We process Google user data only for purposes that are
            necessary to provide the application's features and consistent
            with the permissions you have granted.
          </p>

          <p>
            We do not sell Google user data or use it for advertising.
          </p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 3 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">
          3. Sharing of Information
        </h2>

        <div className="pl-6 space-y-4">
          <p>
            We do not sell or rent your personal information or Google
            user data. We may share information in the following
            circumstances:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Google and YouTube:</strong> ArckyTech uses Google
              authentication and YouTube APIs to provide the features
              you authorize. Your use of Google services is also subject
              to Google's applicable terms and privacy policies.
            </li>

            <li>
              <strong>Service Providers:</strong> We may use third-party
              providers for hosting, database services, infrastructure,
              security, and other services necessary to operate ArckyTech.
              These providers may process information as needed to
              provide their services.
            </li>

            <li>
              <strong>Legal Requirements:</strong> We may disclose
              information when required by applicable law, regulation,
              legal process, or a valid request from a competent
              authority.
            </li>
          </ul>

          <p>
            We do not share Google user data with third parties for
            their own advertising purposes or for purposes unrelated
            to providing or maintaining the application's features.
          </p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 4 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">
          4. Data Storage, Retention, and Deletion
        </h2>

        <div className="pl-6 space-y-4">
          <p>
            We retain personal information and YouTube data only for
            as long as necessary to provide the application's features,
            maintain historical analytics, meet applicable legal
            obligations, and protect the service.
          </p>

          <p>
            Where information is stored, we take reasonable measures
            to protect it against unauthorized access, loss, misuse,
            alteration, or disclosure.
          </p>

          <p>
            You may request access to, correction of, or deletion of
            your personal information and associated stored data by
            contacting us at:
          </p>

          <TextColor color="green-400">
            <strong>contact@arcky-tech.be</strong>
          </TextColor>

          <p>
            We will process valid requests in accordance with applicable
            data protection laws. Some information may need to be retained
            where required by law or for legitimate security purposes.
          </p>

          <p>
            Disconnecting your Google account or revoking access prevents
            further access that depends on that authorization. This does
            not necessarily delete information already stored by
            ArckyTech. You may contact us separately to request deletion
            of that information.
          </p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 5 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">
          5. Google API Services User Data
        </h2>

        <div className="pl-6 space-y-4">
          <p>
            ArckyTech's access to Google user data is limited to the
            permissions you grant through Google's authorization process.
            We use this data to provide the features described in this
            Privacy Policy.
          </p>

          <p>
            ArckyTech's use and transfer of information received from
            Google APIs to any other app will adhere to the
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {" "}Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>

          <p>
            You can review and manage third-party application access to
            your Google Account through your Google Account security
            settings.
          </p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 6 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">
          6. Cookies
        </h2>

        <div className="pl-6 space-y-4">
          <p>We may use cookies and similar technologies to:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Maintain session state for authenticated users.
            </li>
            <li>
              Store user preferences and settings.
            </li>
            <li>
              Support website security and functionality.
            </li>
            <li>
              Measure website traffic and usage, where analytics tools
              are used.
            </li>
          </ul>

          <p>
            You can control or delete cookies through your browser
            settings. Disabling certain cookies may affect the
            functionality of the website.
          </p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 7 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">
          7. Data Security
        </h2>

        <div className="pl-6 space-y-4">
          <p>
            We implement reasonable technical and organizational
            safeguards designed to protect your information against
            unauthorized access, loss, misuse, alteration, or disclosure.
          </p>

          <p>
            No method of electronic storage or transmission is completely
            secure. While we take reasonable steps to protect your data,
            we cannot guarantee absolute security.
          </p>

          <p>
            Third-party services used by the application may have their
            own security practices and policies. We encourage you to
            review the relevant policies of those services.
          </p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 8 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">
          8. Your Rights
        </h2>

        <div className="pl-6 space-y-4">
          <p>
            Depending on your location and applicable data protection
            laws, you may have the right to:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Request access to your personal information.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of your personal information.</li>
            <li>Object to or request restrictions on certain processing.</li>
            <li>
              Withdraw consent or revoke Google account access where
              applicable.
            </li>
          </ul>

          <p>
            To exercise these rights or ask questions about how your
            information is handled, contact us at:
          </p>

          <TextColor color="green-400">
            <strong>contact@arcky-tech.be</strong>
          </TextColor>

          <p>
            We will respond to requests in accordance with applicable
            laws.
          </p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 9 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">
          9. Third-Party Links
        </h2>

        <div className="pl-6 space-y-4">
          <p>
            ArckyTech may contain links to third-party websites or
            platforms, including donation services, downloadable files,
            and developer tools.
          </p>

          <p>
            We do not control these third-party websites and are not
            responsible for their content, privacy practices, or
            policies. Your interactions with those services are
            governed by their own terms and privacy policies.
          </p>
        </div>
      </section>

      <hr className="border-gray-600/75 my-4" />

      {/* Section 10 */}
      <section className="my-6 text-left w-7/8 lg:w-5/8">
        <h2 className="text-2xl font-semibold pb-4">
          10. Changes to This Policy
        </h2>

        <div className="pl-6 space-y-4">
          <p>
            We may update this Privacy Policy periodically to reflect
            changes to our services, data practices, or legal
            requirements.
          </p>

          <p>
            When we make changes, we will update the effective date
            displayed at the top of this page. Where appropriate, we
            will notify users of significant changes.
          </p>

          <TextColor color="red-500">
            <strong>
              Please review this policy periodically to stay informed
              about how your information is handled.
            </strong>
          </TextColor>
        </div>
      </section>
    </article>
  );
}