import { Container } from '@mui/material';
import React, { ReactNode } from 'react'
import TopBar, { paddingAppSpace } from './TopBar';

interface LaytoutProps { 
    children?: ReactNode;
}

const Layout = (props: LaytoutProps) => {
    return (
        <>
            <TopBar />
            <main>
                <Container sx={{ marginTop: '2em', flexGrow: 1 }}>
                    { paddingAppSpace() }
                    { props.children }
                </Container>
            </main>
            <footer>
            </footer>
        </>
    )
}

export default Layout;