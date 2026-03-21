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

    </div>
  );
}