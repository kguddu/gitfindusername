import moment from 'moment'
const Details = ({ detail ,changeHandler,visibleComponent}) => {

    return (
        <div className="card detail">
            <img src={detail.avatar_url} alt="profile" className="left" />
            <div className="right">
                <h2>{detail.name}</h2>
                <h3><a href={detail.html_url} target="_blank" rel="noreferrer">@{detail.login}</a></h3>
                <p>Member Since:{moment(detail.created_at).fromNow()}.</p>
            </div>

            <div className="buttons">
                <button onClick={_=>changeHandler(1)} className={visibleComponent === 1 ? "active" : ""}>{detail.public_repos}
                    <span>Repos</span>
                </button>
                <button onClick={_=>changeHandler(2)} className={visibleComponent === 2 ? "active" : ""}>{detail.followers}
                    <span>Followers</span>
                </button>
                <button onClick={_=>changeHandler(3)} className={visibleComponent === 3 ? "active" : ""}>{detail.following}
                    <span>Following</span>
                </button>
            </div>

        </div>
    )
}

export default Details;