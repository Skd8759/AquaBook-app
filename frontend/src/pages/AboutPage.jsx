import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Users, Clock, MapPin, Shield, Smartphone, Zap, Heart, Facebook, Instagram, Linkedin } from 'lucide-react';

const AboutPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Premium Pool",
      description: "Olympic-sized pool with modern facilities and clean environment"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Flexible Booking",
      description: "Gender-specific sessions with easy online booking and cancellation"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "30-Minute Slots",
      description: "Optimized time slots for maximum swimming utilization and swimmer satisfaction"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Smart Management",
      description: "Real-time availability tracking and intelligent capacity control"
    }
  ];

  const techFeatures = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile First",
      description: "Responsive design that works perfectly on all devices"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Instant notifications and live availability status"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Booking",
      description: "JWT authentication and secure booking by college email verification"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "User Friendly",
      description: "Intuitive interface designed for the best user experience"
    }
  ];

  return (
   <div className="min-h-screen bg-gradient-to-br from-[#001f4c] to-[#003366]">
      {/* Header */}
      <motion.header 
        className="flex items-center justify-between p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.button>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">NITK Swimming Pool</h1>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-blue-700 bg-clip-text text-transparent">
              NITK Swimming Pool
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            A modern, intelligent swimming pool booking system designed to enhance your experience 
            at the National Institute of Technology Karnataka(Suratkhal).
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-4xl mx-auto">
              To provide NITK students and staff with a seamless, efficient, and enjoyable way to book 
              swimming sessions. We believe that sports and physical activitys are essential for a balanced 
              academic life, and our platform makes it easier than ever to stay active and connected 
              with fellow pool exprience.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Built with Modern Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <div className="text-blue-400 mb-3 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">Sign Up & Login</h3>
              <p className="text-white/70">
                Create your account with your NITK email and verify with OTP for secure access.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">Choose Your Slot</h3>
              <p className="text-white/70">
                Browse available time slots, select your preferred gender-specific session.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">Book & Swim</h3>
              <p className="text-white/70">
                Confirm your booking and enjoy your swim with instant confirmation and updates.
              </p>
            </motion.div>
          </div>
        </motion.div>
         {/* Founder & Developer Section */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-white/20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Meet the Developer</h2>
            <div className="flex flex-col items-center">
              {/* Placeholder for the founder's photo */}
              <img
                src="https://avatars.githubusercontent.com/u/177351406?s=400&u=8211ff815f51bf36583943414179a5ddb8b85de0&v=4"
                alt="Saikat Dey"
                className="w-40 h-40 rounded-full border-4 border-emerald-400 mb-4"
              />
              <h3 className="text-2xl font-semibold text-white">Saikat Dey</h3>
              <p className="text-lg text-white/70">Full Stack Developer & UI/UX Designer</p>
              <p className="text-md text-white/70 mt-2">
                **Education:**
              </p>
              <p className="text-white/70">Master of Computer Applications from <b>National Institute of Technology Karnataka, Surathkal</b></p>
              <p className="text-white/70 mb-2">B.Sc. in Mathematics(H) from <b>West Bengal State University</b></p>
              <p className="text-md text-white/70 max-w-lg">
                A passionate developer dedicated to creating intuitive and efficient web applications that solve real-world problems.
              </p>
               {/* Social Media Links */}
              <div className="flex space-x-6 mt-6 text-white/80">
                <a href="https://m.facebook.com/saikat.dey.128683/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <Facebook size={28} />
                </a>
                <a href="https://www.instagram.com/sadey9734/?igsh=YzljYTk1ODg3Zg%3D%3D#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <Instagram size={28} />
                </a>
                <a href="https://www.linkedin.com/in/saikat-dey-1648562b0" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <Linkedin size={28} />
                </a>
              </div>
            </div>
          </motion.div>
        {/* Contact & Support */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Need Help?</h2>
          <p className="text-lg text-white/80 mb-6">
            Our support team is here to help you with any questions or issues.
          </p>
           <p className="text-lg text-white/80">
              <b>Contact:</b> +91-XXXXXXXXXX
            </p>
             <p className="text-lg text-white/80">
              <b>Email:</b> aquabook.app.contact@gmail.com
            </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
            <motion.button
             onClick={() => navigate('/')}
             className="bg-gradient-to-r from-blue-400 to-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-green-600 transition-all duration-300"
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
        >
                Back to Home
           </motion.button>

           
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;