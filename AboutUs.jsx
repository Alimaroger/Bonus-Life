import React from 'react';

const AboutUs = () => {
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    lineHeight: '1.6'
  };

  const mainContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 2rem',
    textAlign: 'center'
  };

  const headerStyle = {
    marginBottom: '4rem'
  };

  const titleStyle = {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: '800',
    color: '#DC2626',
    marginBottom: '1rem',
    textAlign: 'center',
    letterSpacing: '-0.02em'
  };

  const sectionStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    padding: '3rem',
    marginBottom: '3rem',
    boxShadow: '0 10px 25px rgba(220, 38, 38, 0.1)',
    border: '1px solid rgba(220, 38, 38, 0.1)',
    textAlign: 'left'
  };

  const sectionTitleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: '1.5rem',
    textAlign: 'center',
    position: 'relative',
    paddingBottom: '1rem'
  };

  const paragraphStyle = {
    fontSize: '1.1rem',
    marginBottom: '1.5rem',
    color: '#374151',
    textAlign: 'center'
  };

  const subheadingStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#B91C1C',
    marginTop: '2rem',
    marginBottom: '1rem'
  };

  const listStyle = {
    listStyle: 'none',
    padding: '0'
  };

  const listItemStyle = {
    backgroundColor: '#fef2f2',
    padding: '1rem',
    marginBottom: '0.75rem',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #DC2626'
  };

  const strongStyle = {
    color: '#DC2626',
    fontWeight: '600'
  };

  const linkStyle = {
    color: '#DC2626',
    textDecoration: 'none',
    fontWeight: '600',
    borderBottom: '2px solid transparent',
    transition: 'border-color 0.3s ease'
  };

  const heroImageStyle = {
    width: '100%',
    maxWidth: '600px',
    height: '300px',
    backgroundColor: '#fef2f2',
    borderRadius: '1rem',
    margin: '2rem auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #DC2626',
    fontSize: '4rem',
    color: '#DC2626'
  };

  const responsiveMainStyle = {
    ...mainContentStyle,
    '@media (max-width: 768px)': {
      padding: '2rem 1rem'
    }
  };

  const responsiveSectionStyle = {
    ...sectionStyle,
    '@media (max-width: 768px)': {
      padding: '2rem 1.5rem',
      margin: '2rem 0'
    }
  };

  const responsiveTitleStyle = {
    ...titleStyle,
    '@media (max-width: 768px)': {
      fontSize: '2rem'
    }
  };

  const teamGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  };

  const teamCardStyle = {
    backgroundColor: '#fef2f2',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '2px solid #DC2626',
    textAlign: 'center'
  };

  const processGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  };

  const processCardStyle = {
    backgroundColor: '#fef2f2',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    borderLeft: '4px solid #DC2626',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <div style={responsiveMainStyle}>
        <header style={headerStyle}>
          <h1 style={responsiveTitleStyle}>About Us – Bonus Life Fitness</h1>
          <div style={heroImageStyle}>
            🏋️‍♂️💪🏃‍♀️
          </div>
          <p style={{...paragraphStyle, fontSize: '1.2rem', color: '#6B7280', maxWidth: '800px', margin: '0 auto'}}>
            Empowering healthier lifestyles through innovative fitness technology and personalized wellness solutions.
          </p>
        </header>

        <section style={responsiveSectionStyle}>
          <h2 style={sectionTitleStyle}>
            Our Mission
          </h2>
          <p style={paragraphStyle}>
            At <span style={strongStyle}>Bonus Life</span>, our mission is to empower individuals across Cameroon
            and beyond to pursue a healthier lifestyle through accessible, culturally relevant,
            and technology-driven fitness solutions. Our web app delivers personalized fitness
            and nutrition plans, progress tracking, and community support — all built with care
            by a passionate team of student developers.
          </p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap'}}>
            <div style={{textAlign: 'center', padding: '1rem'}}>
              <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>🎯</div>
              <h4 style={{color: '#DC2626', marginBottom: '0.5rem'}}>Personalized</h4>
              <p style={{fontSize: '0.9rem', color: '#6B7280'}}>Tailored fitness plans</p>
            </div>
            <div style={{textAlign: 'center', padding: '1rem'}}>
              <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>🌍</div>
              <h4 style={{color: '#DC2626', marginBottom: '0.5rem'}}>Accessible</h4>
              <p style={{fontSize: '0.9rem', color: '#6B7280'}}>Available everywhere</p>
            </div>
            <div style={{textAlign: 'center', padding: '1rem'}}>
              <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>🤝</div>
              <h4 style={{color: '#DC2626', marginBottom: '0.5rem'}}>Community</h4>
              <p style={{fontSize: '0.9rem', color: '#6B7280'}}>Support & motivation</p>
            </div>
          </div>
        </section>

        <section style={responsiveSectionStyle}>
          <h2 style={sectionTitleStyle}>
            Our Team
          </h2>
          <p style={paragraphStyle}>
            We developed <span style={strongStyle}>Bonus Life Fitness Web App</span> as part of our group project
            at ICT University, using <span style={strongStyle}>Agile methodology</span> with two-week sprints,
            iterative development, and continuous feedback. Each team member played a key role
            in delivering the project.
          </p>

          {/* Team Photo Section */}
          <div style={{
            backgroundColor: '#fef2f2',
            borderRadius: '1rem',
            padding: '2rem',
            margin: '2rem 0',
            border: '2px solid #DC2626',
            textAlign: 'center'
          }}>
            <h3 style={{...subheadingStyle, textAlign: 'center', marginBottom: '1.5rem'}}>Our Team</h3>
            <div style={{
              width: '100%',
              maxWidth: '800px',
              height: '400px',
              backgroundColor: '#ffffff',
              borderRadius: '1rem',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px dashed #DC2626',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{fontSize: '4rem', color: '#DC2626'}}>👥</div>
              <p style={{color: '#DC2626', fontWeight: '600', fontSize: '1.2rem'}}>Team Group Photo</p>
              <p style={{color: '#6B7280', fontSize: '0.9rem', maxWidth: '300px'}}>
                Professional team photo showcasing our dedicated group of student developers
              </p>
            </div>
          </div>

          {/* Individual Team Members */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {/* Scrum Master */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '1rem',
              padding: '2rem',
              border: '2px solid #DC2626',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(220, 38, 38, 0.1)'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                backgroundColor: '#fef2f2',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #DC2626',
                fontSize: '3rem',
                color: '#DC2626'
              }}>
                👨‍💼
              </div>
              <h4 style={{...strongStyle, fontSize: '1.2rem', marginBottom: '0.5rem'}}>ALIMA NKOUDOU ROGER</h4>
              <p style={{color: '#DC2626', fontWeight: '600', marginBottom: '0.5rem'}}>Scrum Master</p>
              <p style={{color: '#6B7280', fontSize: '0.9rem', marginBottom: '1rem'}}>ICTU20223228</p>
              <p style={{fontSize: '0.9rem', color: '#374151', lineHeight: '1.5'}}>
                Leading the team with Agile methodologies, ensuring smooth sprint execution and removing blockers for optimal productivity.
              </p>
            </div>

            {/* Product Owner */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '1rem',
              padding: '2rem',
              border: '2px solid #DC2626',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(220, 38, 38, 0.1)'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                backgroundColor: '#fef2f2',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #DC2626',
                fontSize: '3rem',
                color: '#DC2626'
              }}>
                👩‍💼
              </div>
              <h4 style={{...strongStyle, fontSize: '1.2rem', marginBottom: '0.5rem'}}>JOY ATEHBIH CHEBEGWEN</h4>
              <p style={{color: '#DC2626', fontWeight: '600', marginBottom: '0.5rem'}}>Product Owner</p>
              <p style={{color: '#6B7280', fontSize: '0.9rem', marginBottom: '1rem'}}>ICTU20234316</p>
              <p style={{fontSize: '0.9rem', color: '#374151', lineHeight: '1.5'}}>
                Defining product vision and requirements, ensuring the app meets user needs and business objectives.
              </p>
            </div>

            {/* Frontend Developer */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '1rem',
              padding: '2rem',
              border: '2px solid #DC2626',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(220, 38, 38, 0.1)'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                backgroundColor: '#fef2f2',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #DC2626',
                fontSize: '3rem',
                color: '#DC2626'
              }}>
                👩‍💻
              </div>
              <h4 style={{...strongStyle, fontSize: '1.2rem', marginBottom: '0.5rem'}}>MAKUETE LEKOGNIA MARIE MICHELLE</h4>
              <p style={{color: '#DC2626', fontWeight: '600', marginBottom: '0.5rem'}}>Frontend Developer</p>
              <p style={{color: '#6B7280', fontSize: '0.9rem', marginBottom: '1rem'}}>ICTU20234486</p>
              <p style={{fontSize: '0.9rem', color: '#374151', lineHeight: '1.5'}}>
                Crafting beautiful and responsive user interfaces with modern React technologies and professional design principles.
              </p>
            </div>

            {/* Backend Developer */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '1rem',
              padding: '2rem',
              border: '2px solid #DC2626',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(220, 38, 38, 0.1)'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                backgroundColor: '#fef2f2',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #DC2626',
                fontSize: '3rem',
                color: '#DC2626'
              }}>
                👨‍💻
              </div>
              <h4 style={{...strongStyle, fontSize: '1.2rem', marginBottom: '0.5rem'}}>ACHUH HOPE ANENG</h4>
              <p style={{color: '#DC2626', fontWeight: '600', marginBottom: '0.5rem'}}>Backend Developer</p>
              <p style={{color: '#6B7280', fontSize: '0.9rem', marginBottom: '1rem'}}>ICTU20234204</p>
              <p style={{fontSize: '0.9rem', color: '#374151', lineHeight: '1.5'}}>
                Building robust backend systems with Firebase integration, ensuring secure data management and seamless user experiences.
              </p>
            </div>

            {/* QA Engineer */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '1rem',
              padding: '2rem',
              border: '2px solid #DC2626',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(220, 38, 38, 0.1)'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                backgroundColor: '#fef2f2',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #DC2626',
                fontSize: '3rem',
                color: '#DC2626'
              }}>
                👨‍🔬
              </div>
              <h4 style={{...strongStyle, fontSize: '1.2rem', marginBottom: '0.5rem'}}>ACHATESE EMMANUEL ALOH</h4>
              <p style={{color: '#DC2626', fontWeight: '600', marginBottom: '0.5rem'}}>QA & Testing Lead</p>
              <p style={{color: '#6B7280', fontSize: '0.9rem', marginBottom: '1rem'}}>ICTU20234354</p>
              <p style={{fontSize: '0.9rem', color: '#374151', lineHeight: '1.5'}}>
                Ensuring top-quality software through comprehensive testing strategies, bug detection, and quality assurance processes.
              </p>
            </div>
          </div>
        </section>

        <section style={responsiveSectionStyle}>
          <h2 style={sectionTitleStyle}>
            Our Process
          </h2>
          <p style={paragraphStyle}>
            Our development follows industry-standard Agile practices to ensure quality and timely delivery.
          </p>
          <div style={processGridStyle}>
            <div style={{...processCardStyle, ':hover': {transform: 'translateY(-5px)', boxShadow: '0 15px 30px rgba(220, 38, 38, 0.2)'}}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem', textAlign: 'center'}}>🏃‍♂️</div>
              <span style={strongStyle}>Sprint-based delivery:</span><br/>
              Two-week sprints with regular reviews and retrospectives.
            </div>
            <div style={{...processCardStyle, ':hover': {transform: 'translateY(-5px)', boxShadow: '0 15px 30px rgba(220, 38, 38, 0.2)'}}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem', textAlign: 'center'}}>🤝</div>
              <span style={strongStyle}>Collaboration:</span><br/>
              Daily stand-ups to share progress and address blockers.
            </div>
            <div style={{...processCardStyle, ':hover': {transform: 'translateY(-5px)', boxShadow: '0 15px 30px rgba(220, 38, 38, 0.2)'}}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem', textAlign: 'center'}}>💬</div>
              <span style={strongStyle}>User feedback:</span><br/>
              Iterative improvement based on feedback from pilot testers.
            </div>
            <div style={{...processCardStyle, ':hover': {transform: 'translateY(-5px)', boxShadow: '0 15px 30px rgba(220, 38, 38, 0.2)'}}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem', textAlign: 'center'}}>🔄</div>
              <span style={strongStyle}>Continuous integration:</span><br/>
              Frequent deployment updates using Firebase Hosting and Firestore.
            </div>
          </div>
        </section>

        <section style={{...responsiveSectionStyle, textAlign: 'center', background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)'}}>
          <h2 style={sectionTitleStyle}>
            Contact
          </h2>
          <p style={paragraphStyle}>
            Ready to start your fitness journey or have questions about our app?<br/>
            We'd love to hear from you!
          </p>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '1rem',
            border: '2px solid #DC2626',
            maxWidth: '500px',
            margin: '2rem auto',
            boxShadow: '0 10px 25px rgba(220, 38, 38, 0.1)'
          }}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📧</div>
            <p style={{marginBottom: '1rem', color: '#374151'}}>
              For inquiries or collaborations:
            </p>
            <a
              href="mailto:bonuslife.team@ictuniversity.edu"
              style={{
                ...linkStyle,
                fontSize: '1.2rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#DC2626',
                color: '#ffffff',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#B91C1C';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 20px rgba(220, 38, 38, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#DC2626';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              bonuslife.team@ictuniversity.edu
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
