'use client'

import { motion } from "framer-motion"

export default function TermsPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center py-12 bg-background"
    >
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Terms of Service
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to PollyTalk (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing or using our language learning platform, you agree to be bound by these Terms of Service (&quot;Terms&quot;). Please read these Terms carefully before using our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
            <p>
              PollyTalk provides an AI-powered language learning platform that enables users to practice conversations and improve their language skills. Our services include but are not limited to:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Interactive language learning sessions</li>
              <li>AI conversation partners</li>
              <li>Progress tracking and assessment</li>
              <li>Educational content and resources</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p>
              To access certain features of our platform, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly update any changes to your information</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
            <p>
              When using our services, you agree not to:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon intellectual property rights</li>
              <li>Share inappropriate or offensive content</li>
              <li>Attempt to disrupt or compromise our systems</li>
              <li>Use our services for unauthorized commercial purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
            <p>
              All content and materials available through our services are protected by intellectual property rights. You may not:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Copy or reproduce our content without permission</li>
              <li>Modify or create derivative works</li>
              <li>Distribute or publicly display our content</li>
              <li>Remove any copyright or proprietary notices</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Payment Terms</h2>
            <p>
              For premium features and subscriptions:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Payments are processed securely through our payment providers</li>
              <li>Subscriptions auto-renew unless cancelled</li>
              <li>Refunds are provided according to our refund policy</li>
              <li>Prices may change with notice to users</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
            <p>
              We reserve the right to:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Suspend or terminate accounts for violations</li>
              <li>Modify or discontinue services with notice</li>
              <li>Remove content that violates these Terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
            <p>
              Our services are provided &quot;as is&quot; without warranties of any kind, either express or implied. We do not guarantee that:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Services will be uninterrupted or error-free</li>
              <li>Specific language learning outcomes will be achieved</li>
              <li>Content will be accurate or complete</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. We will notify users of material changes through:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Email notifications</li>
              <li>Platform announcements</li>
              <li>Website updates</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us at:
            </p>
            <ul className="list-none pl-6 mt-2">
              <li>Email: support@zervice.us</li>
              <li>Address: [Your Business Address]</li>
            </ul>
          </section>

          <section className="mt-12">
            <p className="text-sm text-muted-foreground">
              Last updated: February 25, 2025
            </p>
          </section>
        </div>
      </div>
    </motion.main>
  )
}
