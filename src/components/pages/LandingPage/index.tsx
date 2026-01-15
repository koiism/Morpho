'use client'

import React from 'react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, ScrollText, Users, Dna } from 'lucide-react'
import { Link } from '@/i18n/routing'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
}

export const LandingPage = () => {
  const t = useTranslations('LandingPage')

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-6 md:px-12">
          <div className="text-2xl font-bold font-serif tracking-tighter text-primary">Morpho</div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground hover:bg-accent/10"
              >
                {t('nav.login')}
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-foreground text-background hover:bg-muted-foreground">
                {t('nav.signup')}
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm backdrop-blur-sm">
                <Sparkles className="w-3 h-3 mr-2" />
                <span>{t('hero.badge')}</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif tracking-tight leading-tight">
                {t('hero.titlePrefix')} <br />
                <span className="text-primary">{t('hero.titleHighlight')}</span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-lg shadow-primary/20"
                >
                  {t('hero.startJourney')} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base border-border bg-card/50 hover:bg-card hover:text-foreground backdrop-blur-sm"
                >
                  {t('hero.exploreFeatures')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </main>

        {/* Features Section */}
        <section
          id="features"
          className="py-24 px-6 md:px-12 bg-background/50 backdrop-blur-md border-t border-border"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Dna className="w-6 h-6 text-primary" />}
                title={t('features.worldGeneration.title')}
                description={t('features.worldGeneration.description')}
              />
              <FeatureCard
                icon={<Users className="w-6 h-6 text-chart-2" />}
                title={t('features.intelligentCharacters.title')}
                description={t('features.intelligentCharacters.description')}
              />
              <FeatureCard
                icon={<ScrollText className="w-6 h-6 text-chart-3" />}
                title={t('features.dynamicStorytelling.title')}
                description={t('features.dynamicStorytelling.description')}
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center text-muted-foreground text-sm border-t border-border/50">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </footer>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/50 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-card-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
