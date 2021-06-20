import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import RecentActors from '@material-ui/icons/RecentActors';
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied';

const EstadoColegio = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: [
          colors.green[500],
          colors.red[500],
          colors.yellow[500]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Saludable', 'Contagiado', 'Contacto Estrecho']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Saludable',
      value: 63,
      icon: FavoriteBorder,
      color: colors.green[500]
    },
    {
      title: 'Contagiado',
      value: 15,
      icon: SentimentVeryDissatisfied,
      color: colors.red[500]
    },
    {
      title: 'Contacto Estrecho',
      value: 23,
      icon: RecentActors,
      color: colors.yellow[500]
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Estado Colegio" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                XX
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EstadoColegio;
