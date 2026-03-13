/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MY_COLORS } from "../../constants/colors.js";
import { IMAGES } from "../../assets/assets.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { submitContactForm, isValidEmail, isValidPhone } from "../../services/contact.js";

const FormulaContact = () => {
  const { t } = useTranslation();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle phone input change
  const handlePhoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('contact.form.errors.lastNameRequired') || "Last name is required";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('contact.form.errors.firstNameRequired') || "First name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.form.errors.phoneRequired') || "Phone is required";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = t('contact.form.errors.phoneInvalid') || "Phone number is invalid";
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.errors.emailRequired') || "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = t('contact.form.errors.emailInvalid') || "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.errors.messageRequired') || "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitStatus(null);
    setSubmitMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmitStatus("success");
        setSubmitMessage(t('contact.form.success') || "Thank you! Your message has been sent successfully.");
        
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });

        setTimeout(() => {
          setSubmitStatus(null);
          setSubmitMessage("");
        }, 5000);
      } else {
        setSubmitStatus("error");
        setSubmitMessage(result.message || t('contact.form.error') || "Something went wrong. Please try again.");
      }
    } catch (errors) {
      setSubmitStatus("error");
      setSubmitMessage(t('contact.form.error') || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const slideDown = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
    }
  };

  const slideRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
    }
  };

  return (
    <section className="w-full bg-white-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADINGS */}
        <motion.div
          className="mb-8 sm:mb-10 md:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideDown}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#00729B] leading-tight">
            {t('contact.form.title')}
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-semibold text-black">
            {t('contact.form.subtitle')}
          </p>
          <p className="mt-2 text-base sm:text-lg md:text-xl font-semibold text-[#00729B]">
            {t('contact.form.subtitle2')}
          </p>
        </motion.div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-stretch">
          {/* LEFT: FORM */}
          <motion.div
            className="bg-white border border-[#00729B] p-6 sm:p-8 md:p-10 shadow-sm rounded-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideLeft}
           >
            <h2 className="sr-only">{t('contact.form.title')}</h2>

            {/* Success/Error Message */}
            {submitStatus && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus === "success"
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                <p className="text-sm font-medium">{submitMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Form fields remain the same... */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  {t('contact.form.lastName')} *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={t('contact.form.lastNamePlaceholder')}
                  className={`w-full border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } focus:border-[#00729B] focus:ring-2 focus:ring-[#00729B]/20 rounded-sm px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none transition-all`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  {t('contact.form.firstName')} *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={t('contact.form.firstNamePlaceholder')}
                  className={`w-full border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } focus:border-[#00729B] focus:ring-2 focus:ring-[#00729B]/20 rounded-sm px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none transition-all`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  {t('contact.form.phone')} *
                </label>
                <PhoneInput
                  country={"cm"}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  enableSearch={true}
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  containerClass="w-full"
                  inputClass={`!w-full !h-[44px] sm:!h-[48px] !text-sm !border ${
                    errors.phone ? "!border-red-500" : "!border-gray-300"
                  } !rounded-sm !pl-12 sm:!pl-14`}
                  buttonClass="!border !border-gray-300 !rounded-l-sm"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  {t('contact.form.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact.form.emailPlaceholder')}
                  className={`w-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:border-[#00729B] focus:ring-2 focus:ring-[#00729B]/20 rounded-sm px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none transition-all`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  {t('contact.form.message')} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t('contact.form.messagePlaceholder')}
                  className={`w-full border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } focus:border-[#00729B] focus:ring-2 focus:ring-[#00729B]/20 rounded-sm px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none resize-none transition-all`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#00729B] hover:bg-[#005d7e] active:bg-[#004a63] text-white font-semibold py-3 sm:py-3.5 text-sm sm:text-base tracking-wide transition-all duration-200 rounded-sm ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t('contact.form.sending') || 'Sending...'}
                    </span>
                  ) : (
                    t('contact.form.submit')
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* RIGHT: IMAGE */}
          <motion.div
            className="w-full h-64 sm:h-80 md:h-96 lg:h-full min-h-[400px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideRight}
           >
            <img
              src={IMAGES.IMG17}
              alt={t('contact.form.imageAlt')}
              className="w-full h-full rounded-lg shadow-sm 
               object-cover object-[50%_20%]
               sm:object-[50%_30%]
               md:object-[50%_12%]
               lg:object-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormulaContact;