function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
    </div>
  );
}
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar/Navbar';
//import Navbar from "@/components/Profile/Navbar";
import UserAvatar from "@/components/Profile/UserAvatar";
import ProfileField from "@/components/Profile/ProfileField";
import EditProfileForm from "@/components/Profile/EditProfileForm";
import DeleteAccountDialog from "@/components/Profile/DeleteAccountDialog";
import { ProfileData } from "@/types/profile";

const Profile = () => {
  // Mock data - in a real app, this would come from an API or auth provider
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Jane Cooper",
    email: "jane.cooper@example.com",
    phone: "+1 (555) 123-4567",
    gender: "female",
    address: "123 Main St, Boston, MA 02108",
    nationality: "United States",
    dateOfBirth: "1990-05-15",
    idType: "passport",
    idNumber: "US123456789",
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveProfile = (data: ProfileData) => {
    setProfileData(data);
  };

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    toast({
      title: "Account deleted",
      description: "Your account has been permanently deleted.",
    });
    // Redirect to home page or sign-out
    window.location.href = "/";
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
                <UserAvatar name={profileData.fullName} />
                <div>
                  <h2 className="text-xl font-semibold">{profileData.fullName}</h2>
                  <p className="text-gray-600">{profileData.email}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <Button 
                  onClick={() => setIsEditDialogOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Edit size={16} />
                  <span>Edit Profile</span>
                </Button>
              </div>
              
              <Separator className="mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                <ProfileField label="Full Name" value={profileData.fullName} />
                <ProfileField label="Email" value={profileData.email} />
                <ProfileField label="Phone Number" value={profileData.phone} />
                <ProfileField label="Gender" value={displayGender(profileData.gender)} />
                <ProfileField label="Address" value={profileData.address} />
                <ProfileField label="Nationality" value={profileData.nationality} />
                <ProfileField label="Date of Birth" value={formatDate(profileData.dateOfBirth)} />
                <ProfileField label="Identification Type" value={displayIdType(profileData.idType)} />
                <ProfileField label="Identification Number" value={profileData.idNumber} />
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