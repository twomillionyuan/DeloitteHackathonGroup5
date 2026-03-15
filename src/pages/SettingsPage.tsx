import { useEffect, useState } from "react";
import { BottomNav } from "../components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowLeft, LockKeyhole, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { changeAccountPassword, updateAccountProfile } from "../lib/auth";
import { toast } from "@/components/ui/use-toast";

const SettingsPage = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  useEffect(() => {
    setName(user?.displayName ?? "");
    setEmail(user?.email ?? "");
  }, [user]);

  const handleProfileSave = async () => {
    setIsSavingProfile(true);

    try {
      await updateAccountProfile({
        name,
        email,
        currentPassword,
      });

      toast({
        title: "Settings updated",
        description: "Your account details were saved.",
      });
      setCurrentPassword("");
    } catch (error) {
      toast({
        title: "Could not save settings",
        description: error instanceof Error ? error.message : "Try again.",
        variant: "destructive",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSave = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Enter the same new password twice.",
        variant: "destructive",
      });
      return;
    }

    setIsSavingPassword(true);

    try {
      await changeAccountPassword({
        currentPassword,
        nextPassword: newPassword,
      });

      toast({
        title: "Password updated",
        description: "Your password has been changed.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        title: "Could not change password",
        description: error instanceof Error ? error.message : "Try again.",
        variant: "destructive",
      });
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-md px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-4"
        >
          <Link
            to="/profile"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to profile
          </Link>

          <div className="flex items-center gap-2">
            <h1 className="font-display text-[2rem] leading-none text-foreground">Settings</h1>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="pb-6"
        >
          <div className="flex items-center gap-2">
            <UserRound size={16} className="text-primary" />
            <span className="section-label">Profile</span>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <label className="section-label">Username</label>
              <Input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 rounded-2xl" />
            </div>
            <div>
              <label className="section-label">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 rounded-2xl"
              />
            </div>
            <Button
              type="button"
              onClick={handleProfileSave}
              disabled={isSavingProfile}
              className="rounded-full px-5"
            >
              {isSavingProfile ? "Saving..." : "Save profile"}
            </Button>
            <div>
              <label className="section-label">Current password</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                className="mt-2 rounded-2xl"
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="pb-6"
        >
          <div className="flex items-center gap-2">
            <LockKeyhole size={16} className="text-primary" />
            <span className="section-label">Password</span>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <label className="section-label">New password</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="mt-2 rounded-2xl"
              />
            </div>
            <div>
              <label className="section-label">Confirm new password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="mt-2 rounded-2xl"
              />
            </div>
            <Button
              type="button"
              onClick={handlePasswordSave}
              disabled={isSavingPassword}
              className="rounded-full px-5"
            >
              {isSavingPassword ? "Updating..." : "Change password"}
            </Button>
          </div>
        </motion.section>
      </div>
      <BottomNav />
    </div>
  );
};

export default SettingsPage;
