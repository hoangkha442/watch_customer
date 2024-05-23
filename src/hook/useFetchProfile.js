// hooks/useFetchProfile.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserServices } from '../services/UserService';
import { setLogin } from '../redux/UserSlice';

const useFetchProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await UserServices.getProfile();
        dispatch(setLogin(res.data));
        navigate('/');
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.log('Phiên bản đăng nhập hết hạn, đăng nhập lại!');
        } else {
          console.log('An error occurred while fetching the profile:', err);
        }
      }
    };

    fetchProfile();
  }, [dispatch, navigate]);
};

export default useFetchProfile;
