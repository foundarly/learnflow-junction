import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Award,
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Building,
  MessageSquare,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Star,
  Play,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Quote
} from 'lucide-react';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for animations
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      title: 'Smart Course Management',
      description: 'AI-powered course creation with automated content organization and intelligent scheduling',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Collaborative Learning', 
      description: 'Real-time collaboration tools with integrated video calls and interactive whiteboards',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Advanced Analytics',
      description: 'Deep insights into learning patterns with predictive performance analytics',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Smart Scheduling',
      description: 'Automated calendar management with conflict resolution and optimal time allocation',
      icon: Calendar,
      color: 'bg-orange-500'
    },
    {
      title: 'Secure Infrastructure',
      description: 'Enterprise-grade security with SSO integration and complete data protection',
      icon: Shield,
      color: 'bg-red-500'
    },
    {
      title: 'Lightning Fast',
      description: 'Optimized performance with sub-second load times and offline capabilities',
      icon: Zap,
      color: 'bg-yellow-500'
    }
  ];

  const benefits = [
    'Advanced role-based access control with custom permissions',
    'Real-time collaborative editing and instant synchronization', 
    'Comprehensive analytics dashboard with actionable insights',
    'Automated grading system with AI-powered feedback',
    'Mobile-first design with progressive web app features',
    'Integration with 50+ third-party educational tools'
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Dean of Academic Affairs',
      institution: 'Tech University',
      content: 'LearnFlow has transformed our entire educational ecosystem. Student engagement increased by 300% and administrative overhead reduced by 60%.',
      rating: 5,
      avatar: '👩‍🏫'
    },
    {
      name: 'Prof. Michael Chen',
      role: 'Computer Science Department',
      institution: 'Innovation College',
      content: 'The most intuitive educational platform we\'ve ever used. Our faculty adopted it instantly, and students love the seamless experience.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Student Council President',
      institution: 'Future Academy',
      content: 'As a student, LearnFlow makes learning enjoyable and collaborative. The mobile app is perfect for studying on the go.',
      rating: 5,
      avatar: '👩‍🎓'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for small institutions',
      features: [
        'Up to 500 students',
        'Basic course management',
        'Email support',
        'Mobile apps',
        '5GB storage'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$149',
      period: '/month',
      description: 'Ideal for growing institutions',
      features: [
        'Up to 2,000 students',
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
        '50GB storage',
        'Video conferencing'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large institutions',
      features: [
        'Unlimited students',
        'White-label solution',
        '24/7 dedicated support',
        'Custom development',
        'Unlimited storage',
        'Advanced security'
      ],
      popular: false
    }
  ];

  const stats = [
    { value: '500+', label: 'Educational Institutions', icon: Building },
    { value: '50K+', label: 'Active Students', icon: Users },
    { value: '10K+', label: 'Courses Created', icon: BookOpen },
    { value: '98%', label: 'Satisfaction Rate', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl text-foreground">LearnFlow</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#demo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Demo</a>
            </nav>
            
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/login">
                <Button size="sm" className="bg-gradient-primary hover:opacity-90">Get Started</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
              <nav className="flex flex-col space-y-3">
                <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
                <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
                <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
                <a href="#demo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Demo</a>
                <div className="flex flex-col gap-2 pt-3 border-t border-border">
                  <Link to="/login" className="w-full">
                    <Button variant="ghost" size="sm" className="w-full justify-start">Sign In</Button>
                  </Link>
                  <Link to="/login" className="w-full">
                    <Button size="sm" className="w-full bg-gradient-primary hover:opacity-90">Get Started</Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 bg-gradient-hero text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
        
        <div className="relative container mx-auto max-w-6xl text-center">
          <div 
            className="flex justify-center mb-6 sm:mb-8 animate-scale-in"
            data-animate
            id="hero-icon"
          >
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          
          <div 
            className={`transition-all duration-1000 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            data-animate
            id="hero-title"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              The Future of
              <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent mt-2">
                Educational Technology
              </span>
            </h1>
          </div>
          
          <div 
            className={`transition-all duration-1000 delay-300 ${isVisible['hero-description'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            data-animate
            id="hero-description"
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-4">
              Transform education with AI-powered course management, collaborative learning tools, 
              and intelligent analytics. Join thousands of institutions revolutionizing learning.
            </p>
          </div>
          
          <div 
            className={`transition-all duration-1000 delay-500 ${isVisible['hero-buttons'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            data-animate
            id="hero-buttons"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 mb-12">
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="xl" variant="secondary" className="gap-3 w-full sm:min-w-[220px] hover:scale-105 transition-transform">
                  <Play className="h-5 w-5" />
                  Watch Demo
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="xl" variant="outline" className="w-full sm:min-w-[220px] text-white border-white/20 hover:bg-white/10 hover:scale-105 transition-transform">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div 
            className={`transition-all duration-1000 delay-700 ${isVisible['trust-indicators'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            data-animate
            id="trust-indicators"
          >
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-white/60">
              <div className="text-sm">Trusted by 500+ institutions</div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-current text-yellow-400" />
                ))}
                <span className="ml-2 text-sm">4.9/5 rating</span>
              </div>
              <div className="text-sm">99.9% uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-surface/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className={`text-center transition-all duration-1000 ${isVisible[`stat-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  data-animate
                  id={`stat-${index}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-primary mb-3 sm:mb-4">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 lg:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div 
            className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible['features-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            data-animate
            id="features-header"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1">Features</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Everything You Need for Modern Education
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools designed to streamline educational workflows and enhance learning experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className={`card-hover border-border/50 h-full transition-all duration-1000 ${isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  data-animate
                  id={`feature-${index}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 lg:py-24 px-4 bg-surface/50">
        <div className="container mx-auto max-w-6xl">
          <div 
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible['testimonials-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            data-animate
            id="testimonials-header"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1">Testimonials</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Loved by Educators Worldwide
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              See what educators and students are saying about their LearnFlow experience
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="p-8 sm:p-12">
                <div className="text-center">
                  <Quote className="h-12 w-12 text-primary mx-auto mb-6" />
                  <blockquote className="text-lg sm:text-xl lg:text-2xl text-foreground mb-8 leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-4xl">{testimonials[currentTestimonial].avatar}</div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">{testimonials[currentTestimonial].name}</div>
                      <div className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</div>
                      <div className="text-sm text-muted-foreground">{testimonials[currentTestimonial].institution}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-20 lg:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div 
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible['pricing-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            data-animate
            id="pricing-header"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Choose Your Perfect Plan
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Flexible pricing options designed to scale with your institution's needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative border-border/50 h-full transition-all duration-1000 ${
                  plan.popular ? 'ring-2 ring-primary scale-105' : ''
                } ${isVisible[`pricing-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                data-animate
                id={`pricing-${index}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-primary text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl sm:text-5xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-success shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/login" className="w-full block">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-primary hover:opacity-90' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-16 sm:py-20 lg:py-24 px-4 bg-surface/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div 
              className={`order-2 lg:order-1 transition-all duration-1000 ${isVisible['demo-content'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              data-animate
              id="demo-content"
            >
              <Badge variant="outline" className="mb-4 px-4 py-1">Try Demo</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                Experience LearnFlow in Action
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Our platform adapts to your institution's unique needs, providing role-based 
                access and comprehensive management tools for all stakeholders.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/login">
                <Button size="lg" className="gap-2 bg-gradient-primary hover:opacity-90">
                  Try Demo Now
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>

            <div 
              className={`relative order-1 lg:order-2 transition-all duration-1000 ${isVisible['demo-card'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
              data-animate
              id="demo-card"
            >
              <div className="absolute inset-0 bg-gradient-hero rounded-2xl opacity-10"></div>
              <Card className="relative border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-center text-lg sm:text-xl">Demo Access</CardTitle>
                  <CardDescription className="text-center text-sm sm:text-base">
                    Try our platform with different user roles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
                    {[
                      { role: 'Super Admin', email: 'super@admin.com' },
                      { role: 'College Admin', email: 'admin@techuni.edu' },
                      { role: 'Trainer', email: 'sarah.trainer@techuni.edu' },
                      { role: 'Staff', email: 'mike.staff@techuni.edu' },
                      { role: 'Student', email: 'alice.student@techuni.edu' }
                    ].map((account, index) => (
                      <div key={index} className="flex justify-between p-2 sm:p-3 rounded bg-muted/50 hover:bg-muted/70 transition-colors">
                        <span className="font-medium">{account.role}:</span>
                        <span className="text-muted-foreground truncate ml-2">{account.email}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    Use any password to access demo accounts
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div 
            className={`transition-all duration-1000 ${isVisible['cta-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            data-animate
            id="cta-content"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Transform Education?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto px-4">
              Join thousands of educational institutions already using LearnFlow to 
              deliver exceptional learning experiences and drive student success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="xl" variant="secondary" className="gap-2 w-full sm:min-w-[200px] hover:scale-105 transition-transform">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="xl" variant="outline" className="w-full sm:min-w-[200px] text-white border-white/20 hover:bg-white/10 hover:scale-105 transition-transform">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 sm:py-12 px-4 bg-surface/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="font-bold text-xl text-foreground">LearnFlow</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                The most advanced educational technology platform, designed for modern institutions 
                and collaborative learning environments.
              </p>
              <div className="flex space-x-4">
                <Globe className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
                <MessageSquare className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
                <Users className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#demo" className="hover:text-foreground transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              © 2024 LearnFlow. All rights reserved. Modern EdTech Platform for Collaborative Learning.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Made with ❤️ for education</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;