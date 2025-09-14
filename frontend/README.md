# Sudhaar Lo!  
**An Expert for Every Fix**

## Overview

**Sudhaar Lo!** is a modern web platform that connects homeowners in India with verified, skilled repair professionals—covering plumbing, carpentry, electrical, appliance servicing, and more. The platform solves problems of trust, transparency, and accessibility by providing reliable expert verification, flexible hire options, streamlined OTP-based job tracking, and fully digital service records, without charging users platform commissions at launch.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Objectives](#objectives)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Future Scope](#future-scope)
- [References](#references)
- [Contributors](#contributors)

## Key Features

- **Role-Based Dashboards:** Separate panels for customers, professionals, and admins.
- **Verified Expert Registration:** Professionals register with valid government ID and an annual ₹99 subscription.
- **Flexible Engagement:** Customers can call experts directly or book online.
- **OTP-Based Authentication:** Unique, on-site OTP required to start each job—adding accountability and safety.
- **Transparent Fee Recording:** Experts log the service fee for record-keeping only; payments occur off-platform.
- **Comprehensive History:** All bookings, calls, job completions, and fees are recorded for both parties.
- **No Platform Fee at Launch:** The app does not charge users or experts any booking commission at launch.
- **Notifications:** Booking confirmations, OTPs, and work completions sent via SMS and email.
- **Admin Controls:** Document verification, expert approval, user query handling, and platform oversight.

## Objectives

- Centralize verified home repair professionals in a trusted digital marketplace.
- Allow customers to freely search for, call, or book experts.
- Enforce secure, on-site job verification using OTP authentication.
- Facilitate payment transparency while keeping fund transfer outside the app.
- Enable professionals to build a digital work history and access more job opportunities.
- Sustain the platform with an annual expert subscription fee, with room for future service-based charges.
- Support ongoing product evolution with a scalable and modifiable tech foundation.

## Tech Stack

**Frontend**  
- React.js  
- Tailwind CSS  
- React Hook Form  

**Backend**  
- Node.js  
- Express.js  
- JWT for authentication

**Database & Storage**  
- MongoDB (MongoDB Atlas for managed cloud hosting)  
- AWS S3 / Google Cloud Storage (for professional document uploads)

**Communication & Notifications**  
- Twilio (SMS)
- SendGrid / Amazon SES (Email)

**DevOps/Deployment**  
- Docker  
- GitHub Actions (CI/CD)  
- HTTPS (Let’s Encrypt)  
- Hosted on AWS or GCP

## System Architecture

### Architecture Highlights

- **MERN stack** (MongoDB, Express, React, Node)
- **Client-server separation:** clean React frontend + REST API backend
- **Secure authentication:** JWT for protected routes and session management
- **Admin verification workflow:** Professional document upload, cloud storage, expert approval/rejection
- **Fully role-based data model:** Separate entities and UI for customer, expert, admin
- **OTP workflow:** Job cannot start until professional enters customer's unique OTP onsite
- **History and analytics:** All jobs and interactions logged in MongoDB, visualized on dashboards
- **Notifications:** Real-time booking, OTP, and job alerts via Twilio and SendGrid

### Data Entities (MongoDB Collections)

| Collection    | Key Fields                                                                    |
|---------------|------------------------------------------------------------------------------|
| users         | _id, name, email, role (customer/expert/admin), password hash                |
| experts       | userId (ref), document references, verification status, subscription expiry   |
| bookings      | customerId, expertId, service type, status, timestamps, agreed fee, OTP      |
| notifications | userId, type (booking/OTP/completion), message, channel, date                |
| ratings       | expertId, customerId, rating, review, date                                   |

## Installation

1. **Clone the Repository:**  
   ```bash
   git clone https://github.com/yourusername/sudhaar-lo.git
   cd sudhaar-lo
   ```

2. **Setup Backend:**  
   - `cd server`
   - `npm install`
   - Configure your `.env` file (MongoDB URI, JWT secret, Twilio and SendGrid keys)
   - `npm run dev`

3. **Setup Frontend:**  
   - `cd ../client`
   - `npm install`
   - `npm start`
   - Visit `http://localhost:3000`

4. **MongoDB & Cloud Storage:**  
   - Set up a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
   - Configure AWS S3 or Google Cloud Storage bucket for document uploads

5. **Environment Variables:**  
   - Provide all the required API keys and secrets for database, notifications, and storage in `.env`

## Usage

- **Expert:** Register, submit documents, pay subscription, get verified by admin, accept jobs, verify OTP, log work and fee, view history.
- **Customer:** Register, search/filter experts, call or book, receive and provide OTP for job, pay expert directly, see all past jobs.
- **Admin:** Verify expert applications, resolve queries, monitor workflows and user reports.

Each user role receives timely SMS/email notifications regarding bookings, OTPs, and completions.

## Future Scope

- **Mobile App:** Launch native Android/iOS apps
- **AI Expert Matching:** Personalized expert suggestions based on past jobs and location
- **Geo-location:** Real-time tracking for urgent requests
- **Multilingual Support:** Expand access across India’s regions
- **Integrated Payment Gateway:** Optional in-app payments
- **Dynamic Pricing/Subscription:** Premium tiers and surge pricing for experts
- **Advanced Feedback & Dispute Handling:** Automated review and arbitration tools

## References

- [React.js](https://reactjs.org)
- [Node.js](https://nodejs.org)
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Twilio](https://www.twilio.com)
- [SendGrid](https://sendgrid.com)
- [Docker](https://www.docker.com)
- Urban Company, JustDial, Sulekha, BuildersMART (for market research and UX guidance)

## Contributor
- **Aashika Thole**
- **Maithili Kute**
- **Aansh Dosi**
- **Jay Zawar**


> Empowering reliable home repairs—digitally, transparently, affordably.  
> **Sudhaar Lo!** – An expert for every fix.
