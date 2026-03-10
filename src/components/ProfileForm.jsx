import { useState, useEffect } from 'react';
import FormInput from './FormInput';

export default function ProfileForm({ user, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFormData({
            username: "",
            email: "",
            password: "",
        });
    }, [user]);

    const validateForm = () => {
        const newErrors = {};

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (formData.password && formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const updateData = {};

        if (formData.username.trim()) updateData.username = formData.username;
        if (formData.email.trim()) updateData.email = formData.email;
        if (formData.password.trim()) updateData.password = formData.password;

        if (Object.keys(updateData).length === 0) {
            alert("Please update at least one field");
            return;
        }

        setIsLoading(true);

        try {
            await onSubmit(updateData);
            onCancel();
        } catch (error) {
            console.error("Failed to update profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Your Profile</h2>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg space-y-6">
                <FormInput
                    name="username"
                    type="text"
                    placeholder={`New username (Current: ${user.username})`}
                    onChange={handleChange}
                />
                <FormInput
                    name="email"
                    type="email"
                    placeholder={`New email (Current: ${user.email})`}
                    error={errors.email}
                    onChange={handleChange}
                />
                <FormInput
                    name="password"
                    type="password"
                    placeholder="Enter new password"
                    error={errors.password}
                    onChange={handleChange}
                />
                <div className="flex gap-3 pt-4">
                    <button type="submit"
                        disabled={isLoading} className="submit-btn">
                        {isLoading ? "Updating..." : "Save Changes"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="cancel-btn"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );


}
