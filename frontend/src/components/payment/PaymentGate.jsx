import PaymentModal from "./PaymentModal";

export default function PaymentGate({
  open,
  onClose,
  onSuccess,
}) {
  if (!open) return null;

  const handleSuccess = async () => {
    if (typeof onSuccess === "function") {
      await onSuccess(); // 🔥 MUST call handlePaymentSuccess
    }
    onClose();
  };

  return (
    <PaymentModal
      onClose={onClose}
      onSuccess={handleSuccess}
    />
  );
}
