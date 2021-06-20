import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ListaPersonasResults from '../components/customer/ListaPersonasResults';
import ListaPersonasToolbar from '../components/customer/ListaPersonasToolbar';
import customers from '../__mocks__/customers';

const ListaPersonas = () => (
  <>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <ListaPersonasToolbar />
        <Box sx={{ pt: 3 }}>
          <ListaPersonasResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default ListaPersonas;
