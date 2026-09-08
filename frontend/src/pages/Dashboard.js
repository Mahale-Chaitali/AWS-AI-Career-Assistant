import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  studentProfile,
  careerMatch,
  learningRoadmap,
  interviewQuestions,
  progressStats,
} from '../data/dummyData';

const Dashboard = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const [expandedQuestions, setExpandedQuestions] = useState([]);

  const toggleQuestion = (id) => {
    setExpandedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy':
        return 'easy';
      case 'Medium':
        return 'medium';
      case 'Hard':
        return 'hard';
      default:
        return 'medium';
    }
  };

  const getPriorityColor = (p) => {
    switch (p) {
      case 'High':
        return 'crit';
      case 'Medium':
        return 'warn';
      case 'Low':
        return 'info';
      default:
        return 'warn';
    }
  };

  const getSkillLevelColor = (level) => {
    if (level >= 70) return '#1a8870';
    if (level >= 50) return '#ff9900';
    return '#d13212';
  };

  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (careerMatch.score / 100) * circumference;

  const totalTasks = learningRoadmap.reduce((acc, w) => acc + w.tasks.length, 0);
  const completedTasks = learningRoadmap.reduce(
    (acc, w) => acc + w.tasks.filter((t) => t.completed).length,
    0
  );
  const overallProgress = Math.round((completedTasks / totalTasks) * 100);

  const scoreVectors = [
    { label: 'Technical Fit', pct: 68, color: '#d13212', trend: '+4' },
    { label: 'Cloud Fluency', pct: 42, color: '#ff9900', trend: '+12' },
    { label: 'Project Proof', pct: 84, color: '#1a8870', trend: '+2' },
    { label: 'CS Fundamentals', pct: 76, color: '#232f3e', trend: '+1' },
    { label: 'System Design', pct: 55, color: '#527fff', trend: '+8' },
    { label: 'Communication', pct: 91, color: '#1167b1', trend: 'stable' },
  ];

  return (
    <div className="dashboard-page">
      <div className="container dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-header-content">
            <Link to="/profile" className="profile-back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Edit Profile
            </Link>
            <div className="db-crumbs">
              <span>Console</span>
              <span className="crumb-slash">/</span>
              <span>Career Assistant</span>
              <span className="crumb-slash">/</span>
              <span className="crumb-current">Analysis Output</span>
            </div>
            <div className="db-title-row">
              <h1 className="dashboard-title">
                Analysis Report
                <span className="db-arn">arn:aws:ca:us-east-1:stu-{studentProfile.name.split(' ').map(n=>n[0]).join('').toLowerCase()}1973:playbook/pl-098f</span>
              </h1>
              <div className="db-title-badges">
                <span className="badge-aws ok">
                  <span className="dot-pulse green" />
                  ANALYSIS COMPLETE
                </span>
                <span className="badge-aws ver">Bedrock · Claude 3.5 Sonnet</span>
              </div>
            </div>
            <p className="dashboard-subtitle">
              Run at <strong>09:42:17 UTC</strong> &middot; Target role <strong>{studentProfile.targetRole}</strong> &middot; Compared against <strong>12,487</strong> live job postings
            </p>
          </div>
          <div className="db-header-actions">
            <Link to="/profile" className="btn btn-light btn-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Student
            </Link>
            <Link to="/profile" className="btn btn-primary btn-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Re-run Analysis
            </Link>
          </div>
        </div>

        <div className="stats-grid">
          {progressStats.map((stat, i) => (
            <div key={i} className="stat-card cw-card">
              <div className="cw-card-top">
                <span className="cw-metric-label">{stat.label.toUpperCase()}</span>
                <span className={`cw-state ${stat.total ? 'hasTotal' : ''}`}>
                  {stat.total ? 'METRIC' : 'COUNT'}
                </span>
              </div>
              <div className="cw-metric-body">
                <div className="cw-num-wrap">
                  <span className="cw-num">{stat.value}</span>
                  {stat.total && <span className="cw-den"> / {stat.total}</span>}
                </div>
                {stat.total && (
                  <div className="cw-mini-stats">
                    <span className="cw-mini">{Math.round((stat.value / stat.total) * 100)}% complete</span>
                  </div>
                )}
              </div>
              {stat.total && (
                <div className="cw-bar">
                  <div style={{ width: `${(stat.value / stat.total) * 100}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-main">
            <div className="dashboard-card cw-card score-card">
              <div className="cw-card-top">
                <div>
                  <span className="cw-metric-label">CAREER MATCH SCORE</span>
                  <span className="cw-region">Target: {careerMatch.targetRole}</span>
                </div>
                <div className="cw-card-actions">
                  <span className="badge-aws ok small"><span className="dot-pulse green" /> LIVEMATCH v2.4</span>
                </div>
              </div>

              <div className="match-score-layout">
                <div className="cw-gauge-panel">
                  <div className="cw-gauge">
                    <svg viewBox="0 0 120 120">
                      <defs>
                        <linearGradient id="aws-gauge" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#d13212" />
                          <stop offset="45%" stopColor="#ff9900" />
                          <stop offset="100%" stopColor="#1a8870" />
                        </linearGradient>
                      </defs>
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#eaeded" strokeWidth="10" strokeDasharray="180 314" transform="rotate(135 60 60)" />
                      <circle
                        cx="60" cy="60" r="50"
                        fill="none"
                        stroke="url(#aws-gauge)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${(226 * careerMatch.score) / 100} 314`}
                        transform="rotate(135 60 60)"
                      />
                      <line x1="60" y1="60" x2="60" y2="19" stroke="#232f3e" strokeWidth="2" strokeLinecap="round"
                        style={{ transformOrigin: '60px 60px', transform: `rotate(${-135 + (2.7 * careerMatch.score)}deg)` }} />
                      <circle cx="60" cy="60" r="5" fill="#232f3e" />
                    </svg>
                    <div className="cw-gauge-readout">
                      <div className="cg-main">
                        <span className="cg-num">{careerMatch.score}</span>
                        <span className="cg-pct">%</span>
                      </div>
                      <div className="cg-lbl">MATCH RATING</div>
                      <div className="cg-badge">{careerMatch.score >= 80 ? 'SELECT TIER' : careerMatch.score >= 60 ? 'TOP 20%' : 'RISING'}</div>
                    </div>
                  </div>
                  <div className="cw-gauge-scale">
                    <span>0</span>
                    <span className="mid">50</span>
                    <span>100</span>
                  </div>
                </div>

                <div className="cw-vector-panel">
                  <div className="panel-subhead">
                    Skill Vector Breakdown &nbsp;<span className="sub-mono">// 6 dimensions scored</span>
                  </div>
                  <div className="vector-list">
                    {scoreVectors.map((v, i) => (
                      <div key={i} className="vector-row">
                        <div className="vector-left">
                          <span className="vector-dot" style={{ background: v.color }} />
                          <span className="vector-name">{v.label}</span>
                        </div>
                        <div className="vector-bar">
                          <div style={{ width: `${v.pct}%`, background: v.color }} />
                        </div>
                        <div className="vector-right">
                          <span className="vector-pct">{v.pct}</span>
                          <span className={`vector-trend ${v.trend === 'stable' ? 'flat' : 'up'}`}>
                            {v.trend === 'stable' ? '—' : v.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cw-summary-txt">
                    <span className="sum-label">Verdict →</span>
                    Your foundation is <strong style={{ color: '#1a8870' }}>hirable</strong>. Close the Cloud Fluency &amp; System Design gaps
                    and your profile jumps to the <strong style={{ color: '#d13212' }}>top 5%</strong> of applicants for {careerMatch.targetRole}.
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-card cw-card">
              <div className="cw-card-top">
                <div>
                  <span className="cw-metric-label">CURRENT SKILL INVENTORY</span>
                  <span className="cw-region">From profile + resume parse</span>
                </div>
                <span className="badge-aws ver small">{studentProfile.currentSkills.length} detected</span>
              </div>
              <div className="skills-grid-alt">
                {studentProfile.currentSkills.map((skill) => (
                  <div key={skill.name} className="skill-block">
                    <div className="skill-block-head">
                      <span className="skill-block-name">{skill.name}</span>
                      <span className="skill-block-lvl" style={{ color: getSkillLevelColor(skill.level) }}>
                        {skill.level >= 70 ? 'ADV' : skill.level >= 50 ? 'INT' : 'BEG'} · {skill.level}
                      </span>
                    </div>
                    <div className="skill-block-bar">
                      <div
                        style={{
                          width: `${skill.level}%`,
                          background: getSkillLevelColor(skill.level),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card cw-card pipeline-card">
              <div className="cw-card-top">
                <div>
                  <span className="cw-metric-label">4-WEEK LEARNING PIPELINE</span>
                  <span className="cw-region">
                    {completedTasks} of {totalTasks} actions complete · overall {overallProgress}%
                  </span>
                </div>
                <span className="badge-aws warn small"><span className="dot-pulse orange" /> IN PROGRESS</span>
              </div>

              <div className="pipeline-stage-buttons">
                {learningRoadmap.map((week, i) => (
                  <button
                    key={week.week}
                    className={`pipe-stage ${activeWeek === i ? 'active' : ''} ${learningRoadmap[i].tasks.every(t=>t.completed) ? 'alldone' : ''}`}
                    onClick={() => setActiveWeek(i)}
                  >
                    <span className="pipe-idx">WEEK 0{week.week}</span>
                    <span className="pipe-name">{week.title}</span>
                    <span className="pipe-status">
                      {learningRoadmap[i].tasks.every(t=>t.completed) ? '✓ SUCCEEDED' : learningRoadmap[i].tasks.some(t=>t.completed) ? '▶ IN PROGRESS' : '◌ PENDING'}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pipeline-graph">
                {learningRoadmap.map((week, i) => {
                  const weekProgress = Math.round(
                    (week.tasks.filter(t => t.completed).length / week.tasks.length) * 100
                  );
                  return (
                    <div key={week.week} className={`pipe-node ${i === activeWeek ? 'focus' : ''} ${weekProgress === 100 ? 'done' : weekProgress > 0 ? 'active' : 'pending'}`}>
                      <div className="pipe-node-head">
                        <span className="node-num">0{week.week}</span>
                        <span className="node-title">{week.title}</span>
                      </div>
                      <div className="pipe-node-bar"><div style={{ width: `${weekProgress}%` }} /></div>
                      <span className="node-pct">{weekProgress}%</span>
                      {i < learningRoadmap.length - 1 && (
                        <div className={`pipe-conn ${weekProgress === 100 ? 'lit' : ''}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="stage-detail">
                <div className="stage-detail-head">
                  <div>
                    <div className="stage-id">STAGE: week-0{learningRoadmap[activeWeek].week}</div>
                    <h4 className="stage-title">{learningRoadmap[activeWeek].title}</h4>
                    <div className="stage-focus">
                      <span className="focus-label">FOCUS:</span>
                      <span className="focus-value">{learningRoadmap[activeWeek].focus}</span>
                    </div>
                  </div>
                  <div className="stage-progress-chip">
                    {learningRoadmap[activeWeek].tasks.filter(t=>t.completed).length} / {learningRoadmap[activeWeek].tasks.length}
                    <span className="chip-sub">tasks</span>
                  </div>
                </div>

                <div className="action-list">
                  {learningRoadmap[activeWeek].tasks.map((task, idx) => (
                    <div key={task.id} className={`action-row ${task.completed ? 'ok' : idx === learningRoadmap[activeWeek].tasks.findIndex(t=>!t.completed) ? 'current' : ''}`}>
                      <div className={`action-state ${task.completed ? 'ok' : idx === learningRoadmap[activeWeek].tasks.findIndex(t=>!t.completed) ? 'run' : 'wait'}`}>
                        <span className="as-text">
                          {task.completed ? 'SUCC' : idx === learningRoadmap[activeWeek].tasks.findIndex(t=>!t.completed) ? 'RUN' : 'WAIT'}
                        </span>
                      </div>
                      <div className="action-body">
                        <div className="action-id">task-{String(idx+1).padStart(3,'0')}</div>
                        <div className="action-title">{task.title}</div>
                      </div>
                      <div className="action-meta">
                        <span className="action-duration">{task.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="stage-resources">
                  <span className="res-label">RESOURCES FOR THIS STAGE →</span>
                  <div className="res-list">
                    {learningRoadmap[activeWeek].resources.map((r, i) => (
                      <span key={i} className="res-chip">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-card cw-card">
              <div className="cw-card-top">
                <div>
                  <span className="cw-metric-label">INTERVIEW SIMULATION QUEUE</span>
                  <span className="cw-region">Generated for {careerMatch.targetRole} · AI-verified answer frames</span>
                </div>
                <span className="badge-aws ver small">{interviewQuestions.length} ready</span>
              </div>

              <div className="interview-queue">
                {interviewQuestions.map((q, i) => (
                  <div
                    key={q.id}
                    className={`q-card ${expandedQuestions.includes(q.id) ? 'open' : ''}`}
                  >
                    <div className="q-card-head" onClick={() => toggleQuestion(q.id)}>
                      <div className="q-left">
                        <span className="q-index">Q{i+1}</span>
                        <div className="q-tags">
                          <span className="q-tag cat">{q.category}</span>
                          <span className={`q-tag diff ${getDifficultyColor(q.difficulty)}`}>{q.difficulty.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="q-toggle">
                        {expandedQuestions.includes(q.id) ? '▾ HIDE HINT' : '▸ SHOW HINT'}
                      </div>
                    </div>
                    <div className="q-body">
                      <div className="q-prompt">{q.question}</div>
                    </div>
                    {expandedQuestions.includes(q.id) && (
                      <div className="q-hint-block">
                        <div className="q-hint-head">
                          <span className="hint-sig">// BEDROCK HINT · Claude 3.5 Sonnet</span>
                        </div>
                        <div className="q-hint-body">
                          <div className="hint-step"><b>1. Context:</b> Open with a 1-sentence real-world scenario you've worked on related to this.</div>
                          <div className="hint-step"><b>2. Approach:</b> Explain 2-3 tradeoffs you considered. Mention at least one AWS service by name if relevant.</div>
                          <div className="hint-step"><b>3. Outcome:</b> Close with a measurable result (latency %, deploy frequency, bug reduction).</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="dashboard-sidebar">
            <div className="dashboard-card cw-card sidebar-profile-card">
              <div className="cw-card-top slim">
                <span className="cw-metric-label">STUDENT IDENTITY</span>
                <span className="cw-state">IAM: stu/{studentProfile.name.split(' ')[0].toLowerCase()}</span>
              </div>
              <div className="sp-body">
                <div className="sp-avatar">
                  <span className="sp-initial">{studentProfile.name.split(' ').map((n) => n[0]).join('')}</span>
                  <span className="sp-ring" />
                </div>
                <div className="sp-meta">
                  <div className="sp-name">{studentProfile.name}</div>
                  <div className="sp-program">{studentProfile.education} · {studentProfile.branch}</div>
                  <div className="sp-target-line">
                    <span className="sp-arrow">→</span>
                    <span className="sp-role">{studentProfile.targetRole}</span>
                  </div>
                </div>
              </div>
              <div className="sp-tags">
                {studentProfile.interests.slice(0, 4).map((i) => (
                  <span key={i} className="sp-tag">{i}</span>
                ))}
                {studentProfile.interests.length > 4 && (
                  <span className="sp-tag muted">+{studentProfile.interests.length - 4}</span>
                )}
              </div>
            </div>

            <div className="dashboard-card cw-card">
              <div className="cw-card-top slim">
                <span className="cw-metric-label">STRENGTHS · SIGNALS</span>
                <span className="cw-state ok-state">3 FLAGGED</span>
              </div>
              <div className="strengths-stack">
                {careerMatch.strengths.map((s, i) => (
                  <div key={i} className="strength-stack-item">
                    <div className="ssi-accent" />
                    <div className="ssi-body">
                      <div className="ssi-title">{s.title}</div>
                      <div className="ssi-desc">{s.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card cw-card">
              <div className="cw-card-top slim">
                <span className="cw-metric-label">SKILL GAPS · BLOCKERS</span>
                <span className="cw-state warn-state">{careerMatch.skillGaps.length} OPEN</span>
              </div>
              <div className="gaps-stack">
                {careerMatch.skillGaps.map((gap, i) => (
                  <div key={i} className="gap-stack-item">
                    <div className="gsi-head">
                      <span className="gsi-name">{gap.name}</span>
                      <span className={`gsi-sev ${getPriorityColor(gap.importance)}`}>{gap.importance.toUpperCase()}</span>
                    </div>
                    <div className="gsi-desc">{gap.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card cw-card">
              <div className="cw-card-top slim">
                <span className="cw-metric-label">RECOMMENDED · UPSKILL</span>
                <span className="cw-state">SORTED BY ROI</span>
              </div>
              <div className="rec-stack">
                {careerMatch.recommendedSkills.map((rs, i) => (
                  <div key={i} className="rec-stack-item">
                    <div className="rsi-head">
                      <span className="rsi-rank">{String(i+1).padStart(2,'0')}</span>
                      <span className="rsi-name">{rs.name}</span>
                      <span className={`rsi-prio ${getPriorityColor(rs.priority)}`}>{rs.priority}</span>
                    </div>
                    <div className="rsi-bar"><div style={{ width: `${rs.progress}%` }} /></div>
                    <div className="rsi-pct">{rs.progress}% learned</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
