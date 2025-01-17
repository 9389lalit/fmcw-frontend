/* eslint-disable react/react-in-jsx-scope */
import { Fragment, useContext, useEffect, useState } from 'react';
import Loading from '../../Loading';
import Classes from './Dashboard.module.css';
function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'foo@foo.com',
    college: 'Foo',
    phone: 'XXXXXXXXXX',
    year: '0',
    instaHandle: '_blah_',
    userType: '-1'
  });

  useEffect(() => {
    const isTokenValid = async () => {
      setIsLoading(true);
      const token = sessionStorage.getItem('tokenID');
      try {
        const res = await fetch(process.env.REACT_APP_BACKEND_URI + '/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token
          }
        });
        const data = await res.json();
        if (data.message === 'success') {
          console.log(data);
          if (data.user.userID) {
            setUserData(() => ({
              name: data.user.userID.name,
              email: data.user.userID.email,
              college: data.user.userID.college,
              phone: data.user.userID.number,
              year: data.user.userID.yearOfStudy,
              instaHandle: data.user.userID.instaHandle,
              userType: data.user.userID.role,
              refCode: data.user.ref_code,
              timesReferred: data.user.norefcode
            }));
            sessionStorage.setItem;
          } else {
            setUserData(() => ({              name: data.user.name,
              email: data.user.email,
              college: data.user.college,
              phone: data.user.number,
              year: data.user.yearOfStudy,
              instaHandle: data.user.instaHandle,
              userType: data.user.role
            }));
          }
        }
      } catch (e) {
        console.log(e);
        alert('Error with authentication, login again');
      }

      setIsLoading(false);
    };
    isTokenValid();
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className={Classes.container}>
            <h1>Dashboard</h1>
            <div className={`${Classes.section_accessible}`}>
              {userData.userType == 0 && (
                <Fragment>
                  <h1>
                    <a href="#">Events</a>
                  </h1>
                  <br />
                  <h1>
                    <a href="#">Merchandise</a>
                  </h1>
                </Fragment>
              )}
              {userData.userType == 1 && (
                <h1>
                  <a href="#">Events</a>
                </h1>
              )}
            </div>
          </div>

          <div className={`${Classes.main} ${Classes.column_2}`}>
            <h2>User Information</h2>
            <div className={Classes.card}>
              <div className={Classes.card_body}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Name</strong>
                      </td>
                      <td>:</td>
                      <td>{userData.name}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email</strong>
                      </td>
                      <td>:</td>
                      <td>{userData.email}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>College/University</strong>
                      </td>
                      <td>:</td>
                      <td>{userData.college}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Phone</strong>
                      </td>
                      <td>:</td>
                      <td>{userData.phone}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Year of Study</strong>
                      </td>
                      <td>:</td>
                      <td>{userData.year}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Instagram Handle</strong>
                      </td>
                      <td>:</td>
                      <td>{userData.instaHandle}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>User Type</strong>
                      </td>
                      <td>:</td>
                      <td>{userData.userType == 2 ? 'Campus Ambassador' : 'Participant'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
