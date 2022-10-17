

const Repo=({detail})=>{

        return (
            <div className="card repo_list">
        <h2>Following List</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th colSpan={2}>Name</th>
            </tr>
          </thead>
          <tbody>
            {detail.map((singleRepo,idx)=>{
                return(
                   <tr key={idx}>
                    <td>{idx+1}</td>
                    <td>
                    <a href={singleRepo.html_url} target='_blank' rel="noreferrer">
                        {singleRepo.name}
                    </a>
                    </td>
                    </tr>
                )
            })}

          </tbody>
          </table>

          </div>
            
        )

     
}

export default Repo;