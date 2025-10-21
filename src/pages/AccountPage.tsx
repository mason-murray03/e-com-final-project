import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../types/useAuth" 
import type { User } from '../types/User'
import { deleteUserProfile, getUserProfile, updateUserProfile } from '../service/userService'

export default function AccountPage() {
  const { user } = useAuth() 
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Partial<User>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    } else {
      navigate('/account')
    }

    const fetchUser = async () => {
      const userData = await getUserProfile(user.uid);
      if (userData) {
        setFormData(userData);
      }
      setLoading(false);
    };
    fetchUser()
  }, [user, navigate])

  const handleChange = (path: string, value: unknown) => {
    setFormData((prev) => {
      if (!prev) return prev

      const updated = structuredClone(prev)
      const keys = path.split(".")
      let target: Record<string, unknown> = updated
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        if(typeof target[key] !== 'object' || target[key] === null || Array.isArray(target[key])) {
            target[key] = {}
        }
        target = target[key] as Record<string, unknown>
      }
      const lastKey = keys[keys.length - 1]
      target[lastKey] = value
      return updated as User
    })
  }

  const handleSave = async () => {
    if (!formData || !user) return;
    setSaving(true);
    await updateUserProfile(user.uid, formData);
    setSaving(false);
  };


  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirm = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirm) return;

    try {
      await deleteUserProfile(user.uid);
      alert("Your account has been deleted.");
      navigate("/register");
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Failed to delete account. You may need to re-authenticate.");
    }
  };

  if (loading) return <p>Loading account info...</p>

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        Account Settings
      </h2>

      {[
        { label: 'Email', value: formData.email, disabled: true },
        { label: 'Username', value: formData.username, key: 'username' },
        { label: 'First Name', value: formData?.name?.firstname ?? '', key: 'name.firstname' },
        { label: 'Last Name', value: formData?.name?.lastname ?? '', key: 'name.lastname' },
        { label: 'Phone', value: formData.phone, key: 'phone' },
        { label: 'City', value: formData?.address?.city ?? '', key: 'address.city' },
        { label: 'Street', value: formData?.address?.street ?? '', key: 'address.street' },
        { label: 'Number', value: formData?.address?.number ?? '', key: 'address.number', type: 'number' },
        { label: 'Zipcode', value: formData?.address?.zipcode ?? '', key: 'address.zipcode' },
      ].map(({ label, value, key, disabled, type = 'text' }) => (
        <div key={label} style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', color: '#555' }}>
            {label}
          </label>
          <input
            type={type}
            value={value}
            disabled={disabled}
            onChange={(e) => key && handleChange(key, type === 'number' ? Number(e.target.value) : e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '1rem',
            }}
          />
        </div>
      ))}

      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          marginTop: '2rem',
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          fontWeight: '600',
          backgroundColor: saving ? '#6c757d' : '#0d6efd',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: saving ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s ease',
        }}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
      <button
        onClick={handleDeleteAccount}
        style={{
          marginTop: "1rem",
          width: "100%",
          padding: "0.75rem",
          fontSize: "1rem",
          fontWeight: "600",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "background-color 0.2s ease",
        }}
      >
        Delete Account
      </button>
    </div>
  )
}