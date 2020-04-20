import React from 'react';
import { withFirebase } from 'components/Firebase';
import {ListGroupItem} from 'reactstrap'
import {MdExitToApp} from 'react-icons/md'

const SignOutButton = ({ firebase }) => (
  <ListGroupItem tag="button" action className="border-light" onClick={firebase.doSignOut}>
       <MdExitToApp/>Sign Out
  </ListGroupItem>
);
export default withFirebase(SignOutButton);
