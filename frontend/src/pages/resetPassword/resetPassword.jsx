import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
  const { token } = useParams();  // URL'den token'ı alıyoruz
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Şifreler uyuşmuyor!');
    }

    try {
      setLoading(true);

      const response = await fetch(`http://localhost:3000/users/reset/${token}`, {
        method: 'PATCH', // Şifreyi değiştireceğimiz için PUT isteği göndereceğiz
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Şifreniz başarıyla sıfırlandı!');
      } else {
        toast.error(data.message || 'Bir hata oluştu');
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('Şifre sıfırlama sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Şifrenizi Sıfırlayın</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Yeni şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifreyi onayla"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Yükleniyor...' : 'Şifreyi Sıfırla'}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
