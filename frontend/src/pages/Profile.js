import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const educationOptions = [
  'High School',
  'Diploma',
  'B.Tech / B.E.',
  'B.Sc',
  'BCA',
  'B.Com',
  'BBA',
  'M.Tech / M.E.',
  'M.Sc',
  'MCA',
  'MBA',
  'Ph.D.',
];

const jobRoles = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'Cloud Engineer (AWS)',
  'Data Scientist',
  'Machine Learning Engineer',
  'Data Analyst',
  'UI/UX Designer',
  'Mobile App Developer',
  'Software Engineer',
  'QA / Test Engineer',
  'Cybersecurity Analyst',
  'Product Manager',
  'Database Administrator',
];

const skillSuggestions = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust',
  'React.js', 'Vue.js', 'Angular', 'Next.js', 'Node.js', 'Express', 'Django', 'Flask',
  'Spring Boot', 'ASP.NET',
  'HTML', 'CSS', 'SASS', 'Tailwind', 'Bootstrap',
  'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform',
  'Git', 'GitHub', 'GitLab',
  'REST API', 'GraphQL', 'WebSocket',
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy',
  'Figma', 'Adobe XD', 'Photoshop', 'Illustrator',
  'Data Structures', 'Algorithms', 'System Design', 'OOP',
];

