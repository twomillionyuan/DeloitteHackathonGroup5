type ProfileAvatarProps = {
  className?: string;
};

export const ProfileAvatar = ({ className = "" }: ProfileAvatarProps) => {
  return (
    <img
      src="/avatars/IMG_6266.jpg"
      alt="Profile photo"
      className={`rounded-full object-cover ${className}`.trim()}
    />
  );
};
