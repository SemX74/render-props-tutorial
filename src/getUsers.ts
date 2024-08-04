type User = {
  id: number;
  name: string;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch("https://jso2nplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
};
