import PaymentModal from "./PaymentModal";

export default function PaymentGate({
  open,
  onClose,
  onSuccess,
}) {
  if (!open) return null;

  return (
    <PaymentModal
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}
