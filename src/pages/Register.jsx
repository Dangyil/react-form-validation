import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import FormInput from '../components/FormInput';
import { validateField } from '../utils/validators';
import { toast } from "react-toastify";


export default function Register() {
  const navigate = useNavigate();
  const { request, loading } = useFetch();

  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    let isValid = true;

    for (const field in formData) {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      await request('POST', '/users/register', formData);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        'Registration failed';

      setServerError(errorMsg);
    }
  };

  const hasErrors = Object.values(errors).some(error => error);

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1 className="auth-heading">Get Started, Ninja!</h1>
        <p className="auth-subheading">Create an account to get started.
        </p>
      </div>

      <div className="auth-right">
        <form className="auth-form space-y-4" onSubmit={handleSubmit} noValidate>
          <FormInput
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            disabled={loading}
          />

          <FormInput
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={loading}
          />

          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            disabled={loading}
          />

          <button
            className="sign-in-btn w-full"
            type="submit"
            disabled={hasErrors || loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Please wait...
              </>
            ) : (
              'Create an account'
            )}
          </button>

          {serverError && (
            <div className="error-message">{serverError}</div>
          )}

        </form>
        <p className="auth-banner-text">
          Already have an account? <Link to="/login" className="underline hover:opacity-80">Sign in!</Link>
        </p>

      </div>
    </div>
  );
}
