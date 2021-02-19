import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
    return (
        <Container fluid className="p-2 mt-5 bg-dark">
            <h4 data-testid="footer-text" className="text-white text-center">&copy;2022 Albicja The Future of the web🚀</h4>
        </Container>
    )
}

export default Footer
