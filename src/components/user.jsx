import React, { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
// import PopupModal from '../utils/PopupModal';
import Popup from './popup';
import { useQuery, useMutation , useQueryClient } from 'react-query';

const User = () => {
  const queryClient = useQueryClient();
  const [showPopup, setShowPopup] = useState(false);
  const [selecteduser, setSelecteduser] = useState(null);
  const [chossebtn, setChossbtn] = useState();

  const handleModal = (user) => {
    setSelecteduser(user);
    setShowPopup((prev) => !prev);
    setChossbtn('update');
  };
  const handleModaladd = () => {
    setShowPopup((prev) => !prev);
    setChossbtn('Add');
  }
 

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();
      console.log(data); // Log the data
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error so React Query can handle it
    }
  };

  const { data: users, isLoading, isError } = useQuery('users', getUser);

  const deleteUserMutation = useMutation(
    async (userId) => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting user');
      }
    },
    {
      // On success, refetch the users data to get the updated list
      onMutate: async () => {
        await queryClient.refetchQueries('users');
      },
    }
  );

  // Define the handleDelete function that calls the mutation function
  const handleDelete = (user) => {
    deleteUserMutation.mutate(user.id);
  };


  return (
    <>
      <Popup
        showPopup={showPopup}
        handleModal={handleModal}
        
        users={selecteduser}
        chossebtn={chossebtn}

      />
      <nav class="navbar  navbar-expand-lg d-flex item-center justify-content-between w-100 bg-body-tertiary">
        <div class="container-fluid d-flex justify-content-between" >


          <h1 className="mb-10 ml-20 mt-5 text-xl">User List</h1>
          <Button
            className="w-64 mr-2 font-bold text-white bg-blue-900 px-2 py-2 rounded-lg border-none relative"
            onClick={handleModaladd}
          >
            CREATE USER
          </Button>

          {/* </div> */}
        </div>
      </nav>


      <Container className="ml-5 mr-2">
       
        <div className="mx-3 mt-3">
          <Table striped bordered hover>
            <thead>
              <tr className="bg-gray-200">
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5">Loading...</td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="5">Error fetching data</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className={`bg-${user.active ? 'green' : 'red'}-100`}
                  >
                   
                    <td>{user.name}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.email}</td>
                    <td className='d-flex justify-content-evenly'>
                      <Button
                        variant="success"
                        className="mr-2"
                        onClick={() => handleModal(user)}
                      >
                        Update
                      </Button>
                      <Button variant="danger"
                        onClick={()=>handleDelete(user)}
                        
                      >Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </Table>
        </div>
      </Container>
    </>
  );
};

export default User;