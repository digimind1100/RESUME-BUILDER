import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./SignupModal.css";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";
let googleScriptPromise;
const isUserVerified = (user) =>
  user?.emailVerified === true || user?.isEmailVerified === true;

function loadGoogleScript() {
  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (!googleScriptPromise) {
    googleScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        `script[src="${GOOGLE_SCRIPT_SRC}"]`
      );

      if (existingScript) {
        existingScript.addEventListener("load", resolve, { once: true });
        existingScript.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = GOOGLE_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  return googleScriptPromise;
}

export default function SignupModal({ onClose, onSuccess, initialMode = "signup" }) {
  const { user, signup, googleAuth, login, sendVerificationCode, verifyEmailCode } = useAuth();

  const [mode, setMode] = useState(initialMode); // signup | login | verify
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const googleButtonRef = useRef(null);


  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [codeSentOnOpen, setCodeSentOnOpen] = useState(false);

  const finishAuth = useCallback((user) => {
    onSuccess && onSuccess(user);
    onClose();
  }, [onClose, onSuccess]);

  const handleGoogleCredential = useCallback(async (response) => {
    if (!response?.credential || googleLoading) return;

    setError("");
    setNotice("");
    setGoogleLoading(true);

    try {
      const result = await googleAuth({
        credential: response.credential,
        mode,
      });

      if (result?.ok) {
        if (isUserVerified(result.user)) {
          finishAuth(result.user);
          return;
        }

        await sendVerificationCode();
        setMode("verify");
        setNotice("Please verify your email address before continuing.");
        return;
      }

      setError(result?.message || "Google authentication failed. Please try again.");
    } catch (err) {
      setError(err?.message || "Google authentication failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  }, [finishAuth, googleAuth, googleLoading, mode, sendVerificationCode]);

  useEffect(() => {
    if (mode === "verify" || !googleButtonRef.current || !GOOGLE_CLIENT_ID) {
      return;
    }

    let active = true;

    loadGoogleScript()
      .then(() => {
        if (!active || !googleButtonRef.current) return;

        googleButtonRef.current.innerHTML = "";

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredential,
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          text: mode === "signup" ? "signup_with" : "signin_with",
          shape: "rectangular",
          width: 330,
        });
      })
      .catch(() => {
        if (active) {
          setError("Could not load Google signup. Please try email signup.");
        }
      });

    return () => {
      active = false;
    };
  }, [handleGoogleCredential, mode]);

  useEffect(() => {
    if (mode !== "verify" || initialMode !== "verify" || codeSentOnOpen) {
      return;
    }

    let active = true;
    setCodeSentOnOpen(true);

    sendVerificationCode().then((result) => {
      if (!active) return;

      if (result?.ok) {
        setNotice("Enter the code sent to your email address.");
      } else {
        setError(result?.message || "Could not send verification code.");
      }
    });

    return () => {
      active = false;
    };
  }, [codeSentOnOpen, initialMode, mode, sendVerificationCode]);


  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true); // start loading

    if (mode === "verify") {
      if (!verificationCode.trim()) {
        setError("Please enter the verification code.");
        setLoading(false);
        return;
      }

      try {
        const result = await verifyEmailCode(verificationCode.trim());

        if (result?.ok) {
          finishAuth(result.user || user);
          return;
        }

        setError(result?.message || "Invalid verification code.");
      } catch (err) {
        setError(err?.message || "Verification failed. Please try again.");
      } finally {
        setLoading(false);
      }

      return;
    }

    const payload =
      mode === "signup"
        ? {
          fullName: fullName.trim(),
          email: email.trim(),
          password: password.trim(),
        }
        : {
          email: email.trim(),
          password: password.trim(),
        };

    let result;

    try {
      result =
        mode === "signup"
          ? await signup(payload)
          : await login(payload);
          
      if (result?.ok) {
        if (isUserVerified(result.user)) {
          finishAuth(result.user);
          return;
        }

        await sendVerificationCode();

        setMode("verify");
        setNotice(
          mode === "signup"
            ? "Account created. Enter the code sent to your email address."
            : "Please verify your email address before continuing."
        );
      } else {
        setError(result?.message || "Authentication failed. Please try again.");
      }
    } catch (err) {
      
      setError(err?.message || "Something went wrong. Please try again.");
    }
    finally {
      setLoading(false); // stop loading ALWAYS
    }
  }
  
  function switchMode(nextMode) {
    setMode(nextMode);
    setError("");
    setNotice("");
    setPassword("");
    setVerificationCode("");
  }

  async function handleResendCode() {
    if (resending) return;

    setError("");
    setNotice("");
    setResending(true);

    try {
      const result = await sendVerificationCode();

      if (result?.ok) {
        setNotice("A new verification code has been sent.");
      } else {
        setError(result?.message || "Could not resend verification code.");
      }
    } catch (err) {
      setError(err?.message || "Could not resend verification code.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="signup-overlay">
      <div className="signup-modal animate-fadeIn">
        <h2 className="signup-title">
          {mode === "verify"
            ? "Verify Your Email"
            : mode === "signup"
              ? "Create Your Account for Free Access"
              : "Login to Your Account"}
        </h2>

        {error && <p className="signup-error">{error}</p>}
        {notice && <p className="signup-notice">{notice}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          )}

          {mode !== "verify" ? (
            <>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          ) : (
            <input
              type="text"
              inputMode="numeric"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              autoComplete="one-time-code"
              required
            />
          )}

          <button type="submit" disabled={loading || googleLoading}>
            {loading
              ? mode === "verify"
                ? "Verifying..."
                : mode === "signup"
                  ? "Creating Account..."
                  : "Logging in..."
              : mode === "verify"
                ? "Verify Email"
                : mode === "signup"
                  ? "Signup"
                  : "Login"}
          </button>
        </form>

        {mode !== "verify" && (
          <>
            <div className="signup-divider">
              <span>or</span>
            </div>

            {GOOGLE_CLIENT_ID ? (
              <div
                className="google-auth-button"
                ref={googleButtonRef}
                aria-busy={googleLoading}
              />
            ) : (
              <button
                type="button"
                className="google-auth-fallback"
                onClick={() =>
                  setError("Google signup needs VITE_GOOGLE_CLIENT_ID configured.")
                }
              >
                Continue with Google
              </button>
            )}
          </>
        )}

        {mode === "verify" ? (
          <p className="signup-switch">
            Did not receive a code?{" "}
            <span onClick={handleResendCode}>
              {resending ? "Sending..." : "Resend code"}
            </span>
          </p>
        ) : (
          <p className="signup-switch">
            {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <span onClick={() => switchMode("login")}>Login</span>
            </>
          ) : (
            <>
              New here?{" "}
              <span onClick={() => switchMode("signup")}>
                Create account
              </span>
            </>
            )}
          </p>
        )}

        <button className="signup-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
