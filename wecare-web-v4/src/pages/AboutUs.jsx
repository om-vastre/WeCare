import React from 'react'

export default function AboutUs() {
  return (
    <>
      <div className='body-container'><div className="side-navbar">
        <div className="logo">
          <img src="img/logo.svg" alt="" />
        </div>
      </div>
        <div className="container">
          <div className="contex-container-1">
            <div className="info f">
              <h1 className="com-name">WeCare</h1>
              <p>Hospital Management System</p>
              <img src="/img/logoimg.jpg" alt="" />
            </div>
            <div className="divider-v"></div>
            <div className="about-container">
              <h1> Welcome to WeCare Hospital Management System!</h1>
              <p>Our mission is to revolutionize healthcare management by providing a user-friendly system that
                streamlines operations and enhances patient care. Our features include efficient patient management,
                appointment scheduling, billing, EHR, inventory control, and robust analytics. With a focus on
                security and compliance, our scalable and customizable system is designed to meet the unique needs
                of healthcare facilities, from clinics to hospitals. Experience 24/7 support as you simplify
                administration, optimize efficiency, and prioritize patient well-being with We Care.</p>

              <h4>Why Choose We Care Hospital Management System:</h4>
              <ul>
                <li>User-Friendly Interface: Our system is designed with a user-centric approach, making it easy for
                  healthcare professionals to navigate and utilize its features effectively.</li>
                <li>Scalability: Whether you run a small clinic or a large hospital, our system scales to meet your
                  needs. It adapts as your institution grows.</li>
                <li>Customization: We understand that each healthcare facility is unique. Our system can be tailored
                  to match your specific workflows and requirements.</li>
                <li>24/7 Support: We provide continuous technical support to ensure a smooth experience. Our team is
                  dedicated to addressing your queries and concerns promptly.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
