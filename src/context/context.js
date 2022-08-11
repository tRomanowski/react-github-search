import React, { useState, useEffect, useContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // request loading

  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);
  // error
  //check rate
  const checkRequests = async () => {
    try {
      const { data } = await axios(`${rootUrl}/rate_limit`);
      console.log(data);
      let {
        rate: { remaining },
      } = data;
      setRequests(remaining);
      if (remaining === 0) {
        // throw error
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkRequests();
  }, []);
  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, requests }}>
      {children}
    </GithubContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GithubContext);
};

export { GithubContext, GithubProvider };
