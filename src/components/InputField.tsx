interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = true,
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        required={required}
      />
    </div>
  );
}
