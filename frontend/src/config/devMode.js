// src/config/devMode.js

const isDev = import.meta.env.DEV;

/**
 * 🔥 MASTER DEV MODE SWITCH
 * Controls entire app behavior in development
 */
export const DEV_MODE = {
  enabled: isDev,

  // 👤 Auth system
  auth: {
    bypassLogin: isDev,
    fakeUser: {
      id: "dev-user",
      name: "Developer",
      email: "dev@local.app"
    }
  },

  // 💳 Payment system
  payment: {
    bypassPayment: isDev,
    isPaid: true
  },

  // ✏️ Editing system
  editing: {
    enabled: isDev
  },

  // 🚫 UI controls
  ui: {
    blockSignupModal: isDev,
    blockPaymentModal: isDev
  }
};
