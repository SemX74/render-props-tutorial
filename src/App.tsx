import DataFetcher from "./DataFetcher";
import { getUsers } from "./getUsers";

const App = () => {
  return (
    <DataFetcher
      fetcher={getUsers}
      loading={<span>Loading...</span>}
      error={({ error, refetch }) => (
        <div>
          <h1>{error?.message || "Something went wrong"}</h1>
          <button onClick={refetch}>Try again</button>
        </div>
      )}
    >
      {(users) => (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </DataFetcher>
  );
};

export default App;
