'use client'

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { motion, AnimatePresence } from "framer-motion"
import { ChatBubbleIcon, GlobeIcon, PersonIcon, RocketIcon } from "@radix-ui/react-icons"

const features = [
  {
    icon: ChatBubbleIcon,
    title: "Natural Conversations",
    description: "Practice real-world conversations with our AI language partners"
  },
  {
    icon: GlobeIcon,
    title: "Multiple Languages",
    description: "Learn any language with native-speaking AI tutors"
  },
  {
    icon: PersonIcon,
    title: "Personalized Learning",
    description: "Adaptive learning path based on your progress and interests"
  },
  {
    icon: RocketIcon,
    title: "Rapid Progress",
    description: "Learn faster through interactive conversations and feedback"
  }
]

export default function Home() {
  return (
    <AnimatePresence>
      <main className="flex min-h-screen flex-col items-center">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <Logo size={80} />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  PollyChat
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400"
              >
                Chat like a local, learn like a parrot! Master languages through natural conversations.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-x-4"
              >
                <Button size="lg">Start Learning</Button>
                <Button size="lg" variant="outline">Try Demo</Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tighter text-center mb-12"
            >
              Why Choose PollyChat?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-lg shadow-sm"
                  >
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      {feature.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              >
                Ready to Start Your Language Journey?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mx-auto max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400"
              >
                Join thousands of learners who are already chatting their way to fluency.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Button size="lg" className="mt-4">
                  Get Started for Free
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </AnimatePresence>
  )
}
