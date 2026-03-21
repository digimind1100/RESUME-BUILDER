import React from "react";

export default function NewFormPanel({ formData, setFormData }) {

  return (
    <div>

      <h2>Basic Info</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={formData.name || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Job Title"
        value={formData.jobTitle || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            jobTitle: e.target.value
          })
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={formData.email || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value
          })
        }
      />

      <h3>Profile Image</h3>

<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setFormData({
      ...formData,
      profileImage: imageUrl
    });
  }}
/>

<h3>QR Code</h3>

<input
  type="text"
  placeholder="Enter profile link (LinkedIn / Portfolio)"
  value={formData.profileLink || ""}
  onChange={(e) =>
    setFormData({
      ...formData,
      profileLink: e.target.value
    })
  }
/>

<button
  onClick={async () => {
    if (!formData.profileLink) return;

    const QRCode = await import("qrcode");

    const qr = await QRCode.toDataURL(formData.profileLink);

    setFormData({
      ...formData,
      qrImage: qr
    });
  }}
>
  Generate QR Code
</button>

<h3>Skills</h3>

<input
  type="text"
  placeholder="Enter skill"
  value={formData.newSkill || ""}
  onChange={(e) =>
    setFormData({
      ...formData,
      newSkill: e.target.value
    })
  }
/>

<button
  onClick={() => {
    if (!formData.newSkill?.trim()) return;

    setFormData({
      ...formData,
      skills: [...(formData.skills || []), formData.newSkill.trim()],
      newSkill: ""
    });
  }}
>
  Add Skill
</button>

<ul>
  {(formData.skills || []).map((skill, i) => (
    <li key={i}>
      {skill}
      <button
        onClick={() => {
          const updated = formData.skills.filter((_, idx) => idx !== i);
          setFormData({ ...formData, skills: updated });
        }}
      >
        ❌
      </button>
    </li>
  ))}
</ul>

<h3>Experience</h3>

<input
  type="text"
  placeholder="Job Title"
  id="exp-title"
/>

<input
  type="text"
  placeholder="Company"
  id="exp-company"
/>

<button
  onClick={() => {
    const title = document.getElementById("exp-title").value;
    const company = document.getElementById("exp-company").value;

    if (!title || !company) return;

    const newExp = {
      title,
      company,
      dates: "Present"
    };

    setFormData({
      ...formData,
      experience: [...(formData.experience || []), newExp]
    });

    document.getElementById("exp-title").value = "";
    document.getElementById("exp-company").value = "";
  }}
>
  Add Experience
</button>

    </div>
  );
}