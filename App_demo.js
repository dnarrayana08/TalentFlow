import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, Sun, Moon, ChevronDown, Settings, LogOut, Rocket, 
  Clock, 
  User, 
  BookOpen, 
  Award, 
  MessageCircle, 
  Search, 
  FileText, 
  Play, 
  Star,
  ChevronRight,
  Bot,
  Target,
  Calendar,
  Zap,
  Trophy,
  Timer,
  ArrowUp,
  Bell,
  X,
  BarChart3,
  Users,
  TrendingUp,
  Shield,
  UserCheck
} from 'lucide-react';
import OfficeTour from "./OfficeTour";

const TransitionLoader = ({ progress, message = "Loading..." }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(103, 126, 234, 0.95)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    color: 'white'
  }}>
    <Bot size={48} color="white" style={{ 
      marginBottom: '24px', 
      animation: 'pulse 1.5s ease-in-out infinite' 
    }} />
    <h3 style={{ fontSize: '24px', margin: '0 0 16px 0' }}>{message}</h3>
    <div style={{
      width: '300px',
      height: '4px',
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: '2px',
      overflow: 'hidden'
    }}>
      <div style={{
        height: '100%',
        backgroundColor: 'white',
        width: `${progress}%`,
        borderRadius: '2px',
        transition: 'width 0.3s ease'
      }} />
    </div>
    <p style={{ fontSize: '14px', margin: '8px 0 0 0', opacity: 0.8 }}>
      {Math.round(progress)}% Complete
    </p>
  </div>
);

// NEW: View Wrapper Component for Smooth Fade Transitions
const ViewWrapper = ({ children, isVisible }) => (
  <div style={{
    opacity: isVisible ? 1 : 0,
    filter: isVisible ? 'blur(0px)' : 'blur(20px)',
    transform: isVisible ? 'scale(1)' : 'scale(0.9)',
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: isVisible ? 'relative' : 'absolute',
    width: '100%',
    minHeight: '100vh'
  }}>
    {children}
  </div>
);

