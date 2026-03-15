import { useState } from "react";
import { logIn, signUp } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");
      if (isSignUp) {
        await signUp(email, password, name);
        navigate("/setup-quiz");
      } else {
        await logIn(email, password);
        navigate("/");
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="pb-6 text-center"
        >
          <img
            src="/helping-you-make-right-choices.png"
            alt="PanDa"
            className="mx-auto mb-6 max-w-[16rem]"
          />
          <img
            src="/unknown.png"
            alt="Panda"
            className="mx-auto mb-5 h-28 w-28 object-contain"
          />
          <span className="section-label">{isSignUp ? "Create account" : "Welcome back"}</span>
          <h1 className="mt-3 font-display text-[2rem] leading-none text-foreground">
            {isSignUp ? "Join PanDa" : "Sign in"}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {isSignUp
              ? "Set up your profile and start tracking greener meals."
              : "Pick up where you left off and keep your meals on track."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="space-y-4"
        >
          {error ? (
            <div className="rounded-[20px] border border-destructive/20 bg-secondary px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          <div className="space-y-3">
            {isSignUp ? (
              <label className="block">
                <span className="section-label mb-2 block">Name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="h-12 w-full rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </label>
            ) : null}

            <label className="block">
              <span className="section-label mb-2 block">Email</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                type="email"
                className="h-12 w-full rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </label>

            <label className="block">
              <span className="section-label mb-2 block">Password</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                type="password"
                className="h-12 w-full rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {isSignUp ? "Create account" : "Sign in"}
          </button>

          <button
            type="button"
            onClick={() => setIsSignUp((current) => !current)}
            className="mx-auto block text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Create one"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
