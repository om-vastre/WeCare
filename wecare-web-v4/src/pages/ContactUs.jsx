import React from 'react'

export default function ContactUs() {
  return (
    <> <div className='body-container'><div className="side-navbar">
    <div className="logo">
        <img src="img/logo.svg" alt="" />
    </div>
</div>
    <div className="container">
    <div className="contex-container-1">
            <div className="info f">
                <h1 className="com-name">WeCare</h1>
                <p>Hospital Management System</p>
                <img src="/img/logoimg.jpg" alt=""/>
            </div>
            <div className="divider-v"></div>
            <div className="contact-container">
                <div className="information-con">
                    <div>
                        <h1>Address</h1>
                        <p>WeCare Hospital, 123 HealthTech Avenue MediCity, Wellness State,Healthland 56789, Mumbai.</p>
                    </div>
                    <div>
                        <h1>Email</h1>
                        <p>info@wecarehms.com</p>
                    </div>
                    <div>
                        <h1>Contact No.</h1>
                        <p>+1 (123) 456-7890</p>
                    </div>
                </div>
                <div className="social-icons">
                    <img src="/img/facebook-round-line-icon.svg" alt="" />
                    <img src="/img/instagram-round-line-icon.svg" alt="" />
                    <img src="img/twitter-round-line-icon.svg" alt="" />
                </div>
            </div>
        </div>
    </div>
</div></>
  )
}
