import ProfileForm from "../ProfileForm";
import { useAuth } from '../../hooks/useAuth';

export default function ProfileSection({
    showProfileForm,
    setShowProfileForm,
    editingProfile,
    setEditingProfile,
    handleUpdateProfile,
}) {
    const { user } = useAuth();

    return (
        <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                    <div className="max-w-2xl">
                      <div className="bg-white rounded-lg shadow p-6 space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                          <input
                            type="text"
                            value={user?.username}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={user?.email}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                          />
                        </div>
                        <button className="submit-btn" onClick={() => {
                          setEditingProfile(user);
                          setShowProfileForm(true);
                        }}>
                          Edit Profile
                        </button>
        
                        {showProfileForm && (
                          <ProfileForm
                            user={editingProfile}
                            onSubmit={handleUpdateProfile}
                            onCancel={() => {
                              setShowProfileForm(false);
                              setEditingProfile(null);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
    )
}