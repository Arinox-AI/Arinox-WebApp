import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthModal from './AuthModal';

const DemoLink = ({ className, children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (user && pending) {
      navigate('/contact');
      setPending(false);
    }
  }, [user, pending, navigate]);

  const handleClick = (e) => {
    e.preventDefault();
    if (user) navigate('/contact');
    else { setPending(true); setShowAuth(true); }
  };

  return (
    <>
      <a href="/contact" className={className} onClick={handleClick}>{children}</a>
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        defaultMode="register"
      />
    </>
  );
};

export default DemoLink;
