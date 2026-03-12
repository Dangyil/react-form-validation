import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import DashboardNav from '../components/DashboardNav';
import OverviewSection from '../components/dashboard/OverviewSection';
import ProductsSection from '../components/dashboard/ProductsSection';
import AnalyticsSection from '../components/dashboard/AnalyticsSection';
import ProfileSection from '../components/dashboard/ProfileSection';
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Dashboard() {
  const { user, updateUser } = useAuth();
  const { request, error } = useFetch();
  const [activeSection, setActiveSection] = useState('overview');

  // Data states
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      if (activeSection !== 'overview') return;
      setStatsLoading(true);
      try {
        const data = await request('GET', '/products/stats/overview');
        setStats(data.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setStatsLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user, activeSection, request]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      if (activeSection !== 'products') return;
      setProductsLoading(true);
      try {
        const data = await request('GET', '/products');
        setProducts(data.data || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setProductsLoading(false);
      }
    };

    if (user) {
      fetchProducts();
    }
  }, [user, activeSection, request]);

  //Fetch user profile (if needed for editing)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (user) {
          setEditingProfile(user);
        }
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user, request]);

  const handleCreateProduct = async (formData) => {
    try {
      await request('POST', '/products', formData);
      setShowProductForm(false);
      setProducts(prev => [...prev, formData]);
      toast.success('Product created successfully!');
    } catch (err) {
      console.error('Failed to create product:', err);
      toast.error('Failed to create product.');
    }
  };

  const handleUpdateProduct = async (id, formData) => {
    try {
      await request('PUT', `/products/${id}`, formData);
      setEditingProduct(false);
      setShowProductForm(false);
      setProducts(prev =>
        prev.map(p => p._id === id ? formData : p)
      );
      toast.success('Product updated successfully!');
    } catch (err) {
      console.error('Failed to update product:', err);
      toast.error('Failed to update product.');
    }
  };

  const handleUpdateProfile = async (formData) => {
    try {
      console.log("Updating profile with:", formData);

      const data = await request('PUT', '/users/update-profile', formData);
      updateUser(data.user || data.data);
      setShowProfileForm(false);
      setEditingProfile(null);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error('Failed to update profile.');
    }
  };

  const handleDeleteProduct = async (id) => {
    const result = await Swal.fire({
    title: "Delete Product?",
    text: "You won't be able to undo this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  });

  if (result.isConfirmed) {
      try {
        await request('DELETE', `/products/${id}`);
        setProducts(prev => prev.filter(p => p._id !== id));
        toast.success('Product deleted successfully!');
      } catch (err) {
        console.error('Failed to delete product:', err);
        toast.error('Failed to delete product.');
      }
    }
  };

  const renderContent = () => {
    switch (activeSection) {

      case 'overview':
        return (
          <OverviewSection
            stats={stats}
            statsLoading={statsLoading}
            setActiveSection={setActiveSection}
            setShowProductForm={setShowProductForm}
          />
        );

      case 'products':
        return (
          <ProductsSection
            products={products}
            loading={productsLoading}
            showProductForm={showProductForm}
            editingProduct={editingProduct}
            setShowProductForm={setShowProductForm}
            setEditingProduct={setEditingProduct}
            handleCreateProduct={handleCreateProduct}
            handleUpdateProduct={handleUpdateProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
        );

      case 'analytics':
        return (
          <AnalyticsSection
            stats={stats}
          />
        );

      case 'profile':
        return (
          <ProfileSection
            showProfileForm={showProfileForm}
            setShowProfileForm={setShowProfileForm}
            editingProfile={editingProfile}
            setEditingProfile={setEditingProfile}
            handleUpdateProfile={handleUpdateProfile}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <DashboardNav activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="md:ml-64 pt-16 md:pt-0 flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 font-medium">Error</p>
              <p className="text-red-500 text-sm mt-1">{error}</p>
            </div>
          )}
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
