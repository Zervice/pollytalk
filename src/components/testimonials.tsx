'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/i18n-context'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Quote as QuoteIcon } from 'lucide-react'
import { getAssetPath } from '@/lib/utils'

export function Testimonials() {
  const { t, locale } = useI18n()
  
  // Hardcoded testimonials based on locale
  const testimonials = locale === 'zh' ? [
    {
      name: "李明",
      location: "北京，中国",
      image: "/testimonials/user1.jpg",
      text: "博语通（PollyTalkie）完全改变了我学习英语的方式。AI对话非常自然，我在3个月内的进步比传统课堂2年的学习还要多！"
    },
    {
      name: "张伟",
      location: "上海，中国",
      image: "/testimonials/user2.jpg",
      text: "作为一个有语言学习焦虑的人，博语通（PollyTalkie）对我来说是一个改变游戏规则的工具。我可以练习英语而不用担心被评判，个性化的反馈帮助我纠正了我甚至不知道自己有的发音问题。"
    },
    {
      name: "王芳",
      location: "广州，中国",
      image: "/testimonials/user3.jpg",
      text: "性价比令人难以置信！我曾经每小时花¥400请家教，但现在我每天都能以更低的价格练习日语。无限版计划中的专业词汇主题非常适合我的商务需求。"
    },
    {
      name: "刘强",
      location: "成都，中国",
      image: "/testimonials/user4.jpg",
      text: "我尝试过市面上所有的语言学习应用，博语通（PollyTalkie）是迄今为止最有效的。AI能适应我的学习风格，并在恰到好处的水平上挑战我。我的德语在短短几周内就有了显著提高！"
    },
    {
      name: "陈静",
      location: "深圳，中国",
      image: "/testimonials/user5.jpg",
      text: "全天候支持非常棒！每当我对学习路径或技术问题有疑问时，团队都会迅速回应。无限版计划中的专属顾问帮助我创建了完美的学习计划。"
    },
    {
      name: "赵阳",
      location: "杭州，中国",
      image: "/testimonials/user6.jpg",
      text: "作为一名语言老师，我对博语通（PollyTalkie）的教学方法印象深刻。它将语法自然地融入对话的方式非常出色。我现在向我所有的学生推荐它！"
    }
  ] : [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      image: "/testimonials/user1.jpg",
      text: "PollyTalkie has completely transformed my Spanish learning journey. The AI conversations feel incredibly natural, and I've made more progress in 3 months than I did in 2 years of traditional classes!"
    },
    {
      name: "Michael Chen",
      location: "Toronto, Canada",
      image: "/testimonials/user2.jpg",
      text: "As someone who struggled with language learning anxiety, PollyTalkie has been a game-changer. I can practice French without the fear of judgment, and the personalized feedback has helped me correct pronunciation issues I didn't even know I had."
    },
    {
      name: "Emma Rodriguez",
      location: "London, UK",
      image: "/testimonials/user3.jpg",
      text: "The value for money is incredible! I was spending $60 per hour with a tutor, but now I practice Japanese daily for a fraction of the cost. The specialized vocabulary topics in the Unlimited plan are perfect for my business needs."
    },
    {
      name: "David Kim",
      location: "Sydney, Australia",
      image: "/testimonials/user4.jpg",
      text: "I've tried every language app out there, and PollyTalkie is by far the most effective. The AI adapts to my learning style and challenges me at just the right level. My German has improved dramatically in just weeks!"
    },
    {
      name: "Sophia Patel",
      location: "Berlin, Germany",
      image: "/testimonials/user5.jpg",
      text: "The 24/7 support is fantastic! Whenever I have questions about my learning path or technical issues, the team responds quickly. The dedicated consultant in the Unlimited plan has helped me create a perfect study schedule."
    },
    {
      name: "Lucas Moreau",
      location: "Paris, France",
      image: "/testimonials/user6.jpg",
      text: "As a language teacher myself, I'm impressed by the pedagogical approach of PollyTalkie. The way it integrates grammar naturally into conversations is brilliant. I now recommend it to all my students!"
    }
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, testimonials.length]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <div className="max-w-4xl mx-auto">
      <div 
        className="relative" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="overflow-hidden">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`${
                  index === activeIndex ? 'block' : 'hidden'
                } bg-card rounded-lg shadow-lg p-6 md:p-8`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="flex-shrink-0">
                    <Avatar className="h-20 w-20 border-2 border-primary">
                      <AvatarImage src={getAssetPath(testimonial.image)} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <QuoteIcon className="h-8 w-8 text-primary/20 mb-2" />
                      <p className="text-lg italic">{testimonial.text}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonial navigation dots */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setAutoplay(false);
                setTimeout(() => setAutoplay(true), 10000);
              }}
              className={`h-3 w-3 rounded-full transition-colors ${
                index === activeIndex
                  ? 'bg-primary'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
