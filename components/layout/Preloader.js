import { Preloader, Row } from 'react-materialize'

const Loader = () => {
    return (
        <Row className="center">
            <Preloader
                active
                color="red"
                flashing={false}
                size="big"
            />
        </Row>
    )
}

export default Loader