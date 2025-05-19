'use client'

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { motion, AnimatePresence } from "framer-motion"
import { ChatBubbleIcon, GlobeIcon, PersonIcon, RocketIcon } from "@radix-ui/react-icons"
import { QrCode, Download } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/i18n/i18n-context"
import { useState, useEffect, useRef, useMemo } from 'react'
import { Testimonials } from "@/components/testimonials"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function Home() {
  const { t, locale } = useI18n()
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [userTyping, setUserTyping] = useState(false)
  const [userInputValue, setUserInputValue] = useState("")
  
  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard')
    }
  }, [user, isLoading, router])
  
  // Define dialog messages based on current locale
  const dialogMessages = useMemo(() => locale === 'zh' ? [
    { type: 'bot', text: "你好，我是Polly，你的中文老师。想了解更多关于我如何帮助你学习语言的信息吗？" },
    { type: 'user', text: "当然！博语通到底是什么？" },
    { type: 'bot', text: "博语通是一款由人工智能驱动的语言学习应用，专注于帮助你快速提升会话和口语能力。与专注于重复练习的传统应用不同，我的设计目的是像真实语言伙伴一样与你交流，让你在实际对话中练习和掌握语言！" },
    { type: 'user', text: "这与多邻国等其他应用有什么不同？" },
    { type: 'bot', text: "好问题！虽然多邻国专注于游戏化练习和翻译，但博语通专门通过真实对话来提升你的口语流利度。我们的核心优势在于：针对你的发音和语调提供个性化反馈，根据你的熟练程度调整对话难度，以及创建你在实际生活中真正会用到的实用对话场景。我们的设计目标就是帮助你说出更自然更自信的语言！" },
    { type: 'user', text: "我是语言初学者，可以使用博语通学习吗？" },
    { type: 'bot', text: "非常感谢你的提问！博语通最适合已经掌握了基本语言知识的学习者。如果你是初学者，我们建议先使用多邻国等应用学习基础词汇和语法，然后再使用博语通来提升你的对话能力和流利度。我们的优势在于帮助你进阶，让你从“知道语言”到“自然使用语言”！" },
    { type: 'user', text: "听起来很有趣。我每天需要投入多少时间？" },
    { type: 'bot', text: "这完全取决于你！有些学习者每天只与我聊10分钟，而其他人则喜欢进行30分钟的长时间对话。关键是坚持——即使是短暂的定期练习也会随着时间的推移带来显著的进步。" },
    { type: 'user', text: "使用这个应用我真的能流利吗？" },
    { type: 'bot', text: "流利来自于定期练习和实际应用。博语通提供了传统学习中常常缺失的对话练习。我会帮助你建立信心，培养自然的语言模式，为真实世界的对话做好准备。我们的许多用户在出国旅行时都有突破性的时刻！" },
    { type: 'user', text: "费用是多少？" },
    { type: 'bot', text: "博语通提供有限日常对话的免费计划，以及收费低至不足两美元每小时的多种可选高级计划。为什么不先尝试我们的免费计划，看看你是否喜欢呢？" }
  ] : [
    { type: 'bot', text: "Hi, I'm Polly, your English tutor. Would you like to know more about how I can help you learn languages?" },
    { type: 'user', text: "Sure! What exactly is PollyTalkie?" },
    { type: 'bot', text: "PollyTalkie is an AI-powered language learning app that helps you quickly improve your conversational and spoken language skills. Unlike traditional apps that focus on repetitive exercises, I'm designed to chat with you like a real language partner, allowing you to practice and master languages through actual conversations!" },
    { type: 'user', text: "How is this different from other apps like Duolingo?" },
    { type: 'bot', text: "Great question! While apps like Duolingo focus on gamified exercises and translation, PollyTalkie specializes in developing your speaking fluency through real conversations. Our key strengths are: personalized feedback on your pronunciation and intonation, adaptive conversations that match your proficiency level, and practical dialog scenarios you'll actually use in real life. We're specifically designed to help you sound more natural and confident when you speak!" },
    { type: 'user', text: "I'm new to the language, can I use PollyTalkie to learn it?" },
    { type: 'bot', text: "Thanks for asking! PollyTalkie is best suited for learners who already have some basic knowledge of the language. If you're a complete beginner, we recommend starting with apps like Duolingo to learn fundamental vocabulary and grammar, then switching to PollyTalkie to enhance your conversation skills and fluency. Our strength is helping you progress from 'knowing the language' to 'naturally using the language'!" },
    { type: 'user', text: "That sounds interesting. How much time would I need to commit each day?" },
    { type: 'bot', text: "That's entirely up to you! Some learners chat with me for just 10 minutes daily, while others enjoy longer 30-minute conversations. The key is consistency - even short, regular practice sessions lead to significant improvement over time." },
    { type: 'user', text: "Will I actually become fluent using this app?" },
    { type: 'bot', text: "Fluency comes from regular practice and real-world application. PollyTalkie provides the conversation practice that's often missing from traditional learning. I'll help you build confidence, develop natural speech patterns, and prepare you for real-world conversations. Many of our users report breakthrough moments when traveling abroad!" },
    { type: 'user', text: "How much does it cost?" },
    { type: 'bot', text: "PollyTalkie offers a free plan with limited daily conversations, and premium plans with hourly costs below 2 dollars! Why not just start with our free plan and see how you like it?" }
  ], [locale])

  // Reference to the chat container for auto-scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [currentDialogIndex, isTyping])

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    // Auto-advance the conversation with appropriate animations
    if (currentDialogIndex < dialogMessages.length - 1) {
      const currentMessage = dialogMessages[currentDialogIndex];
      const nextMessage = dialogMessages[currentDialogIndex + 1];
      
      if (currentMessage.type === 'bot' && nextMessage.type === 'user') {
        // After bot message, simulate user typing
        timer = setTimeout(() => {
          // Start user typing animation
          setUserTyping(true);
          
          // Gradually type out the user message in the input field
          let charIndex = 0;
          const userMessage = nextMessage.text;
          const typingInterval = setInterval(() => {
            if (charIndex <= userMessage.length) {
              setUserInputValue(userMessage.substring(0, charIndex));
              charIndex++;
            } else {
              clearInterval(typingInterval);
              
              // After typing completes, wait a moment then send the message
              setTimeout(() => {
                setUserTyping(false);
                setUserInputValue("");
                setCurrentDialogIndex(prev => prev + 1);
              }, 500);
            }
          }, 50);
          
          // Store the interval in our timer reference for cleanup
          timer = typingInterval as unknown as NodeJS.Timeout;
        }, 2000);
      } else if (currentMessage.type === 'user' && nextMessage.type === 'bot') {
        // After user message, show bot typing indicator
        timer = setTimeout(() => {
          setIsTyping(true);
          
          // Simulate typing time based on message length
          const typingDelay = nextMessage.text.length * 20 + 500;
          
          const botTypingTimer = setTimeout(() => {
            setIsTyping(false);
            
            // After typing is done, show the bot message
            setTimeout(() => {
              setCurrentDialogIndex(prev => prev + 1);
            }, 300);
          }, typingDelay);
          
          timer = botTypingTimer;
        }, 1800);
      }
    } else {
      // When conversation is complete, restart after a delay
      timer = setTimeout(() => {
        setCurrentDialogIndex(0);
        setUserInputValue("");
        setUserTyping(false);
        setIsTyping(false);
      }, 15000); // Wait 15 seconds before restarting
    }
    
    // Cleanup function to clear any timers
    return () => {
      if (timer) clearTimeout(timer);
    }
  }, [currentDialogIndex, dialogMessages])
  
  const features = [
    {
      icon: ChatBubbleIcon,
      title: t('home.features.naturalConversations.title'),
      description: t('home.features.naturalConversations.description')
    },
    {
      icon: GlobeIcon,
      title: t('home.features.multipleLanguages.title'),
      description: t('home.features.multipleLanguages.description')
    },
    {
      icon: PersonIcon,
      title: t('home.features.personalizedLearning.title'),
      description: t('home.features.personalizedLearning.description')
    },
    {
      icon: RocketIcon,
      title: t('home.features.rapidProgress.title'),
      description: t('home.features.rapidProgress.description')
    }
  ]

  
  return (
    <AnimatePresence>
      <main className="flex min-h-screen flex-col items-center">
        {/* Hero Section with Dialog */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left side: App intro */}
              <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <Logo size={80} />
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    {locale === 'zh' ? (
                      <>
                        博语通 <span className="text-2xl font-normal text-muted-foreground">(PollyTalkie)</span>
                      </>
                    ) : (
                      'PollyTalkie'
                    )}
                  </h1>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-[550px] md:text-xl"
                >
                  <p className="mb-4 text-2xl font-bold text-primary">
                    {locale === 'zh' ? 
                      "使用博语通，像说母语一样流利使用新语言！" :
                      "Learn with PollyTalkie, speak like a native!"}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-300">
                    {locale === 'zh' ? 
                      "语言学习新境界：自然对话，真实场景，为你量身定制。" :
                      "Language learning reimagined: Natural conversations, real-world scenarios, personalized to you."}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                >
                  <Button size="lg">{t('home.buttons.startLearning')}</Button>
                  <Button size="lg" variant="outline">{t('home.buttons.tryDemo')}</Button>
                  <Link href="/download">
                    <Button 
                      size="lg" 
                      variant="secondary" 
                      className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border-2 border-primary/20"
                    >
                      <Download className="h-5 w-5" />
                      <span>{t('home.buttons.downloadApp')}</span>
                      <QrCode className="h-5 w-5 ml-1" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
              
              {/* Right side: Chat demo */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto"
              >
                <div className="bg-muted rounded-xl shadow-lg overflow-hidden">
                  {/* Chat header */}
                  <div className="flex items-center p-4 border-b bg-background/80">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <Logo size={32} />
                    </div>
                    <div>
                      <h3 className="font-bold">Polly</h3>
                      <p className="text-sm text-muted-foreground">{locale === 'zh' ? '您的AI语言老师' : 'Your AI Language Tutor'}</p>
                    </div>
                  </div>
                  
                  {/* Chat messages */}
                  <div 
                    ref={chatContainerRef}
                    className="p-4 space-y-4 h-[400px] overflow-y-auto scroll-smooth"
                  >
                    {dialogMessages.slice(0, currentDialogIndex + 1).map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[90%] p-3 rounded-lg ${message.type === 'user' 
                            ? 'bg-primary text-primary-foreground rounded-tr-none' 
                            : 'bg-secondary text-secondary-foreground rounded-tl-none'}`}
                        >
                          <p>{message.text}</p>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing indicator */}
                    {isTyping && currentDialogIndex < dialogMessages.length - 1 && (
                      <div className="flex justify-start">
                        <div className="bg-secondary text-secondary-foreground rounded-lg rounded-tl-none p-3 max-w-[90%]">
                          <div className="flex space-x-1">
                            <motion.div 
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 0.5 }}
                              className="w-2 h-2 bg-current rounded-full"
                            />
                            <motion.div 
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 0.5, delay: 0.15 }}
                              className="w-2 h-2 bg-current rounded-full"
                            />
                            <motion.div 
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 0.5, delay: 0.3 }}
                              className="w-2 h-2 bg-current rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Chat input with simulated user typing */}
                  <div className="p-3 border-t bg-background/80">
                    <div className="flex items-center bg-background rounded-lg border px-3 py-2">
                      <input 
                        type="text" 
                        disabled
                        value={userInputValue}
                        placeholder={locale === 'zh' ? "输入您的消息..." : "Type your message..."}
                        className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                      />
                      <button 
                        disabled
                        className={`ml-2 p-1 rounded-full transition-colors ${userInputValue.length > 0 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 2L11 13"></path>
                          <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                        </svg>
                      </button>
                    </div>
                    {userTyping && (
                      <div className="text-xs text-muted-foreground mt-1 ml-2">{locale === 'zh' ? "正在输入..." : "Typing..."}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section with Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tighter text-center mb-12"
            >
              {t('home.features.title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
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
            
            {/* Testimonials integrated within the features section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <h3 className="text-2xl font-bold tracking-tighter text-center mb-2">
                {locale === 'zh' ? '用户评价' : 'What Our Users Say'}
              </h3>
              <p className="text-muted-foreground max-w-[700px] mx-auto text-center mb-8">
                {locale === 'zh' ? '听听我们的学习者如何评价博语通（PollyTalkie）' : 'Hear from our community of language learners'}
              </p>
              <Testimonials />
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              >
                {t('home.cta.title')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mx-auto max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400"
              >
                {t('home.cta.description')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Button size="lg" className="mt-4">
                  {t('home.cta.button')}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </AnimatePresence>
  )
}
