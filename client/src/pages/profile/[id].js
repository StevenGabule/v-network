import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import LoadIcon from '../../images/loading.gif'
import { getProfileUser } from '../../redux/actions/profileAction';

const Profile = () => {
  const { profile, auth, } = useSelector(state => state)
  const dispatch = useDispatch();
  
  const { id } = useParams();

  useEffect(() => {
    if (profile.ids.every(item => item !== id)) {
      dispatch(getProfileUser({ id, auth }))
    }
  }, [auth, dispatch, id, profile.ids])

  return (
    <div className="profile">
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      {
        profile.loading
          ? <img src={LoadIcon} alt='loading' className="d-block mx-auto my-4" />
          : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
      }
    </div>
  )
}

export default Profile;