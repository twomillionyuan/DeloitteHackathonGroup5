type ProfileAvatarProps = {
  className?: string;
};

export const ProfileAvatar = ({ className = "" }: ProfileAvatarProps) => {
  return (
    <img
      src="/avatars/IMG_6220.jpeg"
      alt="Profile photo"
      className={`rounded-full object-cover ${className}`.trim()}
    />
  );
};
