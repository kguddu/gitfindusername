
import Serach from './components/Search'
import Details from './components/Details';
import Repo from './components/Repo';
import Footer from './components/Footer';
import { github } from './components/Utils';
import { useEffect, useState } from 'react'

import FollowerList from './components/FollowerList';
import FollowingList from './components/FollowingList';


 function App(){
    const [detail, setDetail] = useState({});
    const [repo, setRepo] = useState([]); //repo is an array
    const [follower, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);
    const [username, setUsername] = useState("");
    const [isSuccessful, setSuccessful] = useState(true);

    const [visibleComponent, setVisibleComponent] = useState(2);



   
     

    useEffect(_ => {
      setDetail({});
      setSuccessful(true);

      if (username === "") {
        return;
      }
      (async (_) => {
        try {
          const response = await github.get(`/${username}`); //https://api.github.com/users

          setDetail(response.data);

        } catch (e) {
          setSuccessful(false);
        }

      })();
    }, [username]);

    useEffect(_ => {
      setRepo([]);
      if (username === "") {
        return;
      }

      (async (_) => {
        const repo_response = await github.get(`/${username}/repos`);

        setRepo(repo_response.data);
      })();
    }, [username]);





    useEffect(_ => {
      setFollower([]);
      if (username === "") {
        return;
      }
      (async (_) => {
        const followers_response = await github.get(`/${username}/followers`);

        setFollower(followers_response.data);

      })();
    }, [username]);

    useEffect(_ => {
      setFollowing([]);
      if (username === "") {
        return;
      }
      (async (_) => {
        const following_response = await github.get(`/$(username)/following`);
        setFollowing(following_response.data);
      })();
    }, [username]);



    const searchUserName = keyword => {
      setUsername(keyword);
    }

    const showLoadMore = _ => {
      if(visibleComponent === 1) {
        if(follower.length === detail.followers) {
          return false;
        } else {
          return true;
        }
      } else if(visibleComponent === 2) {
        if(repo.length === detail.public_repos) {
          return false;
        } else {
          return true;
        }
      } else {
        if(following.length === detail.following) {
          return false;
        } else {
          return true;
        }
      }
    }

    const loadMoreData = async _ => {
      if(visibleComponent === 1) {
        const currentPages = Math.ceil(follower.length / 30);
        const nextPage = currentPages + 1;
        const response = await github.get(`/${username}/followers?page=${nextPage}`);
        const list = response.data;
  
        setFollower(currentList => {
          const newList = [...currentList, ...list];
          return newList;
        });

      } else if(visibleComponent === 2) {
        const currentPages = Math.ceil(repo.length / 30);
        const nextPage = currentPages + 1;
  
        const response = await github.get(`/${username}/repos?page=${nextPage}`);
        const list = response.data;
  
        setRepo(currentList => {
          const newList = [...currentList, ...list];
          return newList;
        });
        
      } else {
        const currentPages = Math.ceil(following.length / 30);
        const nextPage = currentPages + 1;
  
        const response = await github.get(`/${username}/following?page=${nextPage}`);
        const list = response.data;
  
        setFollowing(currentList => {
          const newList = [...currentList, ...list];
          return newList;
        });
      }
    }

        return (
          <main>

            <Serach searchUserName={searchUserName} isSuccessful={isSuccessful} />
            {detail.id === undefined ? (
              false
            ) : (
              <>
                <Details detail={detail} changeHandler={setVisibleComponent} visibleComponent={visibleComponent} />
                {visibleComponent === 1 ? (
                  <Repo detail={repo} />


                ) : (
                  visibleComponent === 2 ? (
                    <FollowerList detail={follower} />
                  ) : (
                    <FollowingList detail={following} />
                  )
                )}

                {showLoadMore() === true ? (
                  <div className="card load-more">
                    <button onClick={loadMoreData}>Load More</button>
                  </div>
                ) : (false)}

              </>

            )}
            <Footer />
          </main>
        );
                }

  export default App;