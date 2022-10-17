import { useRef } from "react";
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';


const Search = ({ searchUserName, isSuccessful }) => {
  const inputRef = useRef();


  const searched = e => {
    e.preventDefault();
    const searchKeyword = inputRef.current.value;
    searchUserName(searchKeyword)



  }
  return (
    <>
    <div className="head">
      <a href="/"><GitHubIcon className="icon"/></a>
      <h1>Find Username</h1>
    </div>

    <div className="card search">
      <form onSubmit={searched}>
        <input type="text" ref={inputRef} placeholder="Enter your Userame" />
        <button ><SearchIcon /></button>
      </form>
      {/* {isSuccessful == false ? "invalid User" :false } */}
    </div>
    </>
  )
}

export default Search;