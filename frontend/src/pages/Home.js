import { Link } from 'react-router-dom';

const features = [
  {
    tag: 'BEDROCK AI',
    title: 'AI Skill Gap Analysis',
    description: 'Amazon Bedrock-powered engine cross-references 500+ tech job descriptions to pinpoint exactly which skills your resume is missing.',
    stat: '500+',
    statLabel: 'Job Profiles Analyzed',
    color: 'coral',
  },
  {
    tag: 'ROADMAP v2',
    title: 'Personalized Learning Path',
    description: 'Week-by-week curriculum with AWS Skill Builder courses, GitHub labs, and hands-on projects you can deploy to your own AWS account.',
    stat: '28 days',
    statLabel: 'From Zero to Hireable',
    color: 'teal',
  },
  {
    tag: 'INTERVIEW LAB',
    title: 'Simulated Interviews',
    description: 'Role-play with our AI interviewer trained on FAANG and Big Tech interview data. Get STAR-method feedback instantly.',
    stat: '60+',
    statLabel: 'Question Templates',
    color: 'indigo',
  },
  {
    tag: 'CLOUD TRACKER',
    title: 'Live Career Signal',
    description: 'Monitors your LinkedIn, GitHub, and AWS certifications. Notifies you the moment you become a top 10% candidate.',
    stat: 'Real-time',
    statLabel: 'Signal Updates',
    color: 'amber',
  },
];

