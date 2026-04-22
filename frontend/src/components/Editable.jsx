// components/Editable.jsx

export default function Editable({ isEditable, children }) {
  return (
    <div contentEditable={isEditable}>
      {children}
    </div>
  );
}
