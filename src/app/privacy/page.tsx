'use client'

import { motion } from "framer-motion"

export default function PrivacyPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center py-12 bg-background"
    >
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              At PollyChat, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our language learning platform. Please read this policy carefully to understand our practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium mb-2">2.1 Personal Information</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Profile information</li>
              <li>Language preferences and learning history</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 mt-4">2.2 Usage Data</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>Learning activity and progress</li>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Usage patterns and preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Provide and improve our language learning services</li>
              <li>Personalize your learning experience</li>
              <li>Process payments and maintain accounts</li>
              <li>Send important updates and communications</li>
              <li>Analyze and improve our platform</li>
              <li>Ensure platform security and prevent fraud</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Service providers and partners who assist in platform operation</li>
              <li>Payment processors for transaction handling</li>
              <li>Analytics providers to improve our services</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your information, including:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure data storage and transmission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Your Privacy Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request data deletion</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Remember your preferences</li>
              <li>Analyze usage patterns</li>
              <li>Provide personalized content</li>
              <li>Improve platform performance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13. We do not knowingly collect information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
            <p>
              Your information may be transferred and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers, including:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Standard contractual clauses</li>
              <li>Data protection agreements</li>
              <li>Compliance with international privacy laws</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of material changes through:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Email notifications</li>
              <li>Platform announcements</li>
              <li>Website updates</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p>
              For privacy-related questions or concerns, please contact us at:
            </p>
            <ul className="list-none pl-6 mt-2">
              <li>Email: privacy@pollychat.com</li>
              <li>Address: [Your Business Address]</li>
              <li>Data Protection Officer: dpo@pollychat.com</li>
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
