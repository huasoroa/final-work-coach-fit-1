import React, { Component } from 'react'
import * as ROLES from 'constants/roles'

class TutorialPage extends Component {
    render() {
        return (
            <Page>
                
            </Page>
        )
    }
}

const condition = authUser => authUser && !!authUser===ROLES.CLIENT;

export default TutorialPage;
