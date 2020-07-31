import React, { Component } from 'react'
import Typography from 'components/Typography'
import Page from 'components/Page'
import { Row, Col, Card, ListGroup, ListGroupItem, CardBody, CardTitle, CardImg, CardHeader } from 'reactstrap'
import Avatar from 'components/Avatar'
import ReviewForm from '../components/ReviewForm'

export default class ProfilePage extends Component {

    state = {
        reviews: null,
        loading: true,
        user: null,
        imageUrl: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        this.props.firebase.user(this.props.match.params.id).on('value', snapshot => {
            const userObject = snapshot.val();

            this.setState({
                user: userObject,
            });
        });
            this.props.firebase.profilePics().child(this.props.match.params.id + ".png").getDownloadURL().then(
                url => {
                    this.setState({
                        imageUrl: url
                    })
                }
            ).catch(error => {
                switch (error.code) {
                    case 'storage/object-not-found':
                        console.log("File doesn't exist")
                        break;

                    case 'storage/unauthorized':
                        console.log("User doesn't have permission to access the object")
                        break;

                    case 'storage/canceled':
                        console.log("User canceled the upload")
                        break;

                    case 'storage/unknown':
                        console.log("Unknown error occurred, inspect the server response")
                        break;

                }
            });

        this.props.firebase.review(this.props.match.params.id).on('value', snapshot => {
            const reviewsSnap = snapshot.val();
            this.setState({reviews : reviewsSnap})
        })

        this.setState({ loading: false })
    }

    render() {
        const { user, loading, imageUrl, reviews } = this.state
        return (
            <Page title="Profile" breadcrumbs={[{ name: 'Profile', active: true }]} >
                {loading && <div>Loading ...</div>}

                {user && (
                    <div>
                        <Row >
                            <Col lg={3} sm={6} md={3} style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRightWidth: "10px",
                                borderRightColor: "0c0f0a"
                            }}>
                                <Typography type='h1'>{user.firstName} {user.lastName}</Typography>
                                <Avatar src={imageUrl} size={90} className="mb-3"/>
                            </Col>
                            <Col lg={9} sm={6} md={9}>
                            <Card>
                                    <CardHeader>Description</CardHeader>
                                    <CardBody>
                                        <Typography type='p'>{user.description}</Typography>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={3} sm={6} md={3} style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Typography type='h2' style={{
                                    color: 'blue'
                                }}><u>@{user.username}</u></Typography>
                                <Typography type='h3'>{user.birth}</Typography>
                                <Typography type='h3'>Sports: {user.sports}</Typography>
                            </Col>
                            <Col lg={9} sm={6} md={9}>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={3} sm={6} md={3}>
                                <ReviewForm uid={this.props.match.params.id}/>
                            </Col>
                            <Col lg={9} sm={6} md={9}>
                                
                                <ListGroup>
                                    {reviews && reviews.map(rev => (
                                        <ListGroupItem>
                                            <Typography type='h4'>{rev.author}</Typography>
                                            <br />
                                            {rev.text}
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </Col>
                        </Row>
                    </div>
                )}

            </Page>
        )
    }
}
