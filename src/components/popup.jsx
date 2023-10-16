import React, { useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { useQueryClient, useMutation } from 'react-query';

export default function Popup({ showPopup, handleModal, users, chossebtn }) {
  const queryClient = useQueryClient();

  const name = useRef();
  const phoneNumber = useRef();
  const email = useRef();
  const password = useRef();

  const updateUserMutation = useMutation(
    async (updatedUser) => {
      const response = await fetch(`http://localhost:3001/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Error updating user');
      }
    },
    {
      onMutate: async () => {
        await queryClient.refetchQueries('users');
      },
    }
  );

  const handleSaveUpdate = async (updatedUserData) => {
    try {
      await updateUserMutation.mutateAsync(updatedUserData);
      window.location.reload();
      console.log('User updated successfully');
      handleModal(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUserData = {
      id: users.id,
      name: name.current.value,
      phoneNumber: phoneNumber.current.value,
      email: email.current.value,
    };

    handleSaveUpdate(updatedUserData);
  };

  const addUserMutation = useMutation(
    async (newUser) => {
      const response = await fetch(`http://localhost:3001/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Error adding user');
      }
    },
    {
      onMutate: async () => {
        await queryClient.refetchQueries('users');
      },
    }
  );
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const newUserData = {
      name: name.current.value,
      phoneNumber: phoneNumber.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    try {
      await addUserMutation.mutateAsync(newUserData);
      console.log('User added successfully');
      window.location.reload();
      handleModal(); // Close the modal after successful add

    } catch (error) {
      console.error('Error adding user:', error);
    }
  };


  const update = () => (
    <>
      <Modal show={showPopup} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={name} defaultValue={users?.name} />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" ref={phoneNumber} defaultValue={users?.phoneNumber} />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={email} defaultValue={users?.email} />
            </Form.Group>
            <Button type="submit" variant="primary" className='mt-3'>
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )

  const Add = () => (
    <>
      <Modal show={showPopup} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" onSubmit={handleAddSubmit}>
            <div className="form-group">
              <label htmlFor="name">name:</label>
              <input
                ref={name}
                id="name"
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone:</label>
              <input
                ref={phoneNumber}
                id="phoneNumber"
                className="form-control"
                placeholder="phoneNumber"
                name="phoneNumber"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">email:</label>
              <input
                id="email"
                ref={email}
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                ref={password}
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
              />
            </div>

            <Button type="submit" variant="primary" className="mt-3">
              Add
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
  let display

  if (chossebtn === "update") {
    display = update()
  } else if (chossebtn === "Add") {
    display = Add()
  }


  return (

    <>
      {display}
    </>

  )
}
