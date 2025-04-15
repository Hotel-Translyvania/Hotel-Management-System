import { useState } from "react";

const ProfilePicUpload = ({ register, errors, watch }) => {
  // Added watch prop
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validateFile = (file) => {
    if (!file) return true;

    // 1. Type validation (case insensitive)
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const isValidType = validTypes.includes(file.type.toLowerCase());

    // 2. Size validation (with 5KB buffer)
    const isValidSize = file.size <= 2 * 1024 * 1024 + 5000; // 2MB + 5KB buffer

    if (!isValidType) return "Only PNG/JPEG allowed";
    if (!isValidSize) return "Max size is 2MB";
    return true;
  };

  return (
    <div className="mb-4 text-center">
      <label className="block text-sm font-medium text-gray-700 mb-4">
        Profile Picture
        {errors.profile_pic && (
          <span className="text-red-500 text-xs ml-2">
            {errors.profile_pic.message}
          </span>
        )}
      </label>

      <div className="flex justify-center">
        <label className="cursor-pointer">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100 hover:border-blue-500">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-xs">Choose Hotel Logo</span>
            )}
          </div>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            {...register("profile_pic", {
              required: "Profile picture is required",
              validate: {
                fileValidation: (files) => {
                  if (!files || !files[0]) return true;
                  return validateFile(files[0]);
                },
              },
            })}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      <p className="text-xs mt-2 text-gray-500">
        {watch("profile_pic")?.[0]?.name && (
          <p className="text-xs mt-2 text-gray-500">
            {watch("profile_pic")[0].name}
          </p>
        )}
      </p>
    </div>
  );
};

export default ProfilePicUpload;
