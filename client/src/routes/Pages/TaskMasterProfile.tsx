import React from 'react';

/**
 * Profile page component for TaskMaster AI agent
 * @returns TaskMaster AI profile React component
 */
export default function TaskMasterProfile() {
  const features = [
    {
      icon: '⚡',
      title: 'Smart Task Prioritization',
      description:
        'Automatically ranks your tasks based on deadlines, importance, and time estimates using advanced AI algorithms.',
    },
    {
      icon: '📅',
      title: 'Deadline Management',
      description:
        'Never miss another deadline with intelligent reminders and time-blocking suggestions tailored to your schedule.',
    },
    {
      icon: '🎯',
      title: 'Goal Tracking',
      description:
        'Break down large projects into manageable steps and track progress with visual indicators and milestone celebrations.',
    },
    {
      icon: '⏰',
      title: 'Time Estimation',
      description:
        'Learn how long tasks actually take and improve your planning with AI-powered time predictions based on your history.',
    },
    {
      icon: '🔄',
      title: 'Habit Integration',
      description:
        'Seamlessly blend daily habits with your task list to create a comprehensive productivity system.',
    },
    {
      icon: '📊',
      title: 'Progress Analytics',
      description:
        'Gain insights into your productivity patterns with detailed reports and suggestions for improvement.',
    },
  ];

  const useCases = [
    'Managing multiple work projects simultaneously',
    'Balancing personal and professional commitments',
    'Preparing for important deadlines and exams',
    'Organizing household tasks and errands',
    'Planning and executing creative projects',
    'Maintaining consistent daily routines',
  ];

  const benefits = [
    {
      title: 'Reduced Stress',
      description:
        'Stop worrying about forgotten tasks with a reliable AI assistant that keeps everything organized.',
    },
    {
      title: 'Increased Productivity',
      description:
        'Focus on high-impact activities while TaskMaster handles the mental overhead of task management.',
    },
    {
      title: 'Better Work-Life Balance',
      description:
        'Efficiently manage both professional and personal responsibilities without overlap or confusion.',
    },
    {
      title: 'Improved Time Awareness',
      description:
        'Develop better time estimation skills and realistic planning through AI-powered insights.',
    },
  ];

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
      }}
    >
      <style jsx>{`
        .header-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
        }

        .agent-icon {
          font-size: 80px;
          margin-bottom: 20px;
          display: block;
        }

        .agent-title {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .agent-tagline {
          font-size: 20px;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto 30px;
          line-height: 1.4;
        }

        .cta-button {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid white;
          color: white;
          padding: 15px 30px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          background: white;
          color: #667eea;
        }

        .content-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .section-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 40px;
          text-align: center;
        }

        .description-text {
          font-size: 18px;
          line-height: 1.6;
          color: #444;
          max-width: 800px;
          margin: 0 auto 60px;
          text-align: center;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }

        .feature-card {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e1e5e9;
        }

        .feature-icon {
          font-size: 40px;
          margin-bottom: 20px;
          display: block;
        }

        .feature-title {
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .feature-description {
          color: #666;
          line-height: 1.5;
        }

        .use-cases-section {
          background: white;
          padding: 60px 20px;
          margin: 60px 0;
        }

        .use-cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .use-case-item {
          padding: 20px;
          background: #f8f9fa;
          border-radius: 12px;
          border-left: 4px solid #667eea;
          font-size: 16px;
          color: #333;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .benefit-card {
          text-align: center;
          padding: 30px;
        }

        .benefit-title {
          font-size: 22px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 15px;
        }

        .benefit-description {
          color: #666;
          line-height: 1.5;
        }

        .getting-started-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
        }

        .getting-started-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .getting-started-text {
          font-size: 18px;
          opacity: 0.9;
          margin-bottom: 30px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .start-button {
          background: white;
          color: #667eea;
          border: none;
          padding: 18px 40px;
          border-radius: 30px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .start-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <div className="header-section">
        <span className="agent-icon">🚀</span>
        <h1 className="agent-title">TaskMaster AI</h1>
        <p className="agent-tagline">
          Your intelligent productivity companion that transforms chaos into clarity, helping you
          master your tasks and reclaim your time.
        </p>
        <button className="cta-button">Try TaskMaster Free</button>
      </div>

      <div className="content-section">
        <h2 className="section-title">Revolutionize Your Productivity</h2>
        <p className="description-text">
          TaskMaster AI isn't just another to-do app—it's your personal productivity strategist.
          Using advanced artificial intelligence, it learns your working patterns, understands your
          priorities, and automatically organizes your life so you can focus on what truly matters.
          Say goodbye to overwhelming task lists and hello to effortless organization.
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <span className="feature-icon">{feature.icon}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="use-cases-section">
        <div className="content-section">
          <h2 className="section-title">Perfect For</h2>
          <div className="use-cases-grid">
            {useCases.map((useCase, index) => (
              <div key={index} className="use-case-item">
                {useCase}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2 className="section-title">Transform Your Life</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="getting-started-section">
        <h2 className="getting-started-title">Ready to Master Your Tasks?</h2>
        <p className="getting-started-text">
          Join thousands of professionals who've transformed their productivity with TaskMaster AI.
          Start your free trial today and experience the future of task management.
        </p>
        <button className="start-button">Start Your Free Trial</button>
      </div>
    </div>
  );
}
