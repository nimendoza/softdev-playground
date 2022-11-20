import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ServerAPI } from 'types/openapi';
import { server } from 'utils/AppConfig';
import { http } from 'utils/http';

import Styles from './[id].module.css';

const Profile = () => {
  const [user, setUser] = useState<ServerAPI['User'] | null>(null);
  const [view, setView] = useState(<React.Fragment>User not found</React.Fragment>);

  const router = useRouter();

  useEffect(() => {(async () => {
    if (router.isReady) {
      let { id } = router.query;
      if (id) {
        const res = await http.get(`${server}/users/${id}`);
        setUser(res.data);
      }
    }
  })()}, [router.isReady]);

  useEffect(() => {
    if (user?.id) {
      setView(
        <React.Fragment>
          User ID: {user?.id} <br />
          User e-mail: {user?.email} <br />
        </React.Fragment>) ;
    }
  }, [user?.id])

  return (
    <React.Fragment>
      <div id={`${Styles.header}`}>
        <h1 id={`${Styles.h1}`}>Philippine Science High School - Main Campus</h1>
        <h2>User profile</h2>
      </div>
      {view}
    </React.Fragment>
  );
};

export default Profile;