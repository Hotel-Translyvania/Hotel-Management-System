import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar/Navbar";
import UserAvatar from "@/components/Profile/UserAvatar";
import ProfileField from "@/components/Profile/ProfileField";
import EditProfileForm from "@/components/Profile/EditProfileForm";
import DeleteAccountDialog from "@/components/Profile/DeleteAccountDialog";
import { ProfileData } from "@/types/profile";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [guestId, setGuestId] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      console.log("Decoded token:", decoded);
      const guestId = decoded.sub;
      setGuestId(guestId);
    

      axios
        .get("http://localhost:3000/api/v1/hotels/1/me",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("token:", token);
          const {data} = res.data;
          console.log("Response data:", data);
          setProfileData(data);
          console.log("Profile data:", data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          navigate("/login");
        });
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/login");
    }
  }, [navigate]);
  const handleSaveProfile = async (updatedFields: Partial<ProfileData>) => {
    const token = localStorage.getItem("token");
    console.log("updatedFields:", updatedFields);
    if (!token) {
      navigate("/login");
      return;
    }
  
    try {
      // Clean object: remove undefined and null fields
      const cleanedData: Record<string, any> = {};
  
      // Split fullName into firstName and lastName
      if (updatedFields.fullName) {
        const [firstName, ...lastNameParts] = updatedFields.fullName.split(" ");
        const lastName = lastNameParts.join(" "); // Join the remaining parts as the last name
        cleanedData.firstName = firstName;
        cleanedData.lastName = lastName;
      }
  
      // Loop through other fields and add to cleanedData
      for (const key in updatedFields) {
        if (key !== "fullName" && updatedFields[key as keyof ProfileData] !== undefined && updatedFields[key as keyof ProfileData] !== null) {
          cleanedData[key] = updatedFields[key as keyof ProfileData];
        }
      }
  
      // Send PATCH request with only cleaned data
      const response = await axios.patch(
        `http://localhost:3000/api/v1/hotels/1/guest/${guestId}`,
        cleanedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
  
      setIsEditDialogOpen(false);
      setProfileData((prev) => ({
        ...prev!,
        ...cleanedData,
      }));
    } catch (err: any) {
      console.error("Failed to update profile:", err?.response?.data || err.message);
  
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  
    try {
      await axios.delete(`http://localhost:3000/api/v1/hotels/1/guest/${guestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      });
  
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
      console.error("Failed to delete account:", err);
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const displayIdType = (type: string) => {
    switch (type) {
      case "passport":
        return "Passport";
      case "national-id":
        return "National ID";
      case "drivers-license":
        return "Driver's License";
      default:
        return type;
    }
  };

  const displayGender = (gender: string) => {
    switch (gender) {
      case "male":
        return "Male";
      case "female":
        return "Female";
      case "other":
        return "Other";
      case "prefer-not-to-say":
        return "Prefer not to say";
      default:
        return gender;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading || !profileData) return <div className="p-8 text-center">Loading...</div>;
  console.log("Profile data:", profileData);
  console.log("Profile data:", profileData.fullName);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Guest Profile</h1>
          <p className="text-gray-500">View and manage your personal information</p>
        </div>

        <Card className="rounded-2xl shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <UserAvatar name={profileData.fullName} imageSrc={profileData.image} className="sm:h-20 sm:w-20 h-16 w-16"/>

                <div>
                  <h2 className="text-xl font-semibold">{profileData.fullName}</h2>
                  <p className="text-gray-600">{profileData.email}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <Button onClick={() => setIsEditDialogOpen(true)} className="flex items-center gap-2">
                  <Edit size={16} />
                  <span>Edit Profile</span>
                </Button>
              </div>

              <Separator className="mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                <ProfileField label="Full Name" value={profileData.fullName} />
                <ProfileField label="Email" value={profileData.email} />
                <ProfileField label="Phone Number" value={profileData.phoneNumber} />
                <ProfileField label="Gender" value={displayGender(profileData.gender)} />
                <ProfileField label="Address" value={profileData.address} />
                <ProfileField label="Nationality" value={profileData.nationality} />
                <ProfileField label="Date of Birth" value={formatDate(profileData.dateOfBirth)} />
                <ProfileField label="Identification Type" value={displayIdType(profileData.idType)} />
                <ProfileField label="Identification Number" value={profileData.identificationNumber} />
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Management</h3>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 size={16} />
                  <span>Delete Account</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <EditProfileForm
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        profileData={profileData}
        onSave={handleSaveProfile}
      />

      <DeleteAccountDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
};

export default Profile;
