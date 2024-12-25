import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const UserProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No user");
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        });

      if (updateError) throw updateError;
      
      setAvatarUrl(publicUrl);
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading avatar",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Error signing out",
        variant: "destructive",
      });
      return;
    }
    navigate("/auth");
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl || undefined} />
          <AvatarFallback>
            {supabase.auth.getUser()?.data?.user?.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <input
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={loading}
        />
      </div>
      <Button variant="outline" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default UserProfile;