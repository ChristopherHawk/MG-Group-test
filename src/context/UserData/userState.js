import React, { useReducer } from 'react';
import UserReducer from './userReducer';
import UserContext from './userContext';
import { fetchData, multiFetch } from '../../client'

const UserState = (props) => {
  const initialState = {
    users: [],
    newUserCreated: [],
    errorsBox: null,
    modalStatus: false,
    infoModal: [],
    userDetails: null
  }

  const [state, dispatch] = useReducer(UserReducer, initialState)

  //Get All Users
  const getAllUsers = async () => {

    try {
      const getUsers = await fetchData('/users');
      dispatch({
        type: 'GET_ALL_USERS',
        payload: getUsers.data
      })
    } catch (error) { console.log(error) }


  }
  //Get User
  const showDetailsUser = (userInfo) => {
    dispatch({
      type: 'DETAILS_USER',
      payload: userInfo
    })
  }

  //Create new user
  const createNewUser = async (userDataForm) => {
    try {
      if (userDataForm) {
        var urlencoded = new URLSearchParams();
        urlencoded.append("name", userDataForm.name);
        urlencoded.append("gender", userDataForm.gender);
        urlencoded.append("email", userDataForm.email);
        urlencoded.append("status", userDataForm.status);
        //Response
        const dataUser = await multiFetch('/users', 'POST', urlencoded);
        openModal(true)
        //Success Register             
        dispatch({
          type: 'SHOW_NEW_USER',
          payload: dataUser.data
        })
        dispatch({
          type: 'CATCH_ERRORS',
          payload: null
        })
        pushInfoModal(dataUser.data)
        //Errors sign up
        if (dataUser.data[0].field) {
          dispatch({
            type: 'CATCH_ERRORS',
            payload: dataUser.data[0]
          })
          pushInfoModal(dataUser.data[0])

        }
      }
    } catch (error) { console.log(error) }

  }
  //Update User Info
  const updateInfoUser = async (userInfoUpdate, id) => {
    try {
      var urlencoded = new URLSearchParams();
      urlencoded.append("name", userInfoUpdate.name);
      urlencoded.append("gender", userInfoUpdate.gender);
      urlencoded.append("email", userInfoUpdate.email);
      urlencoded.append("status", userInfoUpdate.status);
      //Response
      const dataUserEdit = await multiFetch(`/users/${id}`, 'PUT', urlencoded);
      dispatch({
        type: 'UPDATE_USER_INFO',
        payload: dataUserEdit
      })
    } catch (error) {
      console.log(error)
    }

  }

  // Delete User
  const deleteUser = async (userInfo) => {
    //Response
    const dataUserDelete = await multiFetch(`/users/${userInfo.id}`, 'DELETE');
    if (dataUserDelete.status === 204) {
      openModal(true)
      dispatch({
        type: 'CATCH_ERRORS',
        payload: {
          'field': 'Usuario eliminado',
          'message': 'Se ha eliminado el usuaro con exito!'
        }
      })
      pushInfoModal()
    }
  }
  //Open Modal
  const openModal = (status) => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: status
    })
  }
  //Push Info Modal
  const pushInfoModal = (dataUser) => {
    dispatch({
      type: 'PUSH_INFO_MODAL',
      payload: dataUser
    })
  }
  //Clear Errors Array
  const clearErrors = () => {
    dispatch({
      type: 'CATCH_ERRORS',
      payload: null
    })
  }


  return (
    <UserContext.Provider value={{
      users: state.users,
      newUserCreated: state.newUserCreated,
      errorsBox: state.errorsBox,
      modalStatus: state.modalStatus,
      infoModal: state.infoModal,
      userDetails: state.userDetails,
      getAllUsers,
      createNewUser,
      openModal,
      pushInfoModal,
      clearErrors,
      showDetailsUser,
      updateInfoUser,
      deleteUser
    }}>
      {props.children}
    </UserContext.Provider>
  )

}

export default UserState;