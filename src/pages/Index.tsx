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
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl text-foreground">LearnFlow</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Modern EdTech Platform for
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Collaborative Learning
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Empower colleges with comprehensive course management, student collaboration tools, 
            and intelligent analytics. Built for educators, designed for success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="xl" variant="secondary" className="gap-2 min-w-[200px]">
                Try Demo
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="xl" variant="outline" className="min-w-[200px] text-white border-white/20 hover:bg-white/10">
                View Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need for Digital Education
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed to streamline educational workflows and enhance learning experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-hover border-border/50">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
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
      <section className="py-20 px-4 bg-surface">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Built for Modern Educational Institutions
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our platform adapts to your institution's unique needs, providing role-based 
                access and comprehensive management tools for all stakeholders.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/login">
                  <Button size="lg" className="gap-2">
                    Start Your Journey
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero rounded-2xl opacity-10"></div>
              <Card className="relative border-border/50">
                <CardHeader>
                  <CardTitle className="text-center">Demo Access</CardTitle>
                  <CardDescription className="text-center">
                    Try our platform with different user roles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between p-2 rounded bg-muted/50">
                      <span className="font-medium">Super Admin:</span>
                      <span className="text-muted-foreground">super@admin.com</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-muted/50">
                      <span className="font-medium">College Admin:</span>
                      <span className="text-muted-foreground">admin@techuni.edu</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-muted/50">
                      <span className="font-medium">Trainer:</span>
                      <span className="text-muted-foreground">sarah.trainer@techuni.edu</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-muted/50">
                      <span className="font-medium">Staff:</span>
                      <span className="text-muted-foreground">mike.staff@techuni.edu</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-muted/50">
                      <span className="font-medium">Student:</span>
                      <span className="text-muted-foreground">alice.student@techuni.edu</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Use any password to access demo accounts
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Educational Experience?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of educational institutions already using LearnFlow to 
            deliver exceptional learning experiences.
          </p>
          
          <Link to="/login">
            <Button size="xl" variant="secondary" className="gap-2">
              Get Started Today
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-6 w-6 rounded bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-semibold text-foreground">LearnFlow</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 LearnFlow. Modern EdTech Platform for Collaborative Learning.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