const interestSuggestions = [
  'Web Development', 'Mobile Development', 'Cloud Computing', 'DevOps',
  'Machine Learning', 'Artificial Intelligence', 'Data Science', 'Data Analytics',
  'Cybersecurity', 'Blockchain', 'IoT', 'Game Development',
  'UI/UX Design', 'Product Management', 'Open Source', 'Freelancing',
  'Research', 'Teaching', 'Consulting', 'Entrepreneurship',
];

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    education: '',
    branch: '',
    currentSkills: [],
    interests: [],
    targetRole: '',
  });
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [showInterestSuggestions, setShowInterestSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.education) {
      newErrors.education = 'Please select your education level';
    }

    if (!formData.branch.trim()) {
      newErrors.branch = 'Please enter your branch or field of study';
    } else if (formData.branch.trim().length < 2) {
      newErrors.branch = 'Branch must be at least 2 characters';
    }

    if (formData.currentSkills.length === 0) {
      newErrors.currentSkills = 'Please add at least one skill';
    }

    if (formData.interests.length === 0) {
      newErrors.interests = 'Please add at least one interest';
    }

    if (!formData.targetRole) {
      newErrors.targetRole = 'Please select your target job role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !formData.currentSkills.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        currentSkills: [...prev.currentSkills, trimmed],
      }));
      if (errors.currentSkills) {
        setErrors((prev) => ({ ...prev, currentSkills: '' }));
      }
    }
    setSkillInput('');
    setShowSkillSuggestions(false);
  };

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      currentSkills: prev.currentSkills.filter((s) => s !== skill),
    }));
  };

  const addInterest = (interest) => {
    const trimmed = interest.trim();
    if (trimmed && !formData.interests.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, trimmed],
      }));
      if (errors.interests) {
        setErrors((prev) => ({ ...prev, interests: '' }));
      }
    }
    setInterestInput('');
    setShowInterestSuggestions(false);
  };

  const removeInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    navigate('/dashboard');
  };

  const filteredSkillSuggestions = skillSuggestions.filter(
    (s) =>
      s.toLowerCase().includes(skillInput.toLowerCase()) &&
      !formData.currentSkills.includes(s)
  ).slice(0, 6);

  const filteredInterestSuggestions = interestSuggestions.filter(
    (i) =>
      i.toLowerCase().includes(interestInput.toLowerCase()) &&
      !formData.interests.includes(i)
  ).slice(0, 6);

  return (
    <div className="profile-page">
      <div className="container profile-container">
        <div className="profile-header">
          <Link to="/" className="profile-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Home
          </Link>
          <div className="profile-header-content">
            <span className="section-eyebrow">Student Profile</span>
            <h1 className="profile-title">Create Your Profile</h1>
            <p className="profile-subtitle">
              Fields are encrypted at rest. We never share your input with third parties.
              Analysis runs on Amazon Bedrock in <strong>us-east-1</strong> and takes ~90 seconds.
            </p>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSubmit} noValidate>
          <div className="form-card">
            <div className="form-card-header">
              <div className="form-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h3 className="form-card-title" data-step="[ STEP 01 / 03 ]">Personal Information</h3>
                <p className="form-card-desc">Basic identity details used to personalize your analysis output and generate a unique report ARN.</p>
              </div>
            </div>
            <div className="form-inner">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">
                    Full Name <span className="form-required">*</span>
                    
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="e.g., Aarav Sharma"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && <p className="form-error">{errors.fullName}</p>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="education">
                    Education Level <span className="form-required">*</span>
                    
                  </label>
                  <select
                    id="education"
                    name="education"
                    className={`form-input ${errors.education ? 'error' : ''}`}
                    value={formData.education}
                    onChange={handleChange}
                  >
                    <option value="">— Select education —</option>
                    {educationOptions.map((edu) => (
                      <option key={edu} value={edu}>{edu}</option>
                    ))}
                  </select>
                  {errors.education && <p className="form-error">{errors.education}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="branch">
                    Branch / Field <span className="form-required">*</span>
                   
                  </label>
                  <input
                    id="branch"
                    name="branch"
                    type="text"
                    className={`form-input ${errors.branch ? 'error' : ''}`}
                    placeholder="e.g., Computer Science & Engineering"
                    value={formData.branch}
                    onChange={handleChange}
                  />
                  {errors.branch && <p className="form-error">{errors.branch}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="form-card">
            <div className="form-card-header">
              <div className="form-card-icon alt">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div>
                <h3 className="form-card-title" data-step="[ STEP 02 / 03 ]">Skills &amp; Interests</h3>
                <p className="form-card-desc">Be specific. Mention exact frameworks (Next.js, not "web dev") and real tools you've shipped projects with.</p>
              </div>
            </div>
            <div className="form-inner">
              <div className="form-group">
                <label className="form-label">
                  Current Skills <span className="form-required">*</span>
                 
                </label>
                <div className="tag-input-wrapper">
                  <div className={`tag-input ${errors.currentSkills ? 'error' : ''}`}>
                    {formData.currentSkills.map((skill) => (
                      <span key={skill} className="tag">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="tag-remove">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      className="tag-input-field"
                      placeholder={formData.currentSkills.length === 0 ? 'e.g. React.js, Python, AWS Lambda...' : 'Add more...'}
                      value={skillInput}
                      onChange={(e) => {
                        setSkillInput(e.target.value);
                        setShowSkillSuggestions(true);
                      }}
                      onFocus={() => setShowSkillSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSkillSuggestions(false), 200)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && skillInput.trim()) {
                          e.preventDefault();
                          addSkill(skillInput);
                        }
                      }}
                    />
                  </div>
                  {showSkillSuggestions && filteredSkillSuggestions.length > 0 && (
                    <div className="tag-suggestions">
                      {filteredSkillSuggestions.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          className="tag-suggestion"
                          onMouseDown={() => addSkill(skill)}
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.currentSkills && <p className="form-error">{errors.currentSkills}</p>}
                
              </div>

              <div className="form-group">
                <label className="form-label">
                  Interests <span className="form-required">*</span>
                  
                </label>
                <div className="tag-input-wrapper">
                  <div className={`tag-input ${errors.interests ? 'error' : ''}`}>
                    {formData.interests.map((interest) => (
                      <span key={interest} className="tag interest">
                        {interest}
                        <button type="button" onClick={() => removeInterest(interest)} className="tag-remove">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      className="tag-input-field"
                      placeholder={formData.interests.length === 0 ? 'e.g. Cloud Computing, DevOps, Open Source...' : 'Add more...'}
                      value={interestInput}
                      onChange={(e) => {
                        setInterestInput(e.target.value);
                        setShowInterestSuggestions(true);
                      }}
                      onFocus={() => setShowInterestSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowInterestSuggestions(false), 200)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && interestInput.trim()) {
                          e.preventDefault();
                          addInterest(interestInput);
                        }
                      }}
                    />
                  </div>
                  {showInterestSuggestions && filteredInterestSuggestions.length > 0 && (
                    <div className="tag-suggestions">
                      {filteredInterestSuggestions.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          className="tag-suggestion"
                          onMouseDown={() => addInterest(interest)}
                        >
                          + {interest}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.interests && <p className="form-error">{errors.interests}</p>}
                
              </div>
            </div>
          </div>

          <div className="form-card">
            <div className="form-card-header">
              <div className="form-card-icon accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h3 className="form-card-title" data-step="[ STEP 03 / 03 ]">Career Goal</h3>
                <p className="form-card-desc">Pick the closest role title. We'll match it against our live database of 12,487+ open positions.</p>
              </div>
            </div>
            <div className="form-inner">
              <div className="form-group">
                <label className="form-label" htmlFor="targetRole">
                  Target Job Role <span className="form-required">*</span>
                  
                </label>
                <select
                  id="targetRole"
                  name="targetRole"
                  className={`form-input ${errors.targetRole ? 'error' : ''}`}
                  value={formData.targetRole}
                  onChange={handleChange}
                >
                  <option value="">— Select target job role —</option>
                  {jobRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {errors.targetRole && <p className="form-error">{errors.targetRole}</p>}
                
              </div>
            </div>
          </div>

          <div className="form-actions">
            <div className="form-actions-note">
              <b>privacy note:</b> inputs are processed in-memory via Amazon Bedrock, not stored long-term.
              Your report ARN expires after 30 days.
            </div>
            <div className="form-actions-buttons">
              <Link to="/" className="btn btn-ghost btn-lg" style={{background:'rgba(255,255,255,0.05)', color:'#aab7b8', border:'1px solid #37475a'}}>
                Cancel
              </Link>
              <button type="submit" className="btn btn-lg" style={{background:'#ff9900', color:'#232f3e'}} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner" style={{borderTopColor:'#232f3e', borderColor:'rgba(35,47,62,.25)'}} />
                    Invoking Bedrock...
                  </>
                ) : (
                  <>
                    Analyze My Career
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
