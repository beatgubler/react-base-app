import { useEffect } from "react";
import { db } from "../../firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Protected = () => {

  // const [users, setUsers] = useState([]);

  const userRef = db.collection('users');
  const query = userRef.orderBy('username');

  const [users] = useCollectionData(query);

  const createUser = () => {
    console.log("create user")
    db.collection("users")
      .add({username: "Testuser" + Math.floor(Math.random() * 100000), createdOn: Date()})
      .then(res => {console.log(res)}, err => console.log(err)); 
  };

  useEffect(() => {
  
  },[])

  return (
    <div>
      <h2>Protected Site</h2>
      <Table>
          <TableHead>
            <TableRow style={{backgroundColor:'lightgray'}}>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user, index) => (
              <TableRow key={index} >
                <TableCell>{user.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br></br>
        <button className="btn btn-success" onClick={createUser}>Create random user</button>
    </div>
  );
};

export default Protected;