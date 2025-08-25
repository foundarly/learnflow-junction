import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Award,
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Building,
  MessageSquare
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      title: 'Course Management',
      description: 'Create, organize, and deliver comprehensive course content with ease',
      icon: BookOpen
    },
    {
      title: 'Student Collaboration', 
      description: 'Foster teamwork with group projects and interactive discussions',
      icon: Users
    },
    {
      title: 'Smart Scheduling',
      description: 'Automated calendar management for classes, assignments, and events',
      icon: Calendar
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor student progress with detailed analytics and reporting',
      icon: Award
    },
    {
      title: 'Multi-College Support',
      description: 'Manage multiple educational institutions from a single platform',
      icon: Building
    },
    {
      title: 'Real-time Communication',
      description: 'Built-in messaging and collaboration tools for seamless interaction',
      icon: MessageSquare
    }
  ];

  const benefits = [
    'Role-based access control for different user types',
    'Interactive dashboards for all stakeholders', 
    'Comprehensive resource sharing capabilities',
    'Assignment creation and grading tools',
    'Calendar integration and scheduling',
    'Progress tracking and analytics'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl text-foreground">LearnFlow</span>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign In</Button>
              </Link>
              <Link to="/login">
                <Button size="sm" className="text-sm px-4">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Modern EdTech Platform for
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mt-2">
              Collaborative Learning
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Empower colleges with comprehensive course management, student collaboration tools, 
            and intelligent analytics. Built for educators, designed for success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="gap-2 w-full sm:min-w-[200px]">
                Try Demo
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:min-w-[200px] text-white border-white/20 hover:bg-white/10">
                View Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Everything You Need for Digital Education
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Comprehensive tools designed to streamline educational workflows and enhance learning experiences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-hover border-border/50 h-full">
                  <CardHeader className="pb-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-3 sm:mb-4">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
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

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-surface">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                Built for Modern Educational Institutions
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Our platform adapts to your institution's unique needs, providing role-based 
                access and comprehensive management tools for all stakeholders.
              </p>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/login">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Start Your Journey
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-hero rounded-2xl opacity-10"></div>
              <Card className="relative border-border/50">
                <CardHeader>
                  <CardTitle className="text-center text-lg sm:text-xl">Demo Access</CardTitle>
                  <CardDescription className="text-center text-sm sm:text-base">
                    Try our platform with different user roles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
                    <div className="flex justify-between p-2 sm:p-3 rounded bg-muted/50">
                      <span className="font-medium">Super Admin:</span>
                      <span className="text-muted-foreground truncate ml-2">super@admin.com</span>
                    </div>
                    <div className="flex justify-between p-2 sm:p-3 rounded bg-muted/50">
                      <span className="font-medium">College Admin:</span>
                      <span className="text-muted-foreground truncate ml-2">admin@techuni.edu</span>
                    </div>
                    <div className="flex justify-between p-2 sm:p-3 rounded bg-muted/50">
                      <span className="font-medium">Trainer:</span>
                      <span className="text-muted-foreground truncate ml-2">sarah.trainer@techuni.edu</span>
                    </div>
                    <div className="flex justify-between p-2 sm:p-3 rounded bg-muted/50">
                      <span className="font-medium">Staff:</span>
                      <span className="text-muted-foreground truncate ml-2">mike.staff@techuni.edu</span>
                    </div>
                    <div className="flex justify-between p-2 sm:p-3 rounded bg-muted/50">
                      <span className="font-medium">Student:</span>
                      <span className="text-muted-foreground truncate ml-2">alice.student@techuni.edu</span>
                    </div>
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

      {/* Statistics Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Trusted by Educational Institutions
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Join the growing community of educators and students
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Educational Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Courses Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm sm:text-base text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Transform Your Educational Experience?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join hundreds of educational institutions already using LearnFlow to 
            deliver exceptional learning experiences.
          </p>
          
          <Link to="/login">
            <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto sm:min-w-[240px]">
              Get Started Today
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-6 sm:py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-semibold text-foreground">LearnFlow</span>
            </div>
            
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-right">
              © 2024 LearnFlow. Modern EdTech Platform for Collaborative Learning.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
