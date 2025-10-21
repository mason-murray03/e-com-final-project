import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createUserProfile } from '../service/userService'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [zipcode, setZipcode] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfile(userCred.user.uid, {
        uid: userCred.user.uid,
        email: userCred.user.email,
        name: {
          firstname,
          lastname,
        },
        phone,
        address: {
          city,
          street,
          zipcode,
        },
        createdAt: new Date(),
      });
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      alert('Failed to create account. Please try again.');
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-start vh-100 m-3'>
      <div className='card p-4 shadow-sm' style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className='mb-4 text-center'>Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              className='form-control'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>First Name</label>
            <input
              type='text'
              className='form-control'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Last Name</label>
            <input
              type='text'
              className='form-control'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Phone</label>
            <input
              type='text'
              className='form-control'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>City</label>
            <input
              type='text'
              className='form-control'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Street</label>
            <input
              type='text'
              className='form-control'
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Zipcode</label>
            <input
              type='text'
              className='form-control'
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>

          <button type='submit' className='btn btn-success w-100'>
            Register
          </button>
        </form>

        <div className='mt-3 text-center'>
          <span>Already have an account? </span>
          <Link to='/login'>Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;