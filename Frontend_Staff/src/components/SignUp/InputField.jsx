import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputField = ({ 
  label, 
  type = "text", 
  register, 
  errors, 
  required = true,
  pattern = null,
  validate = null
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';

  return (
    <div className="mb-3 relative">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={isPasswordField ? (showPassword ? 'text' : 'password') : type}
          {...register(label.toLowerCase().replace(' ', '_'), { 
            required: required ? `${label} is required` : false,
            pattern,
            validate
          })}
          className={`mt-1 py-1 px-4 w-full border rounded-md ${
            errors[label.toLowerCase().replace(' ', '_')] ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {isPasswordField && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash /> }
          </button>
        )}
      </div>
      {errors[label.toLowerCase().replace(' ', '_')] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[label.toLowerCase().replace(' ', '_')].message}
        </p>
      )}
    </div>
  );
};

export default InputField;