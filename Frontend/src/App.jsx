import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/MainLayout';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import LearningModule from './components/LearningModule';
import UserDashboard from './components/UserDashboard';
import ResourcesPage from './components/ResourcesPage';
import WhyLearnISL from './components/HomeSection/WhyLearnISL';
import TransformLives from "./components/HomeSection/TransformLives";
import LearningJourney from "./components/HomeSection/LearningJourney";
import StartFree from "./components/HomeSection/StartFree";
import Login from "./components/Auth/Login"
import SignUp from "./components/Auth/SignUp"

const App = () => {
  return (
    <AuthProvider>
      <div>
        <AnimatePresence mode="wait">
          <Routes>
          <Route
            path="/"
            element={
              <motion.div
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Landing />
              </motion.div>
            }
          />
          <Route
            path="/home"
            element={
              <motion.div
                key="main-layout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MainLayout />
              </motion.div>
            }
          />
            <Route
            path="/learn"
            element={
              <motion.div
                key="learn-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LearningModule />
              </motion.div>
            }
          />

          <Route
            path="/why-learn"
            element={
              <motion.div
                key="why-learn-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Navbar />
                <WhyLearnISL/>
              </motion.div>
            }
          />

            <Route
            path="/community"
            element={
              <motion.div
                key="community-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Navbar />
                <TransformLives/>
              </motion.div>
            }
          />

              <Route
            path="/resources"
            element={
              <motion.div
                key="resources-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ResourcesPage />
              </motion.div>
            }
          />

          <Route
            path="/learning-journey"
            element={
              <motion.div
                key="learning-journey-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Navbar />
                <LearningJourney/>
              </motion.div>
            }
          />

          <Route
            path="/about"
            element={
              <motion.div
                key="about-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Navbar />
                <StartFree/>
              </motion.div>
            }
          />

          <Route
            path="/dashboard"
            element={
              <motion.div
                key="dashboard-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <UserDashboard />
              </motion.div>
            }
          />

          <Route
            path="/login"
            element={
              <motion.div
                key="login-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Login />
              </motion.div>
            }
          />

          <Route
            path="/signup"
            element={
              <motion.div
                key="signup-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SignUp />
              </motion.div>
            }
          />

          </Routes>
        </AnimatePresence>
      </div>
    </AuthProvider>
  );
};

export default App;
