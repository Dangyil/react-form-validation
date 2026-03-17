import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import FormInput from '../components/FormInput';
import { validateField } from '../utils/validators';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { request, loading } = useFetch();

  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const response = await request('POST', '/users/login', formData);
      login(response.user, response.token);
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.message ||
        err.message || 'Login failed!';
      setServerError(errorMsg);
    }
  };

  const hasErrors = Object.values(errors).some(error => error);
  // const isEmpty = !formData.email || !formData.password;

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1 className="auth-heading">Welcome Back!</h1>
        <p className="auth-subheading">
          Access your dashboard and manage your account.
        </p>
      </div>

      <div className="auth-right">
        <form className="auth-form space-y-4" onSubmit={handleSubmit} noValidate>
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
              'Login to your account'
            )}
          </button>

          {serverError && (
            <div className="error-message">{serverError}</div>
          )}

        </form>
        <p className="auth-banner-text">
          New here? <Link to="/register" className="underline hover:opacity-80">Sign up!</Link>
        </p>

      </div>
    </div>
  );
}
