// src/services/contact.js
import { directus } from "./api/directus";
import { createItem } from "@directus/sdk";

/**
 * Submit contact form to Directus
 * @param {Object} formData - Contact form data
 * @param {string} formData.firstName - First name
 * @param {string} formData.lastName - Last name
 * @param {string} formData.email - Email address
 * @param {string} formData.phone - Phone number
 * @param {string} formData.message - Message content
 * @returns {Promise<Object>} Created submission object
 */
export const submitContactForm = async (formData) => {
  try {
    const submission = await directus.request(
      createItem("contact_submission", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        status: "new", // Default status
      })
    );

    return {
      success: true,
      data: submission,
      message: "Contact form submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    
    return {
      success: false,
      error: error.message || "Failed to submit contact form",
      message: "An error occurred while submitting your message. Please try again.",
    };
  }
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic check)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
  // Remove spaces, dashes, parentheses
  // eslint-disable-next-line no-useless-escape
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  // Check if it has at least 10 digits
  return cleanPhone.length >= 10;
};