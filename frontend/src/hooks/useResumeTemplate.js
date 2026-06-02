import { useEffect, useState } from "react";

const API_BASE = "https://resume-builder-backend-66wy.onrender.com";

export default function useResumeTemplate(templateId, defaultData) {
  const STORAGE_KEY = `${templateId}_resumeData`;

  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [saveStatus] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
  }, [resumeData, STORAGE_KEY]);

  const handleChange = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactChange = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      contact: {
        ...(prev.contact || {}),
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (section, index, value) => {
    const updated = [...resumeData[section]];
    updated[index] = value;

    setResumeData((prev) => ({
      ...prev,
      [section]: updated,
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...resumeData.experience];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setResumeData((prev) => ({
      ...prev,
      experience: updated,
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...resumeData.education];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setResumeData((prev) => ({
      ...prev,
      education: updated,
    }));
  };

  const handleSaveResume = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        window.dispatchEvent(new Event("openSignupModal"));
        return;
      }

      const response = await fetch(`${API_BASE}/api/resume/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          templateId,
          data: resumeData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Save failed");
        return;
      }

      alert("Resume saved to MongoDB successfully");
    } catch (error) {
      console.error("Save resume error:", error);
      alert("Save failed");
    }
  };

  const loadResume = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsInitialLoad(false);
        return;
      }

      const response = await fetch(`${API_BASE}/api/resume/load?templateId=${templateId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok && result.success && result.resume) {
        setResumeData({
          ...defaultData,
          ...result.resume,
        });
      }
    } catch (error) {
      console.error("Load Resume Error:", error);
    } finally {
      setIsInitialLoad(false);
    }
  };

  const checkPaymentStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return false;

      const response = await fetch(`${API_BASE}/api/payments/check`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      const canAccess =
        result.isPaid === true || result.canAccessPremium === true;

      if (canAccess) {
        localStorage.setItem("canAccessPremium", "true");
      }

      return canAccess;
    } catch (error) {
      console.error("Payment check error:", error);
      return false;
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  return {
    resumeData,
    setResumeData,
    saveStatus,
    isInitialLoad,
    handleChange,
    handleContactChange,
    handleArrayChange,
    handleExperienceChange,
    handleEducationChange,

    handleSaveResume,
    checkPaymentStatus,
    loadResume,
  };
}
