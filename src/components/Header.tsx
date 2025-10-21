import { useCart } from '../features/useCart'
import type { CartItem } from '../types/Cart'
import { useAuth } from '../types/useAuth'
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const { items } = useCart()
    const cartCount = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
    const { user } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await signOut(auth)
            navigate('/')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <nav className='navbar navbar-dark bg-dark px-4 py-3 sticky-top'>
            <h1 className='navbar-brand fs-3 fw-bold'>StackedGoods</h1>

            <input type='text' placeholder='Search products...' className='form-control w-auto mx-4'/> {/* form-control is bootstraps default input styling */}

            <div className='d-flex align-items-center gap-4'>
                <a href="/" className='text-white text-decoration-none'>Home</a>
                <a href='#products' className='text-white text-decoration-none'>Products</a>

                {user ? (
                    <button onClick={handleLogout} className='btn btn-dark'>Logout</button>
                ) : (
                    <Link to='/login' className='text-white text-decoration-none'>Login</Link>
                )}

                {user && <Link to='/account' className='text-white text-decoration-none'>Account</Link>}

                {user?.uid && (<Link to='/orders' className='text-white text-decoration-none'>Orders</Link>)}

                <a href='/cart' className='btn btn-outline-light position-relative'>🛒{cartCount > 0 && (<span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{cartCount}</span>) }</a> {/* top-0 start-100 places the badge in the top right of the cart icon and translate-middle places it perfectly in the corner */}
            </div>
        </nav>
    )
}

export default Header