// Simplified SVG Icons
const Brain = ({ s = 24, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
  </svg>
);


const PieChart = ({ s = 24, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
    <path d="M22 12A10 10 0 0 0 12 2v10z"/>
  </svg>
);

const Plus = ({ s = 24, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);



const ClipboardCheck = ({ s = 24, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <path d="m9 14 2 2 4-4"/>
  </svg>
);

const UploadCloud = ({ s = 24, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
    <path d="m12 12-3 3h2v3h2v-3h2l-3-3"/>
  </svg>
);

const Activity = ({ s = 24, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

const MessageSquare = ({ s = 24, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);


const UserPlus = ({ s = 24, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <line x1="19" x2="19" y1="8" y2="14"/>
    <line x1="22" x2="16" y1="11" y2="11"/>
  </svg>
);

const Archive = ({ s = 24, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
    <rect width="20" height="5" x="2" y="3" rx="1"/>
    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/>
    <path d="M10 12h4"/>
  </svg>
);

const Eye = ({ s = 24, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);


const Download = ({ s = 24, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
  </svg>
);

const Filter = ({ s = 24, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);



// ENHANCED: Main App Component with Advanced Transition System
const App = () => {
  const [currentView, setCurrentView] = useState('main');
  // NEW: Transition state management
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [targetView, setTargetView] = useState('');

  const handleViewChange = async (newView) => {
  setIsTransitioning(true);
  setLoadingProgress(0);
  setTargetView(newView); // <- Add this line
  
  // Different messages for different transitions
  const messages = {
    employee: "Loading Employee Portal...",
    hr: "Loading HR Dashboard...",
    main: "Returning to Main Dashboard..."
  };
  
  // Simulate realistic loading with progress increments
  const progressInterval = setInterval(() => {
    setLoadingProgress(prev => {
      if (prev >= 100) {
        clearInterval(progressInterval);
        // Small delay after 100% for smooth transition
        setTimeout(() => {
          setCurrentView(newView);
          setIsTransitioning(false);
          setLoadingProgress(0);
        }, 300);
        return 100;
      }
      // Randomized progress increments for realistic feel
      return prev + Math.random() * 25 + 5;
    });
  }, 120);
};


  // NEW: Enhanced Render Function with Loading States
  const renderCurrentView = () => {
    // Show loading screen during transitions
    if (isTransitioning) {
      const messages = {
        employee: "Loading Employee Portal...",
        hr: "Loading HR Dashboard...",
        main: "Returning to Main Dashboard..."
      };
      return (
        <TransitionLoader 
          progress={loadingProgress} 
          message={messages[targetView] || "Loading..."}  
        />
      );
    }

    // Render appropriate view with transition wrapper
    switch(currentView) {
      case 'employee':
        return (
          <ViewWrapper isVisible={!isTransitioning}>
            <TalentFlowEmployeeDashboard onBack={() => handleViewChange('main')} />
          </ViewWrapper>
        );
      case 'hr':
        return (
          <ViewWrapper isVisible={!isTransitioning}>
            <HRDashboard onBack={() => handleViewChange('main')} />
          </ViewWrapper>
        );
      default:
        return (
          <ViewWrapper isVisible={!isTransitioning}>
            <TalentFlowMainDashboard 
              onEmployeeAccess={() => handleViewChange('employee')}
              onHRAccess={() => handleViewChange('hr')}
            />
          </ViewWrapper>
        );
    }
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {renderCurrentView()}
      
      {/* ENHANCED: Global Styles with New Animations */}
      <style jsx global>{`
        /* Original animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes confetti-fall { 
          to { transform: translateY(100vh) rotate(720deg); opacity: 0; } 
        }
        
        /* NEW: Stagger animation for employee dashboard elements */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* NEW: Pulse animation for loading spinner */
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1;
          }
          50% { 
            transform: scale(1.1); 
            opacity: 0.8;
          }
        }
        
        /* NEW: Smooth transitions for all interactive elements */
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Enhanced button hover effects */
        button:hover { 
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
        
        button:active {
          transform: translateY(0);
        }
        
        /* Global styles */
        * { 
          box-sizing: border-box; 
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        /* NEW: Smooth scrolling for better UX */
        html {
          scroll-behavior: smooth;
        }
        
        /* NEW: Custom scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
};


// Main Dashboard Component
const TalentFlowMainDashboard = ({ onEmployeeAccess, onHRAccess }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const theme = {
    bg: '#F7F9FC',
    cardBg: '#FFFFFF',
    text: '#2D3748',
    textSecondary: '#718096',
    border: '#E2E8F0',
    accent: '#38B2AC',
    primary: '#0EA5E9',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    employeeGradient: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%)',
    hrGradient: 'linear-gradient(135deg, #38B2AC 0%, #10B981 100%)',
  };

  const cardStyle = {
    backgroundColor: theme.cardBg,
    borderRadius: '20px',
    border: `1px solid ${theme.border}`,
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const getHoverStyle = (isHovered) => ({
    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 20px 40px rgba(0, 0, 0, 0.15)' : '0 8px 25px rgba(0, 0, 0, 0.08)',
  });


  const handleCardClick = (action, cardType) => {
    const card = document.querySelector(`[data-card="${cardType}"]`);
    if (card) {
      card.style.transform = 'scale(0.98)';
      card.style.transition = 'transform 0.1s ease';
      setTimeout(() => {
        card.style.transform = 'scale(1)';
        setTimeout(action, 100);
      }, 100);
    } else {
      action();
    }
  };

  const FloatingElements = () => (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${theme.primary}20, ${theme.accent}20)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <FloatingElements />
      
      {/* Header */}
      <header style={{
        padding: '24px 0',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}>
              <Bot size={28} color="white" />
            </div>
            <span style={{ 
              fontWeight: 'bold', 
              fontSize: '32px', 
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              TalentFlow
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
          
          {/* Hero Section */}
          <div style={{ marginBottom: '80px' }}>
            <h1 style={{ 
              fontSize: '56px', 
              fontWeight: 'bold', 
              margin: '0 0 24px 0', 
              lineHeight: 1.1,
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Welcome to TalentFlow
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: 'rgba(255, 255, 255, 0.9)', 
              maxWidth: '600px', 
              margin: '0 auto',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              Your comprehensive platform for seamless onboarding, employee management, and organizational growth.
            </p>
          </div>

          {/* Access Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '40px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            
            {/* Employee Access Card */}
            <div 
              style={{
                ...cardStyle,
                ...getHoverStyle(hoveredCard === 'employee'),
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
              }}
              onMouseEnter={() => setHoveredCard('employee')}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={onEmployeeAccess}
            >
              <div style={{ padding: '40px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: theme.employeeGradient,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px auto',
                  boxShadow: '0 8px 20px rgba(14, 165, 233, 0.3)',
                }}>
                  <User size={40} color="white" />
                </div>
                
                <h2 style={{ 
                  fontSize: '28px', 
                  fontWeight: '700', 
                  margin: '0 0 16px 0',
                  color: theme.text 
                }}>
                  Employee Access
                </h2>
                
                <p style={{ 
                  fontSize: '16px', 
                  color: theme.textSecondary, 
                  margin: '0 0 32px 0',
                  lineHeight: 1.6
                }}>
                  Complete your onboarding journey, track learning progress, and access personalized resources.
                </p>

                {/* Employee Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {[
                    { icon: CheckCircle, text: 'Onboarding Tasks' },
                    { icon: Star, text: 'Learning Paths' },
                    { icon: Award, text: 'Achievement System' },
                  ].map((feature, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <feature.icon size={20} color={theme.primary} />
                      <span style={{ fontSize: '14px', color: theme.textSecondary }}>{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '8px',
                  color: theme.primary,
                  fontWeight: '600'
                }}>
                  <span>Get Started</span>
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>

            {/* HR Access Card */}
            <div 
              style={{
                ...cardStyle,
                ...getHoverStyle(hoveredCard === 'hr'),
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
              }}
              onMouseEnter={() => setHoveredCard('hr')}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={onHRAccess}
            >
              <div style={{ padding: '40px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: theme.hrGradient,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px auto',
                  boxShadow: '0 8px 20px rgba(56, 178, 172, 0.3)',
                }}>
                  <Users size={40} color="white" />
                </div>
                
                <h2 style={{ 
                  fontSize: '28px', 
                  fontWeight: '700', 
                  margin: '0 0 16px 0',
                  color: theme.text 
                }}>
                  HR Dashboard
                </h2>
                
                <p style={{ 
                  fontSize: '16px', 
                  color: theme.textSecondary, 
                  margin: '0 0 32px 0',
                  lineHeight: 1.6
                }}>
                  Manage employee onboarding, track progress, and access comprehensive analytics and reports.
                </p>

                {/* HR Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {[
                    { icon: BarChart3, text: 'Analytics & Reports' },
                    { icon: UserCheck, text: 'Employee Management' },
                    { icon: TrendingUp, text: 'Progress Tracking' },
                  ].map((feature, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <feature.icon size={20} color={theme.accent} />
                      <span style={{ fontSize: '14px', color: theme.textSecondary }}>{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '8px',
                  color: theme.accent,
                  fontWeight: '600'
                }}>
                  <span>Access Dashboard</span>
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Stats */}
          <div style={{ 
            marginTop: '80px',
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '32px',
            maxWidth: '800px',
            margin: '80px auto 0 auto'
          }}>
            {[
              { number: '500+', label: 'Employees Onboarded' },
              { number: '95%', label: 'Completion Rate' },
              { number: '4.9/5', label: 'User Satisfaction' },
              { number: '24/7', label: 'AI Support' }
            ].map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <h3 style={{ 
                  fontSize: '32px', 
                  fontWeight: 'bold', 
                  margin: '0 0 8px 0', 
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  {stat.number}
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: 0,
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

// Your existing Employee Dashboard Component (with back button added)
const TalentFlowEmployeeDashboard = ({ onBack }) => {

  // --- STATE MANAGEMENT (From AI Version) ---
  const [activeTab, setActiveTab] = React.useState('overview');
  const [completedTasks, setCompletedTasks] = React.useState(new Set());
  const [searchQuery, setSearchQuery] = React.useState('');
  const [points, setPoints] = React.useState(245);
  const [level, setLevel] = React.useState(2);
  const [darkMode, setDarkMode] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [showAIAvatar, setShowAIAvatar] = React.useState(false);
  const [celebrationMode, setCelebrationMode] = React.useState(false);
  const [removingTasks, setRemovingTasks] = React.useState(new Set());
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [taskVerifications, setTaskVerifications] = React.useState(new Map());
  const [uploadedFiles, setUploadedFiles] = React.useState(new Map());
  const [pendingVerifications, setPendingVerifications] = React.useState(new Set());
  const profileRef = React.useRef(null);
  const [removedTasks, setRemovedTasks] = React.useState(new Set());
  const [confettiTriggered, setConfettiTriggered] = React.useState(new Set());
  const [notifications, setNotifications] = React.useState([
      { id: 1, message: "Security training deadline in 2 days", type: "warning", time: "2h ago" },
      { id: 2, message: "New team member joined Design Team", type: "info", time: "4h ago" },
      { id: 3, message: "You've earned the 'First Steps' achievement!", type: "success", time: "1d ago" }
    ]);
  const [chatOpen, setChatOpen] = React.useState(false);
const [welcomeInitialized, setWelcomeInitialized] = React.useState(false);
const [currentAvatarMessage, setCurrentAvatarMessage] = React.useState('');
const [avatarSequenceStep, setAvatarSequenceStep] = React.useState(0);
const [isAvatarMode, setIsAvatarMode] = React.useState(true); // New state to track mode
const [chatMessages, setChatMessages] = React.useState([]);
const [currentMessage, setCurrentMessage] = React.useState('');
const [isTyping, setIsTyping] = React.useState(false);
const [welcomeCompleted, setWelcomeCompleted] = React.useState(false);
const [expandedAnswers, setExpandedAnswers] = React.useState(new Set());
const [selectedCategory, setSelectedCategory] = React.useState('All');

const isLargeScreen = typeof window !== 'undefined' && window.innerWidth >= 1024;

// AI-specific states
  const [personalizedPaths, setPersonalizedPaths] = React.useState([]);
  const [isLoadingPaths, setIsLoadingPaths] = React.useState(false);
  const [aiInsights, setAiInsights] = React.useState({
    predictedCompletion: null, recommendations: [], benchmarks: {}, nudges: [],
  });
  const [isLoadingInsights, setIsLoadingInsights] = React.useState(false);

  // --- DATA (Combined from both versions) ---
  const employee = {
    name: "Sarah Chen",
    role: "Senior Product Designer", 
    department: "Design Team",
    startDate: "2025-08-15",
    avatar: "SC"
  };


  const onboardingTasks = [
  { 
    id: 1, 
    title: "Complete Personal Information Form", 
    type: "document", 
    urgent: true, 
    points: 20, 
    estimatedTime: "5 min",
    verificationType: "file_upload",
    acceptedFiles: [".pdf", ".doc", ".docx"],
    description: "Upload completed personal information form"
  },
  { 
    id: 2, 
    title: "Sign Employment Contract", 
    type: "document", 
    urgent: true, 
    points: 25, 
    estimatedTime: "10 min",
    verificationType: "file_upload",
    acceptedFiles: [".pdf"],
    description: "Upload signed employment contract"
  },
  { 
    id: 3, 
    title: "Setup IT Equipment", 
    type: "checklist", 
    urgent: false, 
    points: 15, 
    estimatedTime: "30 min",
    verificationType: "checklist",
    checklistItems: [
      "Computer setup and login successful",
      "Email account configured",
      "VPN access tested",
      "Required software installed"
    ]
  },
  { 
    id: 4, 
    title: "Company Security Training", 
    type: "training", 
    urgent: true, 
    points: 30, 
    estimatedTime: "45 min",
    verificationType: "quiz",
    minimumScore: 80,
    description: "Complete security training and pass quiz with 80% or higher"
  },
  { 
    id: 5, 
    title: "Meet Your Team", 
    type: "meeting", 
    urgent: false, 
    points: 20, 
    estimatedTime: "60 min",
    verificationType: "confirmation",
    description: "Manager will confirm completion after team introductions"
  },
  { 
    id: 6, 
    title: "Office Tour & Safety Briefing", 
    type: "checklist", 
    urgent: false, 
    points: 15, 
    estimatedTime: "20 min",
    verificationType: "qr_scan",
    description: "Scan QR codes at each safety checkpoint during tour"
  }
];

  const staggerStyle = (delay) => ({
    animation: `fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both ${delay}s`
  });

  const achievements = [
    { id: 1, title: "First Steps", description: "Completed your first onboarding task", earned: true },
    { id: 2, title: "Document Master", description: "Signed all required documents", earned: true },
    { id: 3, title: "Culture Explorer", description: "Finished company culture training", earned: false, progress: 75 },
    { id: 4, title: "Team Player", description: "Met with your entire team", earned: false, progress: 0 }
  ];

  const knowledgeBase = [
  {
    id: 1,
    question: "How do I access company email?",
    answer: "Your company email has been set up with your username@company.com. You can access it through:\n• Outlook Web App: portal.office.com\n• Mobile app: Download Outlook mobile\n• Desktop: Contact IT for Outlook setup\n\nYour temporary password was sent to your personal email.",
    category: "IT & Systems",
    tags: ["email", "outlook", "login"]
  },
  {
    id: 2,
    question: "What are the office hours and remote work policies?",
    answer: "Our flexible work policy includes:\n\n**Office Hours:**\n• Core hours: 9:00 AM - 5:00 PM\n• Flexible start: 8:00 AM - 10:00 AM\n• Lunch break: 12:00 PM - 1:00 PM\n\n**Remote Work:**\n• Up to 3 days remote per week\n• Must be in office on Tuesdays (team day)\n• Get manager approval for full remote days\n• Use Slack to communicate your location",
    category: "Policies",
    tags: ["hours", "remote", "flexible", "work"]
  },
  {
    id: 3,
    question: "Where can I find the employee handbook?",
    answer: "The employee handbook is available in multiple locations:\n\n• **SharePoint:** company.sharepoint.com/handbook\n• **Intranet:** Go to Resources → Policies\n• **Physical copy:** Available from HR desk\n• **Mobile app:** TalentFlow app → Documents\n\nThe handbook includes policies, benefits, code of conduct, and emergency procedures.",
    category: "HR & Policies",
    tags: ["handbook", "policies", "resources"]
  },
  {
    id: 4,
    question: "How do I request time off?",
    answer: "To request time off:\n\n**Steps:**\n1. Log into the HR portal (portal.company.com)\n2. Go to 'Time Off' section\n3. Select dates and type (vacation/sick/personal)\n4. Add manager for approval\n5. Submit request\n\n**Policies:**\n• Submit 2 weeks advance for vacation\n• Sick days can be same-day requests\n• You have 15 vacation days + 10 sick days annually\n• Unused vacation days roll over (max 5 days)",
    category: "Benefits",
    tags: ["vacation", "time off", "pto", "sick leave"]
  },
  {
    id: 5,
    question: "What benefits am I eligible for?",
    answer: "As a full-time employee, you're eligible for:\n\n**Health & Wellness:**\n• Medical, dental, vision insurance\n• $500 annual wellness stipend\n• Mental health support through BetterHelp\n\n**Financial:**\n• 401(k) with 4% company match\n• Stock options (vesting over 4 years)\n• Life insurance (2x annual salary)\n\n**Other Perks:**\n• $1,200 learning & development budget\n• Flexible PTO policy\n• Free lunch Fridays\n• Gym membership reimbursement",
    category: "Benefits",
    tags: ["benefits", "insurance", "401k", "wellness"]
  },
  {
    id: 6,
    question: "How do I set up my development environment?",
    answer: "Development environment setup:\n\n**For Designers:**\n• Figma: Use company email to join workspace\n• Adobe Creative Suite: Download from company portal\n• Sketch: License key in IT welcome email\n• Color palettes & assets: design-system.company.com\n\n**Access:**\n• VPN: Download GlobalConnect VPN\n• GitHub: You'll be added to company organization\n• Design system: Credentials in welcome packet\n\n**Need help?** Contact IT helpdesk: it-help@company.com or Slack #it-support",
    category: "IT & Systems",
    tags: ["development", "setup", "figma", "tools"]
  },
  {
    id: 7,
    question: "Who do I contact for HR questions?",
    answer: "HR Support Contacts:\n\n**General HR:** Sarah Johnson\n• Email: sarah.j@company.com\n• Phone: (555) 123-4567\n• Office: Building A, Room 201\n\n**Benefits Questions:** Mike Chen\n• Email: benefits@company.com\n• Phone: (555) 123-4568\n\n**IT Support:**\n• Help Desk: it-support@company.com\n• Slack: #it-support\n• Emergency: (555) 123-HELP\n\n**Payroll:** payroll@company.com",
    category: "Contacts",
    tags: ["hr", "contact", "support", "help"]
  },
  {
    id: 8,
    question: "What's the company culture like?",
    answer: "Our company culture is built on:\n\n**Core Values:**\n• Innovation: We embrace new ideas and take calculated risks\n• Collaboration: We work better together\n• Transparency: Open communication at all levels\n• Growth: We invest in each other's development\n\n**What to Expect:**\n• Monthly all-hands meetings with CEO\n• Team building events and social hours\n• Learning & development opportunities\n• Open feedback culture with regular 1:1s\n• Casual dress code and flexible work environment\n\n**Community:**\n• Employee resource groups (ERGs)\n• Volunteer time off for community service\n• Company-wide slack channels for interests",
    category: "Culture",
    tags: ["culture", "values", "team", "community"]
  }
];

  const analytics = { avgLearningTime: "2.3 hours/day", completionRate: 67, peerComparison: "+15%", streakDays: 3, nextMilestone: "Complete 3 more modules to unlock Culture Explorer badge", weeklyProgress: [ { day: 'Mon', minutes: 120 }, { day: 'Tue', minutes: 90 }, { day: 'Wed', minutes: 150 }, { day: 'Thu', minutes: 180 }, { day: 'Fri', minutes: 140 }, { day: 'Sat', minutes: 60 }, { day: 'Sun', minutes: 85 } ] };
  
  // --- THEME (Merged from both versions) ---
  const getTheme = () => {
    if (darkMode) {
      return {
        bg: '#0B1120',
        cardBg: '#1A202C',
        headerBg: 'rgba(26, 32, 44, 0.8)',
        text: '#E2E8F0',
        textSecondary: '#A0AEC0',
        border: '#2D3748',
        accent: '#38B2AC', // Teal accent
        primary: '#0EA5E9', // Main bright blue
        taskBg: '#2D3748',
      };
    }
    return {
      bg: '#F7F9FC',
      cardBg: '#FFFFFF',
      headerBg: 'rgba(255, 255, 255, 0.8)',
      text: '#2D3748',
      textSecondary: '#718096',
      border: '#E2E8F0',
      accent: '#38B2AC', // Teal accent from the design for secondary elements
      primary: '#0EA5E9', // The main bright blue
      taskBg: '#F7F9FC',
    };
  };
  const theme = getTheme();

  const generateAIInsights = async (userProfile, progressData) => {
  setIsLoadingInsights(true);
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer INSERT YOUR API KEY HERE`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemma2-9b-it',
        messages: [
          {
            role: 'system',
            content: `You are an AI analytics engine for employee onboarding. Analyze progress data and provide actionable insights.
            
            You must respond with ONLY a valid JSON object, no additional text.
            Return exactly this structure:
            {
              "predictedCompletion": "Aug 28",
              "daysAhead": 2,
              "recommendations": [
                {
                  "type": "module",
                  "title": "Focus on Security Training",
                  "reason": "You spend 40% less time on compliance modules",
                  "urgency": "medium"
                }
              ],
              "benchmarks": {
                "roleComparison": "+23% vs Design Team average",
                "departmentRank": "Top 15%",
                "companyPercentile": 78
              },
              "nudges": [
                {
                  "type": "timing",
                  "message": "Your energy is highest on Thursdays — try a challenging module today!",
                  "icon": "⚡"
                }
              ]
            }
            
            IMPORTANT: Return ONLY the JSON object, no other text.`
          },
          {
            role: 'user',
            content: `Analyze this employee's onboarding data:
            
            EMPLOYEE PROFILE:
            - Name: ${userProfile.name}
            - Role: ${userProfile.role}
            - Department: ${userProfile.department}flm
            - Start Date: ${userProfile.startDate}
            
            PROGRESS DATA:
            - Tasks Completed: ${completedTasks.size}/${onboardingTasks.length}
            - Current Points: ${points}
            - Level: ${level}
            - Completion Rate: ${Math.round((completedTasks.size / onboardingTasks.length) * 100)}%
            - Days Since Start: ${Math.ceil((new Date() - new Date(userProfile.startDate)) / (1000 * 60 * 60 * 24))}
            - Weekly Learning: ${analytics.weeklyProgress.reduce((a, b) => a + b.minutes, 0)} minutes
            - Streak: ${analytics.streakDays} days
            
            Provide insights on completion timeline, personalized recommendations, smart benchmarks, and motivational nudges.`
          }
        ],
        temperature: 0.3,
        max_tokens: 800
      })
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    let insightsText = data.choices[0].message.content.trim();
    
    // Clean JSON response
    const jsonStart = insightsText.indexOf('{');
    const jsonEnd = insightsText.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) {
      insightsText = insightsText.substring(jsonStart, jsonEnd + 1);
    }
    
    const insights = JSON.parse(insightsText);
    setAiInsights(insights);
    
  } catch (error) {
    console.error('Error generating AI insights:', error);
    // Enhanced fallback insights
    setAiInsights(getFallbackInsights(userProfile));
  }
  setIsLoadingInsights(false);
};

// Fallback insights when API fails
const getFallbackInsights = (userProfile) => {
  const daysElapsed = Math.ceil((new Date() - new Date(userProfile.startDate)) / (1000 * 60 * 60 * 24));
  const completionRate = (completedTasks.size / onboardingTasks.length) * 100;
  const remainingTasks = onboardingTasks.length - completedTasks.size;
  const estimatedDays = Math.ceil(remainingTasks / (completedTasks.size / daysElapsed || 1));
  
  return {
    predictedCompletion: new Date(Date.now() + estimatedDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    daysAhead: Math.max(0, 7 - estimatedDays),
    recommendations: [
      {
        type: "focus",
        title: "Complete High-Priority Tasks",
        reason: `You have ${onboardingTasks.filter(t => t.urgent && !completedTasks.has(t.id)).length} urgent tasks remaining`,
        urgency: "high"
      },
      {
        type: "learning",
        title: "Explore Learning Modules",
        reason: "Boost your completion rate with quick wins",
        urgency: "medium"
      }
    ],
    benchmarks: {
      roleComparison: `+${Math.floor(Math.random() * 20 + 10)}% vs ${userProfile.role}s`,
      departmentRank: `Top ${Math.floor(Math.random() * 25 + 10)}%`,
      companyPercentile: Math.floor(completionRate * 0.8 + Math.random() * 20)
    },
    nudges: [
      {
        type: "motivation",
        message: `You're ${completionRate.toFixed(0)}% complete — great momentum!`,
        icon: "🚀"
      },
      {
        type: "timing",
        message: "Monday energy boost — tackle a challenging module!",
        icon: "⚡"
      }
    ]
  };
};  

  const generatePersonalizedPaths = async (userProfile) => {
  setIsLoadingPaths(true);
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer INSERT YOUR API KEY HERE`, 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemma2-9b-it',
        messages: [
          {
            role: 'system',
            content: `You are an AI that creates personalized onboarding learning paths for new employees. 
            You must respond with ONLY a valid JSON array, no additional text or explanations.
            Return exactly this JSON structure:
            [
              {
                "id": 1,
                "title": "Learning Path Title",
                "description": "Brief description",
                "priority": "high",
                "estimatedTime": "2h 30m",
                "modules": 4,
                "completed": 0,
                "progress": 0,
                "relevanceReason": "Explanation of why this is relevant"
              }
            ]
            
            IMPORTANT: Return ONLY the JSON array, no other text before or after.`
          },
          {
            role: 'user',
            content: `Create 3-4 personalized learning paths for this employee profile:
            Name: ${userProfile.name}
            Role: ${userProfile.role}
            Department: ${userProfile.department}
            Experience Level: ${userProfile.experienceLevel || 'Mid-level'}
            Previous Skills: ${userProfile.previousSkills || 'General business skills'}
            
            Focus on company-specific training and skip basic skills they likely already have. Make the paths relevant to a ${userProfile.role} in ${userProfile.department}.`
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    let pathsText = data.choices[0].message.content.trim();
    
    // Clean up the response to ensure it's valid JSON
    // Remove any text before the JSON array
    const jsonStart = pathsText.indexOf('[');
    const jsonEnd = pathsText.lastIndexOf(']');
    
    if (jsonStart !== -1 && jsonEnd !== -1) {
      pathsText = pathsText.substring(jsonStart, jsonEnd + 1);
    }
    
    // Parse the JSON response
    const paths = JSON.parse(pathsText);
    
    // Validate the response structure
    if (Array.isArray(paths) && paths.length > 0) {
      setPersonalizedPaths(paths);
    } else {
      throw new Error('Invalid response format');
    }
    
  } catch (error) {
    console.error('Error generating personalized paths:', error);
    // Enhanced fallback with role-based paths
    const fallbackPaths = getRoleBasedFallbackPaths(userProfile);
    setPersonalizedPaths(fallbackPaths);
  }
  setIsLoadingPaths(false);
};

// Helper function for role-based fallback paths
const getRoleBasedFallbackPaths = (userProfile) => {
  const basePaths = [
    {
      id: 1,
      title: "Company Culture & Values",
      description: "Learn about our mission, values, and workplace culture",
      priority: "high",
      estimatedTime: "2h 30m",
      modules: 4,
      completed: 0,
      progress: 0,
      relevanceReason: "Essential for all new employees to understand company culture"
    }
  ];

  // Role-specific paths
  if (userProfile.role?.toLowerCase().includes('designer')) {
    basePaths.push(
      {
        id: 2,
        title: "Design System & Brand Guidelines",
        description: "Master our design system, components, and brand standards",
        priority: "high",
        estimatedTime: "3h 15m",
        modules: 6,
        completed: 0,
        progress: 0,
        relevanceReason: "Critical for designers to maintain consistency across all products"
      },
      {
        id: 3,
        title: "User Research & Testing Process",
        description: "Learn our UX research methodologies and testing protocols",
        priority: "medium",
        estimatedTime: "2h 45m",
        modules: 5,
        completed: 0,
        progress: 0,
        relevanceReason: "Essential for creating user-centered designs in our workflow"
      }
    );
  } else if (userProfile.role?.toLowerCase().includes('engineer') || userProfile.role?.toLowerCase().includes('developer')) {
    basePaths.push(
      {
        id: 2,
        title: "Technical Architecture Overview",
        description: "Understand our system architecture, APIs, and development stack",
        priority: "high",
        estimatedTime: "4h 30m",
        modules: 8,
        completed: 0,
        progress: 0,
        relevanceReason: "Essential for engineers to understand our technical infrastructure"
      },
      {
        id: 3,
        title: "Development Workflow & CI/CD",
        description: "Learn our git workflow, code review process, and deployment pipeline",
        priority: "high",
        estimatedTime: "2h 15m",
        modules: 4,
        completed: 0,
        progress: 0,
        relevanceReason: "Critical for following our development practices and deployment process"
      }
    );
  } else if (userProfile.role?.toLowerCase().includes('manager') || userProfile.role?.toLowerCase().includes('lead')) {
    basePaths.push(
      {
        id: 2,
        title: "Leadership & Management Practices",
        description: "Our approach to team management, 1:1s, and performance reviews",
        priority: "high",
        estimatedTime: "3h 45m",
        modules: 7,
        completed: 0,
        progress: 0,
        relevanceReason: "Essential for managers to align with our leadership principles and processes"
      }
    );
  }

  // Add general professional development path
  basePaths.push({
    id: basePaths.length + 1,
    title: "Professional Development & Growth",
    description: "Career development resources and growth opportunities",
    priority: "low",
    estimatedTime: "1h 30m",
    modules: 3,
    completed: 0,
    progress: 0,
    relevanceReason: "Helps all employees understand career growth opportunities and resources"
  });

  return basePaths;
};


  
  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    const userMessage = { id: Date.now(), sender: 'user', message: currentMessage.trim(), timestamp: new Date() };
    setChatMessages(prev => [...prev, userMessage]);
    await sendMessageToHR(currentMessage.trim(), employee, chatMessages);
    setCurrentMessage('');

    setTimeout(() => {
    const input = document.querySelector('input[placeholder="Ask me anything..."]');
    if (input && chatOpen) {
      input.focus();
    }
  }, 100);
  };
  
  // --- HELPER FUNCTIONS & COMPONENTS ---
  

  const Confetti = () => {
    if (!showConfetti) return null;
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
        {[...Array(50)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute', width: '10px', height: '10px',
            backgroundColor: [theme.primary, theme.accent, '#f59e0b', '#ef4444'][i % 4],
            left: `${Math.random() * 100}%`, top: '-10px', animation: `confetti-fall 3s linear forwards`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}/>
        ))}
      </div>
    );
  };

const toggleAnswer = (questionId) => {
  const newExpanded = new Set(expandedAnswers);
  if (newExpanded.has(questionId)) {
    newExpanded.delete(questionId);
  } else {
    newExpanded.add(questionId);
  }
  setExpandedAnswers(newExpanded);
};

const getCategories = () => {
  const categories = ['All', ...new Set(knowledgeBase.map(item => item.category))];
  return categories;
};

const getFilteredQuestions = () => {
  let filtered = knowledgeBase;
  
  // Filter by category
  if (selectedCategory !== 'All') {
    filtered = filtered.filter(item => item.category === selectedCategory);
  }
  
  // Filter by search query
  if (searchQuery) {
    filtered = filtered.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }
  
  return filtered;
};

const AIAvatarChatSystem = ({ isActive, message, onComplete, onAvatarClick }) => {
  const [currentText, setCurrentText] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [showPulse, setShowPulse] = React.useState(true);
  const [typingIntervalId, setTypingIntervalId] = React.useState(null);
  
  React.useEffect(() => {
    if (!isActive || !message) return;
    
    // Clear any existing typing interval
    if (typingIntervalId) {
      clearInterval(typingIntervalId);
    }
    
    setIsTyping(true);
    setShowPulse(false);
    setCurrentText('');
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < message.length) {
        setCurrentText(message.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTypingIntervalId(null);
        setIsTyping(false);
        setTimeout(() => onComplete && onComplete(), 2000);
      }
    }, 50); // Consistent 50ms interval for smooth typing
    
    setTypingIntervalId(interval);
    
    // Cleanup function
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, message, onComplete]);
  
  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (typingIntervalId) clearInterval(typingIntervalId);
    };
  }, []);
  
  return (
    <>
      {/* AI Avatar - Only show when not in chat mode */}
      {!chatOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '16px',
          animation: isActive ? 'slideInFromRight 0.8s ease-out' : 'none',
          zIndex: 1000
        }}>
          {/* Speech Bubble */}
          {(currentText || isTyping) && (
            <div style={{
              position: 'relative',
              backgroundColor: theme.cardBg,
              border: `2px solid ${theme.primary}`,
              borderRadius: '20px',
              padding: '16px 20px',
              maxWidth: '300px',
              boxShadow: darkMode ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.15)',
              animation: 'bubbleIn 0.4s ease-out'
            }}>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: theme.text,
                lineHeight: '1.4',
                minHeight: '20px'
              }}>
                {currentText}
                {isTyping && (
                  <span style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '16px',
                    backgroundColor: theme.primary,
                    marginLeft: '2px',
                    animation: 'blink 1s infinite'
                  }} />
                )}
              </p>
              <div style={{
                position: 'absolute',
                bottom: '-8px',
                right: '30px',
                width: '16px',
                height: '16px',
                backgroundColor: theme.cardBg,
                border: `2px solid ${theme.primary}`,
                borderTop: 'none',
                borderLeft: 'none',
                transform: 'rotate(45deg)'
              }} />
            </div>
          )}
          
          {/* Avatar Button */}
          <div 
            onClick={() => onAvatarClick && onAvatarClick()}
            style={{
              position: 'relative',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: darkMode ? '0 8px 32px rgba(14, 165, 233, 0.4)' : '0 8px 32px rgba(14, 165, 233, 0.3)',
              animation: showPulse ? 'avatarPulse 2s infinite' : 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Bot size={35} color="white" />
            
            {/* Pulse rings */}
            {showPulse && (
              <>
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '-10px',
                  right: '-10px',
                  bottom: '-10px',
                  borderRadius: '50%',
                  border: `2px solid ${theme.primary}`,
                  opacity: 0.3,
                  animation: 'pulse 2s infinite'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '-20px',
                  right: '-20px',
                  bottom: '-20px',
                  borderRadius: '50%',
                  border: `2px solid ${theme.primary}`,
                  opacity: 0.2,
                  animation: 'pulse 2s infinite 0.5s'
                }} />
              </>
            )}
            
            {/* Status indicator */}
            <div style={{
              position: 'absolute',
              bottom: '5px',
              right: '5px',
              width: '14px',
              height: '14px',
              backgroundColor: '#10B981',
              borderRadius: '50%',
              border: '3px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }} />
          </div>
        </div>
      )}

      {/* Chat Window - Only show when chatOpen is true */}
      {chatOpen && (
        <div style={{ 
          ...cardStyle, 
          position: 'fixed', 
          bottom: '20px', 
          right: '20px', 
          width: '350px', 
          zIndex: 1000, 
          display: 'flex', 
          flexDirection: 'column', 
          height: '450px' 
        }}>
          <div style={{ 
            padding: '16px', 
            borderBottom: `1px solid ${theme.border}`, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexShrink: 0 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot color={theme.primary} size={20} />
              <h4 style={{ fontWeight: '600', margin: 0, fontSize: '16px', color: theme.text }}>
                AI Assistant
              </h4>
            </div>
            <button 
              onClick={() => setChatOpen(false)} 
              style={{ 
                color: theme.textSecondary, 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer' 
              }}
            >
              <X size={20} />
            </button>
          </div>
          
          <div 
            ref={el => el && el.scrollTo(0, el.scrollHeight)} 
            style={{ 
              flex: 1, 
              overflowY: 'auto', 
              padding: '16px', 
              backgroundColor: theme.taskBg 
            }}
          >
            {chatMessages.map(msg => (
              <div key={msg.id} style={{ 
                marginBottom: '12px', 
                display: 'flex', 
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' 
              }}>
                <div style={{ 
                  maxWidth: '80%', 
                  padding: '12px', 
                  borderRadius: '12px', 
                  fontSize: '14px',
                  backgroundColor: msg.sender === 'user' ? theme.primary : theme.cardBg,
                  color: msg.sender === 'user' ? 'white' : theme.text,
                }}>
                  {msg.message}
                </div>
              </div>
            ))}
            {isTyping && 
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '12px', backgroundColor: theme.cardBg, borderRadius: '12px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{width: '8px', height: '8px', backgroundColor: theme.textSecondary, borderRadius: '50%', animation: 'typing-bounce 1.4s ease-in-out infinite both'}}/>
                    <div style={{width: '8px', height: '8px', backgroundColor: theme.textSecondary, borderRadius: '50%', animation: 'typing-bounce 1.4s ease-in-out 0.2s infinite both'}}/>
                    <div style={{width: '8px', height: '8px', backgroundColor: theme.textSecondary, borderRadius: '50%', animation: 'typing-bounce 1.4s ease-in-out 0.4s infinite both'}}/>
                  </div>
                </div>
              </div>
            }
          </div>

          <div style={{ padding: '16px', borderTop: `1px solid ${theme.border}`, flexShrink: 0 }}>
  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
    <input 
      ref={(input) => {
        if (input && chatOpen && !isTyping) {
          // Auto-focus when chat opens and not typing
          setTimeout(() => input.focus(), 100);
        }
      }}
      type="text" 
      placeholder="Ask me anything..." 
      disabled={isTyping} 
      value={currentMessage} 
      onChange={(e) => setCurrentMessage(e.target.value)} 
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      }}
      onBlur={(e) => {
        // Prevent losing focus unless clicking outside chat
        if (chatOpen && !isTyping) {
          setTimeout(() => e.target.focus(), 10);
        }
      }}
      style={{ 
        flex: 1,
        padding: '12px 16px', 
        borderRadius: '24px', 
        border: `2px solid ${theme.border}`, 
        backgroundColor: theme.cardBg, 
        color: theme.text,
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.2s ease'
      }}
      onFocus={(e) => {
        e.target.style.borderColor = theme.primary;
      }}

    />
    <button
      onClick={handleSendMessage}
      disabled={!currentMessage.trim() || isTyping}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: currentMessage.trim() ? theme.primary : theme.border,
        color: 'white',
        border: 'none',
        cursor: currentMessage.trim() ? 'pointer' : 'not-allowed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        opacity: isTyping ? 0.5 : 1
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
      </svg>
    </button>
  </div>
</div>
          
          
        </div>
      )}
    </>
  );
};

const toggleTask = (taskId) => {
  const newCompleted = new Set(completedTasks);
  if (newCompleted.has(taskId)) {
    // Uncompleting a task
    newCompleted.delete(taskId);
    setCompletedTasks(newCompleted);
    setRemovedTasks(prev => {
      const newRemoved = new Set(prev);
      newRemoved.delete(taskId);
      return newRemoved;
    });
    setConfettiTriggered(prev => {
      const newTriggered = new Set(prev);
      newTriggered.delete(taskId);
      return newTriggered;
    });
    setPoints(prev => prev - 20);
  } else {
    // Completing a task - FIXED CELEBRATION
    newCompleted.add(taskId);
    setCompletedTasks(newCompleted);
    const task = onboardingTasks.find(t => t.id === taskId);
    setPoints(prev => prev + (task?.points || 20));
    
    // Only trigger confetti if not already triggered for this task
    if (!confettiTriggered.has(taskId)) {
      setConfettiTriggered(prev => new Set([...prev, taskId]));
      setCelebrationMode(true);
      
      // Single confetti trigger with timeout to prevent multiple calls
      setShowConfetti(false); // Reset first
      setTimeout(() => setShowConfetti(true), 100);
      
      // Play celebration sound (browser compatible)
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (e) {
        // Fallback for browsers without audio context
      }
      
      // End celebration - single timeout
      setTimeout(() => {
        setShowConfetti(false);
        setCelebrationMode(false);
      }, 3000);
    }

    // Task removal animation (same as before)
    setTimeout(() => {
      setRemovingTasks(prev => new Set([...prev, taskId]));
      setTimeout(() => {
        setRemovedTasks(prev => new Set([...prev, taskId]));
        setRemovingTasks(prev => {
          const newRemoving = new Set(prev);
          newRemoving.delete(taskId);
          return newRemoving;
        });
      }, 500);
    }, 2000);
  }
};

const startAvatarWelcome = () => {
  // Don't start if already completed OR already initialized
  if (welcomeCompleted || welcomeInitialized) return;
  
  setWelcomeInitialized(true); // Mark as initialized to prevent restarts
  
  const welcomeSequence = [
    `Hi ${employee.name.split(' ')[0]}! 👋 I'm your AI onboarding assistant.`,
    `I've analyzed your role as ${employee.role} and prepared a personalized journey for you.`,
    `Let's get you started with your first tasks. I'll be here to help every step of the way!`,
    `Click on me anytime to start chatting - I can answer questions, provide guidance, and help with your onboarding! 💬`
  ];
  
  setShowAIAvatar(true);
  setIsAvatarMode(true);
  setAvatarSequenceStep(0);
  
  const showNextMessage = (step) => {
    if (step < welcomeSequence.length) {
      setCurrentAvatarMessage(welcomeSequence[step]);
      setTimeout(() => {
        setAvatarSequenceStep(step + 1);
        showNextMessage(step + 1);
      }, 6000);
    } else {
      // End of sequence - mark as completed
      setTimeout(() => {
        setCurrentAvatarMessage('');
        setWelcomeCompleted(true);
      }, 6000);
    }
  };
  
  showNextMessage(0);
};


{/* Unified Chat FAB - Only show if avatar is not visible */}
{!showAIAvatar && (
  <button 
    onClick={() => {
      if (!chatOpen) {
        setChatOpen(true);
        setIsAvatarMode(false);
        // Initialize chat if empty
        if (chatMessages.length === 0) {
          setChatMessages([{
            id: 1,
            sender: 'bot',
            message: `Hi ${employee.name.split(' ')[0]}! 👋 I'm back to help! What can I assist you with today?`,
            timestamp: new Date()
          }]);
        }
      setTimeout(() => {
      const input = document.querySelector('input[placeholder="Ask me anything..."]');
      if (input) input.focus();
    }, 200);
      } else {
        setChatOpen(false);
      }
    }} 
    style={{
      position: 'fixed', 
      bottom: '24px', 
      right: '24px', 
      width: '56px', 
      height: '56px',
      borderRadius: '50%', 
      backgroundColor: theme.primary, 
      color: 'white', 
      border: 'none',
      cursor: 'pointer', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      boxShadow: `0 8px 16px rgba(14, 165, 233, ${darkMode ? 0.5 : 0.3})`, 
      transition: 'transform 0.2s ease',
      zIndex: 1001
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
    {chatOpen ? <X size={24} /> : <MessageCircle size={24} />}
  </button>
)}

const handleAvatarClick = () => {
  // Transition from avatar mode to chat mode
  setIsAvatarMode(false);
  setChatOpen(true);
  setCurrentAvatarMessage('');
  setWelcomeCompleted(true);
  // setShowAIAvatar(false); // Comment out or remove this line
  
  // Initialize chat with welcome message if empty
  if (chatMessages.length === 0) {
    setChatMessages([{
      id: 1,
      sender: 'bot',
      message: `Hi ${employee.name.split(' ')[0]}! 👋 I'm your AI assistant. I can help you with onboarding tasks, answer HR questions, or provide guidance. What would you like to know?`,
      timestamp: new Date()
    }]);
  }
};

const sendMessageToHR = async (message, userProfile, conversationHistory) => {
  setIsTyping(true);
  
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer INSERT YOUR API KEY HERE`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemma2-9b-it',
        messages: [
          {
            role: 'system',
            content: `You are an AI HR assistant for TalentFlow, helping ${userProfile.name}, a ${userProfile.role} in the ${userProfile.department}. You help with onboarding tasks, company policies, benefits, and general HR questions. 
            
            Current employee context:
            - Name: ${userProfile.name}
            - Role: ${userProfile.role}
            - Department: ${userProfile.department}
            - Start Date: ${userProfile.startDate}
            - Tasks Completed: ${completedTasks.size}/${onboardingTasks.length}
            - Points: ${points}
            - Level: ${level}
            
            Be helpful, friendly, and provide specific guidance related to their onboarding journey. If asked about tasks, reference their current progress. Keep responses concise but informative.`
          },
          // Include recent conversation history for context
          ...conversationHistory.slice(-5).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.message
          })),
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;
    
    const newBotMessage = { 
      id: Date.now(), 
      sender: 'bot', 
      message: botResponse, 
      timestamp: new Date() 
    };
    setChatMessages(prev => [...prev, newBotMessage]);
    
  } catch (error) {
    console.error('Error calling Groq API:', error);
    
    // Fallback response if API fails
    let fallbackResponse = "";
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('task') || lowerMessage.includes('onboarding')) {
      fallbackResponse = `I can help you with your onboarding tasks! You currently have ${onboardingTasks.length - completedTasks.size} tasks remaining. Would you like me to guide you through the next priority task?`;
    } else if (lowerMessage.includes('policy') || lowerMessage.includes('handbook')) {
      fallbackResponse = "You can find all company policies and the employee handbook in the Knowledge Base tab. I can also answer specific policy questions if you'd like!";
    } else {
      fallbackResponse = "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or check the Knowledge Base tab for immediate answers.";
    }
    
    const fallbackBotMessage = { 
      id: Date.now(), 
      sender: 'bot', 
      message: fallbackResponse, 
      timestamp: new Date() 
    };
    setChatMessages(prev => [...prev, fallbackBotMessage]);
  }
  
  setIsTyping(false);
};

{/* Unified Chat FAB - Only show if avatar is not visible */}
{!showAIAvatar && (
  <button 
    onClick={() => {
      if (!chatOpen) {
        setChatOpen(true);
        setIsAvatarMode(false);
        // Initialize chat if empty
        if (chatMessages.length === 0) {
          setChatMessages([{
            id: 1,
            sender: 'bot',
            message: `Hi ${employee.name.split(' ')[0]}! 👋 I'm back to help! What can I assist you with today?`,
            timestamp: new Date()
          }]);
        }
      } else {
        setChatOpen(false);
      }
    }} 
    style={{
      position: 'fixed', 
      bottom: '24px', 
      right: '24px', 
      width: '56px', 
      height: '56px',
      borderRadius: '50%', 
      backgroundColor: theme.primary, 
      color: 'white', 
      border: 'none',
      cursor: 'pointer', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      boxShadow: `0 8px 16px rgba(14, 165, 233, ${darkMode ? 0.5 : 0.3})`, 
      transition: 'transform 0.2s ease',
      zIndex: 1001
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
    {chatOpen ? <X size={24} /> : <MessageCircle size={24} />}
  </button>
)}

  React.useEffect(() => {
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfileOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  React.useEffect(() => {
    if (points >= 300) setLevel(3);
    else if (points >= 150) setLevel(2);
    else setLevel(1);
  }, [points]);

  React.useEffect(() => {
    // Generate insights when key data changes
    if (completedTasks.size > 0) {
      generateAIInsights(employee, analytics);
    }
  }, [completedTasks.size, points, level]);

  React.useEffect(() => {
  // Initialize only once when component mounts
  const initializeApp = () => {
    if (welcomeInitialized) return;
    
    setChatMessages([{
      id: 1, 
      sender: 'bot',
      message: `👋 Hi ${employee.name.split(' ')[0]}! I'm your AI assistant. How can I help you with your onboarding today?`,
    }]);
    
    generateAIInsights(employee); 
    generatePersonalizedPaths(employee);
    
    // Mark as initialized BEFORE starting welcome
    setWelcomeInitialized(true);
    
    // Start AI avatar welcome sequence
    setTimeout(() => {
      if (!welcomeCompleted) {
        startAvatarWelcome();
      }
    }, 1000);
  };
  
  initializeApp();
}, []); // Empty dependency array - runs only once


  


  const completionPercentage = Math.round((completedTasks.size / onboardingTasks.length) * 100);

  const DotsLoadingPaths = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '48px',
    gap: '24px'
  }}>
    <div style={{ display: 'flex', gap: '8px' }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          width: '12px',
          height: '12px',
          backgroundColor: theme.accent,
          borderRadius: '50%',
          animation: `bounce 1.4s ease-in-out ${(i - 1) * 0.2}s infinite both`
        }} />
      ))}
    </div>
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: theme.text, marginBottom: '8px' }}>🧠 AI is thinking...</h3>
      <p style={{ color: theme.textSecondary, fontSize: '14px' }}>
        Analyzing your profile to create personalized learning paths
      </p>
    </div>
  </div>
);
    const PredictiveInsightCard = ({ insight, loading }) => (
    <div style={{
      ...cardStyle,
      background: loading ? theme.cardBg : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: loading ? theme.text : 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{ padding: '24px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: loading ? theme.accent : 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Target size={16} color={loading ? 'white' : 'white'} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
            AI Prediction
          </h3>
        </div>
        
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              border: `2px solid ${theme.border}`,
              borderTop: `2px solid ${theme.accent}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <span style={{ fontSize: '14px', color: theme.textSecondary }}>
              Analyzing your progress...
            </span>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0' }}>
              You'll finish by {insight.predictedCompletion}
            </p>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
              {insight.daysAhead > 0 ? `${insight.daysAhead} days ahead of average!` : 'Right on track!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
  
  const RecommendationCard = ({ recommendations, loading }) => (
    <div style={cardStyle}>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Bot size={20} color={theme.accent} />
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: theme.text }}>
            AI Recommendations
          </h3>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              border: `2px solid ${theme.border}`,
              borderTop: `2px solid ${theme.accent}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 8px'
            }} />
            <p style={{ fontSize: '14px', color: theme.textSecondary, margin: 0 }}>
              Personalizing suggestions...
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recommendations.map((rec, index) => (
              <div key={index} style={{
                padding: '12px',
                backgroundColor: theme.taskBg,
                borderRadius: '8px',
                borderLeft: `4px solid ${
                  rec.urgency === 'high' ? '#ef4444' :
                  rec.urgency === 'medium' ? '#f59e0b' : '#10b981'
                }`,
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateX(4px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
              >
                <h4 style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 4px 0', color: theme.text }}>
                  {rec.title}
                </h4>
                <p style={{ fontSize: '12px', color: theme.textSecondary, margin: 0 }}>
                  {rec.reason}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
  const SmartBenchmarks = ({ benchmarks, loading }) => (
    <div style={cardStyle}>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <TrendingUp size={20} color={theme.accent} />
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: theme.text }}>
            Smart Benchmarks
          </h3>
        </div>
        
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                height: '40px',
                backgroundColor: theme.taskBg,
                borderRadius: '6px',
                animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite alternate`
              }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              padding: '12px',
              backgroundColor: theme.taskBg,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '14px', color: theme.text }}>vs. Role Peers</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#10b981' }}>
                {benchmarks.roleComparison}
              </span>
            </div>
            
            <div style={{
              padding: '12px',
              backgroundColor: theme.taskBg,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '14px', color: theme.text }}>Department Rank</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: theme.accent }}>
                {benchmarks.departmentRank}
              </span>
            </div>
            
            <div style={{
              padding: '12px',
              backgroundColor: theme.taskBg,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '14px', color: theme.text }}>Company Percentile</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#f59e0b' }}>
                {benchmarks.companyPercentile}th
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  const AINudges = ({ nudges, loading }) => (
    <div style={cardStyle}>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Zap size={20} color={theme.accent} />
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: theme.text }}>
            Smart Nudges
          </h3>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              border: `2px solid ${theme.border}`,
              borderTop: `2px solid ${theme.accent}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 8px'
            }} />
            <p style={{ fontSize: '14px', color: theme.textSecondary, margin: 0 }}>
              Generating insights...
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {nudges.map((nudge, index) => (
              <div key={index} style={{
                padding: '12px',
                backgroundColor: `${theme.accent}15`,
                borderRadius: '8px',
                border: `1px solid ${theme.accent}30`,
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = `${theme.accent}25`;
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = `${theme.accent}15`;
                e.target.style.transform = 'scale(1)';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{nudge.icon}</span>
                  <span style={{ fontSize: '14px', color: theme.text, fontWeight: '500' }}>
                    {nudge.message}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  // Style objects from "blue UI" version, using the dynamic theme
  const cardStyle = {
    backgroundColor: theme.cardBg,
    borderRadius: '16px',
    border: `1px solid ${theme.border}`,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  };

  const primaryButtonStyle = {
    backgroundColor: theme.primary,
    color: '#FFFFFF',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    boxShadow: `0 4px 6px rgba(14, 165, 233, ${darkMode ? 0.3 : 0.2})`,
  };

  const handleFileUpload = (taskId, file) => {
  if (!file) return;
  
  const task = onboardingTasks.find(t => t.id === taskId);
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  
  if (!task.acceptedFiles.includes(fileExtension)) {
    alert(`Please upload a file with one of these formats: ${task.acceptedFiles.join(', ')}`);
    return;
  }
  
  // Store file and mark as pending verification
  setUploadedFiles(prev => new Map(prev).set(taskId, file));
  setPendingVerifications(prev => new Set([...prev, taskId]));
  
  // Simulate HR review process (in real app, this would be sent to backend)
  setTimeout(() => {
    setTaskVerifications(prev => new Map(prev).set(taskId, 'approved'));
    setPendingVerifications(prev => {
      const newSet = new Set(prev);
      newSet.delete(taskId);
      return newSet;
    });
    toggleTask(taskId); // Mark as complete after approval
  }, 2000); // 2 second delay to simulate review
};

const handleChecklistSubmission = (taskId, checkedItems) => {
  const task = onboardingTasks.find(t => t.id === taskId);
  const allItemsChecked = checkedItems.length === task.checklistItems.length;
  
  if (!allItemsChecked) {
    alert('Please complete all checklist items before submitting.');
    return;
  }
  
  setTaskVerifications(prev => new Map(prev).set(taskId, 'approved'));
  toggleTask(taskId);
};

const handleQuizCompletion = (taskId, score) => {
  const task = onboardingTasks.find(t => t.id === taskId);
  
  if (score >= task.minimumScore) {
    setTaskVerifications(prev => new Map(prev).set(taskId, 'approved'));
    toggleTask(taskId);
  } else {
    alert(`Quiz score of ${score}% is below the required ${task.minimumScore}%. Please retake the training.`);
  }
};


const FileUploadComponent = ({ task, onUpload }) => {
  const [dragOver, setDragOver] = React.useState(false);
  const fileInputRef = React.useRef();
  
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) onUpload(task.id, files[0]);
  };
  
  return (
    <div style={{ marginTop: '12px' }}>
      <div 
        style={{
          border: `2px dashed ${dragOver ? theme.primary : theme.border}`,
          borderRadius: '8px',
          padding: '24px',
          textAlign: 'center',
          backgroundColor: dragOver ? `${theme.primary}10` : theme.taskBg,
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <FileText size={32} color={theme.textSecondary} style={{ marginBottom: '8px' }} />
        <p style={{ margin: '0 0 4px 0', color: theme.text }}>
          Drop file here or click to browse
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: theme.textSecondary }}>
          Accepted: {task.acceptedFiles.join(', ')}
        </p>
      </div>
      <input 
        ref={fileInputRef}
        type="file" 
        hidden 
        accept={task.acceptedFiles.join(',')}
        onChange={(e) => onUpload(task.id, e.target.files[0])}
      />
    </div>
  );
};

const ChecklistComponent = ({ task, onSubmit }) => {
  const [checkedItems, setCheckedItems] = React.useState([]);
  
  const toggleItem = (index) => {
    setCheckedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  return (
    <div style={{ marginTop: '12px' }}>
      {task.checklistItems.map((item, index) => (
        <div key={index} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '8px 0',
          borderBottom: index < task.checklistItems.length - 1 ? `1px solid ${theme.border}` : 'none'
        }}>
          <button
            onClick={() => toggleItem(index)}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              border: `2px solid ${checkedItems.includes(index) ? theme.primary : theme.border}`,
              backgroundColor: checkedItems.includes(index) ? theme.primary : 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {checkedItems.includes(index) && <CheckCircle color="white" size={14} />}
          </button>
          <span style={{ fontSize: '14px', color: theme.text }}>{item}</span>
        </div>
      ))}
      <button
        onClick={() => onSubmit(task.id, checkedItems)}
        disabled={checkedItems.length !== task.checklistItems.length}
        style={{
          ...primaryButtonStyle,
          marginTop: '16px',
          opacity: checkedItems.length !== task.checklistItems.length ? 0.5 : 1
        }}
      >
        Submit Checklist
      </button>
    </div>
  );
};

const QuizComponent = ({ task, onComplete }) => {
  const [quizStarted, setQuizStarted] = React.useState(false);
  
  const simulateQuiz = () => {
    setQuizStarted(true);
    // Simulate quiz completion with random score for demo
    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
      onComplete(task.id, score);
      setQuizStarted(false);
    }, 3000);
  };
  
  return (
    <div style={{ marginTop: '12px', textAlign: 'center' }}>
      {quizStarted ? (
        <div>
          <div style={{ marginBottom: '16px' }}>Taking quiz...</div>
          <div style={{
            width: '32px',
            height: '32px',
            border: `3px solid ${theme.border}`,
            borderTop: `3px solid ${theme.primary}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }} />
        </div>
      ) : (
        <button onClick={simulateQuiz} style={primaryButtonStyle}>
          Start Security Quiz
        </button>
      )}
    </div>
  );
};

  // --- JSX RENDER ---
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: theme.bg,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: theme.text,
      transition: 'all 0.3s ease',
      width: '100%',
      overflow: 'hidden',

    }}>
      <Confetti />
      
      {/* Header combining elements from both versions */}

      <header style={{
  padding: '16px 0', position: 'sticky', top: 0, zIndex: 50,
  backgroundColor: theme.headerBg, backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${theme.border}`,
}}>
  <div style={{
    maxWidth: '1280px', margin: '0 auto', padding: '0 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  }}>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button 
              onClick={onBack}
              style={{
                background: 'none',
                border: 'none',
                color: theme.textSecondary,
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              ← Back
            </button>
      <Bot size={28} color={theme.primary} />
      
      <span style={{ fontWeight: 'bold', fontSize: '20px', color: theme.text }}>TalentFlow</span>
      
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.textSecondary }}>
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <div style={{ position: 'relative', cursor: 'pointer' }}>
        <Bell size={20} color={theme.textSecondary} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }} />
      </div>
      
      {/* Profile Dropdown - Replace the existing profile div */}
      <div ref={profileRef} style={{ position: 'relative' }}>
        <button onClick={() => setIsProfileOpen(!isProfileOpen)} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer' }}>
          <div style={{width: '40px', height: '40px', backgroundColor: theme.primary, color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px'}}>{employee.avatar}</div>
          <div>
            <p style={{ margin: 0, fontWeight: '600', color: theme.text, textAlign: 'left' }}>{employee.name}</p>
            <p style={{ margin: 0, fontSize: '12px', color: theme.textSecondary }}>{employee.role}</p>
          </div>
          <ChevronDown size={16} color={theme.textSecondary} style={{ transition: 'transform 0.2s', transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>
        {isProfileOpen && (
          <div style={{...cardStyle, position: 'absolute', top: '120%', right: 0, width: '220px', zIndex: 60, overflow: 'hidden', padding: '8px' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {[{label: 'View Profile', icon: User}, {label: 'Settings', icon: Settings}, {label: 'Log Out', icon: LogOut}].map(item => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', textDecoration: 'none', color: theme.text, fontSize: '14px', transition: 'background-color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = theme.taskBg}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <Icon size={16} color={theme.textSecondary} /> {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  </div>
</header>
      
      <main>
        {/* Hero Section from the "blue UI" version */}
        <div style={{ 
            padding: '80px 24px',
            textAlign: 'center',
                background: darkMode ? 
      `linear-gradient(180deg, ${theme.cardBg} 0%, ${theme.bg} 100%)` : // Changed for dark mode
      `linear-gradient(180deg, #E0F2FE 0%, ${theme.bg} 100%)`,
    position: 'relative',
    overflow: 'hidden',
    // Add this to ensure full coverage
    minHeight: 'auto',
    width: '100%',
 
        }}>
              {/* Animated background elements */}
    <div style={{
      position: 'absolute',
      top: '20%',
      left: '10%',
      width: '100px',
      height: '100px',
      background: `radial-gradient(circle, ${theme.primary}20, transparent)`,
      borderRadius: '50%',
      animation: 'float 6s ease-in-out infinite'
    }} />
    <div style={{
      position: 'absolute',
      top: '60%',
      right: '15%',
      width: '60px',
      height: '60px',
      background: `radial-gradient(circle, ${theme.accent}20, transparent)`,
      borderRadius: '50%',
      animation: 'float 4s ease-in-out infinite reverse'
    }} />

            <h1 style={{ fontSize: '48px', fontWeight: 'bold', margin: '0 0 16px 0', lineHeight: 1.2, color: theme.text }}>
    {completedTasks.size === 0 ? 
        `Welcome aboard, ${employee.name.split(' ')[0]}! 🎉` : 
        completedTasks.size === onboardingTasks.length ? 
        `Congratulations, ${employee.name.split(' ')[0]}! You're all set! 🚀` :
        `Great progress, ${employee.name.split(' ')[0]}! Just ${onboardingTasks.length - completedTasks.size} tasks to go! ✨`
    }
</h1>
<p style={{ fontSize: '18px', color: theme.textSecondary, maxWidth: '600px', margin: '0 auto 40px auto' }}>
    {completedTasks.size === 0 ? 
        "Let's get you started with your personalized onboarding journey." :
        completedTasks.size >= onboardingTasks.length / 2 ?
        "You're doing amazing! Almost there!" :
        "Every task completed brings you closer to being fully onboarded."
    }
</p>
            {/* Replace the progress circle section with this corrected version */}
<div style={{
    width: '200px', height: '200px', margin: '40px auto',
    position: 'relative', display: 'flex',
    alignItems: 'center', justifyContent: 'center'
}}>
    <svg width="200" height="200" viewBox="0 0 200 200" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle cx="100" cy="100" r="90" stroke={theme.border} strokeWidth="10" fill="transparent" />
        <circle cx="100" cy="100" r="90" stroke={theme.primary} strokeWidth="10" fill="transparent"
            strokeDasharray={2 * Math.PI * 90}
            strokeDashoffset={(2 * Math.PI * 90) * (1 - completionPercentage / 100)}
            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.5s ease' }}/>
    </svg>
    <div style={{
        width: '140px', height: '140px', borderRadius: '50%', backgroundColor: theme.cardBg,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 20px rgba(0,0,0,0.05)'
    }}>
        <Bot size={40} color={theme.primary} />
        <p style={{ margin: '8px 0 0 0', fontWeight: 'bold', fontSize: '24px', color: theme.text }}>{completionPercentage}%</p>
        <p style={{ margin: 0, fontSize: '12px', color: theme.textSecondary }}>Complete</p>
    </div>
</div>

{/* AI Avatar Chat System */}
{showAIAvatar && (
<AIAvatarChatSystem 
  isActive={showAIAvatar && isAvatarMode}
  message={currentAvatarMessage}
  onComplete={() => {
    // Optional: handle completion of each message
  }}
  onAvatarClick={handleAvatarClick}
/>
)}
        </div>
      
        <div style={{ maxWidth: '1024px', margin: '-40px auto 40px auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
            {/* Tab navigation styled to match the new theme */}
            <div style={{
                display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '32px',
                backgroundColor: theme.cardBg, padding: '8px', borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', border: `1px solid ${theme.border}`
            }}>
                {[
                  { key: 'overview', label: 'Overview', icon: User },
                  { key: 'tasks', label: 'Tasks', icon: CheckCircle },
                  { key: 'learning', label: 'Learning', icon: BookOpen },
                  { key: 'AR', label: 'Immersive Tour', icon: Rocket },
                  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
                  { key: 'knowledge', label: 'Help Center', icon: Search },
                  

                ].map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.key;
                    return (
                        <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px',
                            fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease',
                            backgroundColor: isActive ? theme.primary : 'transparent',
                            color: isActive ? 'white' : theme.textSecondary,
                        }}>
                            <Icon size={16} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* --- TAB CONTENT --- */}
            {activeTab === 'overview' && (
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
                <div style={{...cardStyle, padding: '32px'}}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: theme.text }}>Progress Summary</h3>
                     <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', textAlign: 'center'}}>
                         <div>
                            <h4 style={{fontSize: '32px', margin: 0, color: theme.primary}}>{completedTasks.size}/{onboardingTasks.length}</h4>
                            <p style={{margin: '4px 0 0 0', color: theme.textSecondary}}>Tasks Completed</p>
                         </div>
                         <div>
                            <h4 style={{fontSize: '32px', margin: 0, color: theme.primary}}>{points}</h4>
                            <p style={{margin: '4px 0 0 0', color: theme.textSecondary}}>Points Earned</p>
                         </div>
                     </div>
                </div>
                              {/* Quick Actions */}
                              <div style={cardStyle}>
                                <div style={{ padding: '24px' }}>
                                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: theme.text }}>Quick Actions</h3>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                      { label: 'View Tasks', icon: CheckCircle, color: '#2563eb', bg: darkMode ? '#1e3a8a' : '#eff6ff', action: () => setActiveTab('tasks') },
                                      { label: 'Start Learning', icon: BookOpen, color: '#16a34a', bg: darkMode ? '#14532d' : '#f0fdf4', action: () => setActiveTab('learning') },
                                      { label: 'View Analytics', icon: BarChart3, color: '#9333ea', bg: darkMode ? '#581c87' : '#faf5ff', action: () => setActiveTab('analytics') },
                                      { 
  label: 'Ask HR', 
  icon: MessageCircle, 
  color: '#dc2626', 
  bg: darkMode ? '#7f1d1d' : '#fef2f2', 
  action: () => {
    // Open the AI chat and keep avatar visible
    setChatOpen(true);
    setIsAvatarMode(false); // Switch to chat mode but keep avatar
    if (chatMessages.length === 0) {
      setChatMessages([{
        id: 1,
        sender: 'bot',
        message: `Hi ${employee.name.split(' ')[0]}! 👋 I'm your AI assistant. I can help you with onboarding tasks, answer HR questions, or provide guidance. What would you like to know?`,
        timestamp: new Date()
      }]);
    }
  } 
},
                                    ].map((action, index) => {
                                      const Icon = action.icon;
                                      return (
                                        <button
                                          key={index}
                                          onClick={action.action}
                                          style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'space-between',
                                            padding: '12px', 
                                            backgroundColor: action.bg, 
                                            border: 'none',
                                            borderRadius: '8px', 
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            width: '100%'
                                          }}
                                          onMouseEnter={(e) => {
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                                          }}
                                          onMouseLeave={(e) => {
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = 'none';
                                          }}
                                        >
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <Icon color={action.color} size={20} />
                                            <span style={{ fontSize: '14px', fontWeight: '500', color: theme.text }}>{action.label}</span>
                                          </div>
                                          <ChevronRight color={action.color} size={16} />
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                <div style={{...cardStyle, padding: '32px'}}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: theme.text }}>Achievements</h3>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center'}}>
                        {achievements.slice(0, 2).map(ach => (ach.earned && 
                            <div key={ach.id} style={{textAlign: 'center'}}>
                                <div style={{width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#FBBF24', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px'}}>
                                    <Trophy size={28}/>
                                </div>
                                <p style={{margin: 0, fontSize: '14px', fontWeight: 500}}>{ach.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            )}


            {activeTab === 'tasks' && (
  <div style={{...cardStyle}}>
    <div style={{ padding: '24px', borderBottom: `1px solid ${theme.border}` }}>
      <h3 style={{ fontSize: '20px', fontWeight: '600', margin: 0, color: theme.text }}>Your Onboarding Tasks</h3>
    </div>
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {onboardingTasks.map(task => {
        const isCompleted = completedTasks.has(task.id);
        const isPending = pendingVerifications.has(task.id);
        const verificationStatus = taskVerifications.get(task.id);
        const canComplete = verificationStatus === 'approved';
        
        return (
          <div key={task.id} style={{ 
            padding: '20px', 
            borderRadius: '12px', 
            background: isCompleted ? (darkMode ? '#166534' : '#F0FFF4') : (task.urgent && !isCompleted ? (darkMode ? '#7f1d1d' : '#FEF2F2') : theme.cardBg), 
            border: `1px solid ${isCompleted ? '#C6F6D5' : theme.border}` 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
              <button 
                onClick={() => canComplete && toggleTask(task.id)} 
                disabled={!canComplete}
                style={{ 
                  minWidth: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  border: `2px solid ${isCompleted ? '#48BB78' : canComplete ? theme.primary : theme.border}`, 
                  backgroundColor: isCompleted ? '#48BB78' : 'transparent', 
                  cursor: canComplete ? 'pointer' : 'not-allowed', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  opacity: canComplete ? 1 : 0.5
                }}
              >
                {isCompleted && <CheckCircle color="white" size={16} />}
                {isPending && <Timer color={theme.primary} size={16} />}
              </button>
              <div style={{flex: 1}}>
                <h4 style={{ 
                  fontWeight: '600', 
                  margin: 0, 
                  textDecoration: isCompleted ? 'line-through' : 'none', 
                  color: isCompleted ? theme.textSecondary : theme.text 
                }}>
                  {task.title}
                </h4>
                <p style={{margin: '4px 0 0 0', fontSize: '12px', color: theme.textSecondary}}>
                  {task.estimatedTime} • {task.description}
                </p>
              </div>
              {task.urgent && !isCompleted && (
                <span style={{
                  fontSize: '12px', 
                  color: '#DC2626', 
                  background: '#FEE2E2', 
                  padding: '4px 8px', 
                  borderRadius: '12px', 
                  fontWeight: '500'
                }}>
                  Urgent
                </span>
              )}
              <span style={{fontSize: '14px', color: theme.accent, fontWeight: '600'}}>
                +{task.points} pts
              </span>
            </div>
            
            {isPending && (
              <div style={{ 
                padding: '12px', 
                backgroundColor: `${theme.primary}20`, 
                borderRadius: '6px', 
                marginBottom: '12px' 
              }}>
                <span style={{ fontSize: '14px', color: theme.primary }}>
                  ⏳ Pending HR verification...
                </span>
              </div>
            )}
            
            {!isCompleted && !isPending && (
              <div>
                {task.verificationType === 'file_upload' && (
                  <FileUploadComponent task={task} onUpload={handleFileUpload} />
                )}
                {task.verificationType === 'checklist' && (
                  <ChecklistComponent task={task} onSubmit={handleChecklistSubmission} />
                )}
                {task.verificationType === 'quiz' && (
                  <QuizComponent task={task} onComplete={handleQuizCompletion} />
                )}
                {task.verificationType === 'confirmation' && (
                  <div style={{ marginTop: '12px', padding: '12px', backgroundColor: theme.taskBg, borderRadius: '6px' }}>
                    <span style={{ fontSize: '14px', color: theme.textSecondary }}>
                      👤 Requires manager confirmation - complete the activity and your manager will mark this as done
                    </span>
                  </div>
                )}
                {task.verificationType === 'qr_scan' && (
                  <div style={{ marginTop: '12px', textAlign: 'center' }}>
                    <button style={primaryButtonStyle}>
                      📱 Start QR Code Tour
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
)}
                    {activeTab === 'learning' && (
  <div style={cardStyle}>
    <div style={{ padding: '24px', borderBottom: `1px solid ${theme.border}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: theme.text }}>
            Personalized Learning Paths
          </h3>
          <p style={{ color: theme.textSecondary, margin: '4px 0 0 0' }}>
            AI-curated training modules based on your role and experience
          </p>
        </div>
        <button
          onClick={() => generatePersonalizedPaths({
            ...employee,
            experienceLevel: "Senior",
            previousSkills: "React, Node.js, System Design, Team Leadership"
          })}
          disabled={isLoadingPaths}
          style={{
            backgroundColor: theme.accent,
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: isLoadingPaths ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            opacity: isLoadingPaths ? 0.6 : 1
          }}
        >
          🤖 Refresh AI Recommendations
        </button>
      </div>
    </div>
    
    <div style={{ padding: '24px' }}>
      {isLoadingPaths ? (
        <DotsLoadingPaths/>
      ) : (
        <React.Fragment>
          {personalizedPaths.length > 0 && (
            <div style={{
              backgroundColor: darkMode ? '#1e40af' : '#eff6ff',
              border: `1px solid ${darkMode ? '#3b82f6' : '#bfdbfe'}`,
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Bot size={16} color={theme.accent} />
                <span style={{ fontSize: '14px', fontWeight: '600', color: theme.accent }}>
                  AI-Personalized for {employee.role}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: theme.textSecondary, margin: 0 }}>
                These learning paths have been specifically curated based on your role and experience level.
              </p>
            </div>
          )}
          
          {personalizedPaths.map(path => (
            <div key={path.id} style={{ 
              border: `1px solid ${
                path.priority === 'high' ? '#ef4444' :
                path.priority === 'medium' ? '#f59e0b' : theme.border
              }`, 
              borderRadius: '8px', 
              padding: '24px',
              marginBottom: '24px',
              backgroundColor: theme.cardBg,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = darkMode 
                ? '0 10px 25px -3px rgba(0, 0, 0, 0.4)' 
                : '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ flex: 1, marginRight: '16px' }}>
                  {/* Priority Badge - Fixed positioning */}
                  {path.priority === 'high' && (
                    <div style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'inline-block',
                      marginBottom: '12px'
                    }}>
                      HIGH PRIORITY
                    </div>
                  )}
                  
                  <h4 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0', color: theme.text }}>
                    {path.title}
                  </h4>
                  <p style={{ color: theme.textSecondary, fontSize: '14px', margin: '0 0 8px 0' }}>
                    {path.description}
                  </p>
                  <p style={{ color: theme.textSecondary, fontSize: '14px', margin: '0 0 16px 0' }}>
                    {path.completed}/{path.modules} modules completed • {path.estimatedTime} total
                  </p>
                  
                  {/* AI Relevance Explanation */}
                  <div style={{
                    backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
                    padding: '12px',
                    borderRadius: '6px',
                    borderLeft: `3px solid ${theme.accent}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Bot size={14} color={theme.accent} />
                      <span style={{ fontSize: '12px', fontWeight: '500', color: theme.accent }}>
                        Why this is recommended for you:
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: theme.textSecondary, margin: 0 }}>
                      {path.relevanceReason}
                    </p>
                  </div>
                </div>
                
                {/* Start Button - Fixed positioning */}
                <div style={{ flexShrink: 0, marginLeft: '16px' }}>
                  <button style={{ 
                    backgroundColor: theme.accent,
                    color: 'white',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                    minWidth: '100px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme.accent;
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  >
                    <Play size={16} />
                    <span>{path.progress > 0 ? 'Continue' : 'Start'}</span>
                  </button>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                  <span style={{ color: theme.text }}>Progress</span>
                  <span style={{ color: theme.textSecondary }}>{path.progress}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: darkMode ? '#334155' : '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    backgroundColor: 
                      path.priority === 'high' ? '#ef4444' :
                      path.priority === 'medium' ? '#f59e0b' : theme.accent,
                    width: `${path.progress}%`,
                    transition: 'width 0.5s ease'
                  }}></div>
                </div>
              </div>
              
              {path.progress > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(path.completed)].map((_, i) => (
                      <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                    ))}
                    {[...Array(path.modules - path.completed)].map((_, i) => (
                      <Star key={i} size={16} color={darkMode ? '#475569' : '#d1d5db'} />
                    ))}
                  </div>
                  <span style={{ fontSize: '14px', color: theme.textSecondary }}>
                    {path.completed} of {path.modules} modules complete
                  </span>
                </div>
              )}
            </div>
          ))}
          
          {personalizedPaths.length === 0 && !isLoadingPaths && (
            <div style={{ textAlign: 'center', padding: '48px' }}>
              <Bot size={48} color={theme.textSecondary} style={{ marginBottom: '16px' }} />
              <p style={{ color: theme.textSecondary, fontSize: '16px', marginBottom: '8px' }}>
                No personalized paths generated yet
              </p>
              <button
                onClick={() => generatePersonalizedPaths({
                  ...employee,
                  experienceLevel: "Senior",
                  previousSkills: "React, Node.js, System Design, Team Leadership"
                })}
                style={{
                  backgroundColor: theme.accent,
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Generate AI Recommendations
              </button>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  </div>
)}

{activeTab === "AR" && <OfficeTour />}
                    {/* Analytics Tab */}
{activeTab === 'analytics' && (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    {/* AI-Powered Insights Row */}
    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth >= 1024 ? '2fr 1fr' : '1fr', gap: '24px' }}>
      <PredictiveInsightCard insight={aiInsights} loading={isLoadingInsights} />
      <AINudges nudges={aiInsights.nudges || []} loading={isLoadingInsights} />
    </div>
    
    {/* Main Analytics Grid */}
    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth >= 1024 ? '2fr 1fr' : '1fr', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Weekly Progress Chart */}
        <div style={cardStyle}>
          <div style={{ padding: '24px', borderBottom: `1px solid ${theme.border}` }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: theme.text }}>Weekly Learning Activity</h3>
            <p style={{ color: theme.textSecondary, margin: '4px 0 0 0' }}>Minutes spent learning each day</p>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', height: '200px', gap: '8px' }}>
              {analytics.weeklyProgress.map((day, index) => {
                const maxMinutes = Math.max(...analytics.weeklyProgress.map(d => d.minutes));
                const height = (day.minutes / maxMinutes) * 160;
                return (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div
                      style={{
                        width: '100%',
                        height: `${height}px`,
                        backgroundColor: theme.accent,
                        borderRadius: '4px 4px 0 0',
                        marginBottom: '8px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#2563eb';
                        e.target.style.transform = 'scaleY(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = theme.accent;
                        e.target.style.transform = 'scaleY(1)';
                      }}
                      title={`${day.minutes} minutes`}
                    />
                    <span style={{ fontSize: '12px', color: theme.textSecondary }}>{day.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <RecommendationCard recommendations={aiInsights.recommendations || []} loading={isLoadingInsights} />
      </div>

      {/* Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Smart Benchmarks */}
        <SmartBenchmarks benchmarks={aiInsights.benchmarks || {}} loading={isLoadingInsights} />
        
        {/* Performance Metrics */}

        {/* Impact Metrics - Replace the existing Performance Metrics div */}
<div style={cardStyle}>
  <div style={{ padding: '24px', borderBottom: `1px solid ${theme.border}` }}>
    <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: theme.text }}>Your Impact</h3>
    <p style={{ color: theme.textSecondary, margin: '4px 0 0 0', fontSize: '14px' }}>
      See how your progress translates to real results
    </p>
  </div>
  <div style={{ padding: '24px' }}>
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{
        padding: '20px',
        backgroundColor: `${theme.accent}15`,
        borderRadius: '8px',
        border: `1px solid ${theme.accent}30`,
        textAlign: 'center',
        transition: 'transform 0.2s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: theme.accent, marginBottom: '8px' }}>
          🚀 {Math.round(completionPercentage * 0.85)}% ahead
        </div>
        <div style={{ fontSize: '12px', color: theme.textSecondary }}>
          of new hires in your department
        </div>
      </div>
      
      <div style={{
        padding: '20px',
        backgroundColor: `${theme.primary}15`,
        borderRadius: '8px',
        border: `1px solid ${theme.primary}30`,
        textAlign: 'center',
        transition: 'transform 0.2s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: theme.primary, marginBottom: '8px' }}>
          📈 {Math.max(1, 7 - (onboardingTasks.length - completedTasks.size))} days
        </div>
        <div style={{ fontSize: '12px', color: theme.textSecondary }}>
          faster than average onboarding
        </div>
      </div>

      {completedTasks.size >= onboardingTasks.length * 0.7 && (
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          borderRadius: '8px',
          textAlign: 'center',
          color: 'white',
          animation: 'fadeInUp 0.5s ease-out'
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
            🎯 Almost project-ready!
          </div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>
            Complete {onboardingTasks.length - completedTasks.size} more tasks to unlock full access
          </div>
        </div>
      )}
    </div>
  </div>
</div>

        {/* Streak Counter */}
        <div style={cardStyle}>
          <div style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: theme.text }}>Learning Streak</h3>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                  {analytics.streakDays}
                </div>
              </div>
              <p style={{ fontSize: '14px', color: theme.textSecondary, margin: 0 }}>
                {analytics.streakDays} day{analytics.streakDays !== 1 ? 's' : ''} in a row! 🔥
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}          {activeTab === 'knowledge' && (
  <div style={{...cardStyle}}>
    <div style={{ padding: '24px', borderBottom: `1px solid ${theme.border}` }}>
      <h3 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 16px 0', color: theme.text }}>Help Center</h3>
      
      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: theme.textSecondary }} size={20} />
        <input 
          type="text" 
          placeholder="Search for answers..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '12px 16px 12px 44px', 
            borderRadius: '8px', 
            border: `1px solid ${theme.border}`, 
            backgroundColor: theme.cardBg, 
            color: theme.text, 
            fontSize: '16px',
            outline: 'none'
          }}
        />
      </div>
      
      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {getCategories().map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: selectedCategory === category ? theme.primary : theme.taskBg,
              color: selectedCategory === category ? 'white' : theme.text,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
    
    <div style={{ padding: '24px' }}>
      {getFilteredQuestions().length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: theme.textSecondary }}>
          <Search size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
          <p>No results found for "{searchQuery}"</p>
          <p style={{ fontSize: '14px' }}>Try different keywords or browse categories above</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {getFilteredQuestions().map((item) => {
            const isExpanded = expandedAnswers.has(item.id);
            return (
              <div key={item.id} style={{ 
                border: `1px solid ${theme.border}`, 
                borderRadius: '12px', 
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}>
                <button 
                  onClick={() => toggleAnswer(item.id)}
                  style={{ 
                    width: '100%', 
                    textAlign: 'left', 
                    padding: '20px', 
                    background: theme.taskBg, 
                    border: 'none', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    gap: '16px'
                  }}
                >
                  <div>
                    <h4 style={{ 
                      fontWeight: '600', 
                      margin: '0 0 8px 0', 
                      color: theme.text,
                      fontSize: '16px'
                    }}>
                      {item.question}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ 
                        fontSize: '12px', 
                        color: theme.primary, 
                        backgroundColor: `${theme.primary}20`, 
                        padding: '2px 8px', 
                        borderRadius: '12px',
                        fontWeight: '500'
                      }}>
                        {item.category}
                      </span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {item.tags.slice(0, 3).map(tag => (
                          <span key={tag} style={{ 
                            fontSize: '11px', 
                            color: theme.textSecondary, 
                            backgroundColor: theme.border, 
                            padding: '2px 6px', 
                            borderRadius: '8px'
                          }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ChevronRight 
                    color={theme.textSecondary} 
                    size={20} 
                    style={{ 
                      transition: 'transform 0.2s ease',
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      flexShrink: 0
                    }} 
                  />
                </button>
                
                {isExpanded && (
                  <div style={{ 
                    padding: '0 20px 20px 20px', 
                    backgroundColor: theme.cardBg,
                    borderTop: `1px solid ${theme.border}`,
                    animation: 'fadeInUp 0.3s ease-out'
                  }}>
                    <div style={{ 
                      color: theme.text, 
                      lineHeight: '1.6',
                      fontSize: '14px',
                      whiteSpace: 'pre-line' // This preserves line breaks from \n
                    }}>
                      {item.answer}
                    </div>
                    
                    {/* Quick Actions */}
                    <div style={{ 
                      marginTop: '16px', 
                      display: 'flex', 
                      gap: '12px',
                      paddingTop: '16px',
                      borderTop: `1px solid ${theme.border}`
                    }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Copy answer to clipboard
                          navigator.clipboard.writeText(item.answer);
                          // Could add a toast notification here
                        }}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: theme.taskBg,
                          border: `1px solid ${theme.border}`,
                          borderRadius: '6px',
                          fontSize: '12px',
                          color: theme.textSecondary,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        📋 Copy
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setChatOpen(true);
                          setChatMessages(prev => [...prev, {
                            id: Date.now(),
                            sender: 'user',
                            message: `I have a follow-up question about: ${item.question}`,
                            timestamp: new Date()
                          }]);
                        }}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: theme.primary,
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          color: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        💬 Ask Follow-up
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
    
    {/* Help Footer */}
    <div style={{ 
      padding: '20px 24px', 
      backgroundColor: theme.taskBg, 
      borderTop: `1px solid ${theme.border}`,
      textAlign: 'center'
    }}>
      <p style={{ color: theme.textSecondary, margin: '0 0 12px 0', fontSize: '14px' }}>
        Can't find what you're looking for?
      </p>
      <button
        onClick={() => {
          setChatOpen(true);
          setChatMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'user',
            message: "I need help with something not covered in the Help Center",
            timestamp: new Date()
          }]);
        }}
        style={{
          ...primaryButtonStyle,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: '0 auto'
        }}
      >
        <MessageCircle size={16} />
        Ask AI Assistant
      </button>
    </div>
  </div>
)}
                        {activeTab === 'AR' && (
                <div style={{...cardStyle}}>

                </div>
            )}

        </div>
      </main>

      {/* Update your global styles to include all the missing animations */}
<style jsx global>{`
  @keyframes confetti-fall { to { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
  @keyframes typing-bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  /* AI Avatar Animations */
  @keyframes slideInFromRight {
    0% { 
      transform: translateX(100px); 
      opacity: 0; 
    }
    100% { 
      transform: translateX(0); 
      opacity: 1; 
    }
  }
  
  @keyframes bubbleIn {
    0% { 
      transform: scale(0.8) translateY(10px); 
      opacity: 0; 
    }
    100% { 
      transform: scale(1) translateY(0); 
      opacity: 1; 
    }
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  @keyframes avatarPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(1.5); opacity: 0; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes chatButtonPulse {
    0%, 100% { 
      transform: scale(1); 
      box-shadow: 0 8px 16px rgba(14, 165, 233, 0.3);
    }
    50% { 
      transform: scale(1.1); 
      box-shadow: 0 12px 24px rgba(14, 165, 233, 0.5);
    }
  }

  @keyframes progressFill {
  0% { width: 0%; }
  100% { width: var(--progress, 0%); }
}

@keyframes particleFloat {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  50% { 
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;s
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
  
  * { box-sizing: border-box; }
  button:hover { filter: brightness(1.1); }
`}</style>
    </div>
  );
};


const HRDashboard = ({onBack}) => {
  const [activeTab, setActiveTab] = useState('ai-hub');
  const [darkMode, setDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [expandedOnboardingId, setExpandedOnboardingId] = useState(null);
  const [expandedCandidateId, setExpandedCandidateId] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // State for Resume Evaluator
  const [jobDescription, setJobDescription] = useState('Job Title: Senior Frontend Developer\n\nResponsibilities:\n- Develop and maintain user-facing features using React.js\n- Build reusable components and front-end libraries for future use\n- Optimize applications for maximum speed and scalability\n\nRequirements:\n- 5+ years of experience with React\n- Strong proficiency in JavaScript, CSS, and HTML\n- Experience with state management libraries like Redux or Zustand');
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const profileRef = useRef(null);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const hrManager = { name: "Maria Garcia", role: "HR Manager", avatar: "MG" };

  const onboardingTasks = [
    {
      id: 1,
      employee: 'Sarah Chen',
      role: 'Senior Project Designer',
      progress: 0,
      checklist: [
        { name: 'Complete Personal Information Form', completed: false },
        { name: 'Sign Employment Contract', completed: false },
        { name: 'Setup IT Equipment', completed: false },
        { name: 'Company Security Training', completed: false },
        { name: 'Meet Your Team', completed: false },
        { name: 'Office Tour & Safety Briefing', completed: false }
      ]
    },
    {
      id: 2,
      employee: 'Emma Wilson',
      role: 'Marketing Manager',
      progress: 100,
      checklist: [
        { name: 'Sign Offer Letter & NDA', completed: true },
        { name: 'Complete W-4 & I-9 Forms', completed: true },
        { name: 'IT: Laptop Provisioned', completed: true },
        { name: 'IT: Software Access Granted', completed: true }
      ]
    },
    {
      id: 3,
      employee: 'Alex Thompson',
      role: 'Data Analyst',
      progress: 45,
      checklist: [
        { name: 'Sign Offer Letter & NDA', completed: true },
        { name: 'Complete W-4 & I-9 Forms', completed: true },
        { name: 'IT: Laptop Provisioned', completed: false },
        { name: 'IT: Software Access Granted', completed: false }
      ]
    }
  ];



  const candidates = [
  {
    id: 1,
    name: 'John Smith',
    position: 'Frontend Developer',
    score: 92,
    stage: 'Technical Round',
    summary: 'Creative Frontend Developer with 5+ years of experience...',
    aiRecommended: true,
    skills: ['React', 'TypeScript', 'UI/UX'],
    matchReasons: ['Resume match: 95%', 'Skills test: 89%', 'Chatbot score: 92%'],
    skillsTest: { status: 'passed', score: 92 }
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    position: 'Product Manager',
    score: 88,
    stage: 'Skills Test',
    summary: 'Data-driven Product Manager with a track record...',
    aiRecommended: false,
    skills: ['Strategy', 'Analytics', 'Leadership'],
    matchReasons: ['Resume match: 87%', 'Skills test: 90%', 'Chatbot score: 87%'],
    skillsTest: { status: 'passed', score: 87 }
  },
  {
    id: 3,
    name: 'Lisa Rodriguez',
    position: 'UX Designer',
    score: 95,
    stage: 'Final Review',
    summary: 'User-centric UX Designer skilled in creating...',
    aiRecommended: true,
    skills: ['Figma', 'User Research', 'Prototyping'],
    matchReasons: ['Resume match: 98%', 'Skills test: 91%', 'Chatbot score: 96%'],
    skillsTest: { status: 'passed', score: 94 }
  },
  {
    id: 4,
    name: 'David Kim',
    position: 'Backend Developer',
    score: 85,
    stage: 'AI Pre-screen',
    summary: 'Experienced Backend Developer specializing in Node.js...',
    aiRecommended: false,
    skills: ['Node.js', 'MongoDB', 'AWS'],
    matchReasons: ['Resume match: 82%', 'Skills test: 88%', 'Chatbot score: 85%'],
    skillsTest: { status: 'needs_review', score: 45 }
  }
];

const getNextBestActions = (candidate) => {
  const actions = [];
  
  // Logic based on candidate stage and status
  switch (candidate.stage) {
    case 'AI Pre-screen':
      if (candidate.score >= 85) {
        actions.push({
          type: 'primary',
          label: 'Schedule Skills Test',
          icon: Calendar,
          action: 'schedule_test',
          color: theme.primary
        });
      } else {
        actions.push({
          type: 'secondary',
          label: 'Review Resume',
          icon: Eye,
          action: 'review_resume',
          color: theme.textSecondary
        });
      }
      break;
      
    case 'Skills Test':
      if (candidate.skillsTest?.status === 'passed') {
        actions.push({
          type: 'primary',
          label: 'Schedule Interview',
          icon: UserPlus,
          action: 'schedule_interview',
          color: theme.accent
        });
      } else {
        actions.push({
          type: 'secondary',
          label: 'Review Test Results',
          icon: Eye,
          action: 'review_test',
          color: '#f59e0b'
        });
      }
      break;
      
    case 'Technical Round':
      actions.push({
        type: 'primary',
        label: 'Schedule Final Interview',
        icon: UserPlus,
        action: 'schedule_final',
        color: theme.accent
      });
      break;
      
    case 'Final Review':
      actions.push({
        type: 'primary',
        label: 'Send Offer',
        icon: CheckCircle,
        action: 'send_offer',
        color: theme.accent
      });
      break;
  }
  
  // Always add secondary actions
  actions.push({
    type: 'secondary',
    label: 'View Profile',
    icon: Eye,
    action: 'view_profile',
    color: theme.textSecondary
  });
  
  // Add reject option for all candidates
  actions.push({
    type: 'danger',
    label: 'Reject & Archive',
    icon: Archive,
    action: 'reject',
    color: '#ef4444'
  });
  
  return actions;
};


  const hiringFunnelData = [
    { stage: 'Applications', count: 1240 },
    { stage: 'AI Screening', count: 450 },
    { stage: 'Assessments', count: 210 },
    { stage: 'Interviews', count: 85 },
    { stage: 'Offers', count: 24 },
    { stage: 'Hired', count: 18 }
  ];

  const feedbackData = {
    overallScore: 4.3,
    sentiment: { positive: 75, neutral: 15, negative: 10 },
    keyThemes: ['Communication', 'Workload', 'Growth Opportunities', 'Onboarding']
  };

  const getTheme = () => {
    if (darkMode) return {
      bg: '#0B1120',
      cardBg: '#1A202C',
      headerBg: 'rgba(26, 32, 44, 0.8)',
      text: '#E2E8F0',
      textSecondary: '#A0AEC0',
      border: '#2D3748',
      accent: '#38B2AC',
      primary: '#0EA5E9',
      taskBg: '#2D3748'
    };
    return {
      bg: '#F7F9FC',
      cardBg: '#FFFFFF',
      headerBg: 'rgba(255, 255, 255, 0.8)',
      text: '#2D3748',
      textSecondary: '#718096',
      border: '#E2E8F0',
      accent: '#38B2AC',
      primary: '#0EA5E9',
      taskBg: '#F7F9FC'
    };
  };

  const theme = getTheme();
  const cardStyle = {
    backgroundColor: theme.cardBg,
    borderRadius: '16px',
    border: `1px solid ${theme.border}`,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  };

  const primaryButtonStyle = {
    backgroundColor: theme.primary,
    color: '#FFFFFF',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const secondaryButtonStyle = {
    backgroundColor: theme.taskBg,
    color: theme.textSecondary,
    border: `1px solid ${theme.border}`,
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileRef]);

  useEffect(() => {
    setChatMessages([{ id: 1, sender: 'bot', message: `Hi ${hrManager.name}, how can I help?` }]);
  }, [hrManager.name]);

  const simulateAIChatResponse = (message) => new Promise(resolve => setTimeout(() => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes('candidate')) {
      resolve('The top candidate is Lisa Rodriguez for UX Designer with a score of 95%.');
    } else if (lowerCaseMessage.includes('onboarding')) {
      resolve('There are 2 active onboardings for Sarah Chen and Alex Thompson.');
    } else {
      resolve("I can help with questions about candidates, onboarding status, and hiring analytics.");
    }
  }, 1500));


  const simulateFileUpload = (file) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('https://assets.apilayer.com/apis/codes/resume_parser/sample_resume.docx');
        }, 1500);
    });
};

const evaluateParsedDataWithGroq = async (parsedData) => {
    const resumeSummaryForAI = `Skills: ${parsedData.skills?.join(', ') || 'N/A'}\nExperience: ${parsedData.experience?.map(exp => `${exp.role} at ${exp.company}`).join('; ') || 'N/A'}\nEducation: ${parsedData.education?.map(edu => `${edu.degree} from ${edu.university}`).join('; ') || 'N/A'}`;
    const groqSystemPrompt = `You are an expert AI Talent Acquisition specialist. Analyze the job description and the structured data from a candidate's resume. Respond ONLY with a valid JSON object in the format: {"matchScore": <0-100>,"summary": "<summary>","strengths": ["<strength>"],"weaknesses": ["<weakness>"],"suggestedQuestions": ["<question>"]}`;
    
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer INSERT YOUR API KEY HERE`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            model: 'gemma2-9b-it',
            messages: [
                { role: 'system', content: groqSystemPrompt },
                { role: 'user', content: `Job Description:\n${jobDescription}\n\n---\n\nParsed Resume Data:\n${resumeSummaryForAI}` }
            ],
            temperature: 0.3,
            response_format: { type: "json_object" }
        })
    });

    if (!groqResponse.ok) {
        throw new Error(`Groq AI Error: Failed to evaluate the parsed data.`);
    }
    const groqData = await groqResponse.json();
    return JSON.parse(groqData.choices[0].message.content);
};

const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setIsEvaluating(true);
    setEvaluationResult(null);
    setFileError('');

    try {
        setLoadingMessage("Simulating file upload...");
        const publicUrl = await simulateFileUpload(file);
        
        setLoadingMessage("Parsing resume with APILayer...");
        const encodedUrl = encodeURIComponent(publicUrl);
        const apilayerResponse = await fetch(`https://api.apilayer.com/resume_parser/url?url=${encodedUrl}`, {
            method: 'GET',
            headers: { 'apikey': "INSERT YOUR API KEY HERE" }
        });

        if (!apilayerResponse.ok) {
            const errorData = await apilayerResponse.json();
            throw new Error(`APILayer Error: ${errorData.message || 'Failed to parse resume.'}`);
        }
        const parsedData = await apilayerResponse.json();
        
        setLoadingMessage("Evaluating with Groq AI...");
        const finalResult = await evaluateParsedDataWithGroq(parsedData);
        setEvaluationResult(finalResult);

    } catch (error) {
        console.error('API Error:', error);
        setFileError(error.message);
    } finally {
        setIsEvaluating(false);
        setLoadingMessage('');
    }
};





  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    const userMessage = { id: Date.now(), sender: 'user', message: currentMessage.trim() };
    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);
    const botResponse = await simulateAIChatResponse(currentMessage.trim());
    setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', message: botResponse }]);
    setIsTyping(false);
  };

  const handleCandidateAction = (candidate, action) => {
  switch (action) {
    case 'schedule_interview':
      setShowInterviewModal(true);
      console.log(`Scheduling interview for ${candidate.name}`);
      break;
    case 'schedule_test':
      console.log(`Scheduling skills test for ${candidate.name}`);
      break;
    case 'schedule_final':
      console.log(`Scheduling final interview for ${candidate.name}`);
      break;
    case 'send_offer':
      console.log(`Preparing offer for ${candidate.name}`);
      break;
    case 'review_resume':
      console.log(`Opening resume review for ${candidate.name}`);
      break;
    case 'review_test':
      console.log(`Reviewing test results for ${candidate.name}`);
      break;
    case 'view_profile':
      console.log(`Opening full profile for ${candidate.name}`);
      break;
    case 'reject':
      if (window.confirm(`Are you sure you want to reject and archive ${candidate.name}?`)) {
        console.log(`Rejecting and archiving ${candidate.name}`);
      }
      break;
    default:
      console.log('Action not implemented:', action);
  }
};


  const MetricCard = ({ title, value, change, icon: Icon, trend = 'up', showButton = false, buttonText, onButtonClick }) => (
  <div style={cardStyle}>
    <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <p style={{ fontSize: '14px', color: theme.textSecondary, margin: '0 0 4px 0' }}>{title}</p>
        <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: theme.text, margin: '0 0 8px 0' }}>{value}</h3>
        {change && <p style={{ fontSize: '14px', margin: 0, color: trend === 'up' ? theme.accent : '#ef4444' }}>{trend === 'up' ? '↗' : '↘'} {change}</p>}
        {showButton && (
          <button 
            onClick={onButtonClick}
            style={{
              ...primaryButtonStyle,
              marginTop: '12px',
              fontSize: '12px',
              padding: '8px 12px'
            }}
          >
            {buttonText}
          </button>
        )}
      </div>
      <div style={{ padding: '12px', backgroundColor: `${theme.primary}20`, borderRadius: '50%' }}>
        <Icon s={24} c={theme.primary} />
      </div>
    </div>
  </div>
);

const AIAssistantChat = () => (
    <>
      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: theme.primary,
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001
        }}>
          <MessageSquare s={24} />
        </button>
      )}
      {chatOpen && (
        <div style={{
          ...cardStyle,
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '350px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          height: '450px'
        }}>
          <div style={{
            padding: '16px',
            borderBottom: `1px solid ${theme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot s={20} c={theme.primary} />
              <h4 style={{ fontWeight: '600', margin: 0 }}>AI HR Assistant</h4>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <X s={20} c={theme.textSecondary} />
            </button>
          </div>
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            backgroundColor: theme.taskBg
          }}>
            {chatMessages.map(msg => (
              <div key={msg.id} style={{
                marginBottom: '12px',
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  backgroundColor: msg.sender === 'user' ? theme.primary : theme.cardBg,
                  color: msg.sender === 'user' ? 'white' : theme.text
                }}>
                  {msg.message}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '12px', backgroundColor: theme.cardBg, borderRadius: '12px' }}>...</div>
              </div>
            )}
          </div>
          <div style={{ padding: '16px', borderTop: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Ask about candidates..."
                disabled={isTyping}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '24px',
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.cardBg,
                  color: theme.text,
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isTyping}
                style={{
                  ...primaryButtonStyle,
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  padding: 0,
                  justifyContent: 'center'
                }}
              >
                <Rocket s={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ai-hub':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: theme.text, margin: 0 }}>AI Hiring Hub</h2>
              <button style={primaryButtonStyle}>
                <Plus s={16} /> New Job Posting

                

            
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              <MetricCard title="Resume Parsing & Ranking" value="1,247" change="+18%" icon={FileText} />
              <MetricCard 
  title="Skills Test Insights" 
  value="156" 
  change="+12%" 
  icon={Activity}
  showButton={true}
  buttonText="View Results"
  onButtonClick={() => setShowSkillsModal(true)}
/>
              <MetricCard 
  title="Automated Scheduling" 
  value="89" 
  change="+23%" 
  icon={Calendar}
  showButton={true}
  buttonText="Send Interview Invite"
  onButtonClick={() => setShowInterviewModal(true)}
/>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
              <div style={cardStyle}>
                <div style={{
                  padding: '24px',
                  borderBottom: `1px solid ${theme.border}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>All Candidates</h3>
                  <button style={secondaryButtonStyle}>
                    <Filter s={16} /> Filter
                  </button>
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {candidates.map(c => {
                    const isExpanded = expandedCandidateId === c.id;
                    return (

                      <div style={{ flex: 1 }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <h4 style={{ fontWeight: '600', margin: 0 }}>{c.name}</h4>
    {c.aiRecommended && (
      <span style={{
        backgroundColor: `${theme.accent}20`,
        color: theme.accent,
        padding: '2px 6px',
        borderRadius: '8px',
        fontSize: '10px',
        fontWeight: '500'
      }}>
        AI PICK
      </span>
    )}
  </div>
  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: theme.textSecondary }}>
    {c.stage}
  </p>
  {/* Add this skills test tag */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
    <span style={{
      fontSize: '11px',
      color: c.skillsTest.status === 'passed' ? theme.accent : '#f59e0b',
      fontWeight: '500'
    }}>
      Skills Test: {c.skillsTest.status === 'passed' ? '✅ Passed' : '⚠️ Needs Review'} ({c.skillsTest.score}%)
    </span>
  </div>
</div>

                    );
                  })}
                </div>
              </div>

              


              <div style={{ ...cardStyle, padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>
                  AI Performance
                </h3>
                {[
                  { label: 'Resume Match Accuracy', value: 92 },
                  { label: 'Interview Scheduling Success', value: 98 }
                ].map((item) => (
                  <div key={item.label} style={{ marginBottom: '1rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '14px', color: theme.textSecondary }}>
                        {item.label}
                      </span>
                      <span style={{ fontWeight: '600' }}>
                        {item.value}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: theme.border,
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        backgroundColor: theme.primary,
                        width: `${item.value}%`
                      }} />
                    </div>
                  </div>
                ))}
              </div>



            </div>
            
              <div style={cardStyle}>
  <div style={{ padding: '24px', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
    <ClipboardCheck s={20} c={theme.primary} />
    <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>AI Resume Evaluator</h3>
  </div>
  <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ fontSize: '14px', fontWeight: '500', color: theme.text, marginBottom: '8px', display: 'block' }}>1. Job Description</label>
        <textarea 
  value={jobDescription} 
  onChange={(e) => setJobDescription(e.target.value)} 
  style={{ width: '100%', minHeight: '200px', maxWidth: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}`, backgroundColor: theme.taskBg, color: theme.text, fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }} 
/>
      </div>
      <div>
        <label style={{ fontSize: '14px', fontWeight: '500', color: theme.text, marginBottom: '8px', display: 'block' }}>2. Upload Resume</label>
        <label style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100px', border: `2px dashed ${theme.border}`, borderRadius: '8px', cursor: 'pointer', backgroundColor: theme.taskBg, textAlign: 'center', padding: '10px' }}>
          <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} style={{ display: 'none' }} />
          <UploadCloud s={24} c={theme.textSecondary} />
          {selectedFile ? 
            <span style={{ marginTop: '8px', fontSize: '14px', color: theme.text }}>{selectedFile.name}</span> : 
            <span style={{ marginTop: '8px', fontSize: '14px', color: theme.textSecondary }}>Click to upload resume</span>
          }
          <span style={{ fontSize: '12px', color: theme.textSecondary }}>PDF, DOC, DOCX, TXT</span>
        </label>
      </div>
    </div>
    <div>
      <h4 style={{ fontSize: '16px', fontWeight: '600', color: theme.text, margin: '0 0 16px 0' }}>3. Evaluation Result</h4>
      <div style={{ minHeight: '400px', padding: '16px', borderRadius: '12px', backgroundColor: theme.taskBg, border: `1px solid ${theme.border}`, width: '100%', boxSizing: 'border-box' }}>
        {isEvaluating && (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: theme.textSecondary}}>
            <div style={{width: '40px', height: '40px', border: `3px solid ${theme.border}`, borderTop: `3px solid ${theme.primary}`, borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '16px'}} />
            <p>{loadingMessage}</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}
        {fileError && 
          <div style={{ color: '#ef4444', textAlign: 'center', paddingTop: '100px' }}>
            <strong>Error:</strong><p>{fileError}</p>
          </div>
        }
        {evaluationResult && !fileError && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, color: theme.textSecondary, fontSize: '12px' }}>Match Score</p>
              <p style={{ margin: '4px 0', fontSize: '36px', fontWeight: 'bold', color: theme.primary }}>{evaluationResult.matchScore}%</p>
              <p style={{ margin: 0, color: theme.text, fontStyle: 'italic' }}>"{evaluationResult.summary}"</p>
            </div>
            <div>
              <h5 style={{ margin: '0 0 8px 0' }}>✅ Strengths</h5>
              <ul style={{ margin: 0, paddingLeft: '20px', color: theme.textSecondary }}>
                {evaluationResult.strengths?.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div>
              <h5 style={{ margin: '0 0 8px 0' }}>⚠️ Weaknesses / Gaps</h5>
              <ul style={{ margin: 0, paddingLeft: '20px', color: theme.textSecondary }}>
                {evaluationResult.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
            <div>
              <h5 style={{ margin: '0 0 8px 0' }}>❓ Suggested Interview Questions</h5>
              <ul style={{ margin: 0, paddingLeft: '20px', color: theme.textSecondary }}>
                {evaluationResult.suggestedQuestions?.map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </div>
          </div>
        )}
        {!isEvaluating && !evaluationResult && !fileError && (
          <div style={{ textAlign: 'center', color: theme.textSecondary, paddingTop: '100px' }}>
            <p>Upload a resume to begin AI evaluation.</p>
          </div>
        )}
      </div>
    </div>
  </div>
</div>


          </div>
        );

      case 'onboarding':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: theme.text, margin: 0 }}>
                Onboarding Portal
              </h2>
              <button style={primaryButtonStyle}>
                <Plus s={16} /> Onboard New Hire
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              <MetricCard
                title="Active Onboardings"
                value={onboardingTasks.filter(t => t.progress < 100).length}
                change="+2"
                icon={UserCheck}
              />
          
              <MetricCard title="IT Setups Triggered" value="3" change="+1" icon={Settings} />
              <MetricCard title="Learning Paths Assigned" value="3" change="+1" icon={Brain} />
            </div>
            <div style={cardStyle}>
              <div style={{ padding: '24px', borderBottom: `1px solid ${theme.border}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Onboarding Progress</h3>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {onboardingTasks.map(task => {
                  const isExpanded = expandedOnboardingId === task.id;
                  return (
                    <div key={task.id} style={{
                      background: theme.taskBg,
                      borderRadius: '12px',
                      border: `1px solid ${theme.border}`
                    }}>
                      <div
                        onClick={() => setExpandedOnboardingId(isExpanded ? null : task.id)}
                        style={{
                          padding: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontWeight: '600', margin: 0 }}>{task.employee}</h4>
                          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: theme.textSecondary }}>
                            {task.role}
                          </p>
                        </div>
                        <div style={{ width: '200px' }}>
                          <div style={{
                            width: '100%',
                            height: '8px',
                            backgroundColor: theme.border,
                            borderRadius: '4px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              height: '100%',
                              backgroundColor: theme.primary,
                              width: `${task.progress}%`
                            }} />
                          </div>
                          <p style={{
                            margin: '4px 0 0 0',
                            fontSize: '12px',
                            color: theme.textSecondary,
                            textAlign: 'right'
                          }}>
                            {task.progress}% Complete
                          </p>
                        </div>
                        <ChevronRight s={20} c={theme.textSecondary} style={{
                          transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease'
                        }} />
                      </div>
                      {isExpanded && (
                        <div style={{
                          padding: '0 16px 16px 16px',
                          borderTop: `1px solid ${theme.border}`
                        }}>
                          <h4 style={{
                            margin: '16px 0 8px 0',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}>
                            Checklist
                          </h4>
                          {task.checklist.map((item, index) => (
                            <div key={index} style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '8px'
                            }}>
                              {item.completed ? (
                                <CheckCircle s={16} c={theme.accent} />
                              ) : (
                                <Clock s={16} c={theme.textSecondary} />
                              )}
                              <span style={{ fontSize: '14px' }}>{item.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: theme.text, margin: 0 }}>
                Analytics Dashboard
              </h2>
              <button style={primaryButtonStyle}>
                <Download s={16} /> Export Reports
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              <MetricCard
                title="Hiring Funnel Conversion"
                value="1.5%"
                change="-0.2%"
                icon={TrendingUp}
                trend="down"
              />
              <MetricCard title="Onboarding Completion" value="89%" change="+4%" icon={CheckCircle} />
              <MetricCard title="New Hire Engagement" value="8.2/10" change="+0.5" icon={Activity} />
              <MetricCard title="Avg. Time to Hire" value="14 days" change="-2 days" icon={Clock} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={cardStyle}>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>
                    Hiring Funnel
                  </h3>
                  {hiringFunnelData.map(stage => (
                    <div key={stage.stage} style={{ marginBottom: '1rem' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ fontSize: '14px', color: theme.textSecondary }}>
                          {stage.stage}
                        </span>
                        <span style={{ fontWeight: '600' }}>
                          {stage.count}
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: theme.border,
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          backgroundColor: theme.primary,
                          width: `${(stage.count / hiringFunnelData[0].count) * 100}%`
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ ...cardStyle, padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>
                  Feedback Insights
                </h3>
                <div style={{
                  textAlign: 'center',
                  padding: '16px',
                  background: theme.taskBg,
                  borderRadius: '12px',
                  marginBottom: '16px'
                }}>
                  <p style={{ margin: 0, color: theme.textSecondary }}>Overall Score</p>
                  <h4 style={{ margin: '8px 0', fontSize: '32px', color: theme.primary }}>
                    {feedbackData.overallScore} / 5
                  </h4>
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: '600' }}>Sentiment</h4>
                <div style={{
                  display: 'flex',
                  height: '10px',
                  borderRadius: '5px',
                  overflow: 'hidden',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: `${feedbackData.sentiment.positive}%`,
                    backgroundColor: theme.accent
                  }} />
                  <div style={{
                    width: `${feedbackData.sentiment.neutral}%`,
                    backgroundColor: theme.border
                  }} />
                  <div style={{
                    width: `${feedbackData.sentiment.negative}%`,
                    backgroundColor: '#ef4444'
                  }} />
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '16px'
                }}>
                  {feedbackData.keyThemes.map(name => (
                    <span key={name} style={{
                      backgroundColor: `${theme.primary}20`,
                      color: theme.primary,
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: theme.text,
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <header style={{
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: theme.headerBg,
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${theme.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
              onClick={onBack}
              style={{
                background: 'none',
                border: 'none',
                color: theme.textSecondary,
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              ← Back
            </button>
          <Bot s={28} c={theme.primary} />
          <span style={{ fontWeight: 'bold', fontSize: '20px',color: theme.text }}>TalentFlow</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <Search s={18} c={theme.textSecondary} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)'
            }} />
            <input
              type="text"
              placeholder="Search candidates..."
              style={{
                backgroundColor: theme.taskBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                padding: '10px 16px 10px 40px',
                width: '320px',
                fontSize: '14px',
                color: theme.text,
                outline: 'none'
              }}
            />
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: theme.textSecondary
            }}
          >
            {darkMode ? <Sun s={20} /> : <Moon s={20} />}
          </button>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <Bell s={20} c={theme.textSecondary} />
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '8px',
              height: '8px',
              backgroundColor: '#ef4444',
              borderRadius: '50%'
            }} />
          </div>
          <div ref={profileRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: theme.primary,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                {hrManager.avatar}
              </div>
              <div>
                <p style={{
                  margin: 0,
                  fontWeight: '600',
                  color: theme.text,
                  textAlign: 'left'
                }}>
                  {hrManager.name}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '12px',
                  color: theme.textSecondary
                }}>
                  {hrManager.role}
                </p>
              </div>
              <ChevronDown s={16} c={theme.textSecondary} style={{
                transition: 'transform 0.2s',
                transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }} />
            </button>
            {isProfileOpen && (
              <div style={{
                ...cardStyle,
                position: 'absolute',
                top: '120%',
                right: 0,
                width: '220px',
                zIndex: 60,
                padding: '8px'
              }}>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {[
                    { label: 'View Profile', icon: User },
                    { label: 'Settings', icon: Settings },
                    { label: 'Log Out', icon: LogOut }
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label}>
                        <button style={{
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          color: theme.text,
                          fontSize: '14px',
                          textAlign: 'left'
                        }}>
                          <Icon s={16} c={theme.textSecondary} /> {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <main>
        <div style={{
          padding: '80px 24px',
          textAlign: 'center',
          background: darkMode
            ? `linear-gradient(180deg, ${theme.cardBg} 0%, ${theme.bg} 100%)`
            : `linear-gradient(180deg, #E0F2FE 0%, ${theme.bg} 100%)`
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            margin: '0 0 16px 0',
            color: theme.text
          }}>
            Welcome back, {hrManager.name.split(' ')[0]}!
          </h1>
          <p style={{
            fontSize: '18px',
            color: theme.textSecondary,
            maxWidth: '600px',
            margin: '0 auto 40px auto'
          }}>
            Your centralized hub for hiring, onboarding, and analytics.
          </p>
        </div>

        <div style={{
          maxWidth: '1024px',
          margin: '-80px auto 40px auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            marginBottom: '32px',
            backgroundColor: theme.cardBg,
            padding: '8px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            border: `1px solid ${theme.border}`
          }}>
            {[
              { key: 'ai-hub', label: 'AI Hiring Hub', icon: Brain },
              { key: 'onboarding', label: 'Onboarding Portal', icon: UserCheck },
              { key: 'analytics', label: 'Analytics', icon: PieChart }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: isActive ? theme.primary : 'transparent',
                    color: isActive ? 'white' : theme.textSecondary,
                  }}
                >
                  <Icon s={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          {renderTabContent()}
        </div>
      </main>
      <AIAssistantChat />

    {/* Skills Test Results Modal */}
{showSkillsModal && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  }}>
    <div style={{
      ...cardStyle,
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '80vh',
      overflow: 'auto'
    }}>
      <div style={{ padding: '24px', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Skills Test Results - AI Grading</h3>
        <button 
          onClick={() => setShowSkillsModal(false)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <X s={20} c={theme.textSecondary} />
        </button>
      </div>
      
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: theme.taskBg, borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '24px', color: theme.primary }}>156</h4>
            <p style={{ margin: 0, fontSize: '12px', color: theme.textSecondary }}>Total Completed</p>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: theme.taskBg, borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '24px', color: theme.accent }}>72%</h4>
            <p style={{ margin: 0, fontSize: '12px', color: theme.textSecondary }}>Average Score</p>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: theme.taskBg, borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '24px', color: theme.primary }}>32</h4>
            <p style={{ margin: 0, fontSize: '12px', color: theme.textSecondary }}>Top Performers</p>
          </div>
        </div>

        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Recent Test Results</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {candidates.map(c => {
  const isExpanded = expandedCandidateId === c.id;
  const nextActions = getNextBestActions(c);
  
  return (
    <div key={c.id} style={{
      padding: '16px',
      backgroundColor: theme.taskBg,
      borderRadius: '12px',
      border: `1px solid ${theme.border}`,
      transition: 'all 0.2s ease'
    }}>
      {/* Header row with basic info */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h4 style={{ fontWeight: '600', margin: 0, fontSize: '16px' }}>{c.name}</h4>
            {c.aiRecommended && (
              <span style={{
                backgroundColor: `${theme.accent}20`,
                color: theme.accent,
                padding: '2px 6px',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: '500'
              }}>
                AI PICK
              </span>
            )}
          </div>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: theme.textSecondary }}>
            {c.position} • {c.stage}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: theme.textSecondary }}>
              Match Score: <strong style={{ color: theme.text }}>{c.score}%</strong>
            </span>
            <span style={{
              fontSize: '11px',
              color: c.skillsTest.status === 'passed' ? theme.accent : '#f59e0b',
              fontWeight: '500'
            }}>
              Skills: {c.skillsTest.status === 'passed' ? '✅ Passed' : '⚠️ Review'} ({c.skillsTest.score}%)
            </span>
          </div>
        </div>
        
        {/* Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {nextActions.slice(0, 2).map((actionItem, idx) => {
            const Icon = actionItem.icon;
            const isPrimary = actionItem.type === 'primary';
            
            return (
              <button
                key={idx}
                onClick={() => handleCandidateAction(c, actionItem.action)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: isPrimary ? '8px 12px' : '6px 10px',
                  borderRadius: '6px',
                  border: isPrimary ? 'none' : `1px solid ${theme.border}`,
                  backgroundColor: isPrimary ? actionItem.color : 'transparent',
                  color: isPrimary ? 'white' : actionItem.color,
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon s={14} />
                {actionItem.label}
              </button>
            );
          })}
          
          {/* Expand/collapse button */}
          <button
            onClick={() => setExpandedCandidateId(isExpanded ? null : c.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: theme.textSecondary
            }}
          >
            <ChevronDown s={16} style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }} />
          </button>
        </div>
      </div>
      
      {/* Expanded section */}
      {isExpanded && (
        <div style={{
          paddingTop: '12px',
          borderTop: `1px solid ${theme.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <p style={{ margin: 0, fontSize: '13px', color: theme.textSecondary, fontStyle: 'italic' }}>
            "{c.summary}"
          </p>
          
          <div>
            <h5 style={{ margin: '0 0 6px 0', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: theme.textSecondary }}>
              Skills
            </h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {c.skills.map(skill => (
                <span key={skill} style={{
                  backgroundColor: `${theme.primary}15`,
                  color: theme.primary,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '500'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h5 style={{ margin: '0 0 6px 0', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: theme.textSecondary }}>
              AI Match Reasons
            </h5>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: theme.textSecondary }}>
              {c.matchReasons.map((reason, idx) => (
                <li key={idx} style={{ marginBottom: '2px' }}>{reason}</li>
              ))}
            </ul>
          </div>
          
          {/* All actions in expanded view */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '6px', 
            paddingTop: '8px',
            borderTop: `1px solid ${theme.border}`
          }}>
            {nextActions.map((actionItem, idx) => {
              const Icon = actionItem.icon;
              const isDanger = actionItem.type === 'danger';
              
              return (
                <button
                  key={idx}
                  onClick={() => handleCandidateAction(c, actionItem.action)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: `1px solid ${isDanger ? '#ef4444' : theme.border}`,
                    backgroundColor: isDanger ? '#fef2f2' : 'transparent',
                    color: actionItem.color,
                    fontSize: '11px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon s={12} />
                  {actionItem.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
})}

        </div>
      </div>
    </div>
  </div>
)}

      {/* Interview Invite Modal */}
{showInterviewModal && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  }}>
    <div style={{
      ...cardStyle,
      width: '400px',
      maxWidth: '90vw',
      padding: '24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Send Interview Invite</h3>
        <button 
          onClick={() => setShowInterviewModal(false)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <X s={20} c={theme.textSecondary} />
        </button>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '14px', fontWeight: '500', color: theme.text, marginBottom: '8px', display: 'block' }}>
          Candidate
        </label>
        <select style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: '8px',
          border: `1px solid ${theme.border}`,
          backgroundColor: theme.cardBg,
          color: theme.text,
          fontSize: '14px'
        }}>
          <option>John Smith - Frontend Developer</option>
          <option>Lisa Rodriguez - UX Designer</option>
          <option>Marcus Johnson - Product Manager</option>
        </select>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '14px', fontWeight: '500', color: theme.text, marginBottom: '8px', display: 'block' }}>
          Interview Type
        </label>
        <select style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: '8px',
          border: `1px solid ${theme.border}`,
          backgroundColor: theme.cardBg,
          color: theme.text,
          fontSize: '14px'
        }}>
          <option>Technical Interview</option>
          <option>HR Screening</option>
          <option>Final Interview</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '14px', fontWeight: '500', color: theme.text, marginBottom: '8px', display: 'block' }}>
          Suggested Time Slots
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['Tomorrow 2:00 PM', 'Friday 10:00 AM', 'Monday 3:30 PM'].map(slot => (
            <label key={slot} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" name="timeSlot" value={slot} />
              <span style={{ fontSize: '14px' }}>{slot}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button 
          onClick={() => setShowInterviewModal(false)}
          style={secondaryButtonStyle}
        >
          Cancel
        </button>
        <button 
          onClick={() => {
            setShowInterviewModal(false);
            // You can add a success toast here later
          }}
          style={primaryButtonStyle}
        >
          Send Invite
        </button>
      </div>
    </div>
  </div>
)}



    </div>
  );
};

export default App;