const howItWorks = [
  {
    number: '01',
    title: 'Upload Your Profile',
    description: 'Drop your resume, connect LinkedIn, or fill our form. Takes 90 seconds. We never store your raw data.',
    code: 'POST /v1/profile-ingest',
  },
  {
    number: '02',
    title: 'Bedrock Runs the Math',
    description: 'Claude Sonnet evaluates 47 skill vectors against your target role. Not a quiz — real labor market data.',
    code: 'bedrock:invoke-claude-3',
  },
  {
    number: '03',
    title: 'Get Your Playbook',
    description: 'Every task links to a specific AWS Skill Builder module, A Cloud Guru video, or hands-on lab you can ship today.',
    code: 'GET /v1/playbook/:id',
  },
  {
    number: '04',
    title: 'Ship. Iterate. Hire.',
    description: 'Check off milestones, we re-score weekly. When you hit 90% match, introductions to AWS Partner Network are unlocked.',
    code: 'PUT /v1/progress',
  },
];

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-pill">
              <span className="hero-pill-badge">NOW ON</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#FF9900">
                <path d="M18.75 12c0-1.3-.13-2.54-.37-3.72H6.15a30.4 30.4 0 000 7.44h12.23c.24-1.18.37-2.43.37-3.72z" />
              </svg>
              <span className="hero-pill-text">AWS Marketplace — Free Tier Eligible</span>
            </div>

            <h1 className="hero-title">
              Your CS degree taught you theory.
              <br />
              <span className="hero-title-stroke">
                We teach you how to <span className="hero-title-accent">get hired.</span>
              </span>
            </h1>

            <p className="hero-description">
              Drop your resume. In 90 seconds, Amazon Bedrock scores your profile against
              12,000+ live engineering roles and ships a 4-week AWS-powered playbook
              designed to make you unignorable to recruiters.
            </p>

            <div className="hero-actions">
              <Link to="/profile" className="btn btn-primary btn-lg">
                Run My Free Analysis
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <div className="hero-live-demo">
                <span className="pulse-dot" />
                <span>472 students analyzing right now</span>
              </div>
            </div>

            <div className="hero-company-row">
              <span className="hero-company-label">Graduates now at:</span>
              <div className="hero-company-logos">
                <span className="hero-company-chip">AWS</span>
                <span className="hero-company-chip">Accenture</span>
                <span className="hero-company-chip">TCS</span>
                <span className="hero-company-chip">Infosys</span>
                <span className="hero-company-chip">Wipro</span>
                <span className="hero-company-chip">Cognizant</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="aws-console">
              <div className="aws-console-bar">
                <div className="aws-dots">
                  <span className="aws-dot red" />
                  <span className="aws-dot yellow" />
                  <span className="aws-dot green" />
                </div>
                <div className="aws-bar-center">
                  <span className="aws-bar-logo">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="#FF9900">
                      <path d="M7.5 13.5v-.6c0-.9.2-1.7.7-2.2.4-.4 1.1-.7 1.8-.7.6 0 1.1.2 1.6.6.2.2.4.4.5.7l1.3-.8c-.4-.6-1-1.1-1.8-1.4-.8-.3-1.9-.3-2.7.1-.8.4-1.3 1-1.6 1.8-.3.8-.3 1.8-.3 2.7v.6c0 1 .1 1.9.3 2.7.3.8.8 1.5 1.6 1.8.8.4 1.9.4 2.7 0 .7-.4 1.2-.9 1.5-1.7.1-.2.3-.4.4-.7l-1.3-.7c-.1.2-.3.5-.5.7-.4.4-.9.6-1.5.6-.7 0-1.3-.3-1.7-.8-.4-.4-.6-1.2-.6-2v-.7zM17 14.8c-2.2.8-4.6 1.1-7 1.1-2.3 0-4.6-.3-6.9-1l-.3 1.5c2.5.8 5 1.2 7.5 1.2 2.6 0 5-.4 7.5-1.3l-.8-1.5z" />
                    </svg>
                    us-east-1
                  </span>
                  <div className="aws-search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    career-assistant / analyze / run
                  </div>
                </div>
                <div className="aws-bar-user">AR</div>
              </div>

              <div className="aws-console-body">
                <div className="aws-side-nav">
                  <div className="aws-nav-group">Services</div>
                  <div className="aws-nav-item active">Career Insights</div>
                  <div className="aws-nav-item">Skill Matrix</div>
                  <div className="aws-nav-item">Playbooks</div>
                  <div className="aws-nav-item">Interview Lab</div>
                  <div className="aws-nav-item">Cert Tracker</div>
                  <div className="aws-nav-item">Job Alerts</div>
                </div>

                <div className="aws-main-area">
                  <div className="aws-breadcrumbs">
                    <span>Services</span> <span className="slash">/</span>
                    <span>Career Assistant</span> <span className="slash">/</span>
                    <span className="current">Analysis Result</span>
                  </div>

                  <div className="aws-timeline">
                    <div className="aws-timeline-item done">
                      <div className="dot" />
                      <span>Ingest Resume</span>
                    </div>
                    <div className="aws-timeline-line done" />
                    <div className="aws-timeline-item done">
                      <div className="dot" />
                      <span>Vectorize Skills</span>
                    </div>
                    <div className="aws-timeline-line done" />
                    <div className="aws-timeline-item active">
                      <div className="dot"><span className="pulse-inner" /></div>
                      <span>Bedrock Match</span>
                    </div>
                    <div className="aws-timeline-line" />
                    <div className="aws-timeline-item pending">
                      <div className="dot" />
                      <span>Playbook Gen</span>
                    </div>
                  </div>

                  <div className="aws-grid">
                    <div className="aws-widget score-widget">
                      <div className="widget-header">
                        <span className="widget-title">Career Match Score</span>
                        <span className="widget-tag L">Full-Stack Dev</span>
                      </div>
                      <div className="score-ring-wrap">
                        <div className="score-ring">
                          <svg viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#eaeded" strokeWidth="8" />
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#FF9900" strokeWidth="8"
                              strokeDasharray="314" strokeDashoffset="88" strokeLinecap="round" transform="rotate(-90 60 60)" />
                          </svg>
                          <div className="score-inner">
                            <span className="score-num">72</span>
                            <span className="score-den">/ 100</span>
                            <span className="score-label">MATCH</span>
                          </div>
                        </div>
                        <div className="score-side">
                          <div className="score-row">
                            <span className="lbl">Technical Fit</span>
                            <div className="mini-bar"><div style={{ width: '68%', background: '#d13212' }} /></div>
                            <span className="pct">68%</span>
                          </div>
                          <div className="score-row">
                            <span className="lbl">Cloud Skills</span>
                            <div className="mini-bar"><div style={{ width: '42%', background: '#ff9900' }} /></div>
                            <span className="pct">42%</span>
                          </div>
                          <div className="score-row">
                            <span className="lbl">Project Proof</span>
                            <div className="mini-bar"><div style={{ width: '84%', background: '#1a8870' }} /></div>
                            <span className="pct">84%</span>
                          </div>
                          <div className="score-row">
                            <span className="lbl">Communication</span>
                            <div className="mini-bar"><div style={{ width: '91%', background: '#232f3e' }} /></div>
                            <span className="pct">91%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="aws-widget gaps-widget">
                      <div className="widget-header">
                        <span className="widget-title">Skill Gaps — Blocking Your Next Offer</span>
                        <span className="widget-tag crit">HIGH PRIORITY</span>
                      </div>
                      <div className="gap-list">
                        <div className="gap-row">
                          <span className="gap-name">AWS Lambda & API Gateway</span>
                          <span className="gap-impact">+18 pts</span>
                        </div>
                        <div className="gap-row">
                          <span className="gap-name">TypeScript Generics</span>
                          <span className="gap-impact">+11 pts</span>
                        </div>
                        <div className="gap-row">
                          <span className="gap-name">Docker Compose + ECS</span>
                          <span className="gap-impact">+9 pts</span>
                        </div>
                        <div className="gap-row">
                          <span className="gap-name">GraphQL Subscriptions</span>
                          <span className="gap-impact">+5 pts</span>
                        </div>
                      </div>
                    </div>

                    <div className="aws-widget playbook-widget">
                      <div className="widget-header">
                        <span className="widget-title">Week 1 Sprint — Deploy to S3 by Friday</span>
                        <span className="widget-tag inprog">IN PROGRESS</span>
                      </div>
                      <div className="playbook-list">
                        <div className="playbook-item done">
                          <div className="check" />
                          <div>
                            <span className="pb-title">AWS Cloud Practitioner (6h)</span>
                            <span className="pb-meta">Skill Builder · Est. Mon 3pm</span>
                          </div>
                        </div>
                        <div className="playbook-item done">
                          <div className="check" />
                          <div>
                            <span className="pb-title">TS Crash: Advanced Types (4h)</span>
                            <span className="pb-meta">Frontend Masters · Est. Tue noon</span>
                          </div>
                        </div>
                        <div className="playbook-item active">
                          <div className="play-dot" />
                          <div>
                            <span className="pb-title">Build Static Site + Deploy to S3</span>
                            <span className="pb-meta">Hands-on lab · In progress — 62%</span>
                            <div className="inline-bar"><div style={{ width: '62%' }} /></div>
                          </div>
                        </div>
                        <div className="playbook-item">
                          <div className="empty-dot" />
                          <div>
                            <span className="pb-title">Deploy CloudFront + Custom Domain</span>
                            <span className="pb-meta">Hands-on lab · Est. Thu evening</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="container">
          <div className="features-top">
            <div>
              <div className="eyebrow-chip">
                <span className="eyebrow-bar" />
                FEATURES
              </div>
              <h2 className="section-heading">
                Not another personality quiz.
                <br />
                A <span className="accent-word">career OS</span> built on AWS.
              </h2>
            </div>
            <p className="features-lead">
              Every module ships with AWS-native tooling, real deployable artifacts,
              and a recruiter-visible proof-of-work URL. You build actual skills —
              not checkboxes.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className={`feature-card-v2 color-${f.color}`}>
                <div className="feature-top-row">
                  <span className="feature-tag">{f.tag}</span>
                  <div className="feature-stat">
                    <span className="feature-stat-val">{f.stat}</span>
                    <span className="feature-stat-lbl">{f.statLabel}</span>
                  </div>
                </div>
                <h3 className="feature-title-v2">{f.title}</h3>
                <p className="feature-desc-v2">{f.description}</p>
                <div className="feature-bracket" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-section-v2">
        <div className="container">
          <div className="how-top">
            <div className="eyebrow-chip light">
              <span className="eyebrow-bar" />
              UNDER THE HOOD
            </div>
            <h2 className="section-heading light">
              One form submission.
              <br />
              <span className="accent-word orange">Four AWS-powered decisions.</span>
            </h2>
          </div>

          <div className="how-flow">
            {howItWorks.map((h, i) => (
              <div key={i} className="how-card-v2">
                <div className="how-number">{h.number}</div>
                <h3 className="how-title-v2">{h.title}</h3>
                <p className="how-desc-v2">{h.description}</p>
                <div className="how-code-block">
                  <span className="code-prompt">$</span>
                  <span className="code-text">{h.code}</span>
                </div>
                {i < howItWorks.length - 1 && (
                  <div className="how-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-wrap">
        <div className="container">
          <div className="cta-card-v2">
            <div className="cta-left">
              <div className="cta-tag-orange">
                <span className="cta-orange-dot" />
                Limited — 500 free analyses / month
              </div>
              <h2 className="cta-heading-v2">
                Know exactly what to learn this week.
                <br />
                <span className="cta-muted">Stop guessing. Start shipping.</span>
              </h2>
            </div>
            <div className="cta-actions-v2">
              <Link to="/profile" className="btn btn-dark btn-lg">
                Start Free — No Credit Card
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <div className="cta-guarantee">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                GDPR-aligned • No resume stored long-term
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
